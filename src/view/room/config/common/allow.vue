<template>

<div class="allow">
<div class="container"><h5>只有符合要求的用户才能进入直播间</h5>
<div class="limit">
<el-tooltip class="item" effect="dark" content="所有人均可看" placement="bottom">
	 	<el-radio v-model="radio" label="1">无限制</el-radio>
	</el-tooltip>

	<el-tooltip class="item" effect="dark" content="验证手机号可看" placement="bottom">
	 	<el-radio disabled v-model="radio" label="3">手机验证</el-radio>
	</el-tooltip>

	<el-tooltip class="item" effect="dark" content="支付费用可看" placement="bottom">
	 	<el-radio disabled v-model="radio" label="2">付费观看</el-radio>
	</el-tooltip>
	</div>
	
</div>

	
</div>

</template>

<script>
	export default {
		data: function() {

			return {
				radio: '1'
			}
		},
		methods: {

		},
		components: {

		}
	}
</script>

<style lang="less">

</style>