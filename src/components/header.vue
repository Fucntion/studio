<template>
	<header>
     <el-row class="panel-top">
        <el-col :span="22" >
            <img src="~assets/img/logo.png" class="logo"> 
            <h2 class="company">您好！海南云宿乡土网络科技有限公司</h2>
            <div class="tip">
                <div></div>
                <span>22</span>
            </div>
        </el-col>
        <el-col :span="2">
            <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">

                <i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
            </el-tooltip>
        </el-col>
       

    </el-row>   
    </header>

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
                    _this.$router.replace('/login');
                }).catch(() => {

                })

             
            }
		}
	}
</script>
<style lang="less">


</style>