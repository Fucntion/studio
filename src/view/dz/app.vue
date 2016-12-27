<template>
	<el-form ref="form" :model="form" class="dz_form" label-width="120px">
		<el-form-item label="公司/个人名称">
			<el-input v-model="form.company"></el-input>
		</el-form-item>
		<el-form-item label="联系人">
			<el-input v-model="form.link"></el-input>
		</el-form-item>
		<el-form-item label="联系电话">
			<el-input v-model="form.tel"></el-input>
		</el-form-item>

		<el-form-item label="需求描述">
			<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">提交</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data() {
				return {
					form: {
						company: '',
						link: '',
						tel: '',
						desc: '例如1.我需要定制一款直播app;2.我需要活动直播的解决方案'
					}
				}
			},
			methods: {
				onSubmit() {
					this.$alert('您的需求已收到，我们会尽快联系您', '反馈', {
						confirmButtonText: '确定'

					});
				}
			}
	}
</script>
<style>
	.dz_form {
		width: 500px;
		;
	}
</style>