<template>
    <div>
        <el-menu :default-active="defaultActive"   @open="handleopen" @close="handleclose" @select="handleselect" class="el-menu-vertical-demo" unique-opened router>
        <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="item.children && item.name!='直播管理'&& item.name!='首页'"  >
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item   v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else  :index="item.path">
                <i :class="item.iconCls"></i>
                {{item.name}}
            </el-menu-item>

        </template>

    </el-menu>
    <a class="kefu" target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=1327244494&site=qq&menu=yes">
       <img src="~assets/img/kefu.png" />
   </a>
    </div>


</template>

<script>


	export default {

		data: function() {


			return {
                defaultActive:'/home'
			}

		},
		mounted() {

		},methods: {
            handleopen(){
                //console.log('handleopen');
            },
            handleclose(){
                //console.log('handleclose');
            },
            handleselect:function(a,b){
            }
        },
        components: {

        },
       watch: {
            '$route' (to, from) {//监听路由改变
                    
                this.defaultActive=to.path;
            }
        }
    }
</script>
<style lang="less">

</style>