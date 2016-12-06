<template>
    <div id="studio">
        <transition name="bounce">
           <router-view></router-view>  
       </transition>
   </div>
</template>

<script>


//公共布局组件
import Top from './components/header.vue'
import Left from './components/left.vue'

import store from './vuex/store'//学了vuex才把这个面包屑搞定


export default {
    name: 'app',
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

/*@import './assets/css/app.less';*/
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
</style>