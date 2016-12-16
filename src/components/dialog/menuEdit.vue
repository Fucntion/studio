<template>
<el-tabs v-if="studio.pluginObj" type="card" @tab-click="handleClick" @tab-remove="handleRemove">
	<template v-if="studio.pluginObj">
		<el-tab-pane v-for="(item, key, index)  in studio.pluginObj" label="item.title">
    	
    	</el-tab-pane>
	</template>
	<template v-else>
		<el-tab-pane  label="创建菜单">
    	创建新菜单
    	</el-tab-pane>
	</template>
    
    
  </el-tabs>
</template>

<script> 
import store from '../../vuex/store';
export default {
    data: function() {
  
         return {
         	studio:null,

       }
    },
    store,
    methods: {
    	 handleRemove(tab) {
//      console.log(tab);
      },
      handleClick(tab, event) {
//      console.log(tab, event);
      },
      init(){
      	var self =this;
      	console.log(self.studio);
      	self.studio =store.getters.getStudio;
      	console.log(self.studio);
      }
    },
    components:{


    },
    mounted(){
    	this.init();
    }
}

</script>

<style lang="less">

</style>