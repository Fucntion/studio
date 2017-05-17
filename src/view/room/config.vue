<template>
	<el-row class="config" v-if="show">
		<div class="plugin_box" :is='funList'></div>
		<div class="mobile_box" :is='mobileVideo'></div>
		<div @fen_click='fen_click' @share_click='share_click' class="common_box" :is='liveSetting'></div>
		<dialog-box></dialog-box>
		<picture-box></picture-box>
		<el-dialog @close='reset_jcrop' :title="setting_title" v-model="dialogVisible2" size="small">
			<el-row>
				<el-col :span='12'>
					<el-row style='text-align: center;'>
						<p>图片大小2M以内支持PNG、JPG、JPEG格式</p>
						<el-upload style='margin-top: 1rem;' :show-file-list='showfile' action="http://saaslive.oss-cn-shanghai.aliyuncs.com" :on-success="call" :data="new_multipart_params" :before-upload="set_key" :multiple="false">
							<el-button style='padding-left: 3rem;padding-right: 3rem;padding-top: 0.5rem;padding-bottom: 0.5rem;' :disabled='upbuttonif' type="primary" size="small">上传图片</el-button>
						</el-upload>
					</el-row>
					<div v-show='upbuttonif' style='margin-top: 1rem;'>
						<el-row :span='24' style='display:flex;justify-content:center;'>
							<img v-if='upbuttonif' id='element_id' width='200' :height='hei2' :src="imglist" alt="">
						</el-row>
						<el-row :span='24' style='margin-top:2rem;text-align:center;'>
							<el-button @click='changeshareimg' type='primary'>提交</el-button>
							<el-button type='primary' @click='reset_jcrop'>重置</el-button>
						</el-row>
					</div>
					<div v-show='!upbuttonif' style='margin-top: 1rem;'>
						<el-row :span='24' style='display:flex;justify-content:center;'>
							<img id='element_id2' width='200' height='200' src="~assets/img/zhanwei.png" alt="">
						</el-row>
						<el-row :span='24' style='margin-top:2rem;text-align:center;'>
							<el-button disabled @click='changeshareimg' type='primary'>提交</el-button>
							<el-button disabled type='primary' @click='reset_jcrop'>重置</el-button>
						</el-row>
					</div>
				</el-col>
				<el-col :span='12' style='text-align:center;margin-top: 3rem;'>
					<el-row :class="{'oneline':notslide}">
						<div v-if='upbuttonif'>
							<p style='margin-bottom: 1rem;'>预览图标(128*128)</p>
							<img :width='share_sizew' :height='share_sizeh' :src="imglist2" alt="">
						</div>
						<div v-else>
							<p style='margin-bottom: 1rem;'>预览图标(128*128)</p>
							<img :width='share_sizew' :height='share_sizeh' src="~assets/img/zhanwei.png" alt="">
						</div>
						<div>
							<p :class="{'secondp':!notslide}" style='margin-bottom: 1rem;'>当前图标(128*128)</p>
							<template v-if='now_image'>
								<img :width='share_sizew' :height='share_sizeh' :src="now_image" alt="">
							</template>
							<template v-else>
								<img :width='share_sizew' :height='share_sizeh' src="~assets/img/zhanwei.png" alt="">
							</template>
						</div>
					</el-row>
				</el-col>
			</el-row>
		</el-dialog>
	</el-row>
</template>

<script>
	import dialogBox from "plugin/common/modal.vue"
	import pictureBox from "plugin/common/pictureBox.vue"
	import store from 'store'
	import funList from './config_items/fun_list.vue'
	import mobileVideo from './config_items/mobile_video.vue'
	import liveSetting from './config_items/live_setting.vue'
	import Bus from './config_items/bus.js'

	export default {
		store,
		data: function() {
			return {
				hei3:'200',
				now_image: '',
				imglist2: '',
				share_sizew: '',
				share_sizeh: '',
				imglist: '',
				hei2: '',
				upbuttonif: false,
				new_multipart_params: {},
				showfile: false,
				dialogVisible2: false,
				setting_title: '',
				liveSetting: 'liveSetting',
				mobileVideo: 'mobileVideo',
				funList: 'funList',
				studio: null,
				show: false,
				setcover: function() {},
				setlogo: function() {},
				hei: '',
				wid: '',
				xl: '',
				yl: '',
			}
		},
		components: {
			dialogBox,
			pictureBox,
			funList,
			mobileVideo,
			liveSetting
		},
		computed: {
			notslide:function(){
				if(this.setting_title=='广告栏图片'){
					return false
				}else{
					return true
				}
			}
		},
		methods: {
			fen_click: function(obj) {
				this.setting_title = obj.setting_title
				this.share_sizew = obj.share_sizew
				this.share_sizeh = obj.share_sizeh
				this.now_image = obj.now_image
				this.dialogVisible2 = true
			},
			share_click: function(obj) {
				this.setting_title = obj.setting_title
				this.share_sizew = obj.share_sizew
				this.share_sizeh = obj.share_sizeh
				this.now_image = obj.now_image
				this.dialogVisible2 = true
			},
			changeshareimg: function() {
				var objimg = {}
				if(this.setting_title == '微信分享配置') {
					objimg = {
						share_img_url: this.imglist2
					}
					this.$http.put('/rooms/' + this.$route.params.id, objimg).then((response) => {
						console.log('success');
						console.log(response.body);
						this.$notify({
							title: '成功',
							message: '修改图片成功',
							type: 'success'
						});
						this.now_image = this.imglist2
						Bus.$emit('change', this.now_image)
						//						this.shareimg = this.imglist
					}, (response) => {
						console.log('error');
						console.log(response.body);
						this.$notify.error({
							title: '错误',
							message: '修改图片失败'
						});
					})
				} else if(this.setting_title=='封面设置') {
					objimg = {
						cover_img_url: this.imglist2
					}
					this.$http.put('/rooms/' + this.$route.params.id, objimg).then((response) => {
						console.log('success');
						console.log(response.body);
						this.$notify({
							title: '成功',
							message: '修改图片成功',
							type: 'success'
						});
						this.now_image = this.imglist2
						this.studio.cover_img_url = this.imglist2
					}, (response) => {
						console.log('error');
						console.log(response.body);
						this.$notify.error({
							title: '错误',
							message: '修改图片失败'
						});
					})
				}else{
					this.now_image=this.imglist2
					Bus.$emit('pushAdver',this.imglist2)
				}

			},
			set_key: function(file) {
				console.log(file);
				// return false
				this.new_multipart_params.name = file.name;
				this.new_multipart_params.key = this.new_multipart_params.dir + file.name;
			},
			getparams: function() {
				var url = "/aliyuns/oss";
				this.$http.get(url).then((response) => {
					console.log(response);
					var tempObj = {
							success_action_status: '200', //让服务端返回200,不然，默认会返回204
						},
						obj = {};

					if(Object.prototype.toString.call(response.body) === "[object String]") {
						obj = JSON.parse(response.body).data;
					} else {
						obj = response.body.data;
					}
					tempObj.policy = obj.policy;
					tempObj.OSSAccessKeyId = obj.accessid;
					tempObj.signature = obj.signature;
					tempObj.dir = obj.dir;
					tempObj.callback = obj.callback;
					this.new_multipart_params = tempObj;
				}, (response) => {

				});
			},
			call: function(response, file, fileList) {
				this.upbuttonif = true
				this.imglist = response.data.img_url
				var self = this
				var bei = ''
				var bili = ''
				var img2 = new Image()
				img2.src = this.imglist
				if(this.setting_title == '微信分享配置') {
					bili = 1
				} else if(this.setting_title=='广告栏图片') {
					bili = 5
				}else{
					bili=0.6
				}
				img2.onload = function() {
					// 这里获得阿里云返回图片的宽高算出宽高比和页面div进行比较 算出div按照比例的高
					// 之后算出倍数 为了在截图后 反应出以前尺寸的像素
					self.hei2 = img2.height / (img2.width / 200)
					bei = img2.width / 200
//					bei=200/img2.width
					// 这里是第一次创建jcropapi
					var a = setInterval(function() {
						if($('#element_id').src == this.imglist) {
							console.log($.Jcrop)
							$('#element_id').Jcrop({
								//选框宽高比
								aspectRatio: bili,
								onSelect: function() {
									var jcropApi = this
									self.hei= parseInt(jcropApi.tellSelect().h * parseFloat(bei))
									self.wid=parseInt(jcropApi.tellSelect().w * parseFloat(bei))
									self.xl = parseInt(jcropApi.tellSelect().x * parseFloat(bei))
									self.yl = parseInt(jcropApi.tellSelect().y * parseFloat(bei))
									self.imglist2 = self.imglist + '?x-oss-process=image/crop,x_' + self.xl + ',y_' + self.yl + ',w_' + self.wid + ',h_' + self.hei
									console.log(self.imglist2);
									console.log(jcropApi.tellSelect())
								},
								onRelease: function() {
									var jcropApi = this
									jcropApi.destroy()
									self.upbuttonif = false
								}
							}, function() {
								window.jcropApi = this
								// jcropApi.disable()
								// jcropApi.enable()
								var zuobiao = jcropApi.getBounds()
								jcropApi.setSelect([zuobiao[0] * 1 / 3, zuobiao[1] * 1 / 3, zuobiao[0] * 2 / 3, zuobiao[1] * 2 / 3])
							});
							console.log('ok')
							clearInterval(a)
						} else {
							console.log('not')
						}
					}, 100)
				}

			},
			reset_jcrop: function() {
				if(window.jcropApi) {
					window.jcropApi.release()
					window.jcropApi.destroy()
					this.upbuttonif = false
					$('#element_id2').height('200')
				}
			},
			init: function() {
				var self = this;
				var status = ''
				// 判断是否有推流
				this.$http.get('/deals/room/' + this.$route.params.id).then((response) => {
					console.log('success');
					console.log(response.body);
					status = response.body.data.status
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
				//把store中的组件信息初始化
				//store.commit('initPluginList');
				store.commit("closeModal"); //迷之modal
				//初始化房间信息
				self.studio = store.getters.getStudio;
				self.setcover = function(imgUrl, obj = self.studio) {
					obj.cover_img_url = imgUrl
				}
				self.setlogo = function(imgUrl, obj = self.studio) {
					obj.logo_url = imgUrl
				}
				//从vuex中读取组件的默认信息
				self.show = true;
				// 拿到视频地址
				//				self.loadPlayer(status)
			},
			getswitch: function() {
				this.$http.get('/deals/room/' + this.$route.params.id).then((response) => {
					console.log('success');
					console.log(response.body);
					//分享简介
					var intro = ''
					var radio = ''
					var money = ''
					var password = ''
					var value3 = ''
					var value4 = ''
					var value5 = ''
					var show1 = ''
					var show2 = ''
					if(response.body.data.share_intro == null) {
						intro = ''
					} else {
						intro = response.body.data.share_intro
					}
					// 拿到用户观看权限
					if(response.body.data.watch_permission == 1) {
						radio = 3
					} else if(response.body.data.watch_permission == 2) {
						radio = 6
					} else {
						radio = 9
					}
					//观看金额
					if(response.body.data.watch_pay_bill == null) {
						money = ''
					} else {
						money = response.body.data.watch_pay_bill
					}
					//房间密码
					if(response.body.data.room_password == null) {
						password = ''
					} else {
						password = response.body.data.room_password
					}
					//视频开关
					if(response.body.data.video_live_way == '0') {
						value3 = false
						value5 = false
					} else if(response.body.data.video_live_way == '1') {
						value3 = true
						value5 = false
					} else {
						value3 = false
						value5 = true
					}
					// 设置是否循环播放
					if(response.body.data.video_is_repeat_play == 0) {
						value4 = false
					} else {
						value4 = true
					}
					var obj = {
						yugao_value: value3,
						video_value: value5,
						repeat_value: value4
					}
					store.commit('setValueObject', obj)
					var obj2 = {
						intro: intro,
						radio: radio,
						ruleForm: {
							money: money
						},
						ruleForm2: {
							password: password
						}
					}
					store.commit('setLiveSettingData', obj2)
					// 没有设置视频直播或回放
					if(response.body.data.video_id == null) {
						show1 = false
						show2 = false
						//						this.showaddress1 = ''
						//						this.showaddress2 = ''
						store.commit('setAddress1', '')
						store.commit('setAddress2', '')
						var obj3 = {
							show1: false,
							show2: false
						}
						store.commit('setLiveSettingShow', obj3)
						this.init();
					} else {
						this.getvideoactive(response.body.data.video_id)
					}
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			getvideoactive: function(id) {
				this.$http.get('/videos/' + id).then((response) => {
					console.log('success');
					console.log(response.body);
					var show1 = ''
					var show2 = ''
					var showname = ''
					if(response.body.code == 0) {

					} else {
						if(response.body.set_live_way == 1) {
							show1 = false
							show2 = true
							showname = response.body.file_name
							//							this.showaddress2 = response.body.play_set[0].url
							//							this.showaddress1 = ''
							store.commit('setAddress1', '')
							store.commit('setAddress2', response.body.play_set[0].url)
						} else if(response.body.set_live_way == 2) {
							show2 = false
							show1 = true
							showname = response.body.file_name
							//							this.showaddress1 = response.body.play_set[0].url
							//							this.showaddress2 = ''
							store.commit('setAddress2', '')
							store.commit('setAddress1', response.body.play_set[0].url)
						}
						var obj = {
							show1: show1,
							show2: show2
						}
						store.commit('setLiveSettingShow', obj)
						store.commit('setShowName', showname)
					}
					this.init()
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
		},
		created() {
			var self=this
			Bus.$on('openDialog',function(src){
				self.setting_title='广告栏图片'
				self.share_sizew='300'
				self.share_sizeh='60'
				self.now_image=''
				self.dialogVisible2=true
			})
		},
		mounted() {
			this.getswitch()
			this.getparams()
		}
	}
</script>

<style lang="less">
	/*style Mobile*/
	
	.limit_item {
		margin-top: 1rem;
	}
	
	.allow {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	
	.shareimg {
		width: 50px;
		height: 50px;
		background-size: 100% 100%;
		cursor: pointer;
		border-radius: 0.3rem;
	}
	
	.input_content {
		display: flex;
	}
	
	.tuizhuo {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
	}
	
	.share_div .el-input__inner {
		border: 0;
	}
	
	#id_video_container {
		width: 359px;
		height: 201px;
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
		background-size: 100% 100%;
	}
	
	#TcPlayer {
		width: 359px;
		height: 205px;
	}
	
	.el-notification__content {
		text-align: center;
	}
	
	.el-notification__title {
		text-align: center;
	}
	
	.imgcontent {
		width: 150px;
		height: 250px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.imgcontent2 {
		width: 200px;
		height: 200px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.buttoncontainer p {
		text-decoration: underline;
		cursor: pointer;
	}
	
	.cover {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.el-form-item__content {
		width: 100%;
	}
	
	.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		background-color: #20a0ff;
		border-right-color: #20a0ff;
		border-left-color: #20a0ff;
	}
	/* jquery.Jcrop.min.css v0.9.12 (build:20130126) */
	/* jquery.Jcrop.css v0.9.12 - MIT License */
	/*
  The outer-most container in a typical Jcrop instance
  If you are having difficulty with formatting related to styles
  on a parent element, place any fixes here or in a like selector

  You can also style this element if you want to add a border, etc
  A better method for styling can be seen below with .jcrop-light
  (Add a class to the holder and style elements for that extended class)
*/
	
	.jcrop-holder {
		direction: ltr;
		text-align: left;
	}
	/* Selection Border */
	
	.jcrop-vline,
	.jcrop-hline {
		background: #ffffff;
		font-size: 0;
		position: absolute;
	}
	
	.jcrop-vline {
		height: 100%;
		width: 1px !important;
	}
	
	.jcrop-vline.right {
		right: 0;
	}
	
	.jcrop-hline {
		height: 1px !important;
		width: 100%;
	}
	
	.jcrop-hline.bottom {
		bottom: 0;
	}
	/* Invisible click targets */
	
	.jcrop-tracker {
		height: 100%;
		width: 100%;
		/* "turn off" link highlight */
		-webkit-tap-highlight-color: transparent;
		/* disable callout, image save panel */
		-webkit-touch-callout: none;
		/* disable cut copy paste */
		-webkit-user-select: none;
	}
	/* Selection Handles */
	
	.jcrop-handle {
		background-color: #333333;
		border: 1px #eeeeee solid;
		width: 7px;
		height: 7px;
		font-size: 1px;
	}
	
	.jcrop-handle.ord-n {
		left: 50%;
		margin-left: -4px;
		margin-top: -4px;
		top: 0;
	}
	
	.jcrop-handle.ord-s {
		bottom: 0;
		left: 50%;
		margin-bottom: -4px;
		margin-left: -4px;
	}
	.oneline{
		display: flex;
		justify-content: space-between;
	}
	.secondp{
		margin-top: 1rem;
	}
	.jcrop-handle.ord-e {
		margin-right: -4px;
		margin-top: -4px;
		right: 0;
		top: 50%;
	}
	
	.jcrop-handle.ord-w {
		left: 0;
		margin-left: -4px;
		margin-top: -4px;
		top: 50%;
	}
	
	.downtitle {
		margin-bottom: 1rem;
		color: #989898;
		font-size: 16px;
		flex-basis: 100%;
		text-align: center;
	}
	
	.jcrop-handle.ord-nw {
		left: 0;
		margin-left: -4px;
		margin-top: -4px;
		top: 0;
	}
	
	.jcrop-handle.ord-ne {
		margin-right: -4px;
		margin-top: -4px;
		right: 0;
		top: 0;
	}
	
	.jcrop-handle.ord-se {
		bottom: 0;
		margin-bottom: -4px;
		margin-right: -4px;
		right: 0;
	}
	
	.jcrop-handle.ord-sw {
		bottom: 0;
		left: 0;
		margin-bottom: -4px;
		margin-left: -4px;
	}
	/* Dragbars */
	
	.jcrop-dragbar.ord-n,
	.jcrop-dragbar.ord-s {
		height: 7px;
		width: 100%;
	}
	
	.jcrop-dragbar.ord-e,
	.jcrop-dragbar.ord-w {
		height: 100%;
		width: 7px;
	}
	
	.jcrop-dragbar.ord-n {
		margin-top: -4px;
	}
	
	.jcrop-dragbar.ord-s {
		bottom: 0;
		margin-bottom: -4px;
	}
	
	.jcrop-dragbar.ord-e {
		margin-right: -4px;
		right: 0;
	}
	
	.jcrop-dragbar.ord-w {
		margin-left: -4px;
	}
	/* The "jcrop-light" class/extension */
	
	.jcrop-light .jcrop-vline,
	.jcrop-light .jcrop-hline {
		background: #ffffff;
		filter: alpha(opacity=70) !important;
		opacity: .70!important;
	}
	
	.header2 .active {
		color: #20a0ff;
		background: #efefef;
	}
	
	.header2 span {
		cursor: pointer;
	}
	
	.header2 {
		display: flex;
		justify-content: space-between;
	}
	
	.headercontent {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}
	
	.jcrop-light .jcrop-handle {
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		background-color: #000000;
		border-color: #ffffff;
		border-radius: 3px;
	}
	/* The "jcrop-dark" class/extension */
	
	.jcrop-dark .jcrop-vline,
	.jcrop-dark .jcrop-hline {
		background: #000000;
		filter: alpha(opacity=70) !important;
		opacity: 0.7 !important;
	}
	
	.jcrop-dark .jcrop-handle {
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		background-color: #ffffff;
		border-color: #000000;
		border-radius: 3px;
	}
	/* Simple macro to turn off the antlines */
	
	.solid-line .jcrop-vline,
	.solid-line .jcrop-hline {
		background: #ffffff;
	}
	/* Fix for twitter bootstrap et al. */
	
	.jcrop-holder img,
	img.jcrop-preview {
		max-width: none;
	}
	
	.el-tabs--border-card>.el-tabs__content {
		padding: 0;
	}
	
	.header {
		display: flex;
	}
	
	.header span {
		flex-basis: 50%;
	}
	
	.feature {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}
</style>