const routers = [

    {
        path: '/home',
        component: require('./view/home.vue'),
        name: 'home',
        meta: {
            title: '首页',
            toggle:true 
        }
    },  {
        path: '/roomlist',
        component: require('./view/room/list.vue'),
        name: 'room',
        meta: {
            title: '直播间列表',
            toggle:false

        }
    },{
        path: '/goods',
        name: 'goods',
        meta: {
            title: '商品管理',
            toggle:false

        },
        redirect: 'goods/list',
        children: [{
            path: 'list',
            name: 'list',
            component: require('./view/goods/list.vue'),
            meta: {
                title: '商品列表',

            }
        }, {
            path: 'add',
            name: 'add',
            component: require('./view/goods/add.vue'),
            meta: {
                title: '添加商品',

            }
        }, {
            path: 'order',
            name: 'order',
            component: require('./view/goods/order.vue'),
            meta: {
                title: '订单管理',

            }
        }]
    }, {
        path: '/source',
        name: 'source',
        meta: {
            title: '素材管理',
            toggle:false

        },
        redirect: 'source/live',
        children: [{
            path: 'live',
            name: 'live',
            component: require('./view/source/live.vue'),
            meta: {
                title: '直播暂存',

            }

        }, {
            path: 'picture',
            name: 'picture',
            component: require('./view/source/picture.vue'),
            meta: {
                title: '图片素材',

            }

        }, {
            path: 'video',
            name: 'video',
            component: require('./view/source/video.vue'),
            meta: {
                title: '我的视频',

            }

        }, ]
    }, 
	{
		path: '/money',
		name: 'money',
		meta: {
			title: '充值提现',
            toggle:false

		},
		//默认跳转到充值页面，其他页面也是这样。有子菜单的点击一级导航栏，默认打开第一个子菜单
		redirect: '/money/pay',
		children: [{
			path: 'pay',
			name: 'pay',
			component: require('./view/money/pay.vue'),
			meta: {
				title: '充值',

			}
		}, {
			path: 'extract',
			name: 'extract',
			component: require('./view/money/extract.vue'),
			meta: {
				title: '提现',

			}
		}]

	}, {
		path: '/usr',
		name: 'usr',
		redirect: '/usr/information',
		meta: {
			title: '个人中心',
            toggle:false

		},
		children: [{
			path: 'information',
			component: require('./view/usr/information.vue'),
			name: 'information',
			meta: {
				title: '个人信息',

			},
		}, {
			path: 'taocan',
			component: require('./view/usr/taocan.vue'),
			name: 'taocan',
			meta: {
				title: '套餐选择',

			},
		}, {
			path: 'vip',
			component: require('./view/usr/vip.vue'),
			name: 'vip',
			meta: {
				title: '高级功能',

			},
		}]
	}, {
		path: '/error',
		component: require('./components/error.vue'),
		name: 'error',
		meta: {
			title: '出错了',
			hidden: true

		}
	}, {
		path: '/studio/:id',
		component: require('./view/room/studio.vue'),
		name: 'studio',
		meta: {
			title: '美化直播间',
            hidden:true

		}
	}, {
		path: '/login',
		component: require('./components/usr/login.vue'),
		name: 'login',
		meta: {
			title: '用户登录',
			hidden: true
		}
	}, {
		path: '/register',
		component: require('./components/usr/register.vue'),
		name: 'register',
		meta: {
			title: '用户注册',
			hidden: true
		}
	}, {
		path: '*',
		redirect: '/home',
		meta: {
			title: '其他情况也hack一下，不然路由的长度总是不对',
			hidden: true
		}
	}
];

export default routers;