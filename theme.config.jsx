import { useConfig } from 'nextra-theme-docs';
import { useRouter } from 'nextra/hooks';

export default {
	docsRepositoryBase: 'https://github.com/umodoc/docs/tree/main',
	head() {
		const { title, frontMatter } = useConfig();
		const router = useRouter();
		return (
			<>
				<title>
					{title} - {router.locale === 'cn' ? 'Umo Editor 在线文档' : 'Umo Editor Documention'}
				</title>
				<link rel="icon" href="/images/favicon.png" />
				<meta name="description" content={frontMatter.description} />
				<meta name="msvalidate.01" content="238678E9B05B3DE2E35D891334FC842E" />
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "m4og8bmozy");`
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?0b5bf47aaa03f9e14c09583fafbbb76e";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();`
					}}
				/>
			</>
		);
	},
	logo() {
		const router = useRouter();
		return (
			<>
				<svg style={{ marginTop: '-4px' }} height="26" viewBox="0 0 684.303 128" xmlns="http://www.w3.org/2000/svg">
					<g fillRule="nonzero" fill="none">
						<path
							d="M521.864 37.421l-2.279 3.768h64.305l-1.772 9.544h-68.482l-4.304 7.158h66.457l-8.608 47.721-2.911 7.786h-18.355l3.165-8.037.38-2.512h-45.698l-1.898 10.423h-17.722l5.95-33.153h-11.9l17.722-29.512h-10.886l1.772-9.544h15.064l2.278-3.767h17.722v.125zm-13.02 38.983h45.012l1.496-8.456H510.34l-1.496 8.456zm-3.17 16.911h45.01l1.497-8.455H507.17l-1.496 8.455zM624.66 72.53l.379-2.405h-35.761l1.263-7.215h35.761l.38-2.152h-35.635l4.043-22.405h89.213l-4.044 22.405h-35.634l-.38 2.152h35.762l-1.264 7.215h-35.76l-.38 2.405h40.31l-1.516 8.102h-98.564l1.517-8.102h40.31zm47.009 29.326h-35.835l-.38 2.41h40.393l-1.646 9.132h-98.767l1.646-9.132h40.394l.38-2.41h-35.835l1.52-8.625h35.834l.38-2.03h17.98l-.38 2.03h35.835l-1.52 8.625h.001zM651.537 91.2H635.8l-2.232-9.512h15.737l2.232 9.512zm26.424 0h-15.737l-2.231-9.512h15.737l2.231 9.512zm-91.63-9.512h16.585l-5.487 9.512h-16.71l5.612-9.512zm40.895 9.512h-15.722l-2.246-9.512h15.84l2.128 9.512zm-1.953-39.108h2.796l1.271-6.342h-18.81l-1.271 6.342h3.177l-.127-5.229h12.965v5.23l-.001-.001zm20.144-6.342l-1.28 6.342h2.687l2.303-5.229h12.919l-2.303 5.23h3.198l1.28-6.343h-18.804zm-194.79-6.34l9.597 13.658c-2.724 15.076-5.577 30.28-8.3 45.486-4.886 4.594-9.771 9.19-14.654 13.787h-65.878c-3.113-4.768-6.355-9.406-9.467-14.174 2.723-15.076 5.576-30.023 8.3-45.099l14.524-13.658h65.878zm-240.182-1.057l-8.99 49.222h41.483l4.238-22.936 20.678 17.653-2.826 15.205-14.512 13.787h-65.244l-9.375-13.787 10.66-59.144h23.888zm57.537 0l32.574 29.302 45.733-29.302h15.636l-16.027 72.931h-27.492l7.297-33.34-31.662 17.712-45.213-38.55 4.17-18.753h14.984zM430.397 62.99H396.16l-4.539 3.866c-1.037 5.798-2.205 11.725-3.242 17.653l3.112 4.252h35.014c1.297-1.289 2.594-2.577 3.632-3.737.291-1.514.575-3.028.855-4.542l1.661-9.084.855-4.542-3.112-3.866h.001zM78.005 0L65.638 82.444l-48.62 6.342-.846 5.496 62.256-1.48 11.31-68.28 41.75-10.464-15.855 91.851-32.026 21.985H0L18.074 15.432 78.005 0zM56.971 64.581l-37.523 9.302-.422 2.854 37.522-9.302.423-2.854zm2.431-15.009L21.88 58.874l-.423 2.853 37.522-9.301.423-2.854zm2.431-15.009L24.31 43.865l-.422 2.853 37.522-9.301.423-2.854zm2.431-15.115L26.742 28.75l-.423 2.854 37.522-9.302.423-2.854z"
							fill="#4376F8"
						/>
						<path fillOpacity=".7" fill="#FFF" d="M115.633 106.015l-28.855-.106L83.607 128z" />
					</g>
				</svg>
				<span style={{ margin: '0 1.2em', color: 'rgb(229, 231, 235)' }}> | </span>
				<span style={{ fontSize: '18px' }} className="_text-gray-100">
					{router.locale === 'cn' ? '在线文档' : 'Documention'}
				</span>
			</>
		);
	},
	search: {
		emptyResult() {
			const router = useRouter();
			return <div className="no-result">{router.locale === 'cn' ? '未找到相关结果' : 'No results found.'}</div>;
		},
		loading() {
			const router = useRouter();
			return router.locale === 'cn' ? '搜索中...' : 'Loading...';
		},
		error() {
			const router = useRouter();
			return router.locale === 'cn' ? '搜索出错了' : 'Error';
		},
		placeholder() {
			const router = useRouter();
			return router.locale === 'cn' ? '搜索文档' : 'Search Documention';
		}
	},
	project: {
		link: 'https://github.com/umodoc/editor',
		icon: (
			<svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18">
				<path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
			</svg>
		)
	},
	chat: false,
	gitTimestamp({ timestamp }) {
		const router = useRouter();
		const time = new Date(timestamp).toLocaleDateString(router.locale === 'cn' ? 'zh-CN' : 'en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		return (
			<>
				{router.locale === 'cn' ? `最近修改于: ${time}` : `Last updated on: ${time}`}
			</>
		);
	},
	toc: {
		title() {
			const router = useRouter();
			return router.locale === 'cn' ? '内容导航' : 'On This Page';
		},
		backToTop: false
	},
	feedback: {
		content() {
			const router = useRouter();
			return router.locale === 'cn' ? '在线提问 & 意见反馈 →' : 'Question? Give us feedback →';
		},
		useLink: () => 'https://github.com/umodoc/editor/issues/new/choose'
	},
	editLink: {
		content() {
			const router = useRouter();
			return router.locale === 'cn' ? '在 Github 上编辑此页 →' : 'Edit this page →';
		}
	},
	footer: false,
	themeSwitch: {
		useOptions() {
			const router = useRouter();
			if (router.locale === 'cn') {
				return {
					light: '浅色主题',
					dark: '暗色主题',
					system: '跟随系统'
				};
			}
			return {
				light: 'Light',
				dark: 'Dark',
				system: 'System'
			};
		}
	},
	backgroundColor: {
		light: '#fff'
	},
	i18n: [
		{ locale: 'cn', name: '简体中文' },
		{ locale: 'en', name: 'English' }
	]
};
