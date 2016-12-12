import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    crumb: '面包屑',
    studio:null,
    dialog:{
        visible:false,
        title:'dialog',
        current:'pictureBox'
    },
    //定义测试数据
    pluginList:{
        base:[
            {
                name: '播放器', //名字
                plugin: 'player', //对应的mobile显示组件,用来组件增删的时候同步预览组建的显示/隐藏
                type: 'base', //类型 "基础"
                src: require('assets/img/player.png'), //图标样式class
                item: 1, //在对应列别里排序 习惯都是从1开始，如果后端要从0开始也不耽误事，反正我是排序的。
                require: true, //是否必选
                checked: true //是否选中  打算在组件中利用checked状态来判断是否显示对应组件。会不会存在require是true但是状态被改变的情况？在改变状态的函数里需要做过滤。if(!this.require)
            }, {
                name: '定制菜单', //名字
                plugin: 'nav',
                type: 'base', //类型 "基础"
                src: require('assets/img/menu.png'), //图标样式class
                item: 2, //在对应列别里排序
                require: true, //是否必选
                checked: true //是否选中  
            }
        ],
        interaction:[
            {
              name:'红包雨',//名字
              plugin:null,
              type:'interaction',//类型 "互动"这单词真难拼。。。
              src: require('assets/img/hongbao.png'), //图标样式class
              item:1, //在对应列别里排序
              require:false, //是否必选
              checked:false//是否选中  
            },
            {
              name:'大转盘',//名字
              plugin:null,
              type:'interaction',//类型 "互动"
              src: require('assets/img/zhuanpan.png'), //图标样式class
              item:3, //在对应列别里排序
              require:false, //是否必选
              checked:false//是否选中  
            },
            {
              name:'抽奖',//名字
              plugin:null,
              type:'interaction',//类型 "互动"
              src: require('assets/img/luckly.png'), //图标样式class
              item:2, //在对应列别里排序
              require:false, //是否必选
              checked:false//是否选中  
            }
        ],
        plus:[
            {
                name: '广告栏', //名字
                plugin: 'advert',
                type: 'plus', //类型 "基础"
                src: require('assets/img/advert.png'), //图标样式class
                item: 3, //在对应列别里排序
                require: false, //是否必选
                checked: false //是否选中  
            },
           
            {
              name:'调查问卷',//名字
              plugin:'question',
              type:'plus',//类型 "基础"
              src: require('assets/img/question.png'), //图标样式class
              item:1, //在对应列别里排序
              require:false, //是否必选
              checked:false//是否选中  
            },
            {
                name: '商品列表', //名字
                plugin: null,
                type: 'plus', //类型 "基础"
                src: require('assets/img/goods.png'), //图标样式class
                item: 2, //在对应列别里排序
                require: false, //是否必选
                checked: false //是否选中  
            }
        ]
    }
           
};

const getters = {
    getCrumb: function (state) {
        return state.crumb
    },
    getStudio: function (state) {
        return state.studio
    },
    getMenuData:function(state){
        return state.MenuData;
    },
    getDialog:function(state){
        return state.dialog;
    },
    getPluginList:function(state,type) {

        return state.pluginList;
    }
    
}

const mutations = {

    //专门针对function的数据分类，然后排序的函数,真是想不到这也需要写一个函数
    /*
     *
     *pargam @type string
     *pargam @obj object 需要整理的数据，可以是mock也可以是服务器给的
     *
     */
     
    openDialog:function(state,obj){
        if(!obj.components && !obj.title) {console.log('参数有误无法弹出dialog');return}
        state.dialog.visible = !state.dialog.visible;
        state.dialog.title =obj.title;
        state.dialog.current = obj.components;
    },
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