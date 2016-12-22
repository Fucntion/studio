import Vue from 'vue'
var _ = require('lodash')

import VueRouter from 'vue-router'
import routes from './routes' 
Vue.use(VueRouter)
const router = new VueRouter({
    routes
});


router.beforeEach((to, from, next) => {

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
})


import VueResource from 'vue-resource'

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


import ElementUI from './lib/index.js'
Vue.use(ElementUI)


import App from './App.vue'

import './filter.js'
import './directive.js'

const app = new Vue({
    router,
    el:'#studio',
    render: h => h(App)
})

