import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import { Notification } from 'element-ui';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
    studio: {},
    showaddress1:'',
    showaddress2:'',
    value_object:{
        yugao_value:'',
        video_value:'',
        repeat_value:''
    },
    liveSetting_data:{
        intro:'',
        radio:'',
        ruleForm: {
			money: '',
		},
        ruleForm2: {
			password: ''
		},
    },
    liveSetting_show:{
        show1:'',
        show2:''
    },
    show_name:'',
    //用来临时储存需要修改商品的信息
    tempGoods: {},
    dialog: {
        visible: false,
        title: 'dialog',
        current: 'pictureBox',
        callback: null, //函数类型,在调用的时候就要传入回调函数,唯一参数是选中图片地址,格式如下function(url){}
    },
    picture: {
        visible: false,
        title: '图片框',
        callback: null, //函数类型,在调用的时候就要传入回调函数,唯一参数是选中图片地址,格式如下function(url){}
    },
    //定义测试数据
    pluginList: {
        player: {
            name: '播放器', //名字
            title: 'player',
            type: 'base',
            plugin: 'player', //对应的mobile显示组件,用来组件增删的时候同步预览组建的显示/隐藏
            src: require('assets/img/studio/player.png'), //图标样式class
            srcActive: require('assets/img/studio/player_active.png'), //图标样式class
            srcHover: require('assets/img/studio/player_hover.png'), //图标样式class
            require: true, //是否必选
            usable: true,
            checked: true //是否选中  打算在组件中利用checked状态来判断是否显示对应组件。会不会存在require是true但是状态被改变的情况？在改变状态的函数里需要做过滤。if(!this.require)
        },
        menu: {
            name: '定制菜单', //名字
            title: 'menu',
            plugin: 'menu',
            type: 'interaction',
            src: require('assets/img/studio/menu.png'), //图标样式class
            srcActive: require('assets/img/studio/menu_active.png'), //图标样式class
            srcHover: require('assets/img/studio/menu_hover.png'), //图标样式class
            require: true, //是否必选
            usable: true,
            checked: true //是否选中
        },
        hongbao: {
            name: '红包雨', //名字
            title: 'hongbao',
            plugin: null,
            type: 'interaction',
            src: require('assets/img/studio/hongbao.png'), //图标样式class
            srcActive: require('assets/img/studio/hongbao_active.png'), //图标样式class
            srcHover: require('assets/img/studio/hongbao_hover.png'), //图标样式class
            require: false, //是否必选
            usable: false,
            checked: false //是否选中
        },
        zhuanpan: {
            name: '大转盘', //名字
            title: 'zhuanpan',
            plugin: null,
            type: 'interaction',
            src: require('assets/img/studio/zhuanpan.png'), //图标样式class
            srcActive: require('assets/img/studio/zhuanpan_active.png'), //图标样式class
            srcHover: require('assets/img/studio/zhuanpan_hover.png'), //图标样式class
            require: false, //是否必选
            usable: false,
            checked: false //是否选中
        },
        luckly: {
            name: '抽奖', //名字
            title: 'luckly',
            plugin: null,
            type: 'interaction',
            src: require('assets/img/studio/luckly.png'), //图标样式class
            srcActive: require('assets/img/studio/luckly_active.png'), //图标样式class
            srcHover: require('assets/img/studio/luckly_hover.png'), //图标样式class
            require: false, //是否必选
            usable: false,
            checked: false //是否选中
        },
        advert: {
            name: '广告栏', //名字
            title: 'advert',
            type: 'plus',
            plugin: 'advert',
            src: require('assets/img/studio/advert.png'), //图标样式class
            srcActive: require('assets/img/studio/advert_active.png'), //图标样式class
            srcHover: require('assets/img/studio/advert_hover.png'), //图标样式class
            require: false, //是否必选
            usable: true,
            checked: false //是否选中
        },
        question: {
            name: '调查问卷', //名字
            title: 'question',
            plugin: 'question',
            type: 'plus',
            src: require('assets/img/studio/question.png'), //图标样式class
            srcActive: require('assets/img/studio/question_active.png'), //图标样式class
            srcHover: require('assets/img/studio/question_hover.png'), //图标样式class
            require: false, //是否必选
            usable: false,
            checked: false //是否选中
        }

    },
    // 观看总人数
    // watch_num:'',
    // 观看总人数的列表
    // watch_list:[],
    // UV
    // audience_num:'',
    // PV
    // watch_times:'',
    // 直播时长
    // live_duration:'',
    // 单次观看时长
    // watch_duration:'',
    // 总的观看时长
    // watch_Tduration:''
};

const getters = {
    getCrumb: function(state) {
        return state.crumb
    },
    getAddress1:function(state){
        return state.showaddress1
    },
    getAddress2:function(state){
      return state.showaddress2
    },
    getStudio: function(state) {
        return state.studio
    },
    getMenuData: function(state) {
        return state.MenuData;
    },
    getValueObject:function(state){
        return state.value_object
    },
    getDialog: function(state) {
        return state.dialog;
    },
    getPicture: function(state) {
        return state.picture;
    },
    getLiveSettingData:function(state){
    	return state.liveSetting_data
    },
    getShowName:function(state){
        return state.show_name
    },
    getLiveSettingShow:function(state){
    	return state.liveSetting_show
    },
    getPluginList: function(state, type) {

        return state.pluginList;
    },
    // getWatchNum:function(state){
    //     return state.watch_num;
    // },
    // getWatchList:function(state){
    //     return state.watch_list
    // },
    // getAudienceNum:function(state){
    //     return state.audience_num
    // },
    // getWatchTimes:function(state){
    //     return state.watch_times
    // },
    // getLiveDuration:function(state){
    //     return state.live_duration
    // },
    // getWatchDuration:function(state){
    //     return state.watch_duration
    // },
    // getWatchTduration:function(state){
    //     return state.watch_Tduration
    // }
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

const mutations = {

    initPluginList: function(state) {
        for (var k in state.pluginList) {
            //初始化的时候不是必选的组件，就恢复初始状态
            if (!state.pluginList[k].require && state.pluginList[k].checked) {
                state.pluginList[k].checked = false;
            }
        }
    },
    //重置pluginList的状态，防止不同直播间信息不一样
    //	initPluginList:function(state){
    //
    //		for(var k in state.pluginList){
    //			if(state.pluginList[k].require ==true){
    //				state.pluginList[k].checked =true;
    //			}else{
    //				state.pluginList[k].checked =false;
    //			}
    //		}
    //
    //	},
    //	setPluginCheck:function(state,title){
    //		for(var k in state.pluginList){
    //			if(state.pluginList[k].title ==name){
    //				state.pluginList[k].checked =!state.pluginList[k].checked;
    //			}
    //		}
    //	},
    //对比服务器给的数据初始化pluginList各组件的选中状态
    openModal: function(state, obj) {
        if (!obj.components && !obj.title) {
            console.log('参数有误无法弹出dialog');
            return
        }
        state.dialog.title = obj.title;
        state.dialog.current = obj.components;
        state.dialog.callback = obj.callback;
        state.dialog.visible = true;
    },
    closeModal: function(state) {
        state.dialog.visible = false;
    },
    // 设置直播间封面和logo点击后的操作
    openPicture: function(state, obj) {
        if (!obj.components && !obj.title) {
            console.log('参数有误无法弹出dialog');
            return
        }
        state.picture.title = obj.title;
        state.picture.callback = obj.callback;
        state.picture.visible = true;
    },
    closePicture: function(state) {
        var url = '/rooms/' + state.studio.id;
        console.log(state.studio.cover_img_url)
        Vue.http.put(url, state.studio).then((response) => {
            console.log(response.data);

            console.log('更新配置成功');
        }, (response) => {
            console.log(response.data);
            console.log('更新配置失败');

        });

        state.picture.visible = false;
    },
    changeCrumb: function(state, crumbText) {
        // 变更状态
        state.crumb = crumbText;
        //   console.log(state);
    },
    //用于创建直播间的时候给studio赋值。
    setStudio: function(state, obj) {
        state.studio = obj;
    },
    setAddress1:function(state,obj){
      state.showaddress1=obj
    },
    setAddress2:function(state,obj){
      state.showaddress2=obj
    },
    setValueObject:function(state,obj){
        state.value_object=obj
    },
    setLiveSettingData:function(state,obj){
    	state.liveSetting_data=obj
    },
    setStudioCoverImg:function(state,obj){
        state.studio.cover_img_url=obj
    },
    setStudioLogoUrl:function(state,obj){
    	state.studio.logo_url=obj
    },
    setLiveSettingShow:function(state,obj){
    	state.liveSetting_show=obj
    },
    setShowName:function(state,obj){
        state.show_name=obj
    },
    changeStudio: function(state, data) {

        var obj = data.studio,
            id = data.id;


        // 用新的对象来替换原有的studio信息对象,如果不是对象就炸
        if (Object.prototype.toString.call(obj) != '[object Object]') {
            console.log('要替换的值不是对象');
            return;
        }

        obj.pluginObj.advert = _.sortBy(obj.pluginObj.advert, function(item) {
            return -item.index;
        });
        //先改变本地的值再向服务器同步
        state.studio = obj;

        var ajaxObj = _.assign({}, obj);
        ajaxObj.plugin = JSON.stringify(ajaxObj.pluginObj);
        delete ajaxObj.pluginObj; //这里把对象清空了因为不必要传到服务器上，在初始化的时候记得加上pluginObj的初始化
        var url = '/rooms/' + id;
        //		console.log(ajaxObj);return;
        Vue.http.put(url, ajaxObj).then((response) => {
            console.log(response.data);
            // state.studio =response.body;
            console.log('更新配置成功');
            Notification({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                });

        }, (response) => {
            // error callback
            // console.log(response);

            Notification({
                  title: '提示',
                  message: '操作失败',
                  type: 'warning'
                });
                console.log('更新配置失败');
        });

    },
    // setWatchNum:function(state,obj){
    //     state.watch_num=obj
    // },
    // setWatchList:function(state,obj){
    //     state.watch_list=obj
    // },
    // setAudienceNum:function(state,obj){
    //     state.audience_num=obj
    // },
    // setWatchTimes:function(state,obj){
    //     state.watch_times=obj
    // },
    // setLiveDuration:function(state,obj){
    //     state.live_duration=obj
    // },
    // setWatchDuration:function(state,obj){
    //     state.watch_duration=obj
    // },
    // setWatchTduration:function(state,obj){
    //     state.watch_Tduration=obj
    // }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
});
