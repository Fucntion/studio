<template>
	<el-tabs class="common" type="border-card" v-model="activeName">
		<el-tab-pane label="直播方式" name="first">
			<div class="origin">
				<div class="header" style='margin-top:0.5rem;'>
					<span class="header_tab" :class="showStatus_common2.live ?'active':''" @click="changeShow_common2('live')">推流直播</span>
					<span class="header_tab" :class="showStatus_common2.video ?'active':''" @click="changeShow_common2('video')">视频直播</span>
				</div>
				<div class="headercontent">
					<div class="header2" v-if='showStatus_common2.live' style='margin-top:1rem;'>
						<span class="header_tab" :class="showStatus_common3.pc ?'active':''" @click="changeShow_common3('pc')">桌面直播</span>
						<span class="header_tab" :class="showStatus_common3.ios ?'active':''" @click="changeShow_common3('ios')">IOS手机直播</span>
						<span class="header_tab" :class="showStatus_common3.android ?'active':''" @click="changeShow_common3('android')">安卓手机直播</span>
					</div>
					<div class="container" v-if='showStatus_common2.live'>
						<el-row class='tuizhuo'>
							<p>
								<span v-if='showStatus_common3.pc'>桌面</span>
								<span v-else-if='showStatus_common3.ios'>ios</span>
								<span v-else-if='showStatus_common3.android'>安卓</span>直播推流地址
							</p>
							<el-popover ref='popover1' placement='top-start' width='150' trigger='hover'>
								<qrcode :size='150' :val="studio.upstream_address"></qrcode>
							</el-popover>
							<img style='margin-left:0.5rem;' v-popover:popover1 src="~assets/img/code.png" alt="">
						</el-row>
						<el-row class='origin_show'>
							<div class="title">
								<p>{{studio.upstream_address}}</p>
								<el-button style='border-radius:0;' @click='copy' :data-clipboard-text='studio.upstream_address' size="small" class="copy" type="primary">复制</el-button>
							</div>
						</el-row>
						<el-row style='padding-top:3rem;padding-bottom:3rem;display: flex;flex-wrap: wrap;justify-content: center;'>
							<p class='downtitle' v-if='showStatus_common3.pc'>点击下载桌面直播工具</p>
							<p class='downtitle' v-else-if='showStatus_common3.ios'>扫码下载手机直播工具</p>
							<p class='downtitle' v-else-if='showStatus_common3.android'>扫码下载手机直播工具</p>
							<el-button v-if='showStatus_common3.pc' @click='downloadwin' style='border-radius:2rem;' type='primary'>windows版</el-button>
							<qrcode v-else-if='showStatus_common3.ios' val="http://icloudinn.live/app-debug.apk"></qrcode>
							<qrcode v-else-if='showStatus_common3.android' val="http://icloudinn.live/app-debug.apk"></qrcode>
						</el-row>
						<el-row>
							<el-col :span='12'>
								<p>回放/预告</p>
							</el-col>
							<el-col :span='12' style='text-align:right;'>
								<p>
									<span>开关</span>
									<el-switch :disabled='switch_disabled' @change='changeswitch' v-model="value3" on-color="#13ce66" off-color="#ff4949">
									</el-switch>
								</p>
							</el-col>
						</el-row>
						<el-row>
							<div v-if='show1' class="chosenlist">
								<p>{{showname}}</p>
								<p @click='addyugao' style='text-decoration:underline;cursor:pointer;'>重新选择</p>
							</div>
							<el-button :disabled='switch_disabled' style='width:100%;margin-top:1rem;' v-else @click='addyugao' type='primary'>+添加预告/回放</el-button>
						</el-row>
					</div>
					<div class="container" v-if='showStatus_common2.video'>
						<el-row>
							<div v-if='show2'>
								<p>{{this.showname}}</p>
								<p @click='addyugao' style='text-decoration:underline;cursor:pointer;'>重新选择</p>
								<el-button style='width:100%;' @click='changevalue5(true)' v-if='valueif' type='primary'>开始播放</el-button>
								<el-button style='width:100%;' @click='changevalue5(false)' v-else type='primary'>停止播放</el-button>
							</div>
							<el-button :disabled='switch_disabled' style='width:100%;' v-else @click='addyugao' type='primary'>添加视频播放</el-button>
						</el-row>
						<el-row style='margin-top:1rem;'>
							<el-col :span='16'>
								<p style='color:#989898;'>视频结束后可循环播放</p>
							</el-col>
							<el-col :span='8' style='text-align:right;'>
								<p>
									<span>开关</span>
									<el-switch :disabled='switch_disabled' @change='changeswitch2' v-model="value4" on-color="#13ce66" off-color="#ff4949">
									</el-switch>
								</p>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-dialog title='提示' @close='initagain' v-model='dialogVisible' size='large'>
					<div @close_dialog='initagain2' is='addbox'>
					</div>
				</el-dialog>
			</div>
		</el-tab-pane>
		<el-tab-pane label="个性设置" name="second">
			<div class="feature">
				<el-row>
					<el-form :inline="true" class="origin_form" >
						<p style='display: flex;align-items:center;margin-top: 0.5rem;'>
							<img class='word_img' src="~assets/img/share.png" /> 微信分享设置
						</p>
						<!--<el-form-item style='margin-bottom: 10px;width:100%;'>
							<el-row style='width:100%;'>
								<el-col :span='19'>
									<el-input v-model='studio.title'>
									</el-input>
								</el-col>
								<el-col :span='4'>
									<el-button class="submit_studio" size='small' type="primary" @click="onSubmit_origin">保存配置</el-button>
								</el-col>
							</el-row>
						</el-form-item>-->
						<el-form-item style='width:100%;margin-top: 0.5rem;margin-bottom: 0.5rem;'>
							<el-row style='width:100%;'>
								<el-col :span='24'>
									<div class='share_div' style='border: 1px solid #bfcbd9;padding: 0.5rem;'>
										<el-row style='display: flex;align-items: center;'>
											<el-col :span='20' class='share_left'>
												<p style='display: flex;color:#888888;'>
													<span style='word-break: keep-all;'>分享名称:</span>
													<el-input placeholder='默认直播间标题' v-model='studio.title'></el-input>
												</p>
												<p style='color: #c0c0c0;'>
													<span>请输入简介:</span>
													<div class='input_content'>
														<el-input style='border: 0;' placeholder='请输入分享简介' v-model='intro'></el-input>
													</div>
												</p>
											</el-col>
											<el-col :span='4' class='share_right'>
												<img @click='share_click' :src="shareimg" alt="" class='shareimg'>
											</el-col>
										</el-row>
									</div>
								</el-col>
							</el-row>
							<!--<el-dialog @close='reset_jcrop' :title="setting_title" v-model="dialogVisible2" size="small">
								<el-row>
									<el-col :span='12'>
										<el-row style='text-align: center;'>
											<p>图片大小2M以内支持PNG、JPG、JPEG格式</p>
											<el-upload :show-file-list='showfile' action="http://saaslive.oss-cn-shanghai.aliyuncs.com" :on-success="call" :data="new_multipart_params" :before-upload="set_key" :multiple="false">
												<el-button style='padding-left: 3rem;padding-right: 3rem;padding-top: 0.5rem;padding-bottom: 0.5rem;' :disabled='upbuttonif' type="primary" size="small">上传图片</el-button>
											</el-upload>
										</el-row>
										<div v-if='upbuttonif' style='margin-top: 1rem;'>
											<el-row :span='24' style='display:flex;justify-content:center;'>
												<img v-if='upbuttonif' id='element_id' width='200' :height='hei2' :src="imglist" alt="">
											</el-row>
											<el-row :span='24' style='margin-top:2rem;text-align:center;'>
												<el-button @click='changeshareimg' type='primary'>提交</el-button>
												<el-button type='primary' @click='reset_jcrop'>重置</el-button>
											</el-row>
										</div>
									</el-col>
									<el-col :span='12' style='text-align:center;'>
										<el-row>
											<el-col v-if='upbuttonif' :span='12'>
												<p>预览图标(128*128)</p>
												<img :width='share_sizew' :height='share_sizeh' :src="imglist2" alt="">
											</el-col>
											<el-col :span='12'>
												<p>当前图标(128*128)</p>
												<img :width='share_sizew' :height='share_sizeh' :src="now_image" alt="">
											</el-col>
										</el-row>
									</el-col>
								</el-row>
							</el-dialog>-->
						</el-form-item>
						<el-row>
							<el-col>
								<el-button style='width: 100%;' @click='changeShare' type='primary'>提交</el-button>
							</el-col>
						</el-row>
					</el-form>
				</el-row>
				<el-row style='margin-top: 1rem;'>
					<p style='display: flex;align-items:center;margin-top: 0.5rem;'>
						<img class='word_img' src="~assets/img/fengmian.png" />直播间封面
					</p>
					<div class="cover">
						<template v-if="studio.cover_img_url">
							<el-row style='width:100%;'>
								<el-col :span='19'>
									<!--<div class='imgcontent' :style='{"background-image":"url("+studio.cover_img_url+")"}'>-->
									<!--</div>-->
									<img class='imgcontent' :src="studio.cover_img_url" alt="" />
								</el-col>
								<el-col :span='5'>
									<div class="buttoncontainer">
										<!--<p style='color:#20a0ff;' @click="openPicture('设置封面',setcover)">更改封面</p>-->
										<p style='color:#20a0ff;' @click="fen_click">更改封面</p>
										<p style='color:#20a0ff;margin-top: 0.5rem;' @click='del_fen'>删除封面</p>
									</div>
								</el-col>
							</el-row>
						</template>
						<template v-else>
							<el-row style='width:100%;'>
								<el-col :span='19'>
									<div class='imgcontent'>
									</div>
								</el-col>
								<el-col :span='5'>
									<div class="buttoncontainer">
										<p style='color:#20a0ff;' @click="fen_click">上传封面</p>
										<p style='color:#20a0ff;margin-top: 0.5rem;' @click='del_fen'>删除封面</p>
									</div>
								</el-col>
							</el-row>
						</template>
					</div>
				</el-row>
				<!--<el-row>
					<h3>logo</h3>
					<div class="cover">
						<template v-if="studio.logo_url">
							<el-row style='width:100%;'>
								<el-col :span='19'>
									<img class='imgcontent2' :src="studio.logo_url" />
								</el-col>
								<el-col :span='5'>
									<div class="buttoncontainer">
										<p @click="openPicture('设置logo',setlogo)">更改logo</p>
										<p>删除logo</p>
									</div>
								</el-col>
							</el-row>
						</template>
						<template v-else>
							<el-row style='width:100%;'>
								<el-col :span='19'>
									<div class='imgcontent2'>
									</div>
								</el-col>
								<el-col :span='5'>
									<div class="buttoncontainer">
										<p @click="openPicture('设置logo',setlogo)">更改logo</p>
										<p>删除logo</p>
									</div>
								</el-col>
							</el-row>
						</template>
					</div>
				</el-row>-->
			</div>
		</el-tab-pane>
		<el-tab-pane label="观看设置" name="third">
			<div class="allow">
				<p style='display: flex;align-items:center;margin-top: 0.5rem;'>
					<img class='word_img' src="~assets/img/limit.png" /> 授权观看
				</p>
				<div class="container">
					<div class="limit">
						<el-radio-group @change='changeradio' v-model="radio">
							<el-tooltip class="item" effect="dark" content="所有人均可看" placement="bottom">
								<el-radio :label="3">无限制</el-radio>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="验证密码可看" placement="bottom">
								<el-radio :label="6">密码观看</el-radio>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="支付费用可看" placement="bottom">
								<el-radio :label="9">付费观看</el-radio>
							</el-tooltip>
						</el-radio-group>
					</div>
					<el-form class='limit_item' v-if='radio == "6"' :model='ruleForm2' :rules='rules2' ref='ruleForm2'>
						<el-form-item prop='password'>
							<el-input type='number' v-model='ruleForm2.password' placeholder='请输入6位数密码'></el-input>
						</el-form-item>
						<el-form-item>
							<el-button style='width: 100%;' :disabled='buttonif' @click='surepass' type='primary'>确认</el-button>
						</el-form-item>
						<p style='font-size: 0.5rem;color: #c0c0c0;'>用户只有填写对上面设置的密码才可观看直播</p>
					</el-form>
					<el-form class='limit_item' v-if='radio == "9"' :model='ruleForm' :rules='rules' ref='ruleForm'>
						<el-form-item prop='money'>
							<el-input type='number' v-model='ruleForm.money' placeholder='设置付款金额(元)'></el-input>
						</el-form-item>
						<el-form-item>
							<el-button style='width: 100%;' @click='surepay' type='primary'>确认</el-button>
						</el-form-item>
					</el-form>
				</div>
				<el-form class="origin_form" label-width="70px">
					<p style='display: flex;align-items:center;margin-top: 0.5rem;'>
						<img class='word_img' src="~assets/img/peoplenum.png" /> 人数限制<small>-1代表无限制</small>
					</p>
					<div class='num_content'>
						<el-input placeholder="设置直播间同时观看的人数上限" v-model="studio.watch_num_limit"></el-input>
						<el-button class="submit_studio" type="primary" @click="onSubmit_origin">保存配置</el-button>
					</div>
				</el-form>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import store from 'store'
	import Qrcode from 'plugin/common/Qrcode.vue'
	import Clipboard from 'clipboard'
	import addbox from '../video.vue'
	import Bus from './bus.js'
	export default {
		store,
		data: function() {
			var validatemoney = (rule, value, callback) => {
				if(value < 0) {
					callback(new Error('费用不能小于零'));
				} else {
					callback()
				}
			};
			var validatepassword = (rule, value, callback) => {
				if(value.length == 6) {
					this.buttonif = false
					callback();
				} else {
					this.buttonif = true
					callback(new Error('请输入6位密码'));
				}
			};
			return {
				title_input: '直播间名称',
				activeName: 'first',
				showStatus_common2: {
					live: true,
					video: false
				},
				showStatus_common3: {
					pc: true,
					ios: false,
					android: false
				},
//				now_image: '',
				setting_title: '',
//				share_sizew: '',
//				share_sizeh: '',
				studio: null,
				switch_disabled: false,
				value3: '',
				show1: false,
				showname: '',
				show2: false,
				value4: false,
				value5: false,
				dialogVisible: false,
				intro: '',
				dialogVisible2: false,
				shareimg: '',
				showfile: false,
//				new_multipart_params: {},
				upbuttonif: false,
//				imglist: '',
//				imglist2: '',
				radio: '',
//				hei2: '',
//				hei: '',
//				wid: '',
//				xl: '',
//				yl: '',
				ruleForm2: {
					password: ''
				},
				rules2: {
					password: [{
						validator: validatepassword,
						trigger: 'change'
					}]
				},
				buttonif: '',
				ruleForm: {
					money: '',
				},
				rules: {
					money: [{
						validator: validatemoney,
						trigger: 'change'
					}],
				},
				setcover: function() {},
				setlogo: function() {},
			}
		},
		components: {
			Qrcode,
			addbox
		},
		computed: {
			valueif: function() {
				if(this.value5 == true) {
					return false
				} else {
					return true
				}
			},
		},
		methods: {
			initagain2: function() {
				this.dialogVisible = false
				this.initagain()
			},
			surepay: function() {
				var value = ''
				if(this.ruleForm.money == '') {
					value = null
				} else {
					value = this.ruleForm.money
				}
				this.$http.put('/rooms/' + this.$route.params.id, {
					watch_permission: 3,
					watch_pay_bill: value,
					room_password: null
				}).then((response) => {
					// console.log('success');
					// console.log(response.body);
					this.ruleForm2.password = ''
					this.$notify({
						title: '成功',
						message: '修改金额成功',
						type: 'success'
					});
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
					this.$notify.error({
						title: '错误',
						message: '修改金额失败'
					});
				})
			},
			share_click: function() {
				var self=this
				var obj={
					setting_title:'微信分享配置',
					share_sizew:'100',
					share_sizeh:'100',
					now_image:self.shareimg,
					dialogVisible2:true
				}
				this.$emit('share_click',obj)
			},
			fen_click: function() {
//				this.setting_title = '封面设置'
//				this.share_sizew = '150'
//				this.share_sizeh = '250'
//				this.now_image = this.studio.cover_img_url
//				this.dialogVisible2 = true
				var self=this
				var obj={
					setting_title:'封面设置',
					share_sizew:'150',
					share_sizeh:'250',
					now_image:self.studio.cover_img_url,
					dialogVisiblie2:true
				}
				this.$emit('fen_click',obj)
			},
			surepass: function(formName) {
				var value = ''
				if(this.ruleForm2.password == '') {
					value = null
				} else {
					value = this.ruleForm2.password
				}
				this.$http.put('/rooms/' + this.$route.params.id, {
					watch_permission: 2,
					room_password: value,
					watch_pay_bill: null
				}).then((response) => {
					// console.log('success');
					// console.log(response.body);
					this.ruleForm.money = ''
					this.$notify({
						title: '成功',
						message: '修改密码成功',
						type: 'success'
					});
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
					this.$notify.error({
						title: '错误',
						message: '修改密码失败'
					});
				})
			},
			changeradio: function(val) {
				var value = ''
				if(val == 3) {
					value = '1'
				} else if(val == 6) {
					value = '2'
				} else {
					value = '3'
				}
				this.$http.put('/rooms/' + this.$route.params.id, {
					watch_permission: value
				}).then((response) => {
					// console.log('success');
					// console.log(response.body);
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
				})
			},
			openPicture: function(title, callback) {
				// type用来区分不同的用途，用来设置不同的回调
				// console.log(callback);
				var obj = {};
				obj.title = title;
				obj.callback = callback;
				store.commit("openPicture", obj);
			},
			changeShare: function() {
				this.$http.put('/rooms/' + this.$route.params.id, {
					share_intro: this.intro,
					title: this.studio.title
				}).then((response) => {
					// console.log('success');
					// console.log(response.body);
					this.$notify({
						title: '成功',
						message: '修改分享配置成功',
						type: 'success'
					});
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
					this.$notify.error({
						title: '错误',
						message: '修改分享配置失败'
					});
				})
			},
//			reset_jcrop: function() {
//				window.jcropApi.release()
//				window.jcropApi.destroy()
//				this.upbuttonif = false
//			},
//			changeshareimg: function() {
//				var objimg = {}
//				if(this.setting_title == '微信分享设置') {
//					objimg = {
//						share_img_url: this.imglist2
//					}
//					this.$http.put('/rooms/' + this.$route.params.id, objimg).then((response) => {
//						console.log('success');
//						console.log(response.body);
//						this.$notify({
//							title: '成功',
//							message: '修改图片成功',
//							type: 'success'
//						});
//						this.now_image = this.imglist2
//						this.shareimg = this.imglist
//					}, (response) => {
//						console.log('error');
//						console.log(response.body);
//						this.$notify.error({
//							title: '错误',
//							message: '修改图片失败'
//						});
//					})
//				} else {
//					objimg = {
//						cover_img_url: this.imglist2
//					}
//					this.$http.put('/rooms/' + this.$route.params.id, objimg).then((response) => {
//						console.log('success');
//						console.log(response.body);
//						this.$notify({
//							title: '成功',
//							message: '修改图片成功',
//							type: 'success'
//						});
//						this.now_image = this.imglist2
//						this.studio.cover_img_url = this.imglist2
//					}, (response) => {
//						console.log('error');
//						console.log(response.body);
//						this.$notify.error({
//							title: '错误',
//							message: '修改图片失败'
//						});
//					})
//				}
//
//			},
//			set_key: function(file) {
//				console.log(file);
//				// return false
//				this.new_multipart_params.name = file.name;
//				this.new_multipart_params.key = this.new_multipart_params.dir + file.name;
//			},
			del_fen: function() {
				this.studio.cover_img_url = null
				this.$http.put('/rooms/' + this.$route.params.id, {
					cover_img_url: null
				}).then((response) => {
					// console.log('success');
					// console.log(response.body);
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
				})
			},
//			call: function(response, file, fileList) {
//				this.upbuttonif = true
//				this.imglist = response.data.img_url
//				var self = this
//				var bei = ''
//				var bili = ''
//				var img2 = new Image()
//				img2.src = this.imglist
//				if(this.setting_title == '微信分享设置') {
//					bili = 1
//				} else {
//					bili = 0.6
//				}
//				img2.onload = function() {
//					// 这里获得阿里云返回图片的宽高算出宽高比和页面div进行比较 算出div按照比例的高
//					// 之后算出倍数 为了在截图后 反应出以前尺寸的像素
//					self.hei2 = img2.height / (img2.width / 200)
//					bei = img2.width / 200
//					// 这里是第一次创建jcropapi
//					var a = setInterval(function() {
//						if($('#element_id').src == this.imglist) {
//							console.log($.Jcrop)
//							$('#element_id').Jcrop({
//								//选框宽高比
//								aspectRatio: bili,
//								onSelect: function() {
//									var jcropApi = this
//									self.hei = self.wid = parseInt(jcropApi.tellSelect().h * parseFloat(bei))
//									self.xl = parseInt(jcropApi.tellSelect().x * parseFloat(bei))
//									self.yl = parseInt(jcropApi.tellSelect().y * parseFloat(bei))
//									self.imglist2 = self.imglist + '?x-oss-process=image/crop,x_' + self.xl + ',y_' + self.yl + ',w_' + self.wid + ',h_' + self.hei
//									console.log(self.imglist2);
//									console.log(jcropApi.tellSelect())
//								},
//								onRelease: function() {
//									var jcropApi = this
//									jcropApi.destroy()
//									self.upbuttonif = false
//								}
//							}, function() {
//								window.jcropApi = this
//								// jcropApi.disable()
//								// jcropApi.enable()
//								var zuobiao = jcropApi.getBounds()
//								jcropApi.setSelect([zuobiao[0] * 1 / 3, zuobiao[1] * 1 / 3, zuobiao[0] * 2 / 3, zuobiao[1] * 2 / 3])
//							});
//							console.log('ok')
//							clearInterval(a)
//						} else {
//							console.log('not')
//						}
//					}, 100)
//				}
//
//			},
			onSubmit_origin(obj) {

				var time = this.studio.play_time_show;

				if(Object.prototype.toString.call(time) == '[object Date]') {
					// console.log('时间是对象，需要转换成时间戳');
					time = time.getTime();
				}

				// php和js的时间戳位数不一样
				if((time + '').length == 13) {
					// console.log('长度是13位，要转换成php时间戳');
					time = parseInt(time / 1000);
				}

				this.studio.play_time = time;

				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio
				}

				store.commit('changeStudio', data);

			},
			initagain: function() {
				localStorage.setItem('fromconfig', '0')
				this.getswitch()
			},
			changeswitch2: function(val) {
				if(val == true) {
					this.$http.put('/rooms/' + this.$route.params.id, {
						video_is_repeat_play: 1
					}).then((response) => {
						// console.log('success');
						// console.log(response.body);
					}, (response) => {
						// console.log('error');
						// console.log(response.body);
					})
				} else {
					this.$http.put('/rooms/' + this.$route.params.id, {
						video_is_repeat_play: 0
					}).then((response) => {
						// console.log('success');
						// console.log(response.body);
					}, (response) => {
						// console.log('error');
						// console.log(response.body);
					})
				}
			},
			getswitch: function() {
				this.$http.get('/deals/room/' + this.$route.params.id).then((response) => {
					// console.log('success');
					// console.log(response.body);
					//视频开关
					if(response.body.data.video_live_way == '0') {
						this.value3 = false
						this.value5 = false
					} else if(response.body.data.video_live_way == '1') {
						this.value3 = true
						this.value5 = false
					} else {
						this.value3 = false
						this.value5 = true
					}
					// 设置是否循环播放
					if(response.body.data.video_is_repeat_play == 0) {
						this.value4 = false
					} else {
						this.value4 = true
					}
					var obj = {
						yugao_value: this.value3,
						video_value: this.value5,
						repeat_value: this.value4
					}
					store.commit('setValueObject', obj)
					if(response.body.data.video_id == null) {
						// console.log('null')
						this.show1 = false
						this.show2 = false
						store.commit('setAddress1', '')
						store.commit('setAddress2', '')
					} else {
						// console.log('notnull')
						this.getvideoactive(response.body.data.video_id)
					}
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
				})
			},
			getvideoactive: function(id) {
				this.$http.get('/videos/' + id).then((response) => {
					// console.log('success');
					// console.log(response.body);
					if(response.body.code == 0) {

					} else {
						if(response.body.set_live_way == 1) {
							console.log('1')
							this.show1 = false
							this.show2 = true
							this.showname = response.body.file_name
							store.commit('setAddress1', '')
							store.commit('setAddress2', response.body.play_set[0].url)
						} else if(response.body.set_live_way == 2) {
							// console.log('2')
							this.show2 = false
							this.show1 = true
							this.showname = response.body.file_name
							store.commit('setAddress2', '')
							store.commit('setAddress1', response.body.play_set[0].url)
						}
					}
				}, (response) => {
					// console.log('error');
					// console.log(response.body);
				})
			},
			changevalue5: function(val) {
				if(val == true) {
					this.value3 = false
					this.$http.put('/rooms/' + this.$route.params.id, {
						video_live_way: 2
					}).then((response) => {
						// console.log('success');
						// console.log(response.body);
						this.getswitch()
					}, (response) => {
						// console.log('error');
						// console.log(response.body);
					})
				} else {
					if(this.value3 == true) {
						this.$http.put('/rooms/' + this.$route.params.id, {
							video_live_way: 1
						}).then((response) => {
							// console.log('success');
							// console.log(response.body);
							this.getswitch()
						}, (response) => {
							// console.log('error');
							// console.log(response.body);
						})
					} else {
						this.$http.put('/rooms/' + this.$route.params.id, {
							video_live_way: 0
						}).then((response) => {
							// console.log('success');
							// console.log(response.body);
							this.getswitch()
						}, (response) => {
							// console.log('error');
							// console.log(response.body);
						})
					}
				}
			},
			addyugao: function() {
				this.dialogVisible = true
				localStorage.setItem('fromconfig', '1')
			},
			changeswitch: function(val) {
				if(val == true) {
					this.value5 = false
					this.$http.put('/rooms/' + this.$route.params.id, {
						video_live_way: 1
					}).then((response) => {
						// console.log('success');
						// console.log(response.body);
						this.getswitch()
					}, (response) => {
						// console.log('error');
						// console.log(response.body);
					})
				} else {
					if(this.value5 == true) {
						this.$http.put('/rooms/' + this.$route.params.id, {
							video_live_way: 2
						}).then((response) => {
							// console.log('success');
							// console.log(response.body);
							this.getswitch()
						}, (response) => {
							// console.log('error');
							// console.log(response.body);
						})
					} else {
						this.$http.put('/rooms/' + this.$route.params.id, {
							video_live_way: 0
						}).then((response) => {
							// console.log('success');
							// console.log(response.body);
							this.getswitch()
						}, (response) => {
							// console.log('error');
							// console.log(response.body);
						})
					}
				}
			},
			changeShow_common2: function(name) {
				for(var k in this.showStatus_common2) {
					if(k == name) {
						this.showStatus_common2[k] = true;
						continue;
					}
					this.showStatus_common2[k] = false;
				}
			},
			changeShow_common3: function(name) {
				for(var k in this.showStatus_common3) {
					if(k == name) {
						this.showStatus_common3[k] = true;
						continue;
					}
					this.showStatus_common3[k] = false;
				}
			},
			copy: function(event) {
				var clipboard = new Clipboard('.copy');
				this.$notify({
					title: '成功',
					message: '复制成功',
					type: 'success'
				})
			},
			downloadwin: function() {
				window.location.href = 'http://icloudinn.live/OBS-Studio-0.16.5-Full-Installer.exe'
			},
			// 初始化上传访问阿里云拿到参数
			getparams: function() {
				var url = "/aliyuns/oss";
				this.$http.get(url).then((response) => {
					// console.log(response);
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
			getshareimg: function() {
				this.$http.get('/deals/room/' + this.$route.params.id).then((response) => {
					// console.log('success');
					if(response.body.data.share_img_url !== null) {
						this.shareimg = response.body.data.share_img_url
					} else {
						this.shareimg = 'http://imgsrc.baidu.com/forum/w%3D580/sign=022b8bac41a98226b8c12b2fba80b97a/746b86ec08fa513dcf7865073f6d55fbb0fbd97a.jpg'
					}
				}, (response) => {
					// console.log('error');
				})
			}
		},
		created() {
			var self=this
			this.studio = store.getters.getStudio
			Bus.$on('change',function(src){
				self.shareimg=src
			})
		},
		mounted() {
			var obj = store.getters.getLiveSettingData
			this.intro = obj.intro
			this.radio = obj.radio
			this.ruleForm.money = obj.ruleForm.money
			this.ruleForm2.password = obj.ruleForm2.password
			var obj2 = store.getters.getValueObject
			this.value3 = obj2.yugao_value
			this.value4 = obj2.repeat_value
			this.value5 = obj2.video_value
			var obj3 = store.getters.getLiveSettingShow
			this.show1 = obj3.show1
			this.show2 = obj3.show2
			this.showname = store.getters.getShowName
			this.getparams()
			this.getshareimg()
			this.setcover = function(imgUrl, obj = self.studio) {
				store.commit('setStudioCoverImg', imgUrl)
			}
			this.setlogo = function(imgUrl, obj = self.studio) {
				store.commit('setStudioLogoUrl', imgUrl)
			}
			if(this.studio.status == 1) {
				this.switch_disabled = true
			}
		}
	}
</script>

<style lang='less'>
	.word_img {
		width: 20px;
	}
	
	.num_content {
		display: flex;
		margin-top: 1rem;
		.el-button {
			border-radius: 0;
		}
		.el-input__inner {
			border-radius: 0;
		}
	}
</style>