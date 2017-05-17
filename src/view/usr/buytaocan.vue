<template lang="html">
  <div class="buytaocan" style='padding:1rem;background: white;'>
    <div class="justcontainer" style='background: white;padding: 3rem;'>
      <el-row>
        <el-col class='justaocan' :span='6'>
          <div @click='selecthis(1)'>
            <p :class='{"activeheader":active1}' class='taocanheader'>套餐A</p>
            <div :class='{"activeitem":active1}' class="justitem">
              <p>单价:<span class='danjia'>0.04</span>元/人/分钟</p>
              <p style='margin-top:1rem;'>时长:<span class='danjia'>{{shichang}}</span></p>
              <p style='margin-top:1rem;'><span class='yuan'>{{ajiage}}</span></p>
            </div>
          </div>
          <el-dialog title='请选择充值分钟数' v-model='dialogVisible' size='tiny'>
            <el-form :inline="true" :model='ruleForm' :rules='rules' ref="ruleForm">
              <el-form-item label='充' prop='pass'>
                <el-input type='number' v-model='ruleForm.pass' auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label='分钟'></el-form-item>
              <el-row v-if='showfenqian' style='margin-top:1rem;'>
                <p>￥{{fenqian}}</p>
              </el-row>
              <el-row>
                <el-form-item style='margin-top:1rem;'>
                  <el-button :disabled='buttonif' type='primary' @click='makesure("ruleForm")'>确认</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </el-dialog>
        </el-col>
        <el-col :offset='3' class='justaocan' :span='6'>
          <div @click='selecthis(2)'>
            <p :class='{"activeheader":active2}' class='taocanheader'>套餐B</p>
            <div :class='{"activeitem":active2}' class="justitem">
              <p>单价:<span class='danjia'>0.035</span>元/人/分钟</p>
              <p style='margin-top:1rem;'>时长:<span class='danjia'>60000</span>分钟</p>
              <p style='margin-top:1rem;'>仅需:<span class='yuan'>2100</span>元</p>
            </div>
          </div>
        </el-col>
        <el-col :offset='3' @click='selecthis' class='justaocan' :span='6'>
          <div @click='selecthis(3)'>
            <p :class='{"activeheader":active3}' class='taocanheader'>套餐C</p>
            <div :class='{"activeitem":active3}' class="justitem">
              <p>单价:<span class='danjia'>0.03</span>元/人/分钟</p>
              <p style='margin-top:1rem;'>时长:<span class='danjia'>300000</span>分钟</p>
              <p style='margin-top:1rem;'>仅需:<span class='yuan'>9000</span>元</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <p style='margin-top:1rem;'>有效期：1年(2018-03-09)</p>
    </div>
    <div class="paycontainer">
      <p>选择支付方式:</p>
      <el-row style='margin-top:1rem;'>
        <el-radio v-model='radio' label='1'>
          <img style='width: 126px;height: 45px;' src="~assets/img/ali.png" alt="">
        </el-radio>
        <el-radio v-model='radio' label='2'>
          <img style='width: 126px;height: 45px;' src="~assets/img/wx.png" alt="">
        </el-radio>
      </el-row>
      <el-row style='margin-top:1rem;'>
        <el-button @click='next' type='primary' size='large'>
          <span style='padding-left:2rem;padding-right:2rem;'>下一步</span>
        </el-button>
      </el-row>
      <el-dialog title='微信支付' v-model='dialogVisible2' size='small'>
        <el-row>
          <el-col :span='12' style='text-align:center;'>
            <p>￥{{wxqian}}</p>
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
    </div>
  </div>
</template>

<script>
import {
    Loading
} from 'element-ui'
import Qrcode from 'plugin/common/Qrcode.vue'
export default {
    data: function() {
        var checknum = (rule, value, callback) => {
            setTimeout(() => {
                if (value < 0) {
                    callback(new Error('分钟数必须大于0'))
                    this.buttonif = true
                } else if (value == 0) {
                    this.showfenqian = false
                    this.buttonif = true
                } else if (value % 1 === 0 !== true) {
                    this.showfenqian = true
                    this.buttonif = true
                    callback(new Error('只能输入整数'))
                } else {
                    this.showfenqian = true
                    this.buttonif = false
                    callback()
                }
            }, 1000)
        };
        return {
            // 微信二维码上面的钱数
            wxqian: '',
            // 用于验证微信支付是否成功
            tradeId: '',
            // 微信支付二维码
            wxcode: '',
            // 微信支付弹框
            dialogVisible2: false,
            // 套餐A button的可点击与否
            buttonif: true,
            // 充分钟的钱数显示与否
            showfenqian: false,
            // 选择的支付方式
            radio: '1',
            // 套餐ABC
            active1: false,
            active2: false,
            active3: false,
            // 套餐A的弹框
            dialogVisible: false,
            // 套餐A的时长
            shichang: '不设限制',
            // 套餐A的价格
            ajiage: '0元起步',
            ruleForm: {
                // 充值的分钟数
                pass: ''
            },
            // 这里是表单的验证信息
            rules: {
                pass: [{
                    validator: checknum,
                    trigger: 'change'
                }]
            }
        }
    },
    computed: {
        // 充值分钟数对应的钱
        fenqian: function() {
            return this.ruleForm.pass * 0.04
        }
    },
    methods: {
        // 微信支付结果
        checkPayStatus: function() {
          this.$router.push('/taocan')
            // if (!this.tradeId) {
            //     alert('支付信息错误,请联系客服')
            //     return
            // }
            // var url = '/pays/getpaystatus'
            // this.$http.post(url, {
            //     tradeId: this.tradeId,
            //     payType: '1'
            // }).then((response) => {
            //
            //     if (response.body.code != 100 || response.body.msg != 'success') {
            //         this.$confirm('支付未成功,是否联系客服?', '温馨提示', {
            //             confirmButtonText: '确定',
            //             cancelButtonText: '取消',
            //             type: 'warning'
            //         }).then(() => {}).catch(() => {
            //             this.$notify({
            //                 title: '验证支付状态失败',
            //                 message: response.body.msg,
            //                 type: 'warning'
            //             });
            //         });
            //         return
            //     } else {
            //         this.dialogVisible2 = false
            //         this.$notify({
            //             title: '成功提示',
            //             message: '恭喜您充值成功',
            //             type: 'success'
            //         });
            //     }
            // }, (response) => {
            //     this.$notify({
            //         title: '验证支付状态失败',
            //         message: response.body.msg,
            //         type: 'warning'
            //     });
            // })
        },
        // 下一步的点击事件
        next: function() {
            var options = {
                fullscreen: true,
                text: '拼命加载中'
            }
            var moneyy = ''
            if (this.radio == 1) {
                // 支付宝
                var url = '/pays/alipay'
                if (this.active1 == true) {
                    // 套餐A
                    moneyy = parseFloat(this.ajiage)
                    if (moneyy == '0') {
                        this.$notify({
                            title: '请选择充值时长',
                            message: '充值时长不能为0',
                            type: 'warning'
                        });
                    } else {
                        let loadingInstance = Loading.service(options);
                        var data = {
                            money: moneyy,
                            return_url:'http://icloudinn.live/#/taocan',
                            action:'buy_meal',
                            meal_id:'1',
                            live_duration:this.shichang
                        }
                        this.$http.post(url, data).then((response) => {
                            console.log(response.body);
                            if (response.body.code == 100) {
                                loadingInstance.close()
                                window.location.href = response.body.data.payurl
                            } else {
                                this.$notify({
                                    title: '获取支付宝参数失败',
                                    message: response.body.msg,
                                    type: 'warning'
                                });
                            }
                        }, (response) => {
                            loadingInstance.close()
                            this.$alert('充值失败', '错误提示', {
                                confirmButtonText: '知道了',
                                callback: action => {}
                            });
                        })
                    }
                } else if (this.active2 == true) {
                    let loadingInstance = Loading.service(options);
                    // 套餐B
                    moneyy = '2100'
                    var data = {
                        money: moneyy,
                        return_url:'http://icloudinn.live/#/taocan',
                        action:'buy_meal',
                        meal_id:'2',
                        live_duration:'60000'
                    }
                    this.$http.post(url, data).then((response) => {
                        console.log(response.body);
                        if (response.body.code == 100) {
                            loadingInstance.close()
                            window.location.href = response.body.data.payurl
                        } else {
                            this.$notify({
                                title: '获取支付宝参数失败',
                                message: response.body.msg,
                                type: 'warning'
                            })
                        }
                    }, (response) => {
                        loadingInstance.close()
                        this.$alert('充值失败', '错误提示', {
                            confirmButtonText: '知道了',
                            callback: action => {}
                        });
                    })
                } else {
                    // 套餐C
                    let loadingInstance = Loading.service(options)
                    moneyy = '9000'
                    var data = {
                        money: moneyy,
                        return_url:'http://icloudinn.live/#/taocan',
                        action:'buy_meal',
                        meal_id:'3',
                        live_duration:'300000'
                    }
                    this.$http.post(url, data).then((response) => {
                        console.log(response.body);
                        if (response.body.code == 100) {
                            loadingInstance.close()
                            window.location.href = response.body.data.payurl
                        } else {
                            this.$notify({
                                title: '获取支付宝参数失败',
                                message: response.body.msg,
                                type: 'warning'
                            })
                        }
                    }, (response) => {
                        loadingInstance.close()
                        this.$alert('充值失败', '错误提示', {
                            confirmButtonText: '知道了',
                            callback: action => {}
                        });
                    })
                }
            } else {
                // 微信
                var url = '/pays/wechat'
                var moneyy = ''
                var data = {}
                if (this.active1 == true) {
                    // 套餐A
                    moneyy = parseFloat(this.ajiage)
                    if (moneyy == '0') {
                        this.$notify({
                            title: '请选择充值时长',
                            message: '充值时长不能为0',
                            type: 'warning'
                        });
                        return;
                    } else {
                        this.wxqian = moneyy
                        data = {
                            money: moneyy,
                            return_url:'http://icloudinn.live/#/taocan',
                            action:'buy_meal',
                            meal_id:'1',
                            live_duration:this.shichang
                        }
                    }
                } else if (this.active2 == true) {
                    // 套餐B
                    moneyy = '2100'
                    this.wxqian = moneyy
                    data = {
                        money: moneyy,
                        return_url:'http://icloudinn.live/#/taocan',
                        action:'buy_meal',
                        meal_id:'2',
                        live_duration:'60000'
                    }
                } else {
                    // 套餐C
                    moneyy = '9000'
                    this.wxqian = moneyy
                    data = {
                        money: moneyy,
                        return_url:'http://icloudinn.live/#/taocan',
                        action:'buy_meal',
                        meal_id:'3',
                        live_duration:'300000'
                    }
                }
                console.log(data)
                let loadingInstance = Loading.service(options)
                this.$http.post(url, data).then((response) => {
                    if (response.body.code == 100) {
                        loadingInstance.close()
                        console.log(response.body);
                        this.wxcode = response.body.data.payurl
                        this.tradeId = response.body.data.tradeId
                        this.dialogVisible2 = true
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
                })
            }
        },
        selecthis: function(num) {
            if (num == 1) {
                this.active1 = true
                this.active2 = false
                this.active3 = false
                this.dialogVisible = true
            } else if (num == 2) {
                this.active1 = false
                this.active2 = true
                this.active3 = false
            } else {
                this.active1 = false
                this.active2 = false
                this.active3 = true
            }
        },
        // A套餐确认
        makesure: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    if (this.ruleForm.pass == '' || this.ruleForm.pass == '0') {
                        this.dialogVisible = false
                        this.shichang = '不设限制'
                        this.ajiage = '0元起步'
                    } else {
                        this.dialogVisible = false
                        this.shichang = this.ruleForm.pass + '分钟'
                        this.ajiage = this.fenqian + '元'
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    components: {
        Qrcode,
    },
    mounted() {

    }
}
</script>

<style lang="less">
.paycontainer {
    background: white;
    padding: 3rem;
    margin-top: 2rem;
}
.yuan {
    color: #21a0ff;
}
.danjia {
    color: #f08300;
}
.justitem {
    background: #f2f2f2;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.justaocan {
    text-align: center;
    cursor: pointer;
}
.taocanheader {
    background: #dedede;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-weight: bolder;
}
.activeheader {
    color: white;
    background: #20a0ff;
}
.activeitem {
    border-left: 1px solid #20a0ff;
    border-right: 1px solid #20a0ff;
    border-bottom: 1px solid #20a0ff;
}
.el-form-item {
    margin-bottom: 0;
}
</style>
