<template>


    <el-col :span="24" class="panel-center">

            <aside style="width:210px;">
                     

                <el-menu default-active="/home"  @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.meta.hidden">
                        <!-- 一级菜单 -->
                        <el-submenu :index="index+''" v-if="item.children"  >
                            <template slot="title"><i :class="22"></i>{{item.meta.title}}</template>
                            <el-menu-item   v-for="child in item.children" :index="child.path">{{child.meta.title}}</el-menu-item>
                        </el-submenu>
                        <!-- 二级菜单 -->
                        <el-menu-item v-else  :index="item.path">
                            <i :class="item.iconCls"></i>
                            {{item.meta.title}}
                        </el-menu-item>
                    </template>


                </el-menu>
            </aside>
            <section class="panel-c-c">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" style="margin-bottom:15px;">
                        <strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
                        <el-breadcrumb separator="/" style="float:right;">
                            <el-breadcrumb-item :to="{ path: '/table' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
            <!--</el-col>-->
        </el-col>
<!-- 		<top></top>
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
</template>

<script>
	//公共布局组件
	import Top from '../components/header.vue'
	import Left from '../components/left.vue'

	export default {
		data: function() {

			return {

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
		mounted() {

		}
	}
</script>
<style lang="less">
	#main.main_home {
		background: #f2f2f2;
		.crumb-box {
			padding: 0;
		}
	}
</style>