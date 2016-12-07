import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    crumb: '面包屑',
    studio:{},
    // menuData:[1,2,3]
};

const getters = {
    getCrumb: function (state) {
        return state.crumb
    },
    getStudio: function (state) {
        return state.studio
    },getMenuData:function(state){
        return state.MenuData;
    }
    
}

const mutations = {
    changeCrumb:function(state, crumbText) {
        // 变更状态
        state.crumb = crumbText;
        //   console.log(state);
    },
    changeStudio:function(state, obj) {

        // 用新的对象来替换原有的studio信息对象,如果不是对象就炸
        if(Object.prototype.toString.call(obj) != '[object Object]'){
            console.log('要替换的值不是对象');
            return;
        }
        state.studio = obj;
    },
    // clearMenuData:function(state,obj){
        
    //         //对路由里面的数据进行整理，然后作为导航栏的数据
    //         var tempArr =[];
    //         for(var k in obj){
    //             //目前只做到一级菜单来区分是否显示
    //             if(!obj[k].meta.hasOwnProperty("hidden")){
    //                 tempArr.push(obj[k]);
    //             }
    //         } 
    //         console.log(tempArr);
    //         state.menuData = tempArr;
    //         return state.menuData;

    // }
}


export default new Vuex.Store({
    state,getters,mutations
});