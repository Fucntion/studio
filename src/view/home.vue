<template>
    <div id="studio">
        <el-row class="panel-top">
            <el-col :span="24" style="font-size:26px;">
                <img src="~assets/img/logo.png" class="logo"> 
                <h2 class="company">您好！海南云宿乡土网络科技有限公司</h2>
                <div class="tip">
                    <div></div>
                    <span>22</span>
                </div>
            </el-col>
                <!-- <el-col :span="4">
                    <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">
                        <i class="logout" v-on:click="logout"></i>
                        <i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
                    </el-tooltip>
                </el-col>
            -->
        </el-row>
        <el-row class="panel-center" :gutter="20" >
            <el-col class="left" :span="4" >

                <el-menu default-active="/home"  @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>

                    <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">

                        <el-submenu :index="index+''" v-if="item.children && item.title!='直播间列表'"  >
                            <template slot="title"><i :class="item.iconCls"></i>{{item.title}}</template>
                            <el-menu-item   v-for="child in item.children" :index="child.path">{{child.title}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else  :index="item.path">
                            <i :class="item.iconCls"></i>
                            {{item.title}}
                        </el-menu-item>

                    </template>

                </el-menu>
            </el-col>
            <el-col class="panel-c-c" :span="20">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" style="margin-bottom:15px;">
                        <strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
                        <el-breadcrumb separator="/" style="float:right;">
                            <el-breadcrumb-item :to="{ path: '/table' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="container">
                        323232
                        <transition name="fade">

                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </el-col>


        </el-row>
    </div>
    

</template>

<script>
	//公共布局组件
	import Top from '../components/header.vue'
	import Left from '../components/left.vue'

	export default {
		data: function() {

			return {
                data2:this.$router.options.routes,
                currentPathName:'',
                currentPathNameParent:'',
            }
        },
        methods: {
           onSubmit() {
            console.log('submit!');
        },
        handleopen(){
                //console.log('handleopen');
            },
            handleclose(){
                //console.log('handleclose');
            },
            handleselect:function(a,b){
            },
            //退出登录
            logout:function(){
                var _this=this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    _this.$router.replace('/login');
                }).catch(() => {

                });

                
            }
        },
        components: {
         Top,
         Left,

     },
     watch: {
        '$route' (to, from) {//监听路由改变

            this.currentPathName=to.name;
            this.currentPathNameParent=to.matched[0].name;
        }
    },
    mounted() {

    }
}
</script>
<style lang="less">

    @bg-header :#ffffff;
// @bg-header :#3577bb;
@bg-content: white;
@font-color: #222222;
*{
    margin:0;
    padding:0;
}
.left{

}
.panel-top {
    height: 60px;
    line-height: 60px;
    background : @bg-header;
    margin-bottom: 20px;
    box-shadow: 0px 2px 2px #bbbbbb;
    .logo{
        padding: 8px 20px;
        max-height: 44px;
    }
    .tip {
        float: right;
        width: 40px;
        height: 60px;
        background: #34b4d4;
        line-height: 30px;
        div {
            height: 30px;
            width: 40px;
            margin: 0 0 5px;
            background: url('~assets/img/tip.png') no-repeat bottom center;
        }
        span {
            display: block;
            color: @bg-content;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            text-align: center;
        }
    }
    .company {
        float: right;
        font-size: 14px;
        color: @font-color;
        line-height: 60px;
        padding: 0px 25px 0px 20px;
        font-weight: 400;
    }
}
.container{
    background-color:#fff;
    box-sizing: border-box;
}
.panel-c-c {
    background: #f1f2f7;
}
</style>
<!--        <top></top>
        <left v-on:changeCrumb="changeCrumb"></left>
        <div id="main">
            <div class="crumb-box">
                <h3 class="crumb">{{crumb}}</h3>
                <div class="hr"></div>
            </div>

            <router-view></router-view> -->



    <!--    
    <div>
        <top></top>
        <left></left>
        <div id="main" class="main_home">

            <div class="hot"><i class="horn"></i><a href="#">新功能上线啦~</a><i class="close"><i></div>

            <div class="descript">
                <div class="crumb-box"><h3 class="crumb">信息概览</h3><div class="hr"></div>
                </div>
                <div class="info-box">
                    <div class="info">
                        <h1 class="number">66</h1>
                        <div class="title"><img src="~assets/img/total.png">直播场数</div>
                    </div>
                    <div class="info">
                        <h1 class="number">666</h1>
                        <div class="title"><img src="~assets/img/number.png">观看人数</div>
                    </div>
                    <div class="info">
                        <h1 class="number">￥66666.0</h1>
                        <div class="title"><img src="~assets/img/money.png">直播收益</div>
                    </div>
                </div>
            </div>

            <div class="new">
                <div class="list list_l">
                    <div class="crumb-box"><h3 class="crumb">直播间列表</h3><div class="hr"></div></div>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                </div>
                <div class="list list_r">
                    <div class="crumb-box"><h3 class="crumb">直播百科</h3><div class="hr"></div></div>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                   
                </div>
            </div>

        </div>

    </div> -->