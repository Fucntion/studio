import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routers'
import VueResource from 'vue-resource'



import App from './App.vue'

import Login from './components/usr/login.vue'


import ElementUI from './lib/index.js'



Vue.use(ElementUI)

const routes = [
{
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
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

Vue.http.interceptors.push((request, next)  =>{

 
        if(!sessionStorage.getItem('accessToken')){
            location.hash ='login';
        }
        var url = 'http://saas.icloudinn.com/api/v1';

          
        if(request.url =='/users' ||request.url =='/users/register'){
             request.url = url+request.url;
        }else{
        	 //万洲的token有毒
            var token='?access-token='+sessionStorage.getItem('accessToken');
			//万洲的url也有毒
        	if(request.url.indexOf('shop=')==0){      		
        		request.url = request.url.substr(5)+token+'&system_id=10';
        	}else{
        		request.url = url+request.url+token;
        	}
                     
        }

    
 
    next((response) => {
        return response
    });
   
});






Vue.use(VueRouter)
const router = new VueRouter({
    routes
});

//var AwesomeSwiper = require('vue-awesome-swiper')
//// global use
//Vue.use(AwesomeSwiper)

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#studio')

//向jq致敬,判断一个对象是否为空对象
// Vue.filter('isEmptyObject', function(e) {
//     var t;  
//     for (t in e)  
//        return !1;  
//     return !0  
// });






// router.replace('/login');
router.beforeEach((to, from, next) => {

// console.log(to.path,from.path);
// console.log(!sessionStorage.getItem('accessToken'));
    if(to.path =="/login" || to.path =="/register"){
        next();      
    }else{
        
        if (!sessionStorage.getItem('accessToken')) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }else{
            next();
        }

    }
    


  // ...
})
// http://saas.icloudinn.com/api/v1/rooms?access-token=oVhZgg4Skvks9dsCA3iKVbivqsONiUCVrxN6q4Ye
// http://saas.icloudinn.com/api/v1/rooms?access-token=6m3vB_FtMzXHeVDN0-fkSPk6GdwoIkMQdvhHG02q

