<template>
<el-row class="config">

	<div class="plugin_box">
		<div class="plugin">
			<el-row>
				<div class="title">功能列表</div>
				<div class="box">
					<!--灰色的是必选-->
					<fieldset class="base">
						<legend> 基础 </legend>
						<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.base">
							<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon"></div>
							<div class="name">{{item.name}}</div>
						</div>
					</fieldset>
					
					<fieldset class="interaction">
						<legend> 互动 </legend>
						<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.interaction">
							<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon"></div>
							<div class="name">{{item.name}}</div>
						</div>

					</fieldset>
					<fieldset class="plus">
						<legend> 高级 </legend>
						<div v-bind:disabled="item.require" v-bind:class="item.checked?'active':''" @click="functionAdd(item.name)" class="plugin_item" v-for="(item,index) in pluginList.plus">
							<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon"></div>
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
				<video-player v-if="showStatus_mobile.player" id="player" :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
				<mobile-advert v-if="showStatus_mobile.advert"></mobile-advert>
				<mobile-menu v-if="showStatus_mobile.menu"></mobile-menu>
			</div>
		</div>
	</div>

	<!-- 公共设置 -->
	<div class="common_box">

		<el-tabs class="common" :active-name="activeName">
			<el-tab-pane label="直播源" name="first">

				<div class="origin">

					<div class="header">
						<span class="header_tab" :class="showStatus_common.origin ?'active':''" @click="changeShow_common('origin')">直播源</span>
						<span class="header_tab" :class="showStatus_common.countDown ?'active':''" @click="changeShow_common('countDown')">定时开播</span>
						<span class="header_tab" :class="showStatus_common.total ?'active':''" @click="changeShow_common('total')">人数限制</span>
					</div>
					<div class="container" v-if="showStatus_common.countDown">
						<!-- <h5>倒计时功能可以帮您有效留住用户</h5> -->

						<el-form label-width="70px">
							<el-form-item label="开播时间">
								<el-date-picker v-model="studio.play_time_show" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
								</el-date-picker>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit_origin">保存配置</el-button>
							</el-form-item>
						</el-form>

					</div>
					<div v-if="showStatus_common.origin" class="container origin_container">

						<el-form class="origin_form" label-width="70px">
							<el-form-item label="房间名称">
								<el-input placeholder="直播间名称" v-model="studio.title"></el-input>
							</el-form-item>

							<el-form-item>
								<el-button type="primary" @click="onSubmit_origin">保存配置</el-button>
							</el-form-item>
						</el-form>
						<div class="origin_show">
							<div class="hr"></div>
							<div class="title">推流地址
								<el-button size="small" type="primary">复制</el-button>
							</div>
							<p>{{studio.upstream_address}}</p>

							<div class="title">预览地址
								<el-button size="small" type="primary">复制</el-button>
							</div>
							<p>http://tv.icloudinn.live/{{studio.id}}</p>
							<div class="title">扫我预览</div>
							<qrcode :val="'http://tv.icloudinn.live/'+studio.id"></qrcode>
							<el-button size="small" @click="gocli()" type="primary">二维码美化</el-button>
						</div>
					</div>

					<div v-if="showStatus_common.total" class="container ">
						<el-form class="origin_form" label-width="70px">
							<el-form-item label="人数限制">
								<el-input placeholder="设置直播间同时观看的人数上限" v-model="studio.watch_num_limit"></el-input>
							</el-form-item>

							<el-form-item>
								<el-button type="primary" @click="onSubmit_origin">保存配置</el-button>
							</el-form-item>
						</el-form>
					</div>

					<!-- {{studio}} -->
				</div>
			</el-tab-pane>
			<el-tab-pane label="风格设置" name="second">
				<div class="feature">
					<div class="header">
						<span class="header_tab" :class="showStatus_origin.cover?'active':''" @click="changeShow_origin('cover')">封面</span>

						<span class="header_tab" :class="showStatus_origin.logo ?'active':''" @click="changeShow_origin('logo')">logo</span>
					</div>

					<div class="container" v-if="showStatus_origin.cover">
						<h5>设置封面，会让你的直播更有范哦</h5>
						<div class="cover">
							<template v-if="studio.cover_img_url">
								<img width="350px" :src="studio.cover_img_url" />
								<el-button type="primary" @click="checkDialog('pictureBox','设置封面','cover')">更改封面</el-button>
							</template>
							<template v-else>
								<el-button type="primary" @click="checkDialog('pictureBox','设置封面','cover')">设置封面</el-button>
							</template>
						</div>
					</div>

					<div class="container" v-if="showStatus_origin.logo">
						<h5>有创意的logo会使直播间显得高大上</h5>
						<div class="logo">
							<template v-if="studio.logo_url">
								<img width="100px" class="logo_img" :src="studio.logo_url" />
								<el-button type="primary" @click="checkDialog('pictureBox','设置logo','logo')">更改Logo</el-button>
							</template>
							<template v-else>
								<el-button type="primary" @click="checkDialog('pictureBox','设置logo','logo')">设置Logo</el-button>
							</template>

						</div>

					</div>

			</el-tab-pane>
			<el-tab-pane label="授权观看" name="third">

				<div class="allow">
					<div class="container">
						<h5>只有符合要求的用户才能进入直播间</h5>
						<div class="limit">
							<el-tooltip class="item" effect="dark" content="所有人均可看" placement="bottom">
								<el-radio v-model="radio" label="1">无限制</el-radio>
							</el-tooltip>

							<el-tooltip class="item" effect="dark" content="验证手机号可看" placement="bottom">
								<el-radio disabled v-model="radio" label="3">手机验证</el-radio>
							</el-tooltip>

							<el-tooltip class="item" effect="dark" content="支付费用可看" placement="bottom">
								<el-radio disabled v-model="radio" label="2">付费观看</el-radio>
							</el-tooltip>
						</div>

					</div>

				</div>
			</el-tab-pane>
		</el-tabs>
		</el-col>

		<!-- 弹出框 -->
		<dialog-box :studio="studio"></dialog-box>
</el-row>
</template>

<script>
	import dialogBox from "../../components/common/dialog.vue"

	// 	import origin from "./config/common/origin.vue"
	// import feature from "./config/common/feature.vue"
	// import allow from "./config/common/allow.vue"

	import mobileAdvert from "./config/mobile/advert.vue"
	import mobileMenu from "./config/mobile/menu.vue"

	import Qrcode from '../../components/common/Qrcode.vue'

	import store from '../../vuex/store'

	export default {
		store,

		data: function() {

			return {
				showStatus_common: {
					origin: true,
					total: false,
					countDown: false
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				value1: '',
				radio: '1',
				showStatus_origin: {
					cover: true,
					logo: false,

				},
//				studio: {},
				pluginList: {},
				showStatus_mobile: {
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
		props:['studio'],
		components: {
			dialogBox,
			mobileAdvert,
			mobileMenu,
			// origin,
			// feature,
			// allow,
			Qrcode
		},
		methods: {
			changeShow_common: function(name) {

				for(var k in this.showStatus_common) {

					if(k == name) {
						this.showStatus_common[k] = true;
						continue;
					}
					this.showStatus_common[k] = false;
				}
			},
			onSubmit() {
				console.log('submit!');

			},
			onSubmit_origin(obj) {

				var time = this.studio.play_time_show,
					temp = null;

				// var str = "2015-08-20T13:26:49Z";
				// var reg = /([\d\-]+)T(\d+:\d+)\:.*/;
				// var time = str.replace(reg, "$1 $2");
				// return;
				if(Object.prototype.toString.call(time) == '[object Date]') {
					console.log('时间是对象，需要转换成时间戳');
					temp = time.getTime();
				}
				// console.log(temp);
				// php和js的时间戳位数不一样，妈个鸡
				if((temp + '').length == 13) {
					console.log('长度是13位，要转换成php时间戳');
					temp = parseInt(temp / 1000);
				}
				this.studio.play_time = temp;
				// return;
				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio
				}
				console.log(data);
				return;
				// store.commit('changeStudio',data);

			},
			gocli: function() {
				window.open('http://cli.im/');
			},
			changeShow_origin: function(name) {

				for(var k in this.showStatus_origin) {

					if(k == name) {
						this.showStatus_origin[k] = true;
						continue;
					}
					this.showStatus_origin[k] = false;
				}
			},
			onSubmit_feature(obj) {

				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);

			},
			// logo:function(){
			// 	var data = {
			// 			logo_url: "http://ww1.sinaimg.cn/thumb180/61e7f4aajw1fajnxpl30fj20dw03wmxj.jpg"
			// 		},
			// 	id = this.$router.currentRoute.params.id;
			// 	var url = "/rooms/"+id;
			// 	this.$http.put(url,data).then((response) => {
			// 		console.log(response.body);
			// 		store.commit("changeStudio",response.body);

			// 	}, (response) => {
			// 		// error callback
			// 		// console.log(response);
			// 	});
			// },
			// type用来区分不同的用途，用来设置不同的回调
			checkDialog: function(components, title, type) {
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.type = type;
				store.commit("openModal", obj);
			},

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
				var showStatus = app.showStatus_mobile;

				for(var i = 0; i < obj.length; i++) {
					if(obj[i].plugin && !obj[i].require) {

						for(var key in showStatus) {

							if(key == obj[i].plugin) {
								console.log(app, app.$parent.showStatus, key);
								app.$parent.showStatus[key] = obj[i].checked;

								break;

							}
						}
					}
				}
			}
		},
		mounted() {

			this.pluginList = store.getters.getPluginList;

//			this.studio = store.getters.getStudio;
			// this.studio.play_time =this.studio.play_time*1000;
			// console.log(this.studio.play_time);

			// base: clear('base'),
			// interaction: clear('interaction'),
			// plus: clear('plus'),;
		}
	}
</script>

<style src="video.js/dist/video-js.css"></style>
<style>

</style>