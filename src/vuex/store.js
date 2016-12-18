import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'

 
Vue.use(Vuex);

Vue.use(VueResource);

const state = {
	crumb: '面包屑',
	studio: {},
	dialog: {
		visible: false,
		title: 'dialog',
		current: 'pictureBox',
		type: null //logo、cover、goods定义回调事件
	},
	//定义测试数据
	pluginList: {
		base: [{
			name: '播放器', //名字
			plugin: 'player', //对应的mobile显示组件,用来组件增删的时候同步预览组建的显示/隐藏
			src: require('assets/img/player.png'), //图标样式class
			require: true, //是否必选
			usable:true,
			checked: true //是否选中  打算在组件中利用checked状态来判断是否显示对应组件。会不会存在require是true但是状态被改变的情况？在改变状态的函数里需要做过滤。if(!this.require)
		}],
		interaction: [{
			name: '红包雨', //名字
			plugin: null,
			src: require('assets/img/hongbao.png'), //图标样式class
			require: false, //是否必选
			usable:false,
			checked: false //是否选中  
		}, {
			name: '定制菜单', //名字
			plugin: 'nav',
			src: require('assets/img/menu.png'), //图标样式class
			require: true, //是否必选
			usable:true,
			checked: true //是否选中  
		}, {
			name: '大转盘', //名字
			plugin: null,
			src: require('assets/img/zhuanpan.png'), //图标样式class
			require: false, //是否必选
			usable:false,
			checked: false //是否选中  
		}, {
			name: '抽奖', //名字
			plugin: null,
			src: require('assets/img/luckly.png'), //图标样式class
			require: false, //是否必选
			usable:false,
			checked: false //是否选中  
		}],
		plus: [{
				name: '广告栏', //名字
				plugin: 'advert',
				src: require('assets/img/advert.png'), //图标样式class
				require: false, //是否必选
				usable:true,
				checked: false //是否选中  
			},

			{
				name: '调查问卷', //名字
				plugin: 'question',
				src: require('assets/img/question.png'), //图标样式class
				require: false, //是否必选
				usable:false,
				checked: false //是否选中  
			}, {
				name: '商品列表', //名字
				plugin: null,
				src: require('assets/img/goods.png'), //图标样式class
				require: false, //是否必选
				usable:false,
				checked: false //是否选中  
			}
		]
	}

};

const getters = {
	getCrumb: function(state) {
		return state.crumb
	},
	getStudio: function(state) {
		return state.studio
	},
	getMenuData: function(state) {
		return state.MenuData;
	},
	getDialog: function(state) {
		return state.dialog;
	},
	getPluginList: function(state, type) {

		return state.pluginList;
	}

}

function isEmptyObject(e) {
	var t;
	for(t in e)
		return !1;
	return !0
}

const mutations = {

	openModal: function(state, obj) {
		if(!obj.components && !obj.title) {
			console.log('参数有误无法弹出dialog');
			return
		}
		state.dialog.visible = !state.dialog.visible;
		state.dialog.title = obj.title;
		state.dialog.current = obj.components;
		state.dialog.type = obj.type;
	},
	closeModal: function(state, obj) {
		state.dialog.visible = false;
	},
	changeCrumb: function(state, crumbText) {
		// 变更状态
		state.crumb = crumbText;
		//   console.log(state);
	},
	//用于创建直播间的时候给studio赋值。
	setStudio: function(state, obj) {
		state.studio = obj;
//		console.log(state.studio);
	},
	changeStudio: function(state, data) {

		var obj = data.studio,
			id = data.id;
//		if(data.type &&data.type=='plugin'){
//			//针对组件修改做的修改
//		}


		function deepCopy(o) {
				var self =this;
			    if (o instanceof Array) {
			        var n = [];
			        for (var i = 0; i < o.length; ++i) {
			            n[i] = deepCopy(o[i]);
			        }
			        return n;
			
			    } else if (o instanceof Object) {
			        var n = {}
			        for (var i in o) {
			            n[i] = deepCopy(o[i]);
			        }
			        return n;
			    } else {
			        return o;
			    }
			}
		// 用新的对象来替换原有的studio信息对象,如果不是对象就炸
		if(Object.prototype.toString.call(obj) != '[object Object]') {
			console.log('要替换的值不是对象');
			return;
		}
		//先改变本地的值再向服务器同步
		state.studio = obj;
		
		
		var ajaxObj = deepCopy(obj);
		ajaxObj.plugin =JSON.stringify(ajaxObj.pluginObj);
		delete ajaxObj.pluginObj;//这里把对象清空了因为不必要传到服务器上，在初始化的时候记得加上pluginObj的初始化
		var url = '/rooms/' + id;
		console.log(ajaxObj);return;
		Vue.http.put(url,ajaxObj).then((response) => {

			// state.studio =response.body;
			console.log(response.body, '更新配置成功');


		}, (response) => {
			// error callback
			// console.log(response);
		});

	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
});