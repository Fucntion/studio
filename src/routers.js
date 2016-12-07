const routers = [{

    path: '/login',
    component: require('./components/usr/login.vue'),
    name: 'login',
    title: '用户登录',
    hidden: true

}, {
    path: '/register',
    component: require('./components/usr/register.vue'),
    name: 'register',
    title: '用户注册',
    hidden: true

}, {
    path: '/home',
    component: require('./view/home.vue'),
    name: 'home',
    title: '首页',
    leaf: true, //只有一个节点

}, {
    path: '*',
    redirect: '/home',
    title: '其他情况也hack一下，不然路由的长度总是不对',
    hidden: true

}, {
    path: '/error',
    component: require('./components/error.vue'),
    name: 'error',
    title: '出错了',
    hidden: true

}, {
    path: '/studio/:id',
    component: require('./view/room/studio.vue'),
    name: 'studio',
    title: '美化直播间',
    hidden: true

}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    title: '直播间列表',
    redirect: '/roomlist',
    toggle: false,
    leaf: true, //只有一个节点
    children: [{
        path: '/roomlist',
        component: require('./view/room/list.vue'),
        name: 'room',
        title: '直播间列表2',

    }]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    title: '商品管理',
    children: [{
        path: '/list',
        name: 'list',
        component: require('./view/goods/list.vue'),
        title: '商品列表',
    }, {
        path: 'add',
        name: 'add',
        component: require('./view/goods/add.vue'),
        title: '添加商品',
    }, {
        path: '/order',
        name: 'order',
        component: require('./view/goods/order.vue'),
        title: '订单管理',
    }]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    title: '素材管理',
    children: [{
        path: '/live',
        name: 'live',
        component: require('./view/source/live.vue'),
        title: '直播暂存',

    }, {
        path: '/picture',
        name: 'picture',
        component: require('./view/source/picture.vue'),
        title: '图片素材',


    }, {
        path: '/video',
        name: 'video',
        component: require('./view/source/video.vue'),
        title: '我的视频',

    }, ]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'fa fa-id-card-o',
    title: '充值提现',
    children: [{
        path: '/pay',
        name: 'pay',
        component: require('./view/money/pay.vue'),
        title: '充值',
    }, {
        path: '/extract',
        name: 'extract',
        component: require('./view/money/extract.vue'),
        title: '提现',
    }]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'fa fa-line-chart',
    title: '个人中心',
    children: [{
        path: '/information',
        component: require('./view/usr/information.vue'),
        name: 'information',
        title: '个人信息',
    }, {
        path: '/taocan',
        component: require('./view/usr/taocan.vue'),
        name: 'taocan',
        title: '套餐选择',
    }, {
        path: '/vip',
        component: require('./view/usr/vip.vue'),
        name: 'vip',
        title: '高级功能',
    }]
}]




export default routers;
