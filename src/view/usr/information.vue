<template>
	<div class="information">
		<p>用户名: 海南云宿乡土网络科技有限公司</p>
		<p>用户等级: <span>普通用户</span>&nbsp;
			<router-link to="/home">升级</router-link>
		</p>
		<p>总收益: ￥78787</p>
	</div>
</template>

<script>
	export default {
		data: function () {

			return {

			}
		},
		methods: {
			init: function () {
				this.$http.get('/users').then((response) => {

				}, (response) => {

				})
			}
		},
		components: {

		},
		mounted() {
			this.init()
		}
	}
</script>

<style lang="less">
.information{
p{
	margin: 5px 0 5px 10px;
	span{
	color: #20a0ff
}
}
}

</style>