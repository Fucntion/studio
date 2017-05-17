<template>
<div class="taocan_container" style='padding-left:1rem;padding-right:1rem;'>
	<div class="taocan_header">
		<h3 style='font-size:18px;'>购买的观看时长套餐剩余:<span style='color:#20a0ff'>{{leftminute}}分钟</span></h3>
		<h3 style='font-size:18px;'>您的账户余额为:<span style='color:#20a0ff'>￥{{zhye}}</span></h3>
	</div>
	<div class="taocan_box" style='margin-top:2rem;'>
		<el-row style='margin-right:5rem;margin-left:5rem;display:flex;align-items:center;border-bottom:1px solid black;padding-bottom:1rem;border-width: 1px;border-color: #c0c0c0;'>
			<el-col style='display:flex;align-items:center;' :span='12'>
				<img style='width:33px;height:33px;' src="~assets/img/zhanghu.png" alt=""> 账户类型：
				<span style='font-weight: bolder;'>{{type}}</span>
			</el-col>
			<el-col style='text-align:right;' :span='12'>
				<el-button style='padding-left:2rem;padding-right:2rem;' @click='update' type='primary'>升级</el-button>
			</el-col>
		</el-row>
		<el-row style='margin-right:5rem;margin-left:5rem;display:flex;align-items:center;margin-top:1rem;'>
			<el-col style='display:flex;align-items:center;' :span='12'>
				<img style='width:33px;height:33px;' src="~assets/img/shichang.png" alt=""> 时长套餐：
				<span style='font-weight: bolder;'>{{taocan}}</span>
			</el-col>
			<el-col style='text-align:right;' :span='12'>
				<el-button style='padding-left:2rem;padding-right:2rem;' @click='gobuytaocan' type='primary'>购买</el-button>
			</el-col>
		</el-row>
	</div>
	<el-row style='margin-top:2rem;'>
		<el-col :span='12'>
			<div class="taocan_box">
				<el-row style='display:flex;justify-content:space-around;'>
					<el-col style='margin-left:5rem;display:flex;align-items:center;'>
						<img src="~assets/img/yue.png" alt=""> 余额
					</el-col>
					<!-- <el-col style='text-align:center;'>代金券</el-col> -->
				</el-row>
				<el-row style='margin-right:5rem;display:flex;justify-content:space-around;margin-top:2rem;align-items:center;'>
					<el-col style='margin-left:5rem;font-size:36px;color:#20a0ff;'>￥{{zhye}}</el-col>
					<el-col style='text-align:right;'>
						<el-button style='padding-left:2rem;padding-right:2rem;' @click='gochong' type='primary' size='large'>充值</el-button>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :span='12'>
			<div class="taocan_box">
				<el-row style='margin-left:5rem;'>
					<el-col style='display: flex;align-items: center;'>
						<img src="~assets/img/tixian.png" alt=""> 可提现余额
						<el-popover placement='top' width='200' trigger='hover' content='打赏、红包以及付费观看获得的金额'>
							<img slot='reference' style='height: 20px;position: relative;left: 1rem;' src="~assets/img/wenhao.png" alt="" />
						</el-popover>
					</el-col>
				</el-row>
				<el-row style='margin-right:5rem;display: flex;align-items: center;margin-top: 2rem;margin-left:5rem;'>
					<el-col style='font-size:36px;color:#20a0ff;'>￥{{yue}}</el-col>
					<el-col style='text-align:right;'>
						<el-popover placement='top' width='200' trigger='hover' content='温馨提示:如果需要提现请拨打15913133209,暂只支持100的整数提现。'>
							<span class='el-button el-button--primary el-button--large' :class='{"popobutton2":popobutton}' slot='reference'>我要提现</span>
						</el-popover>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</el-row>
</div>
</template>


	</div>
</template>

<script>
export default {
	data: function() {

		return {
			taocanList: [],
			// 可提现的余额
			yue: '',
			// 账户余额
			zhye: '',
			// 剩余分钟
			leftminute: '',
			// 账户类型
			type: '',
			// 时长套餐
			taocan: ''
		}
	},
	methods: {
		update: function() {
			this.$router.push('/update')
		},
		gobuytaocan: function() {
			this.$router.push('/buytaocan')
		},
		gochong: function() {
			this.$router.push('/pay')
		},
		// 拿取用户余额和剩余观看时长
		getInfo: function() {
				this.$http.get('/users').then((response) => {
					console.log('success');
					console.log(response.body);
					this.zhye = response.body.data.balance
					this.leftminute = response.body.data.available_live_duration
					if (response.body.data.type == 0) {
						this.type = '普通用户'
					} else if (response.body.data.type == 1) {
						this.type = '高级用户'
					} else {
						this.type = 'VIP用户'
					}
					if(response.body.data.meal_ids==null){
						this.taocan='无'
					}else{
						this.taocan=''
						for(var a=0;a<response.body.data.meal_ids.length;a++){
							if(response.body.data.meal_ids[a]==1){
								response.body.data.meal_ids[a]='A套餐'
							}else if(response.body.data.meal_ids[a]==2){
								response.body.data.meal_ids[a]='B套餐'
							}else{
								response.body.data.meal_ids[a]='C套餐'
							}
							if(this.taocan==''){
								this.taocan=response.body.data.meal_ids[a]
							}else{
								this.taocan=this.taocan+'/'+response.body.data.meal_ids[a]
							}
						}
					}
					this.yue = response.body.data.can_cash_balances
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			}
			// init:function(){
			// 	this.$http.get('/valuepackages').then((response)=>{
			// 		console.log(response.body)
			// 		this.taocanList = response.body.data.list
			//
			// 	},(response)=>{
			//
			// 	})
			// }
	},
	computed: {
		popobutton: function() {
			if (this.yue == 100 || this.yue > 100) {
				return false
			} else {
				return true
			}
		}
	},
	components: {

	},
	mounted() {
		this.getInfo()
			//			this.init()
	}
}
</script>

<style lang="less">
.popobutton2 {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
}
.taocan_header {
    display: flex;
    justify-content: space-around;
}

.taocan_box {
    margin: 10px;
    padding: 10px;
    overflow: hidden;
		background: white;
    padding-top: 2rem;
    padding-bottom: 2rem;
    h3 {
        color: #222222;
        margin: 5px 0 10px;
    }
    p {
        color: #888888;
        font-size: 14px;
    }
    .hr {
        margin-bottom: 15px;
    }
    .taocan_item {
        float: left;
        margin: 10px 10px 0 0;
        width: 200px;
        border-width: 1px;
        border-color: rgb(192, 192, 192);
        border-style: solid;
        border-radius: 4px;
        .desc {
            color: white;
            position: relative;
            background: #20a0ff;
            background-repeat: no-repeat;
            padding: 25px;
            background-image: url('~assets/img/icon_taocan.png');
            background-position: 130px center;
            .jiaobiao {
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .info {
            text-align: center;
            padding: 10px;
            .price_new {
                color: #e23c3e;
                text-align: center;
                font-size: 18px;
                span {
                    color: #555555;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }
            .price_old {
                font-size: 14px;
                text-align: center;
                color: #555555;
                /*text-decoration:line-through;*/
            }
            .buy {
                margin-top: 15px;
                width: 80%;
            }
        }
    }
}
</style>
