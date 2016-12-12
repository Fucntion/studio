<template>
  <div class="usr_box">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" class="loginBtn" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
      <router-link to="register"><el-button  style="width:100%;" >注册</el-button></router-link>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this=this;
        this.$refs.ruleForm2.validate((valid) => {
            if (valid) {

              // 请原谅我太懒
              var url="/users",
              data ={
                account:this.ruleForm2.account,
                pwd:this.ruleForm2.checkPass
              };
              // console.log(data);return;
              this.$http.post(url,data).then((response) => {
                // console.log(response.body.code);
                var result = JSON.parse(response.body);
                if(result.code==100){

            sessionStorage.setItem('accessToken', result.data.access_token)
            sessionStorage.setItem('userName', result.data.username)

                      this.$notify({
                      title: '成功',
                      message: '登陆成功',
                      type: 'success'
                    });

                    this.$router.push('home')
                }else{
                    this.$notify({
                    title: '登陆失败',
                    message: result.msg,
                    type: 'warning'
                  });
                }
            

          }, (response) => {
var result = JSON.parse(response.body);
            this.$notify({
                  title: '登陆失败',
                  message: result.msg,
                  type: 'warning'
                });

          });


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>

<style scoped>
.loginBtn{
  margin-bottom: 10px;
}
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