const routes = [{
		path: '/login',
		component: function(resolve) { require(['./components/usr/login.vue'], resolve) },
		name: '用户登录',
		hidden: true
	}, {
		path: '/register',
		component: function(resolve) { require(['./components/usr/register.vue'], resolve) },
		name: '用户注册',
		hidden: true

	}, {
		path: '/error',
		component: function(resolve) { require(['./components/error.vue'], resolve) },
		name: '出错了',
		hidden: true

	}, {
		path: '/studio/:id',
		component: function(resolve) { require(['./view/room/studio.vue'], resolve) },
		name: '美化直播间',
		hidden: true,
		redirect:'/studio/:id/config',
		children:[{
			path:'/studio/:id/config',
			component:function(resolve){require(['./view/room/config.vue'],resolve)}
		},{
			path:'/studio/:id/audience',
			component:function(resolve){require(['./view/room/audience.vue'],resolve)}
		},{
			path:'/studio/:id/analysis',
			component:function(resolve){require(['./view/room/analysis.vue'],resolve)}
		}]

	}, {
		path: '/',
		component: require('./view/layout.vue'),
		iconCls: 'home', //图标样式class
		name: '首页',
		redirect: '/home',
		leaf: true, //只有一个节点
		children: [{
			path: '/home',
			component: function(resolve) { require(['./view/home.vue'], resolve) },
		}]
	}, {
		path: '/room',
		component: require('./view/layout.vue'),
		iconCls: 'room', //图标样式class
		name: '直播管理',
		redirect: '/roomlist',
		leaf: true, //只有一个节点
		children: [{
			path: '/roomlist',
			component: function(resolve) { require(['./view/room/list.vue'], resolve) },
		},{
			path:'/video/:id',
			name:'视频库',
			component:function(resolve){require(['./view/room/video.vue'],resolve)},
			hidden: true
		}]
	},{
		path: '/',
		component: require('./view/layout.vue'),
		iconCls: 'user',
		name: '财务账户',
		children: [{
			path: '/information',
			component: function(resolve) { require(['./view/usr/information.vue'], resolve) },
			name: '我的收益'
		}, {
			path:'/items/:id',
			component:function(resolve){require(['./view/usr/items.vue'],resolve)},
			hidden:true
		},{
			path: '/taocan',
			component: function(resolve) { require(['./view/usr/taocan.vue'], resolve) },
			name: '账户总览'

		},{
			path: '/update',
			name: '产品功能升级',
			component: function(resolve) { require(['./view/usr/update.vue'], resolve) }
		}, {
			path:'/buytaocan',
			component:function(resolve){require(['./view/usr/buytaocan.vue'],resolve)},
			name:'时长套餐',
		},{
			path: '/pay',
			name: '余额充值',
			component: function(resolve) { require(['./view/money/pay.vue'], resolve) },
		},{
			path: '/extract',
			name: '余额提现',
			component: function(resolve) { require(['./view/money/extract.vue'], resolve) },
		}]
	}, {
		path: '/',
		component: require('./view/layout.vue'),
		iconCls: 'goods', //图标样式class
		name: '商品管理',
		children: [{
			path: '/list',
			name: '商品列表',
			component: function(resolve) { require(['./view/goods/list.vue'], resolve) },

		}, {
			path: '/add',
			name: '添加商品',
			component: function(resolve) { require(['./view/goods/add.vue'], resolve) },

		}, {
			path: '/edit/:id',
			name: '修改商品',
			hidden: true,
			component: function(resolve) { require(['./view/goods/edit.vue'], resolve) },

		}, {
			path: '/order',
			name: '订单管理',
			component: function(resolve) { require(['./view/goods/order.vue'], resolve) },

		}]
	}, {
		path: '/',
		component: require('./view/layout.vue'),
		iconCls: 'seting',
		name: '设置',
		children: [{
			path: '/changepwd',
			component: function(resolve) { require(['./view/seting/pwd.vue'], resolve) },
			name: 'changepwd',
			name: '修改密码'
		}, {
			path: '/changetel',
			component: function(resolve) { require(['./view/seting/tel.vue'], resolve) },
			name: 'changetel',
			name: '联系电话'
		}]
	},
	{
		path: '/dz',
		component: require('./view/layout.vue'),
		iconCls: 'dz', //图标样式class
		name: '定制服务',
		leaf: true,
		redirect: '/app',
		children: [{
				path: '/app',
				name: '更多合作',
				component: function(resolve) { require(['./view/dz/app.vue'], resolve) },

			},
			//	{
			//		path: '/picture2',
			//		name: '直播app开发',
			//		component: require('./view/source/picture.vue'),
			//
			//	}, {
			//		path: '/video2',
			//		name: '更多合作',
			//		component: require('./view/source/video.vue'),
			//
			//	},
		]
	},
	{
		path: '*',
		redirect: '/home',
		name: '其他',
		hidden: true
	}
]

export default routes;
