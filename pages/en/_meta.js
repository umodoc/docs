export default {
	index: {
		title: 'Home',
		display: 'hidden'
	},
	docs: {
		title: 'Documention',
		type: 'page'
	},
	demo: {
		title: 'Playground',
		type: 'page',
		href: 'https://demo.umodoc.com/editor?lang=en-US',
		newWindow: true
	},
	versions: {
    title: 'Versions',
    type: 'menu',
    items: {
      v4: {
        title: 'v4.x',
        href: 'https://v4.editor.umodoc.com/en/docs'
      },
      latest: {
        title: 'Latest',
        href: '/en/docs'
      }
    }
  }
};
