<template>
<el-row class="config" >

	<div class="plugin_box">
		<div class="plugin">
		<el-row>
			<div class="title" >功能列表</div>
			<div class="box">
				<!--灰色的是必选-->
				<fieldset class="base">
					<legend> 基础 </legend>
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in base">
						<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon" ></div>
						<div class="name">{{item.name}}</div>
					</div>
				</fieldset>

				<fieldset class="interaction">
					<legend> 互动 </legend>
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in interaction">
						<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon" ></div>
						<div class="name">{{item.name}}</div>
					</div>
					
				</fieldset>
				<fieldset class="plus">
					<legend> 高级 </legend>
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in plus">
						<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon" ></div>
						<div class="name">{{item.name}}</div>
					</div>
					
				</fieldset>

			</div>
		</el-row>
	</div>

	</div>
	<div class="mobile_box">
		<div class="mobile">
		<div class="header">
			直播间名称
		</div>
		<div class="wrap">
			<video-player v-if="showStatus.player" id="player" :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
			<mobile-advert v-if="showStatus.advert"></mobile-advert>
			<mobile-menu v-if="showStatus.menu"></mobile-menu>
		</div>
	</div>
	</div>

	<!-- 公共设置 -->
	<div class="common_box">
		<div >
		<el-tabs class="common" :active-name="activeName">
	    <el-tab-pane label="直播源" name="first"><origin></origin></el-tab-pane>
	    <el-tab-pane label="风格设置" name="second"><feature></feature></el-tab-pane>
	    <el-tab-pane label="授权观看" name="third"><allow></allow></el-tab-pane>
	  </el-tabs>
		</div>
	</el-col>

	<!-- 弹出框 -->
	<dialog-box></dialog-box>

</template>

<script>

	import dialogBox from "../../components/common/dialog.vue"

 	import origin from "./config/common/origin.vue"
	import feature from "./config/common/feature.vue"
	import allow from "./config/common/allow.vue"

	import mobileAdvert from "./config/mobile/advert.vue"
	import mobileMenu from "./config/mobile/menu.vue"



	import store from '../../vuex/store'

	export default {
		data: function() {
			//定义测试数据
			var functionMOCK = [{
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
				}, {
					name: '广告栏', //名字
					plugin: 'advert',
					type: 'plus', //类型 "基础"
					src: require('assets/img/advert.png'), //图标样式class
					item: 3, //在对应列别里排序
					require: false, //是否必选
					checked: false //是否选中  
				},
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
				];
			//专门针对function的数据分类，然后排序的函数,真是想不到这也需要写一个函数
			/*
			 *
			 *pargam @type string
			 *pargam @obj object 需要整理的数据，可以是mock也可以是服务器给的
			 *
			 */
			 function clear(type, obj) {
			 	var functionList = obj,
			 	result = [];
			 	for(var i = 0; i < functionList.length; i++) {
			 		if(functionList[i].type == type) {
			 			result.push(functionList[i]);
			 		}
			 	}
				// console.log(result);
				return result;
			}
			return {
				base: clear('base', functionMOCK),
				interaction: clear('interaction', functionMOCK),
				plus: clear('plus', functionMOCK),
				functionList: functionMOCK,
				showStatus: {
					'player': true,
					'advert': true,
					'menu': true
				},
				videoOptions: {
					"source": {
						"type": "application/x-mpegURL",
						"src": "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
						"withCredentials": false
					},
					"poster": "http://live.icloudinn.com/img3/logo.png",
					"live": true,
					"autoplay": false,
					"height": 414 * 2 / 3,
					"language": 'zh-cn'
				}


			}
		},store,
		components: {
			dialogBox,
			mobileAdvert,mobileMenu,
			origin,
			feature,
			allow
		},
		methods: {
			playerStateChanged(playerCurrentState) {
			// console.log(playerCurrentState);
			// console.log(this.$data);
		},
		playerAction(action) {
			this.$emit('playerAction', action)
		},
			goto: function(text) {
				this.currentView = text;
			},
			checkDialog:function(components,title){
				var obj ={};
				obj.components= components;
				obj.title = title;
				store.commit("openDialog",obj);
			},
			//this.$parent
			//添加功能到配置里，然后刷新视图,虽然想写一个重新读取配置并刷新模拟器页面的方法，但是觉得这样页面渲染成本太高。
			//可怜天下打工仔的电脑都不好，就只刷新对应模块的吧。可是万一模块之间有依赖的话。。。我就日了狗了
			//想到一个治标治本的法子，写一个方案输入哪个模块的参数就在模拟器中渲染刷新对应的模块，如果传的是all那就全部刷新。

			functionAdd: function(functionName) {

				// console.log(this.functionList);
				var name = functionName,
				obj = this.functionList;

				for(var i = 0; i < obj.length; i++) {

					if(name == obj[i].name) {
						// console.log(obj[i]);
						if(obj[i].require == true) {
							console.log('你点的是必选的功能');
							return
						}
						if(obj[i].checked == true) {
							console.log('功能已经存在');
							var r = confirm("是否删除该功能?")
							if(r == true) {
								obj[i].checked = false;
								this.$options.methods.refresh(obj, this)
								console.log('功能已删除');
							}

							return;

						}
						obj[i].checked = true;
						this.$options.methods.refresh(obj, this)
						break;
					}

				}

			},
			refresh: function(functionList, app) {
				var obj = functionList;
				var showStatus = app.showStatus;

				for(var i = 0; i < obj.length; i++) {
					if(obj[i].plugin && !obj[i].require) {

						for(var key in showStatus) {

							if(key == obj[i].plugin) {
								console.log(app,app.$parent.showStatus, key);
								app.$parent.showStatus[key] = obj[i].checked;
								
								break;

							}
						}
					}
				}
			}
		},
		mounted() {


		}
	}
</script>

<style src="video.js/dist/video-js.css"></style>
<style>

</style>