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
							<div @click="pluginAdd(item)" class="plugin_item" v-if="item.type=='base'" v-for="(item,index) in pluginList">

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
							<div @click="pluginAdd(item)" class="plugin_item" v-if="item.type=='interaction'" v-for="(item,index) in pluginList">
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
							<div @click="pluginAdd(item)" class="plugin_item" v-if="item.type=='plus'" v-for="(item,index) in pluginList">
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
					<div id="id_video_container"></div>
					<!--幻灯片-->

					<template v-if="studio.pluginObj.advert.length>0">
						<div class="mobile_advert mobile_content" @click="checkDialog('advertEdit','设置广告栏','advertModal')">
							<swiper :options="swiperOption">
								<swiper-slide v-for="(value,index) in studio.pluginObj.advert" :style="{backgroundImage: 'url(' + value.pic + ')'}"></swiper-slide>
							</swiper>
						</div>
					</template>
					<!--自定义菜单-->
					<div class="mobile_menu mobile_content" @click="checkDialog('menuEdit','自定义菜单','menuModal')">
						<div class="menu_item" :data-id="1">观众点评</div>
						<template v-if="studio.pluginObj.menu.length>0">
							<div v-for="(item,index) in studio.pluginObj.menu" class="menu_item" :data-id="item.title">{{item.title}}</div>
						</template>
					</div>

				</div>
			</div>
		</div>
		<div class="common_box">

			<el-tabs class="common" type="border-card" :active-name="activeName">
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
									<el-button @click='copy' :data-clipboard-text='studio.upstream_address' size="small" class="copy" type="primary">复制</el-button>
								</div>
								<p>{{studio.upstream_address}}</p>

								<div class="title">预览地址
									<el-button @click='copy2' :data-clipboard-text='"http://tv.icloudinn.com/"+studio.id' size="small" class="copy copy2" type="primary">复制</el-button>
								</div>
								<p>http://tv.icloudinn.com/{{studio.id}}</p>
								<div class="title">扫我预览
									<el-button @click="opencli" size="small" class="copy" type="primary">美化</el-button>
								</div>
								<qrcode :val="'http://tv.icloudinn.com/'+studio.id"></qrcode>
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
									<el-button type="primary" @click="openPicture('设置封面',setcover)">更改封面</el-button>
								</template>
								<template v-else>
									<el-button type="primary" @click="openPicture('设置封面',setcover)">设置封面</el-button>
								</template>
							</div>
						</div>

						<div class="container" v-if="showStatus_origin.logo">
							<h5>有创意的logo会使直播间显得高大上</h5>
							<div class="logo">
								<template v-if="studio.logo_url">
									<img width="100px" class="logo_img" :src="studio.logo_url" />
									<el-button type="primary" @click="openPicture('设置logo',setlogo)">更改Logo</el-button>
								</template>
								<template v-else>
									<el-button type="primary" @click="openPicture('设置logo',setlogo)">设置Logo</el-button>
								</template>

							</div>

						</div>

				</el-tab-pane>
				<el-tab-pane label="授权观看" name="third">
					<div class="allow">
						<div class="container">
							<h5>只有符合要求的用户才能进入直播间</h5>
							<div class="limit">
								<el-radio-group v-model="radio">
							    <el-tooltip class="item" effect="dark" content="所有人均可看" placement="bottom">
							    	<el-radio  :label="3" >无限制</el-radio>
							    </el-tooltip>
							    <el-tooltip class="item" disabled effect="dark" content="验证手机号可看" placement="bottom">
							    	<el-radio disabled :label="6">手机验证</el-radio>
							    </el-tooltip>
							    <el-tooltip class="item" disabled effect="dark" content="支付费用可看" placement="bottom">
							    	<el-radio disabled :label="9">付费观看</el-radio>
							    </el-tooltip>
							  </el-radio-group>
							</div>

						</div>

					</div>
				</el-tab-pane>
			</el-tabs>
			</div>
			<dialog-box></dialog-box>
			<picture-box></picture-box>

	</el-row>
</template>

<script>
	import dialogBox from "plugin/common/modal.vue"
	import pictureBox from "plugin/common/pictureBox.vue"
	import Qrcode from 'plugin/common/Qrcode.vue'
	import store from 'store'
  import Clipboard from 'clipboard'
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'

	export default {
		store,
		data: function() {

			return {
				radio:3,
				studio:null,
				show: false,

				//mobile Data
				swiperOption: {
					name: 'currentSwiper',
					notNextTick: true,
					autoplay: 3000
				},

				//common Data
				showStatus_origin: {
					cover: true,
					logo: false,
				},
				showStatus_common: {
					origin: true,
					total: false,
					countDown: false
				},
				setcover:function(){},
				setlogo:function(){},
			}
		},
		components: {
			swiper,
			swiperSlide,
			dialogBox,
			Qrcode,
			pictureBox
		},
		computed: {

			//放心大胆的用计算属性，默认无set属性。但是可以人为添加，一旦添加后依赖的属性也会相应改变
			//也就是说初始化的时候用本地和线上的组件信息来综合出用于渲染的最终数据，但是维护更新各个组件状态的时候却要去维护源数据（即线上和本地写死的,因为一旦修改计算属性依赖的属性，计算属性会自动更新)
			pluginList: function() {

				var self = this,
					storeList = store.getters.getPluginList, //本地的数据模板
					onlineList = self.studio.pluginObj;

				//通过两个数组的比对，然后获得最终会被渲染的pluginList,不过这么多循环看得我好难受
				for(var k in onlineList) {

					//过滤没有内容并且未选中的组件，例如advert中可能没有元素，但是他被选中了,在pluginAdd函数中修改未选中状态，但是如果用户不设置，则页面刷新后不显示.这里不包含require类型组件
					if(onlineList[k].length < 1) {
						continue;
					}
					for(var j in storeList) {
						//拿pluginObj的属性名和store中的pluginData默认信息的键名对比,只要以后线上的pluginObj和pluginData按照目前格式增删,就可以正确初始化了
						if(k == j) {
							storeList[j].checked = true;
						}
					}
				}

				return storeList;
			}
		},
		methods: {

			subConfig(){
					var self =this;
			        var data ={
			          id:self.$router.currentRoute.params.id,
			          studio:this.studio,
			        }
			        store.commit('changeStudio',data);
				},

			opencli: function() {
				window.open('http://cli.im/')
			},
			pluginAdd: function(itemObj) {

				//输入哪个模块的参数就在模拟器中渲染刷新对应的模块，如果传的是all那就全部刷新。
				var self = this;
				//排除必选
				if(typeof(itemObj.require) != 'undefined' && itemObj.require == true) {
					this.$message({
						type: 'info',
						message: name + '是必选功能哦'
					});
					return
				}

				//排除未上线
				if(itemObj.usable == false) {
					this.$message({
						type: 'info',
						message: name + '功能即将上线'
					});
					return;
				}

				//已选中情况
				if(itemObj.checked == true) {

					this.$confirm(name + '功能已经存在，是否删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {

						itemObj.checked = false;
						for(var k in self.studio.pluginObj) {
							if(k == itemObj.title) {
								self.studio.pluginObj[k] = []; //清空对应的组件在studio信息
							}
						}
						self.subConfig();
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

				} else {
					//正常添加
					itemObj.checked = true;
					this.$notify({
						title: '提示信息',
						message: name + '添加成功!',
						type: 'success'
					});
					//针对advert做优化
					if(itemObj.title == 'advert') {
						self.checkDialog('advertEdit', '设置广告栏', 'advertModal');
					}
				}

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
			checkDialog: function(components, title,callback) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.callback = callback;
				store.commit("openModal", obj);
			},
			openPicture: function(title,callback) {
				// type用来区分不同的用途，用来设置不同的回调
				console.log(callback);
				var obj = {};
				obj.title = title;
				obj.callback = callback;
				store.commit("openPicture", obj);
			},
			loadPlayer:function(){

				var self =this

				function callback(self) {

					// var player =  new TcPlayer('id_video_container', {
					// 	"m3u8": self.studio.hls_downstream_address||"http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
					// 	// "flv": self.studio.flv_downstream_address, //增加了一个flv的播放地址，用于PC平台的播放
					// 	"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
					// 	// "coverpic" : "http://www.test.com/myimage.jpg",
					// 	"width" :  '359',//视频的显示宽度，请尽量使用视频分辨率宽度
					// 	"height" : '201'//视频的显示高度，请尽量使用视频分辨率高度
					// });
					console.log(self.studio.flv_downstream_address)
					var player = cyberplayer("id_video_container").setup({
						flashplayer:"http://www.easydarwin.org/cyberplayer.flash.swf",
						width: 359,
						height: 201,
						stretching: "uniform",
						file: self.studio.flv_downstream_address,
						autostart: true,
						repeat: false,
						volume: 90,
						controls: true,
						ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
					});
				}
				var head= document.getElementsByTagName('head')[0];
				var script= document.createElement('script');
				script.type= 'text/javascript';
				script.onreadystatechange= function () {
				if (this.readyState == 'complete')
					callback(self);
				}
				script.onload= function(){
					callback(self);
				}
				script.src= '/static/cyberplayer/cyberplayer.js';
				head.appendChild(script);
			},
			init: function() {
				var self = this;
				//把store中的组件信息初始化
				//store.commit('initPluginList');
				store.commit("closeModal");//迷之modal

				//初始化房间信息
				self.studio = store.getters.getStudio;

				self.setcover=function(imgUrl,obj=self.studio){
					obj.cover_img_url = imgUrl

				}

				self.setlogo=function(imgUrl,obj=self.studio){
					obj.logo_url = imgUrl
				}


				//从vuex中读取组件的默认信息
				self.show = true;
				self.loadPlayer()
				// self.$nextTick(function(){
				// 	// var player =  new TcPlayer('id_video_container', {
				// 	// 	"m3u8": self.studio.hls_downstream_address||"http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
				// 	// 	// "flv": self.studio.flv_downstream_address, //增加了一个flv的播放地址，用于PC平台的播放
				// 	// 	"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
				// 	// 	// "coverpic" : "http://www.test.com/myimage.jpg",
				// 	// 	"width" :  '359',//视频的显示宽度，请尽量使用视频分辨率宽度
				// 	// 	"height" : '201'//视频的显示高度，请尽量使用视频分辨率高度
				// 	// });

				// 	// var hls = parent.hls||"http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"
				// 	// 	var option = {
				// 	// 	"live_url" : hls,
				// 	// 	"width" :359,
				// 	// 	"height" :201,

				// 	// 	};

				// 	// var player = new qcVideo.Player("id_video_container", option)
				// 	// player.play()
				// })

			},
			// 推流地址复制按钮
			copy:function(event){
				var clipboard = new Clipboard('.copy');
				this.$notify({
					title:'成功',
					message:'复制成功',
					type:'success'
				})
			},
			// 预览地址复制
			copy2:function(event){
				var clipboard = new Clipboard('.copy2');
				this.$notify({
					title:'成功',
					message:'复制成功',
					type:'success'
				})
			}
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less">
	/*style Mobile*/
	#id_video_container{
		width:359px;
		height:201px;
	}
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
#TcPlayer{
	width:359px;
	height:205px;
}
</style>
