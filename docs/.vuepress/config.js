module.exports = {
	locales: {
		'/': {
			lang: 'en-US',
			title: 'VuexOrmLokijs',
			description: 'VuexOrmLokijs for Vue.js'
		}
	},
	themeConfig: {
		repo: 'nsh-core/vuex-orm-lokijs',
		docsDir: 'docs',
		locales: {
			'/': {
				label: 'English',
				selectText: 'Languages',
				editLinkText: 'Edit this page on GitHub',
				nav: [{
					text: 'Release Notes',
					link: 'https://github.com/nsh-core/vuex-orm-lokijs/releases'
				}],
				sidebar: [
					'/installation.md',
					'/started.md',
				]
			}
		}
	}
}

