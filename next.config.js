import nextra from 'nextra';

const withNextra = nextra({
	theme: 'nextra-theme-docs',
	themeConfig: './theme.config.jsx',
	defaultShowCopyCode: true
});

export default withNextra({
	output: 'export',
	images: {
		unoptimized: true
	},
	reactStrictMode: true,
	i18n: {
		locales: ['cn', 'en'],
		defaultLocale: 'cn'
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/cn/docs',
				permanent: true
			}
		];
	}
});
