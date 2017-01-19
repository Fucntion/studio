<template>
	<div>
		<el-form ref="payform" :rules="rules" :model="extractData" label-width="100px">
		<el-form-item label="当前余额">
			￥3000.00 元
		</el-form-item>
		<el-form-item label="提现金额" prop="number">
			<el-input  placeholder="单次提现最少五百元起" style="width:300px;" v-model="extractData.number"></el-input>
		</el-form-item>
		<el-form-item label="提现方式">
			<img src="~assets/img/ali.png">
		</el-form-item>

		<el-form-item label="支付宝账号" prop="ali">
			<el-input placeholder="请正确填写支付宝账号" style="width:300px;" v-model="extractData.ali"></el-input>
		</el-form-item>
		<el-form-item label="支付宝昵称" prop="aliNick">
			<el-input placeholder="用于核对账号正确性" style="width:300px;" v-model="extractData.aliNick"></el-input>
		</el-form-item>
		<el-form-item label="">
			<el-button type="primary" @click="onSubmit">发起提现</el-button>

		</el-form-item>
	</el-form>

	<div class="payList" >
		<h3>提现列表</h3>
		<div class="hr"></div>
		<el-table v-if="extractInfoList.length>0" :data="extractInfoList" stripe height="450" border>
			<el-table-column prop="id" label="序号"></el-table-column>
			<el-table-column label="充值时间">
				<template  scope="scope">{{scope.row.updated_at*1000|timeStamp}}</template>
			</el-table-column>
			<el-table-column  label="充值方式">
				<template  scope="scope">
					<div v-if="scope.row.recharge_type==1">微信</div>
					<div v-else>支付宝</div>
				</template>
			</el-table-column>
			<el-table-column prop="money" label="充值金额"></el-table-column>
		</el-table>
	</div>

	</div>
</template>

<script>
	export default {
		data: function() {
			var validateNumber = (rule, val, callback) => {
				if(val==''){
					callback(new Error('不能为空'));
				}
		        if (isNaN(val)) {
		          callback(new Error('请输入数字'));
		        } 
		        if(parseInt(val)<=500){
		        	callback(new Error('请输入不低于五百的数字'));
		        }
		          callback();
		        
		      };
			return {
				extractData: {
					number: '',
					ali: '',
					aliNick: '',
					
				},
				extractInfoList:[],//提现列表
				rules: {
	          number: [
	            { validator: validateNumber}
	          ],
	          ali: [
	            { required: true, message: '请输入正确的支付宝账号', trigger: 'blur' }
	          ],
	          aliNick: [
	            { required: true, message: '请输入支付宝昵称', trigger: 'blur' }
	          ],
         
        		}

			}
		},
		methods: {
			onSubmit: function() {
				this.$alert('发起提现成功,请留意支付宝余额变动', '进度提示', {
					confirmButtonText: '知道了',
					callback: action => {

					}
				});
				this.$router.push('/information');
			},
			init:function(){
				this.$http.get('/deposits').then((response)=>{
					//分页的问题
					this.extractInfoList = response.body.data.list
				},(response)=>{
					
				})
			}
		},
		components: {

		}
	}
</script>

<style lang="less">
.payList{
		padding: 15px;
	}
</style>