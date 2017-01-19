<template>

	<div class="usr_box">

		<el-form :model="ruleForm" ref="ruleForm" :rules="rules"  label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
			<h3 class="title">商户注册</h3>
			<el-form-item prop="account">
				<el-input type="email" v-model="ruleForm.account" auto-complete="off" placeholder="邮箱"></el-input>
			</el-form-item>

			<el-form-item prop="Pass">
				<el-input type="password" v-model="ruleForm.Pass" auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
			</el-form-item>
			<el-form-item prop="usr">
				<el-input type="text" v-model="ruleForm.usr" auto-complete="off" placeholder="联系人"></el-input>
			</el-form-item>
			<el-form-item prop="tel">
				<el-input type="text" v-model="ruleForm.tel" auto-complete="off" placeholder="手机号码"></el-input>
			</el-form-item>
			<el-form-item prop="company">
				<el-input type="text" v-model="ruleForm.company" auto-complete="off" placeholder="公司名称"></el-input>
			</el-form-item>

			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;"  @click.native.prevent="handleSubmit">登录</el-button>
				<el-button style="width:100%;margin-left:0;margin-top:10px;" @click.native.prevent="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {

		name:'registrer',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					// console.log(this);
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatecheckPass = (rule, value, callback) => {
				if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.Pass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
			};
			var validateAccount = (rule, value, callback) => {
				var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (value === '') {
		          callback(new Error('请输入邮箱'));
		        } else if (!reg.test(value)) {
		          callback(new Error('请输入正确格式的邮箱'));
		        } else {
		          callback();
		        }
			};
			var validateTel = (rule, value, callback) => {

				var reg= /^[1][358]\d{9}$/; 

				if (value === '') {
		          callback(new Error('请输入手机号码'));
		        } else if (!reg.test(value)) {
		          callback(new Error('请输入正确格式的手机号码'));
		        } else {
		          callback();
		        }
			};
			var validateUsr = (rule, value, callback) => {
				if (value === '') {
		          callback(new Error('请输入联系人'));
		        } else {
		          callback();
		        }
			};
			var validateCompany = (rule, value, callback) => {
				if (value === '') {
		          callback(new Error('请输入公司或组织名称'));
		        } else {
		          callback();
		        }
			};
			return {
				ruleForm: {
					account: '',
					checkPass: '',
					tel:'',
					Pass:'',
					company:'',
					usr:''
				},
				rules: {
					account: [
					{ validator: validateAccount,required: true,trigger: 'blur' },
		           
		            ],
		            tel: [
		            { validator: validateTel,required: true,trigger: 'blur' },
		           
		            ],
		            usr: [
		            { validator: validateUsr,required: true,trigger: 'blur' },
		           
		            ],
		            company: [
		            { validator: validateCompany,required: true, trigger: 'blur' },
		           
		            ],
		            Pass: [
		            { validator: validatePass,required: true,trigger: 'blur' },
		           
		            ],
		            checkPass: [
		            { validator: validatecheckPass,required: true,trigger: 'blur' },
		            
		            ]
        		},
        checked: true
    };
},
methods: {
	handleReset() {
		this.$refs.ruleForm.resetFields();
	},
	handleSubmit(ev) {
		var _this=this;
		this.$refs.ruleForm.validate((valid) => {
			if (valid) {

				var url = "/users/register",
				data ={
					account:this.ruleForm.account,
					pwd:this.ruleForm.Pass,
					company:this.ruleForm.company,
					contacts:this.ruleForm.usr,
					contacts_phone:this.ruleForm.tel
				};
				this.$http.post(url,data).then((response) => {

					var result = response.body;
                if(result.code==100){
										this.$notify({
										title: '成功',
										message: '注册成功',
										type: 'success'
									});
									this.$router.push('login')
                }else{
										this.$notify({
										title: '注册失败',
										message: result.msg,
										type: 'warning'
									});
                }

					

				}, (response) => {
					var result = JSON.parse(response.body);
	
					this.$notify({
			          title: '注册失败',
			          message: result.msg,
			          type: 'warning'
			        });

					// error callback
					// console.log(response);
				});
            // _this.$router.replace('/home');

        } else {
        	this.$notify({
	          title: '警告',
	          message: '信息错误,请重新输入',
	          type: 'warning'
	        });
            // this.$refs.ruleForm.resetFields();
            return false;
        }
    });
	},

}
}
</script>

<style scoped>
	.usr_box{
		position: absolute;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.card-box {

		padding: 20px;
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin-bottom: 20px;
		background-color: #F9FAFC;
		margin: 120px auto;
		width: 400px;
		border: 2px solid #8492A6;
	}

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}

	.loginform {
		width: 350px;
		padding: 35px 35px 15px 35px;
	}
</style>
