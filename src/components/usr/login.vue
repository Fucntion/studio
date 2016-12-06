<template>
	<div id="login">
		<div class="form-group">
			<label for="email">注册邮箱</label><input v-model="account" type="text" id="email" placeholder="@qq.com">
		</div>
		<div class="form-group">
			<label for="pwd">密码</label><input v-model="pwd" type="password" id="pwd" placeholder="不得少于4位数字">
		</div>
		<div class="form-group">
			<button class="uk-button" @click="loginAction">登录</button>
		</div>

	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				account: '321312',
				pwd: '2312'
			}
		},
		methods: {
			loginAction: function() {

				if(this.account == '' || this.pwd == '') return;
				if(this.account == 'admin' || this.pwd == '123456') {
					localStorage.setItem('usrId', 'admin');
					location.href = '/#home';
				} else {
					console.log('账号密码不对');
				}

			}
		}
	}
</script>

<style>

</style>