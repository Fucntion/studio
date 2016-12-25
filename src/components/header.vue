<template>
     <el-row class="panel-top">
        <el-col :span="24" >
            <img src="~assets/img/logo.png" class="logo"> 
            <el-tooltip class="item tip-logout" @click="logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">

                <i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
            </el-tooltip>
            <h2 class="company">您好！海南云宿乡土网络科技有限公司</h2>
            <div class="tip">
                <div></div>
                <span>22</span>
            </div>
             
        </el-col>
        <!--<el-col :span="1">
           
        </el-col>-->
       
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

.tip-logout{
    cursor: pointer;
}
</style>