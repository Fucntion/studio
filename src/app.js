import Vue from 'vue'
var _ = require('lodash')

import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
});


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
	NProgress.start()
	// if(typeof(editor)!='undefined'){
	// 	editor =undefined
	// }
	if(to.path == "/login" || to.path == "/register") {
		next();
	}else{

		if(typeof(localStorage.getItem('loginTime'))!='undefined'&&typeof(localStorage.getItem('accessToken'))!='undefined'&&typeof(localStorage.getItem('userName'))!='undefined'){
			var d = new Date(),
				newTime = d.getTime(),
				oldTime = parseInt(localStorage.getItem('loginTime'))
				
				//超过一小时炸了
				if(newTime-oldTime<1000*3600){
					console.log('token有效')
					next()
				}else{
					console.log('token过期')
					next({
						path: '/login',
						query: {
							redirect: to.fullPath
						}
					})
				}	
		}else{
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
		
	} 

})

router.afterEach((to, from, next) => {

	NProgress.done()
})

import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

Vue.http.interceptors.push((request, next) => {

	if(!localStorage.getItem('accessToken')) {
		location.hash = 'login';
	}
	var url = 'http://saas.icloudinn.com/api/v1';

	if(request.url == '/users' || request.url == '/users/register') {
		request.url = url + request.url;
	} else {
		//万洲的token有毒
		var token = '?access-token=' + localStorage.getItem('accessToken');
		//万洲的url也有毒
		if(request.url.indexOf('shop=') == 0) {
			//商城的有分页参数
			if(request.url.indexOf('--token--')!=-1){
				request.url = request.url.substr(5) + request.url.replace(/--token--/,token)
			}else{
				request.url = request.url.substr(5) + token + '&system_id=10'
			}
			
			
		} else if(request.url.indexOf('--token--')!=-1){
			//针对分页要get传参的hack
			request.url = url + request.url.replace(/--token--/,token);
			
		}else{
			request.url = url + request.url + token;
		}

	}

	next((response) => {
		return response
	});

});

import ElementUI from 'element-ui'
Vue.use(ElementUI)


import App from './App.vue'

import './filter.js'
import './directive.js'

const app = new Vue({
	router,
	el: '#studio',
	render: h => h(App)
})