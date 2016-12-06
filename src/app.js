import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import VueResource from 'vue-resource';

import App from './App.vue'

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
	el: '#studio',
	template: '<App/>',
	components: {
		App
	},
	router
})

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