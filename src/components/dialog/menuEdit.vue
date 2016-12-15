<template>
<el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  </el-tabs>
</template>

<script> 

export default {
    data: function() {
  
         return {

       }
    },
    methods: {
    	 handleRemove(tab) {
//      console.log(tab);
      },
      handleClick(tab, event) {
//      console.log(tab, event);
      }
    },
    components:{


    }
}

</script>

<style lang="less">

</style>