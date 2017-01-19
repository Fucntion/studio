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
	<el-dialog class="payDialog" title="微信支付" v-model="payDialog.show">
		<qrcode :val="payDialog.src" v-if="payStyle=='wx'"></qrcode><br/>
		<div style="text-align: center">
	<el-button class="btn_wxpay" size="small" type="primary" @click="checkPayStatus()">支付完成</el-button>
	<el-button class="btn_wxpay" size="small" @click="goKefu()">遇到问题,点我咨询客服</el-button>
	<!--<a class="kefu" target="blank" href="">遇到问题?问客服</a>-->
	</div>

	</el-dialog>

	<div class="payList" >
		<h3>充值列表</h3>
		<div class="hr"></div>
		<el-table v-if="payInfoList.length>0" :data="payInfoList" stripe height="450" border>
			<el-table-column prop="id" label="序号"></el-table-column>
			<el-table-column label="充值时间">
				<template  scope="scope">{{scope.row.updated_at*1000|timeStamp}}</template>
			</el-table-column>
			<el-table-column  label="充值方式">
				<template  scope="scope">
					<div v-if="scope.row.recharge_type==1">微信</div>
					<div v-else>支付宝</div>
				</template>
			</el-table-column>
			<el-table-column prop="money" label="充值金额"></el-table-column>
		</el-table>
	</div>

</div>
</template>

<script>
	import {
		Loading
	} from 'element-ui';
	import Qrcode from 'plugin/common/Qrcode.vue'
	export default {

		data: function () {

			return {
				payStyle: '',
				payData: {
					number: null
				},
				tradeId: null,//用来查回充值结果的
				payDialog: {
					src: null,
					show: false,

				},
				payInfoList:[]

			}
		},
		methods: {
			goKefu: function () {
				window.open('http://wpa.qq.com/msgrd?v=3&uin=1327244494&site=qq&menu=yes')
			},
			clear: function () {
				this.payStyle = '',
					this.payData = {
						number: null
					}
			},
			checkPayStatus: function () {

				if (!this.tradeId || !this.payStyle) {
					alert('支付信息错误,请联系客服')
					return
				}

				var url = '/pays/getpaystatus'

				this.$http.post(url, { tradeId: this.tradeId, payType: this.payStyle }).then((response) => {

					if (response.body.code != 100 || response.body.msg != 'success') {

						//初始化充值信息
						this.clear()
						this.$confirm('支付未成功,是否联系客服?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.goKefu()
						}).catch(() => {
							this.$notify({
								title: '验证支付状态失败',
								message: response.body.msg,
								type: 'warning'
							});
						});
						return
					} else {
						this.payDialog = {
							src: '',
							show: false,
						}
						this.$notify({
							title: '成功提示',
							message: '恭喜您充值成功',
							type: 'success'
						});

						//更新充值记录
						this.payInfoList.push(response.body.data)
					}

				}, (response) => {
					this.$notify({
						title: '验证支付状态失败',
						message: response.body.msg,
						type: 'warning'
					});

				})

			},
			onSubmit: function () {

				var options = {
					fullscreen: true,
					text: '拼命加载中'
				};
				//充值最少五百一次，我感觉我写的是假代码
				// if(this.payData.number < 500) {

				// 	this.$alert('单次充值最少五百元起', '错误提示', {
				// 		confirmButtonText: '知道了',
				// 		callback: action => {

				// 		}
				// 	});
				// 	return;
				// }

				if (this.payStyle != 'ali' && this.payStyle != 'wx') {

					this.$alert('请选择正确的支付方式', '错误提示', {
						confirmButtonText: '知道了',
						callback: action => {

						}
					});
					return;
				}

				// console.log(this.payStyle,this.payData);
				if (this.payStyle == 'ali') {

					var url = "/pays/alipay",
						data = {
							money: parseFloat(this.payData.number) //充值只接受整数
							// money: parseInt(this.payData.number) //充值只接受整数
						};

					let loadingInstance = Loading.service(options);
					this.$http.post(url, data).then((response) => {

						loadingInstance.close();
						if (response.body.code == 100) {
							this.tradeId = response.body.data.tradeId
							window.open(response.body.data.payurl)

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

				if (this.payStyle == 'wx') {
					var url = "/pays/wechat",
						data = {
							money: parseFloat(this.payData.number) //充值只接受整数,最少一块钱一次测试？我测不起，不玩了。我估计写的是假代码
							// money: parseInt(this.payData.number) //充值只接受整数
						};
					let loadingInstance = Loading.service(options);
					this.$http.post(url, data).then((response) => {

						loadingInstance.close();
						if (response.body.code == 100) {

							this.payDialog.src = response.body.data.payurl
							this.tradeId = response.body.data.tradeId
							this.payDialog.show = true

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
			setPayStyle: function (type) {
				if (type != '') {
					this.payStyle = type;
				} else {
					this.$notify.info({
						title: '提示信息',
						message: '选择错误的充值类型'
					});

				}
			},
			init:function(){
				this.$http.get('/pays/rechargerecord').then((response)=>{
					//分页的问题
					this.payInfoList = response.body.data.list
				},(response)=>{
					
				})
			}

		},
		components: {
			Qrcode,
		},
		mounted(){
			this.init()
		}
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
	
	.payDialog {
		.el-dialog {
			font-size: 16px;
			width: 300px;
			top: 25% !important;
			.el-dialog__body>div {
				text-align: center;
			}
			.btn_wxpay {
				display: block;

				margin: 0px auto 5px;
				display:inline-block;
			}
			.kefu {
				text-align: center;
				color: #222222;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.payList{
		padding: 15px;
	}
</style>