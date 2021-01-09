export default [
	{
		icon: 'ds-icon-home',
		index: '/about',
		title: 'Dashboard'
	},
	{
		icon: 'ds-icon-copy',
		index: '/main/tables',
		title: '基础表格'
	},
	{
		icon: 'ds-icon-rank',
		index: '/main/icons',
		title: '自定义图标'
	},
	{
		icon: 'ds-icon-rank',
		index: '/main/tabs',
		title: 'tab选项卡'
	},
	{
		icon: 'ds-icon-cascades',
		index: '5',
		title: '三级菜单示例',
		subs: [
			{
				index: '/main/forms',
				title: '基础表单'
			},
			{
				index: '/main/upload',
				title: '上传组件'
			},
			{
				index: '5-3',
				title: '编辑器',
				subs: [
					{
						index: '/main/editor',
						title: '富文本编辑器'
					},
					{
						index: '/main/markdown',
						title: 'markdown编辑器'
					}
				]
			}
		]
	},
	{
		icon: 'ds-icon-rank',
		index: '/main/charts',
		title: 'schart图表'
	},
	{
		icon: 'ds-icon-rank',
		index: '/main/i18n',
		title: '国际化'
	},
	{
		icon: 'ds-icon-rank',
		index: '7',
		title: '错误处理',
		subs: [
			{
				index: '/main/permission',
				title: '权限测试'
			},
			{
				index: '/error/404',
				title: '404页面'
			}
		]
	}
];
