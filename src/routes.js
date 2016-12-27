const routes = [{
	path: '/login',
	component: require('./components/usr/login.vue'),
	name: '用户登录',
	hidden: true
}, {
	path: '/register',
	component: require('./components/usr/register.vue'),
	name: '用户注册',
	hidden: true

}, {
	path: '/error',
	component: require('./components/error.vue'),
	name: '出错了',
	hidden: true

}, {
	path: '/studio/:id',
	component: require('./view/room/studio.vue'),
	name: '美化直播间',
	hidden: true

}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'home', //图标样式class
	name: '首页',
	redirect: '/home',
	leaf: true, //只有一个节点
	children: [{
		path: '/home',
		component: require('./view/home.vue'),
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
		component: require('./view/room/list.vue'),
	}]
}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'goods', //图标样式class
	name: '商品管理',
	children: [{
		path: '/list',
		name: '商品列表',
		component: require('./view/goods/list.vue'),

	}, {
		path: '/add',
		name: '添加商品',
		component: require('./view/goods/add.vue'),

	}, {
		path: '/order',
		name: '订单管理',
		component: require('./view/goods/order.vue'),

	}]
}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'source', //图标样式class
	name: '素材管理',
	children: [{
		path: '/live',
		name: '直播暂存',
		component: require('./view/source/live.vue'),

	}, {
		path: '/picture',
		name: '图片素材',
		component: require('./view/source/picture.vue'),

	}, {
		path: '/video',
		name: '我的视频',
		component: require('./view/source/video.vue'),

	}, ]
}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'user',
	name: '我的账户',
	children: [{
		path: '/information',
		component: require('./view/usr/information.vue'),
		name: '个人信息'
	}, {
		path: '/taocan',
		component: require('./view/usr/taocan.vue'),
		name: '套餐选择'
	}, {
		path: '/vip',
		component: require('./view/usr/vip.vue'),
		name: '高级功能'
	}]
}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'money',
	name: '充值提现',
	children: [{
		path: '/pay',
		name: '余额充值',
		component: require('./view/money/pay.vue'),

	}, {
		path: '/extract',
		name: '余额提现',
		component: require('./view/money/extract.vue'),
	}]
}, {
	path: '/',
	component: require('./view/layout.vue'),
	iconCls: 'seting',
	name: '设置',
	children: [{
		path: '/changepwd',
		component: require('./view/seting/pwd.vue'),
		name: 'changepwd',
		name: '修改密码'
	}, {
		path: '/changetel',
		component: require('./view/seting/tel.vue'),
		name: 'changetel',
		name: '联系电话'
	}]
},
{
	path: '/dz',
	component: require('./view/layout.vue'),
	iconCls: 'dz', //图标样式class
	name: '定制服务',
	leaf:true,
	redirect: '/app',
	children: [{
		path: '/app',
		name: '更多合作',
		component: require('./view/dz/app.vue'),

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
}]

export default routes;