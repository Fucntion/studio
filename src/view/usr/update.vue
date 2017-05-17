<template>
<div class="updatecontainer" style='padding:2rem;background:white;'>
	<el-row>
		<el-col>
			<table>
				<tr style='border-bottom:0;'>
					<th style='background: #dedede;padding-top: 1.5rem;padding-bottom: 1.5rem;'>功能名称</th>
					<th style='background: #f2f2f2;padding-top: 1.5rem;padding-bottom: 1.5rem;'>普通用户</th>
					<th style='background: #dedede;padding-top: .35rem;padding-bottom: .35rem;'>高级用户￥5800.00/年
						</br>
						<el-button @click='goupdate(1)' style='margin-top:0.5rem;' size='small' type='primary'>立即升级</el-button>
					</th>
					<th style='background: #f2f2f2;padding-top: .35rem;padding-bottom: .35rem;'>VIP用户￥8800/年
						</br>
						<el-button @click='goupdate(2)' style='margin-top:0.5rem;' size='small' type='primary'>立即升级</el-button>
					</th>
					<el-dialog title='请选择支付方式' v-model='dialogVisible' size='tiny'>
						<el-row style='display: flex;'>
							<el-col style='text-align:center;'>
								<!-- <img style='cursor:pointer;' @click='imgclick(1)' v-bind:class='{"imgclick":img1}' src="~assets/img/ali.png" /> -->
								<el-radio v-model='imgnum' label='1'>
									<img style='width:92px;height:32px;' src="~assets/img/ali.png" alt="">
								</el-radio>
							</el-col>
							<el-col style='text-align:center;'>
								<!-- <img style='cursor:pointer;' @click='imgclick(2)' v-bind:class='{"imgclick":img2}' src="~assets/img/wx.png" alt="" /> -->
								<el-radio v-model='imgnum' label='2'>
									<img style='width:92px;height:32px;' src="~assets/img/wx.png" alt="">
								</el-radio>
							</el-col>
						</el-row>
						<el-row>
							<el-button type='primary' @click='topay' style='width: 100%;'>确定</el-button>
						</el-row>
					</el-dialog>
					<el-dialog title='微信支付' v-model='dialogVisible2' size='small'>
						<el-row>
							<el-col :span='12' style='text-align:center;'>
								<p>￥{{wxcost}}</p>
								</br>
								<qrcode :val='wxcode'></qrcode><br/>
								<p>请使用微信扫一扫完成支付</p>
								<p>支付完成请进去我的账户查看结果</p>
							</el-col>
							<el-col :span='12' style='text-align:center;'>
								<el-button @click='checkPayStatus' type='primary'>支付完成请点我确认</el-button>
								<el-button style='margin-top:4rem;'>遇到问题?点我咨询在线客服</el-button>
								<p style='margin-top:1rem;'>或拨打电话020000000寻求帮助</p>
							</el-col>
						</el-row>
					</el-dialog>
				</tr>
				<!-- <tr class='mytr' v-for='(item,index) in updatelist'>
					<td>{{item.name}}</td>
					<td>{{item.normal}}</td>
					<td>{{item.high}}</td>
					<td>{{item.vip}}</td>
				</tr> -->
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>一、基础配置</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in baseconfig'>
					<td :class='{"redcolor":item.color}'>{{item.name}}</td>
					<td :class='{"redcolor":item.color}'>{{item.base}}</td>
					<td :class='{"redcolor":item.color}'>{{item.renzheng}}</td>
					<td :class='{"redcolor":item.color}'>{{item.vip}}</td>
				</tr>
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>二、功能组件</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in funconfig'>
					<td>{{item.name}}</td>
					<td>{{item.base}}</td>
					<td>{{item.renzheng}}</td>
					<td>{{item.vip}}</td>
				</tr>
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>三、数据分析</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in dataconfig'>
					<td :class='{"redcolor":item.color}'>{{item.name}}</td>
					<td>{{item.base}}</td>
					<td>{{item.renzheng}}</td>
					<td>{{item.vip}}</td>
				</tr>
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>四、个性化设置</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in personalconfig'>
					<td>{{item.name}}</td>
					<td>{{item.base}}</td>
					<td>{{item.renzheng}}</td>
					<td>{{item.vip}}</td>
				</tr>
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>五、云储存</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in cloudyconfig'>
					<td :class='{"redcolor":item.color}'>{{item.name}}</td>
					<td :class='{"redcolor":item.color}'>{{item.base}}</td>
					<td :class='{"redcolor":item.color}'>{{item.renzheng}}</td>
					<td :class='{"redcolor":item.color}'>{{item.vip}}</td>
				</tr>
				<tr class='mytr' style='background:#20a0ff;'>
					<td style='background:#20a0ff;'>六、技术支持</td>
				</tr>
				<tr class='mytr' v-for='(item,index) in teconfig'>
					<td>{{item.name}}</td>
					<td>{{item.base}}</td>
					<td>{{item.renzheng}}</td>
					<td>{{item.vip}}</td>
				</tr>
			</table>
		</el-col>
	</el-row>
</div>
</template>

<script>
import {
	Loading
} from 'element-ui'
import Qrcode from 'plugin/common/Qrcode.vue'
export default {
	data: function() {
		return {
			// 微信支付价格
			wxcost: '',
			// 选择升级高级还是vip 1是高级 2是vip
			yonghu: '',
			// 用于验证微信支付是否成功
			tradeId: '',
			//微信支付 二维码
			wxcode: '',
			// 微信支付弹框
			dialogVisible2: false,
			// 选择微信还是支付宝
			imgnum:'1',
			//升级弹出框
			dialogVisible: false,
			// 基础配置
			baseconfig:[{
				name:'直播房间数量',
				base:'不限',
				renzheng:'不限',
				vip:'不限'
			},{
				name:'观看人数限制',
				base:'×',
				renzheng:'√',
				vip:'√',
				color:true
			},{
				name:'视频直播次数',
				base:'50次',
				renzheng:'不设限',
				vip:'不设限'
			},{
				name:'手机直播',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'微信分享',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'直播回放',
				base:'√',
				renzheng:'√',
				vip:'√'
			}],
			// 功能组件
			funconfig:[{
				name:'边看边聊',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'大转盘',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'抽奖',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'调查问卷',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'红包雨',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'销售商品个数',
				base:'(5个)',
				renzheng:'(30个)',
				vip:'不限'
			}],
			// 数据分析
			dataconfig:[{
				name:'用户信息分析',
				base:'20',
				renzheng:'√',
				vip:'√',
				color:'red'
			},{
				name:'观看时长统计',
				base:'√',
				renzheng:'√',
				vip:'√'
			},{
				name:'收益分析',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'表单数据',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'红包数据统计',
				base:'√',
				renzheng:'√',
				vip:'√'
			}],
			// 个性化设置
			personalconfig:[{
				name:'授权观看',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'定时开播',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'倒计时',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'封面自定义',
				base:'×',
				renzheng:'√',
				vip:'√'
			},{
				name:'logo自定义',
				base:'×',
				renzheng:'√',
				vip:'√'
			}],
			// 云储存
			cloudyconfig:[{
				name:'素材库',
				base:'不设限',
				renzheng:'不设限',
				vip:'不设限'
			},{
				name:'视频容量',
				base:'50G',
				renzheng:'100G',
				vip:'200G',
				color:'red'
			},{
				name:'视频暂存时间',
				base:'15天',
				renzheng:'15天',
				vip:'15天',
				color:'red'
			},{
				name:'视频库保存时间',
				base:'15天',
				renzheng:'一年',
				vip:'一年',
				color:'red'
			}],
			// 技术支持
			teconfig:[{
				name:'技术支持',
				base:'√',
				renzheng:'√',
				vip:'√'
			}]
		}
	},
	methods: {
		// 立即升级按钮事件
		goupdate: function(num) {
			if (num == 1) {
				this.yonghu = 1
				this.dialogVisible = true
			} else {
				this.yonghu = 2
				this.dialogVisible = true
			}
		},
		topay: function() {
			var options = {
				fullscreen: true,
				text: '拼命加载中'
			};
			// 支付宝
			if (this.imgnum == '1') {
				let loadingInstance = Loading.service(options);
				var url = '/pays/alipay'
				var moneyy = ''
				var type = ''
					// 高级
				if (this.yonghu == 1) {
					moneyy = '5800'
					type = '1'
				} else {
					// vip
					moneyy = '8800'
					type = '2'
				}
				var data = {
					money: moneyy,
					action: 'account_upgrade',
					account_type: type,
					return_url: 'http://icloudinn.live/#/taocan'
				}
				this.$http.post(url, data).then((response) => {
					console.log(response.body);
					if (response.body.code == 100) {
						loadingInstance.close();
						console.log(response.body)
							//							this.tradeId = response.body.data.tradeId
						window.location.href = response.body.data.payurl

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
			} else if (this.imgnum == 2) {
				//微信
				var url = '/pays/wechat'
				var moneyy = ''
				var type = ''
					// 高级
				if (this.yonghu == 1) {
					moneyy = '5800'
					type = '1'
				} else {
					// vip
					moneyy = '8800'
					type = '2'
				}
				var data = {
					money: moneyy,
					action: 'account_upgrade',
					account_type: type
				}
				let loadingInstance = Loading.service(options);
				this.$http.post(url, data).then((response) => {
					if (response.body.code == 100) {
						loadingInstance.close();
						console.log(response.body)
						this.wxcode = response.body.data.payurl
						this.tradeId = response.body.data.tradeId
						this.dialogVisible2 = true
						this.wxcost = moneyy
					} else {
						loadingInstance.close();
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
						callback: action => {}
					});

				});
			} else {
				this.$alert('请选择正确的支付方式', '错误提示', {
					confirmButtonText: '知道了',
					callback: action => {

					}
				});
			}
		},
		// 支付完成检测支付状态
		checkPayStatus: function() {
			this.$router.push('/taocan')
			// if (!this.tradeId) {
			// 	alert('支付信息错误,请联系客服')
			// 	return
			// }
			// var url = '/pays/getpaystatus'
			// this.$http.post(url, {
			// 	tradeId: this.tradeId,
			// 	payType: this.payStyle
			// }).then((response) => {
			//
			// 	if (response.body.code != 100 || response.body.msg != 'success') {
			// 		this.$confirm('支付未成功,是否联系客服?', '温馨提示', {
			// 			confirmButtonText: '确定',
			// 			cancelButtonText: '取消',
			// 			type: 'warning'
			// 		}).then(() => {}).catch(() => {
			// 			this.$notify({
			// 				title: '验证支付状态失败',
			// 				message: response.body.msg,
			// 				type: 'warning'
			// 			});
			// 		});
			// 		return
			// 	} else {
			// 		this.dialogVisible2 = false
			// 		this.$notify({
			// 			title: '成功提示',
			// 			message: '恭喜您充值成功',
			// 			type: 'success'
			// 		});
			// 	}
			// }, (response) => {
			// 	this.$notify({
			// 		title: '验证支付状态失败',
			// 		message: response.body.msg,
			// 		type: 'warning'
			// 	});
			// })
		}
	},
	components: {
		Qrcode,
	},
	mounted() {

	}
}
</script>

<style lang='less'>
.el-dialog--tiny{
	width: 20%;
}
.updatecontainer table {
    width: 100%;
    tr {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid black;
        align-items: center;
        border-width: 1px;
        border-bottom-style: solid;
        border-color: rgb(192, 192, 192);
        th {
            flex-basis: 25%;
        }
        td {
            flex-basis: 25%;
            text-align: center;
        }
    }
}
.mytr td:first-child{
	background: #f2f2f2;
}
tr.mytr td:nth-child(2) {
    background: white;
}
tr.mytr td:nth-child(3) {
    background: #f2f2f2;
}
tr.mytr td:nth-child(4) {
    background: white;
}
.redcolor{
	color:red;
}
tr.mytr td{
	padding-bottom: 0.5rem;
	padding-top: 0.5rem;
}
.imgclick {
    border: 1px solid blue;
}
</style>
