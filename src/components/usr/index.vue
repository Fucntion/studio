<template>
	<div>
		<h2>用户中心</h2>

		<div v-if="isLogin">
			<router-link to="home">已经登录</router-link>
		</div>
		<div v-else>
			<router-link to="login">登录</router-link>
			<router-link to="register">注册</router-link>
			<router-view></router-view>
			<div/>

			<!-- <router-view name="login"></router-view> -->
			<!-- 路由出口 -->

		</div>
</template>

<script>
	export default {
		name: 'usr-index',
		data: function() {

			var loginStatus = false;
			if(!localStorage.getItem('usrId')) {
				location.href = '#/usr/login';
			} else {
				loginStatus = true;
			}

			return {
				isLogin: loginStatus
			}
		},
		methods: {

		}
	}
</script>
<style>

</style>