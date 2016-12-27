<template>
     <el-row class="panel-top">
        <el-col :span="24" >
            <img src="~assets/img/logo.png" class="logo"> 
            <el-tooltip class="item tip-logout" @click="logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">

                <i class="logout" aria-hidden="true" v-on:click="logout"></i>
            </el-tooltip>
            <h2 class="company">您好！海南云宿乡土网络科技有限公司</h2>
            <div class="tip">
                <div></div>
                <span>22</span>
            </div>
             
        </el-col>

       
    </el-row>   


</template>

<script>
	export default {
		// import { alert } from 'vue-strap'

		data: function() {
			return {}

		},
		methods:{

            //退出登录
            logout:function(){
                var _this=this;
                this.$confirm('确认退出吗?', '提示', {

                }).then(() => {
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('accessToken');
                    _this.$router.replace('/login');
                }).catch(() => {

                })

             
            }
		}
	}
</script>
<style lang="less">
.logout{
	display: inline-block;
	background: url('~assets/img/logout.png') no-repeat center;
	background-size: cover;
	margin-top: 20px;
	width: 20px;
	height: 20px;
}
.tip-logout{
    cursor: pointer;
}
</style>