<template>
    <div class="left">
        <el-menu class="nav"  @open="handleopen" @close="handleclose" @select="handleselect"  unique-opened router>
	        <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
	            <el-submenu :index="index+''" v-if="item.children && !item.leaf"  >
	                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
	                <el-menu-item   v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
	            </el-submenu>
	            <el-menu-item class="leaf" v-else  :index="item.path">
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
            handleselect:function(index,path){
         	  // console.log(index,path)       
            }
        },
        components: {

        },
       watch: {
            '$route' (to, from) {//监听路由改变
                    
                // this.defaultLink=to.path;
            }
        }
    }
</script>
<style lang="less">

</style>