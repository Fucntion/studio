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
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.base">
						<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon" ></div>
						<div class="name">{{item.name}}</div>
					</div>
				</fieldset>

				<fieldset class="interaction">
					<legend> 互动 </legend>
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.interaction">
						<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon" ></div>
						<div class="name">{{item.name}}</div>
					</div>
					
				</fieldset>
				<fieldset class="plus">
					<legend> 高级 </legend>
					<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.plus">
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
		<div id="id_test_video"></div>
			<video-player v-if="showStatus.player" id="player" :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
			<mobile-advert v-if="showStatus.advert"></mobile-advert>
			<mobile-menu v-if="showStatus.menu"></mobile-menu>
		</div>
	</div>
	</div>

	<!-- 公共设置 -->
	<div class="common_box">

		<el-tabs class="common" :active-name="activeName">
	    <el-tab-pane label="直播源" name="first"><origin :studio="studio"></origin></el-tab-pane>
	    <el-tab-pane label="风格设置" name="second"><feature :studio="studio"></feature></el-tab-pane>
	    <el-tab-pane label="授权观看" name="third"><allow :studio="studio"></allow></el-tab-pane>
	  </el-tabs>
	</el-col>

	<!-- 弹出框 -->
	<dialog-box :studio="studio"></dialog-box>

</template>

<script>

		      // var player = new TcPlayer('id_test_video', {
		      //   "m3u8": "http://2157.liveplay.myqcloud.com/2157_358535a.m3u8",
		      //   "autoplay" : true,      //iOS下safari浏览器是不开放这个能力的
		      //   "coverpic" : "http://www.test.com/myimage.jpg",
		      //   "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
		      //   "height" : '320'//视频的显示高度，请尽量使用视频分辨率高度
		      // });

	import dialogBox from "../../components/common/dialog.vue"

 	import origin from "./config/common/origin.vue"
	import feature from "./config/common/feature.vue"
	import allow from "./config/common/allow.vue"

	import mobileAdvert from "./config/mobile/advert.vue"
	import mobileMenu from "./config/mobile/menu.vue"



	import store from '../../vuex/store'

	export default {
		store,

		data: function() {
			

			return {
				studio:{},
				pluginList:{},			
				// functionList: functionMOCK,
				showStatus: {
					'player': true,
					'advert': true,
					'menu': true
				},
				videoOptions: {
					"source": {
						"type": "application/x-mpegURL",
						// http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8
						"src": "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
						// "src": studio.hls_downstream_address,
						"withCredentials": false
					},
					"poster": "http://live.icloudinn.com/img3/logo.png",
					"live": true,
					"autoplay": false,
					"height": 414 * 2 / 3,
					"language": 'zh-cn'
				}


			}
		},
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

			


			var result = store.getters.getStudio;
			this.pluginList = store.getters.getPluginList;

			// result默认是null,防止用户无脑刷新后store数据丢失
			if (!result && typeof result != "undefined" && result != 0){
				
				var id = this.$router.currentRoute.params.id;
				var url = "/rooms/"+id;
				this.$http.get(url).then((response) => {

					this.studio=response.body;


				}, (response) => {
					// error callback
					// console.log(response);
				});
			}else{
				this.studio = result;
			}

							
			// base: clear('base'),
				// interaction: clear('interaction'),
				// plus: clear('plus'),;
		}
	}
</script>

<style src="video.js/dist/video-js.css"></style>
<style>

</style>