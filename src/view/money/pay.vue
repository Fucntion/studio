<template>
	<div>
		<el-form ref="payform" :model="payData" label-width="100px">
			<el-form-item label="当前余额">
				￥3000.00 元
			</el-form-item>
			<el-form-item label="充值金额">
				<el-input type="number" placeholder="单次充值最少五百元起" style="width:300px;" v-model="payData.number"></el-input>
			</el-form-item>
			<el-form-item label="支付方式">
				<div class="payStyle">
					<template v-if="payStyle=='ali'">
						<img src="~assets/img/ali_active.png">
					</template>
					<template v-else>
						<img @click="setPayStyle('ali')" src="~assets/img/ali.png">
					</template>
					<template v-if="payStyle=='wx'">
						<img src="~assets/img/wx_active.png">
					</template>
					<template v-else>
						<img @click="setPayStyle('wx')" src="~assets/img/wx.png">
					</template>

				</div>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" @click="onSubmit">确认支付</el-button>

			</el-form-item>
		</el-form>

		<el-dialog class="wxpayDialog" title="微信支付" v-model="wxdialog.show">
			<qrcode :val="wxdialog.src"></qrcode><br/>
			<el-button class="btn_wxpay" size="small" type="primary" @click="onSubmit">支付完成</el-button>
			<!-- <el-button class="btn_wxpay"  size="small" @click="onSubmit">遇到问题</el-button> -->
			<a class="kefu" target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=1327244494&site=qq&menu=yes">遇到问题?问客服</a>
		</el-dialog>

	</div>
</template>

<script>
	import {
		Loading
	} from 'element-ui';
	import Qrcode from '../../components/common/Qrcode.vue'
	export default {

		data: function() {

			return {
				payStyle: '',
				payData: {
					number: null
				},
				wxdialog: {
					src: null,
					show: false
				}

			}
		},
		methods: {
			onSubmit: function() {

				var options = {
					fullscreen: true,
					text: '拼命加载中'
				};

				if(this.payData.number < 500) {

					this.$alert('单次充值最少五百元起', '错误提示', {
						confirmButtonText: '知道了',
						callback: action => {

						}
					});
					return;
				}

				if(this.payStyle != 'ali' && this.payStyle != 'wx') {

					this.$alert('请选择正确的支付方式', '错误提示', {
						confirmButtonText: '知道了',
						callback: action => {

						}
					});
					return;
				}

				// console.log(this.payStyle,this.payData);
				if(this.payStyle == 'ali') {

					var url = "/pays/alipay",
						data = {
							money: parseInt(this.payData.number) //充值只接受整数
						};

					let loadingInstance = Loading.service(options);
					this.$http.post(url, data).then((response) => {

						loadingInstance.close();
						if(response.body.code == 100) {

							window.open(response.body.data);

						} else {
							this.$notify({
								title: '获取支付宝参数失败',
								message: response.body.msg,
								type: 'warning'
							});
						}

					}, (response) => {
						loadingInstance.close();

						this.$alert('充值失败', '错误提示', {
							confirmButtonText: '知道了',
							callback: action => {

							}
						});

					});

					return;
				}

				if(this.payStyle == 'wx') {
					var url = "/pays/wechat",
						data = {
							money: parseInt(this.payData.number) //充值只接受整数
						};
					let loadingInstance = Loading.service(options);
					this.$http.post(url, data).then((response) => {

						loadingInstance.close();
						if(response.body.code == 100) {

							this.wxdialog.src = response.body.data;
							this.wxdialog.show = true;

						} else {
							this.$notify({
								title: '充值失败',
								message: response.body.msg,
								type: 'warning'
							});
						}

					}, (response) => {

						loadingInstance.close();
						this.$alert('充值失败', '错误提示', {
							confirmButtonText: '知道了',
							callback: action => {

							}
						});

					});

					return;
				}

				this.$alert('意外的错误,请刷新页面', '错误提示', {
					confirmButtonText: '知道了',
					callback: action => {

					}
				});
				return;

			},
			setPayStyle: function(type) {
				if(type != '') {
					this.payStyle = type;
				} else {
					this.$notify.info({
						title: '提示信息',
						message: '选择错误的充值类型'
					});

				}
			}
		},

		components: {
			Qrcode,
		},
	}
</script>

<style lang="less">
	.payStyle {
		img {
			cursor: pointer;
			width: 120px;
			margin-right: 35px;
		}
	}
	
	.wxpayDialog {
		.el-dialog {
			font-size: 16px;
			width: 300px;
			top: 25% !important;
			.el-dialog__body>div {
				text-align: center;
			}
			.btn_wxpay {
				display: block;
				// margin-left: 15px;
				margin: 0px auto 5px;
				// display:inline-block;
			}
			.kefu {
				text-align: center;
				// text-decoration:none; 
				color: #222222;
				display: block;
				margin: 0 auto;
			}
		}
		// width:200px;
	}
</style>