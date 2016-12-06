<template>
 <router-view></router-view>
   
</template>

<script>
//公共布局组件
import Top from './components/header.vue'
import Left from './components/left.vue'

import store from './vuex/store'//学了vuex才把这个面包屑搞定


export default {
    store,
    data: function(){

         return {
          zujian:'Top'
       }
    },
    computed: {

    // crumb () {
    //   return store.getters.getCrumb
    // }
  },
    methods: {
        // changeCrumb:function(title){
        //     console.log(title);
        //     this.crumb = title;
        // }
    },
    components:{
        Top,Left
    }
}

</script>
<style lang="less">
@import './assets/css/app.less';

</style>