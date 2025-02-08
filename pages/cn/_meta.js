export default {
	index: {
		title: '首页',
		display: 'hidden'
	},
	docs: {
		title: '开发文档',
		type: 'page'
	},
	demo: {
		title: '在线示例',
		type: 'page',
		href: 'https://demo.umodoc.com/editor?lang=zh-CN',
		newWindow: true
	},
	versions: {
    title: '版本',
    type: 'menu',
    items: {
      v4: {
        title: 'v4.x',
        href: 'https://v4.editor.umodoc.com/cn/docs'
      },
      latest: {
        title: '最新版',
        href: '/cn/docs'
      }
    }
  }
};
