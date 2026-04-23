import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const THIS_FILE = fileURLToPath(import.meta.url);
const THIS_DIR = path.dirname(THIS_FILE);
const ROOT = path.resolve(THIS_DIR, '..');

function parseArgs(argv) {
	const args = {
		origin: 'http://localhost:9002',
		entry: '/cn/docs/editor',
		out: path.join(ROOT, 'bad-links.txt'),
		concurrency: 12,
		timeoutMs: 10000,
		logOk: true
	};

	for (let i = 2; i < argv.length; i += 1) {
		const token = argv[i];
		if (!token.startsWith('--')) continue;
		const [rawKey, rawValue] = token.slice(2).split('=');
		const key = rawKey?.trim();
		const value = (rawValue ?? argv[i + 1])?.trim();
		if (!key || value == null) continue;

		if (rawValue == null) i += 1;

		if (key === 'origin') args.origin = value.replace(/\/+$/, '');
		else if (key === 'entry') args.entry = value.startsWith('/') ? value : `/${value}`;
		else if (key === 'out') args.out = path.isAbsolute(value) ? value : path.join(ROOT, value);
		else if (key === 'concurrency') args.concurrency = Math.max(1, Number(value) || 1);
		else if (key === 'timeoutMs') args.timeoutMs = Math.max(100, Number(value) || 10000);
		else if (key === 'logOk') args.logOk = value === '1' || value.toLowerCase() === 'true';
	}

	return args;
}

async function walkFiles(dir, exts) {
	const out = [];
	const queue = [dir];

	while (queue.length) {
		const current = queue.pop();
		let entries;
		try {
			entries = await fs.readdir(current, { withFileTypes: true });
		} catch {
			continue;
		}

		for (const entry of entries) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) {
				queue.push(full);
				continue;
			}
			if (!entry.isFile()) continue;
			const ext = path.extname(entry.name).toLowerCase();
			if (exts.has(ext)) out.push(full);
		}
	}

	return out;
}

function fileToRoute(filePath) {
	const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
	if (!rel.startsWith('pages/')) return null;
	let p = rel.slice('pages'.length);
	p = p.replace(/\.(mdx|md)$/i, '');
	p = p.replace(/\/index$/i, '');
	if (!p.startsWith('/')) p = `/${p}`;
	return p;
}

function fileToSimpleDocPath(filePath) {
	const rel = path.relative(path.join(ROOT, 'pages'), filePath).split(path.sep).join('/');
	if (!rel) return null;
	return rel.startsWith('/') ? rel : `/${rel}`;
}

function stripCode(text) {
	return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

function extractLinks(text) {
	const t = stripCode(text);
	const links = [];

	const mdInline = /!?\[[^\]]*?\]\(([^)]+)\)/g;
	for (const m of t.matchAll(mdInline)) {
		const raw = (m[1] ?? '').trim();
		if (!raw) continue;
		let url = raw;
		if (url.startsWith('<')) {
			const end = url.indexOf('>');
			if (end > 1) url = url.slice(1, end);
			else continue;
		} else {
			url = url.split(/\s+/)[0] ?? '';
		}
		if (url) links.push(url);
	}

	const mdRef = /^\s*\[[^\]]+\]:\s*(\S+)/gm;
	for (const m of t.matchAll(mdRef)) {
		const url = (m[1] ?? '').trim();
		if (url) links.push(url);
	}

	const htmlAttr = /\b(?:href|src)=["']([^"']+)["']/g;
	for (const m of t.matchAll(htmlAttr)) {
		const url = (m[1] ?? '').trim();
		if (url) links.push(url);
	}

	const jsxLiteralAttr = /\b(?:href|src)=\{(["'`])([^"'`]+)\1\}/g;
	for (const m of t.matchAll(jsxLiteralAttr)) {
		const url = (m[2] ?? '').trim();
		if (url) links.push(url);
	}

	return links;
}

function isRelativeLocalLink(href) {
	const s = href.trim();
	if (!s) return false;
	if (s.startsWith('#')) return false;
	if (s.startsWith('/')) return false;
	if (s.startsWith('//')) return false;
	if (s.startsWith('{')) return false;
	if (s.startsWith('@')) return false;
	if (s.startsWith('~')) return false;

	const lower = s.toLowerCase();
	if (lower.startsWith('http:')) return false;
	if (lower.startsWith('https:')) return false;
	if (lower.startsWith('mailto:')) return false;
	if (lower.startsWith('tel:')) return false;
	if (lower.startsWith('javascript:')) return false;
	if (lower.startsWith('data:')) return false;
	if (lower.startsWith('ftp:')) return false;

	return true;
}

async function mapLimit(items, limit, fn) {
	const results = new Array(items.length);
	let cursor = 0;

	const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (true) {
			const idx = cursor;
			cursor += 1;
			if (idx >= items.length) break;
			results[idx] = await fn(items[idx], idx);
		}
	});

	await Promise.all(workers);
	return results;
}

async function fetchStatus(url, timeoutMs) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			redirect: 'follow',
			signal: controller.signal,
			headers: { 'user-agent': 'bad-local-links-checker' }
		});
		return { ok: res.status < 400, status: res.status };
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		return { ok: false, status: `ERR:${msg}` };
	} finally {
		clearTimeout(timer);
	}
}

async function fetchStatusAny(urls, timeoutMs) {
	const tried = [];
	let last = { ok: false, status: 'ERR:UNKNOWN' };
	for (const url of urls) {
		last = await fetchStatus(url, timeoutMs);
		tried.push({ url, status: last.status, ok: last.ok });
		if (last.ok) return { ...last, tried };
	}
	return { ...last, tried };
}

async function main() {
	const args = parseArgs(process.argv);
	const targets = [
		path.join(ROOT, 'pages', 'cn'),
		path.join(ROOT, 'pages', 'en')
	];

	const startedAt = Date.now();
	console.log(`项目根目录：${ROOT}`);
	console.log(`站点：${args.origin}`);
	console.log(`入口：${args.entry}`);
	console.log(`并发：${args.concurrency}`);
	console.log(`超时：${args.timeoutMs}ms`);
	console.log(`输出：${args.out}`);

	await fs.mkdir(path.dirname(args.out), { recursive: true });
	await fs.writeFile(args.out, '', 'utf8');

	const entryUrl = `${args.origin}${args.entry}`;
	const entryProbe = await fetchStatus(entryUrl, args.timeoutMs);
	if (!entryProbe.ok) {
		console.error(`入口不可访问：${entryUrl} (${entryProbe.status})`);
	}

	const files = (
		await Promise.all(targets.map((d) => walkFiles(d, new Set(['.mdx', '.md']))))
	).flat();
	files.sort((a, b) => a.localeCompare(b));

	const checks = [];
	for (const file of files) {
		const route = fileToRoute(file);
		if (!route) continue;
		const simpleFile = fileToSimpleDocPath(file);
		if (!simpleFile) continue;
		const isIndexFile = /\/index\.(mdx|md)$/i.test(file.split(path.sep).join('/'));
		let content;
		try {
			content = await fs.readFile(file, 'utf8');
		} catch {
			continue;
		}

		const links = extractLinks(content).filter(isRelativeLocalLink);
		if (!links.length) continue;

		const base = `${args.origin}${route}`;
		const baseWithSlash = `${args.origin}${route}/`;
		for (const raw of links) {
			let resolved;
			let resolvedAlt;
			try {
				const u = new URL(raw, isIndexFile ? baseWithSlash : base);
				u.hash = '';
				resolved = u.toString();
				if (isIndexFile) {
					const u2 = new URL(raw, base);
					u2.hash = '';
					resolvedAlt = u2.toString();
				}
			} catch {
				resolved = '';
			}
			if (!resolved) continue;
			checks.push({
				file,
				simpleFile,
				link: raw,
				resolved,
				resolvedAlt: resolvedAlt && resolvedAlt !== resolved ? resolvedAlt : undefined
			});
		}
	}

	const unique = new Map();
	for (const c of checks) {
		const key = `${c.simpleFile}\n${c.link}`;
		if (!unique.has(key)) unique.set(key, c);
	}
	const items = Array.from(unique.values());

	console.log(`扫描文件数：${files.length}`);
	console.log(`相对链接数：${items.length}`);

	const bad = [];
	let done = 0;
	let okCount = 0;

	await mapLimit(items, args.concurrency, async (item) => {
		const urls = item.resolvedAlt ? [item.resolved, item.resolvedAlt] : [item.resolved];
		const s = await fetchStatusAny(urls, args.timeoutMs);
		done += 1;
		if (s.ok) {
			okCount += 1;
			if (args.logOk) {
				const urlLabel = urls.length === 1 ? urls[0] : urls.join(' | ');
				console.log(`OK  ${String(s.status).padEnd(4)} ${item.simpleFile}: ${item.link} -> ${urlLabel}`);
			}
		} else {
			bad.push({ ...item, ...s });
			const triedLabel = (s.tried ?? [])
				.map((t) => `${t.status} ${t.url}`)
				.join(' | ');
			console.log(`BAD ${String(s.status).padEnd(4)} ${item.simpleFile}: ${item.link} -> ${triedLabel || urls.join(' | ')}`);
		}
		if (done % 200 === 0) {
			const elapsedMs = Date.now() - startedAt;
			const rps = elapsedMs > 0 ? (done / (elapsedMs / 1000)).toFixed(1) : '0';
			console.log(`进度：${done}/${items.length} (OK ${okCount}, BAD ${bad.length}, ${rps} req/s)`);
		}
	});

	bad.sort((a, b) => {
		const f = a.simpleFile.localeCompare(b.simpleFile);
		if (f !== 0) return f;
		const l = a.link.localeCompare(b.link);
		if (l !== 0) return l;
		return a.resolved.localeCompare(b.resolved);
	});

	const lines = bad.map((r) => `${r.simpleFile}: ${r.link}`);
	await fs.writeFile(args.out, lines.join('\n') + (lines.length ? '\n' : ''), 'utf8');

	const elapsedMs = Date.now() - startedAt;
	const elapsedSec = (elapsedMs / 1000).toFixed(1);
	console.log(`坏链接数：${bad.length}`);
	console.log(`已写入：${args.out}`);
	console.log(`耗时：${elapsedSec}s`);
}

await main();
