<template>
    <div>
        <el-menu default-active="/home"   @open="handleopen" @close="handleclose" @select="handleselect" class="el-menu-vertical-demo" unique-opened router>
        <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="item.children && item.title!='直播间列表'&& item.title!='首页'"  >
                <template slot="title"><i :class="item.iconCls"></i>{{item.title}}</template>
                <el-menu-item   v-for="child in item.children" :index="child.path">{{child.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else  :index="item.path">
                <i :class="item.iconCls"></i>
                {{item.title}}
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

        }
    }
</script>
<style lang="less">

</style>