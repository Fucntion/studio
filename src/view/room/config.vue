<template>
	<el-row class="config" v-if="show">

		<div class="plugin_box">
			<div class="plugin">
				<el-row>
					<div class="title">功能列表</div>
					<div class="box">
						<!--灰色的是必选-->
						<fieldset class="base">
							<legend> 基础 </legend>
							<div  v-bind:class="item.checked?'active':''"  @click="functionAdd(item.name,'base')" class="plugin_item" v-for="(item,index) in pluginList.base">

								<template v-if="item.checked">
									<div :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
										<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
									</div>
									
									<div class="name">{{item.name}}</div>

								</template>
								<template v-else>
									<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
										<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
									</div>
									<div class="name">{{item.name}}</div>
								</template>

								
							</div>
						</fieldset>

						<fieldset class="interaction">
							<legend> 互动 </legend>
							<div v-bind:class="item.checked?'active':''" @click="functionAdd(item.name,'interaction')" class="plugin_item" v-for="(item,index) in pluginList.interaction">
								<template v-if="item.checked">
								<div :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
									<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
								</div>
								<div class="name">{{item.name}}</div>
							</template>
							<template v-else>
								<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
									<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
								</div>
								<div class="name">{{item.name}}</div>
							</template>
							</div>

						</fieldset>
						<fieldset class="plus">
							<legend> 高级 </legend>
							<div v-bind:class="item.checked?'active':''" @click="functionAdd(item.name,'plus')" class="plugin_item" v-for="(item,index) in pluginList.plus">
								<template v-if="item.checked">
								<div :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
									<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
								</div>
								<div class="name">{{item.name}}</div>
							</template>
							<template v-else>
								<div :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
									<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
								</div>
								<div class="name">{{item.name}}</div>
							</template>
							</div>

						</fieldset>

					</div>
				</el-row>
			</div>

		</div>
		<div class="mobile_box">
			<div class="mobile">
				<div class="header">直播间名称</div>
				<div class="wrap">

					<!--播放器-->
					<video-Player :options="videoOptions" ref="videoPlayer"></video-Player>
					<!--幻灯片-->
					
					<template v-if="advertListData.length>0">
						<div class="mobile_advert mobile_content" @click="checkDialog('advertEdit','设置广告栏','advertModal')">
							<swiper :options="swiperOption">
								<swiper-slide v-for="(value,index) in advertListData" :style="{backgroundImage: 'url(' + value.pic + ')'}"></swiper-slide>
							</swiper>
						</div>
					</template>
					<!--自定义菜单-->
					<div class="mobile_menu mobile_content" @click="checkDialog('menuEdit','自定义菜单','menuModal')">
						<div class="menu_item" :data-id="1">观众点评</div>
						<template v-if="menuListData.length>0">
							<div v-for="(item,index) in menuListData" class="menu_item" :data-id="item.title">{{item.title}}</div>
						</template>
					</div>

				</div>
			</div>
		</div>

		<!-- 公共设置 -->
		<div class="common_box">

			<el-tabs class="common"  type="border-card" :active-name="activeName">
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
									<el-button class="submit_studio" type="primary" @click="onSubmit_origin">保存配置</el-button>
								</el-form-item>
							</el-form>

						</div>
						<div v-if="showStatus_common.origin" class="container origin_container">

							<el-form class="origin_form" label-width="70px">
								<el-form-item label="房间名称">
									<el-input placeholder="直播间名称" v-model="studio.title"></el-input>
								</el-form-item>

								<el-form-item>
									<el-button class="submit_studio" type="primary" @click="onSubmit_origin">保存配置</el-button>
								</el-form-item>
							</el-form>
							<div class="origin_show">
								<div class="hr"></div>
								<div class="title">推流地址
									<el-button size="small" class="copy" type="primary">复制</el-button>
								</div>
								<p>{{studio.upstream_address}}</p>

								<div class="title">预览地址
									<el-button size="small" class="copy" type="primary">复制</el-button>
								</div>
								<p>http://tv.icloudinn.live/{{studio.id}}</p>
								<div class="title">扫我预览<el-button @click="opencli" size="small" class="copy" type="primary">美化</el-button></div>
								<qrcode :val="'http://tv.icloudinn.live/'+studio.id"></qrcode>
							</div>
						</div>

						<div v-if="showStatus_common.total" class="container ">
							<el-form class="origin_form" label-width="70px">
								<el-form-item label="人数限制">
									<el-input placeholder="设置直播间同时观看的人数上限" v-model="studio.watch_num_limit"></el-input>
								</el-form-item>

								<el-form-item>
									<el-button class="submit_studio" type="primary" @click="onSubmit_origin">保存配置</el-button>
								</el-form-item>
							</el-form>
						</div>

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
									<img width="300px" :src="studio.cover_img_url" />
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
			</div>

			<!-- 弹出框 -->
			<dialog-box :studio="studio"></dialog-box>

	</el-row>
</template>

<script>
	import dialogBox from "../../components/common/dialog.vue"
	import Qrcode from '../../components/common/Qrcode.vue'
	import store from '../../vuex/store'
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'
	import {
		videoPlayer
	} from 'vue-video-player'

	export default {
		store,
		data: function() {

			return {
				show: false,
				//menu Data
				pluginList: {},
				//mobile Data
				menuListData: [],
				advertListData: [],

				videoOptions: {

					source: {
						"type": "application/x-mpegURL",
						"src": '',
						"withCredentials": false
					},
					"poster": "http://live.icloudinn.com/img3/logo.png",
					"live": true,
					"autoplay": false,
					"height": 359 * 9 / 16,
					"language": 'zh-cn'

				},

				swiperOption: {
					// 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
					name: 'currentSwiper',
					// // 所有配置均为可选（同Swiper配置）
					notNextTick: true,
					autoplay: 3000
				},

				//common Data
				radio: '1',
				showStatus_origin: {
					cover: true,
					logo: false,
				},
				showStatus_common: {
					origin: true,
					total: false,
					countDown: false
				}

			}
		},
		props: ['studio'],
		components: {
			swiper,
			swiperSlide,
			dialogBox,
			Qrcode,
			videoPlayer
		},
		methods: {
			opencli:function(){
				window.open('http://cli.im/')
			},
			functionAdd: function(functionName, type) {

				//this.$parent
				//输入哪个模块的参数就在模拟器中渲染刷新对应的模块，如果传的是all那就全部刷新。
				var self = this,
					name = functionName,
					obj = self.pluginList[type]; //获取对应的类别数组

				for(var i = 0; i < obj.length; i++) {

					if(name == obj[i].name) {

						if(obj[i].require == true) {
							this.$message({
								type: 'info',
								message: name + '是必选功能哦'
							});
							return
						}
						if(obj[i].usable == false) {
							this.$message({
								type: 'info',
								message: name + '功能即将上线'
							});
							return;
						}
						if(obj[i].checked == true) {

							this.$confirm(name + '功能已经存在，是否删除?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								obj[i].checked = false;
								self.$options.methods.refresh(self.pluginList, self.showStatus_mobile);

								this.$notify.info({
									title: '提示信息',
									message: '删除成功'
								});
							}).catch(() => {
								this.$notify.info({
									title: '提示信息',
									message: '已取消删除'
								});
							});

							return;

						}
						obj[i].checked = true;
						this.$notify({
							title: '提示信息',
							message: name + '添加成功!',
							type: 'success'
						});
						
						break;
					}

				}
				if(name=='广告栏'){
					self.checkDialog('advertEdit','设置广告栏','advertModal');
				}

			},
			refresh: function(pluginList,showStatus_mobile) {

				var self = this;
				self.menuListData = self.studio.pluginObj.menu;
				self.advertListData = self.studio.pluginObj.advert;
				
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
			changeShow_common: function(name) {

				for(var k in this.showStatus_common) {

					if(k == name) {
						this.showStatus_common[k] = true;
						continue;
					}
					this.showStatus_common[k] = false;
				}
			},
			onSubmit_feature() {

				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);

			},
			onSubmit_origin(obj) {

				var time = this.studio.play_time_show;

				if(Object.prototype.toString.call(time) == '[object Date]') {
					console.log('时间是对象，需要转换成时间戳');
					time = time.getTime();
				}

				// php和js的时间戳位数不一样
				if((time + '').length == 13) {
					console.log('长度是13位，要转换成php时间戳');
					time = parseInt(time / 1000);
				}

				this.studio.play_time = time;

				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio
				}

				store.commit('changeStudio', data);

			},
			checkDialog: function(components, title, type) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.type = type;
				store.commit("openModal", obj);
			},

			init: function() {
				var self = this;

				//从vuex中读取组件的默认信息
				self.pluginList = store.getters.getPluginList;
				self.studio.pluginObj = JSON.parse(self.studio.plugin);
				self.menuListData = self.studio.pluginObj.menu;
				self.advertListData = self.studio.pluginObj.advert;
				self.videoOptions.source.src = 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8';
				self.show = true;

			}
		},
		mounted() {
			this.init();

		}
	}
</script>

<style src="video.js/dist/video-js.css"></style>
<style lang="less">
	@import "../../assets/css/swiper.css";
	/*style Mobile*/
	
	.swiper-container {
		width: 100%;
		height: 100px
	}
	
	.swiper-slide {
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		text-align: center;
		font-size: 38px;
		font-weight: 700;
		background: #eee;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background-size: cover;
	}
</style>