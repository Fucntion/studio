<template>
	<div class="goodsAdd">
		<el-form ref="form" class="form" :model="form" label-width="80px">
		<el-form-item required label="商品名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item required label="商品库存">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item required label="单价">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		
		<el-form-item required  label="商品介绍">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		}
	}
}
</script>

<style lang="less">
.goodsAdd{
	.form{
		width: 600px;
	}
}
</style>