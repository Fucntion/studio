<template>
	<div id="register">
		<form>
			<div class="form-group"><label for="email">注册邮箱</label><input type="text" id="email" placeholder="@qq.com"></div>
			<div class="form-group"><label for="pwd">密码</label><input type="password" id="pwd" placeholder="不得少于4位数字"></div>
			<div class="form-group"><label for="company">公司名称</label><input type="text" id="company" placeholder="请填写公司全称"></div>
			<div class="form-group"><label for="name">联系人</label><input type="text" id="name" placeholder="您的称呼"></div>
			<div class="form-group"><label for="tel">联系电话</label><input type="text" id="tel" placeholder="请填写手机或者座机号码"></div>
			<div class="form-group"><button class="uk-button">注册</button></div>
		</form>

	</div>
</template>

<script>
	export default {
		name: 'register',
		data: function() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>