import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routers'
import VueResource from 'vue-resource'


import App from './App.vue'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI)

const routes = [{
    path: '/login',
    component: require('./components/usr/login.vue'),
    name: '用户登录',
    title: '用户登录',
    hidden: true
}, {
    path: '/register',
    component: require('./components/usr/register.vue'),
    name: '用户注册',
    title: '用户注册',
    hidden: true

},{
    path: '/error',
    component: require('./components/error.vue'),
    name: '出错了',
    title: '出错了',
    hidden: true

},{
    path: '/studio/:id',
    component: require('./view/room/studio.vue'),
    name: '美化直播间',
    hidden: true

},
    {
    path: '/home',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    name:'首页',
    redirect: '/main',
    leaf: true, //只有一个节点
    children: [{
        path: '/main',
        component: require('./view/main.vue'),
        name: '',
    }]
}
,
    {
    path: '/room',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    name:'直播管理',
    redirect: '/roomlist',
    leaf: true, //只有一个节点
    children: [{
        path: '/roomlist',
        component: require('./view/room/list.vue'),
        name: '直播间列表',
    }]
}
, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    name:'商品管理',
    children: [{
        path: '/list',
        name: 'list',
        component: require('./view/goods/list.vue'),
        name:'商品列表'
    }, {
        path: 'add',
        name: 'add',
        component: require('./view/goods/add.vue'),
        name:'添加商品'
    }, {
        path: '/order',
        name: 'order',
        component: require('./view/goods/order.vue'),
        name:'订单管理'
    }]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'el-icon-message', //图标样式class
    name:'素材管理',
    children: [{
        path: '/live',
        name: 'live',
        component: require('./view/source/live.vue'),
        name:'直播暂存'

    }, {
        path: '/picture',
        name: 'picture',
        component: require('./view/source/picture.vue'),
        name:'图片素材'


    }, {
        path: '/video',
        name: 'video',
        component: require('./view/source/video.vue'),
        name:'我的视频'

    }, ]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'fa fa-id-card-o',
    name:'充值提现',
    children: [{
        path: '/pay',
        name: 'pay',
        component: require('./view/money/pay.vue'),
        name:'充值'
    }, {
        path: '/extract',
        name: 'extract',
        component: require('./view/money/extract.vue'),
    }]
}, {
    path: '/',
    component: require('./view/home.vue'),
    iconCls: 'fa fa-line-chart',
    name:'个人中心',
    children: [{
        path: '/information',
        component: require('./view/usr/information.vue'),
        name: 'information',
        name:'个人信息'
    }, {
        path: '/taocan',
        component: require('./view/usr/taocan.vue'),
        name: 'taocan',
        name:'套餐选择'
    }, {
        path: '/vip',
        component: require('./view/usr/vip.vue'),
        name: 'vip',
        name:'高级功能'
    }]
}, 
{
    path: '*',
    redirect: '/main',
    name:'其他',
    hidden: true

},
]


Vue.use(VueResource);

// Example(Only applies to the current global mode). 用配置项的话仅支持全局模式来配置，否则不会生效
import VideoPlayer from 'vue-video-player'

Vue.use(VideoPlayer)
VideoPlayer.config({
    youtube: false, // default false
    switcher: false, // default true
    hls: true // default true
})

Vue.use(VueRouter)
const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    // ...
    document.title = to.meta.title;
    next();
})

const app = new Vue({
    router,
    render: h => h(App),
}).$mount('#studio')

// router.replace('/main')
// router.replace('/login')
// router.beforeEach(function (transition) {
//   console.log(transition);
//   document.title = transition.meta.title;
//   transition.next();
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//   //   // this route requires auth, check if logged in
//   //   // if not, redirect to login page.
//   //   if (!auth.loggedIn()) {
//   //     next({
//   //       path: '/login',
//   //       query: { redirect: to.fullPath }
//   //     })
//   //   } else {
//   //     next()
//   //   }
//   // } else {
//   //   next() // 确保一定要调用 next()
//   // }
// })
