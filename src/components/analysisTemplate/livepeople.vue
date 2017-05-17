<template>
<div class='livepeople' style='margin-top: 20px;'>
	<el-row>
		<el-col :span='8' :offset='16' style='display: flex;justify-content: flex-end;'>
			<div style='display:flex;background: white;'>
				<p :class='{active:isActive1}' @click='chose(1)' class='groupitem'>今日</p>
				<p :class='{active:isActive2}' @click='chose(2)' class='groupitem'>昨日</p>
				<p :class='{active:isActive3}' @click='chose(3)' class='groupitem'>本周</p>
				<p :class='{active:isActive4}' @click='chose(4)' class='groupitem'>上周</p>
				<p :class='{active:isActive5}' @click='chose(5)' class='groupitem'>本月</p>
				<p :class='{active:isActive6}' @click='chose(6)' class='groupitem'>上月</p>
			</div>
		</el-col>
	</el-row>
	<el-row class='livecontent' style='margin-top: 15.5px;'>
		<el-col :span='24' style='background: white;padding-bottom: 30px;'>
			<el-row>
				<div style='padding-top: 20px;padding-bottom: 20px;background: #c6c6c6;display: flex;align-items: center;padding-left: 26px;'>
					<img style='width: 20px;height: 20px;margin-right: 9px;' src="~assets/img/live.png" />
					<p style='font-size: 20px;'>直播概况</p>
				</div>
			</el-row>
			<el-row style='display: flex;justify-content: space-between;margin-top: 48.5px;'>
				<el-col class='gaiitems'>
					<el-row class='secitem'>
						<span style='color: #20a0ff;font-size: 60px;'>{{live_duration}}</span><span style='font-size: 18px;color: #20a0ff;'>分钟</span>
						<el-popover placement='top' width='150' trigger='hover' content='不包括未结束的直播'>
							<img slot='reference' style='margin-left:5px;' src="~assets/img/wenhao.png" alt="" />
						</el-popover>
					</el-row>
					<el-row style='display: flex;justify-content: center;align-items: center;margin-top: 15px;'>
						<img src="~assets/img/time.png" />
						<p style='font-size: 16px;'>直播时长</p>
					</el-row>
				</el-col>
				<el-col class='gaiitems'>
					<el-row class='secitem'>
						<span style='color: #20a0ff;font-size: 60px;'>{{watch_Tduration}}</span><span style='font-size: 18px;color: #20a0ff;'>分钟</span>
						<el-popover placement='top' width='150' trigger='hover' content='用户观看时间总和'>
							<img slot='reference' style='margin-left:5px;' src="~assets/img/wenhao.png" alt="" />
						</el-popover>
					</el-row>
					<el-row style='display: flex;justify-content: center;align-items: center;margin-top: 15px;'>
						<img src="~assets/img/watch.png" />
						<p style='font-size: 16px;'>观看时长</p>
					</el-row>
				</el-col>
				<el-col class='gaiitems'>
					<el-row class='secitem'>
						<span style='color: #20a0ff;font-size: 60px;'>{{audience_num}}</span><span style='font-size: 18px;color: #20a0ff;'>人</span>
					</el-row>
					<el-row style='display: flex;justify-content: center;align-items: center;margin-top: 15px;'>
						<img src="~assets/img/liang.png" />
						<p style='font-size: 16px;'>用户量UV</p>
					</el-row>
				</el-col>
				<el-col class='gaiitems'>
					<el-row class='secitem'>
						<span style='color: #20a0ff;font-size: 60px;'>{{watch_times}}</span><span style='font-size: 18px;color: #20a0ff;'>人/次</span>
					</el-row>
					<el-row style='display: flex;justify-content: center;align-items: center;margin-top: 15px;'>
						<img src="~assets/img/ci.png" />
						<p style='font-size: 16px;'>观看人次PV</p>
					</el-row>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
	<el-row class='livecontent' style='margin-top: 2rem;'>
		<el-col :span='24' style='background:white;'>
			<el-row>
				<div style='padding-top: 20px;padding-bottom: 20px;background: #c6c6c6;display: flex;align-items: center;padding-left: 26px;'>
					<img style='width: 20px;height: 20px;margin-right: 9px;' src="~assets/img/diyu.png" />
					<p style='font-size: 20px;'>实时在线人数分布</p>
				</div>
			</el-row>
			<el-row>
				<el-col>
					<h3 v-if='h3if2' style='display: flex;justify-content: center;margin-top: 2rem;margin-bottom: 2rem;'>很抱歉{{nm}}没有人观看哦</h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col style='display: flex;justify-content: center;'>
					<div v-show='echartif2' class='echartcontainer' style='width: 60rem;height: 25rem;'>
						<div id='echartid2' style='width: 60rem;height: 25rem;'>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-col>
		<el-col :span='24' style='background: white;margin-top:2rem;'>
			<el-row>
				<div style='padding-top: 20px;padding-bottom: 20px;background: #c6c6c6;display: flex;align-items: center;padding-left: 26px;'>
					<img style='width: 20px;height: 20px;margin-right: 9px;' src="~assets/img/diyu.png" />
					<p style='font-size: 20px;'>地域分布</p>
				</div>
			</el-row>
			<el-row>
				<el-col>
					<h3 style='text-align: center;margin-top: 1rem;'>观看人次TOP10</h3>
					<h3 v-if='h3if' style='display: flex;justify-content: center;margin-top: 2rem;margin-bottom: 2rem;'>很抱歉{{nm}}没有人观看哦</h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col style='display: flex;justify-content: center;'>
					<div v-show='echartif' class='echartcontainer' style='width: 60rem;height: 25rem;'>
						<div id='echartid' style='width: 60rem;height: 25rem;'>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</div>
</template>

<script>
import Echarts from 'echarts'
import store from 'store'
export default {
	name: 'livepeople',
	data() {
		return {
			isActive1: true,
			isActive2: false,
			isActive3: false,
			isActive4: false,
			isActive5: false,
			isActive6: false,
			// 直播时长
			live_duration: '',
			// 观看时长
			watch_Tduration: '',
			// UV
			audience_num: '',
			// PV
			watch_times: '',
			// 观看人省份
			watch_province: [],
			//对应省份的人数
			watch_num: [],
			//其实不用把这个变量定义出来 只是为了判断有没有人观看 好为计算属性true或false来判断echart的显示与否
			watch_list: [],
			//这个只是为了没有人观看时 不显示echart 显示什么时候没有人观看
			nm: '',
			activeName: 'first',
			echartif2: ''
		}
	},
	computed: {
		echartif: function() {
			if (this.watch_list.length == 0) {
				return false
			} else {
				return true
			}
		},
		h3if: function() {
			if (this.echartif == false) {
				return true
			} else {
				return false
			}
		},
		h3if2: function() {
			if (this.echartif2 == false) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		// 顶部不同时期的点击事件
		chose: function(num) {
			// 今日
			if (num == 1) {
				this.isActive1 = true
				this.isActive2 = false
				this.isActive3 = false
				this.isActive4 = false
				this.isActive5 = false
				this.isActive6 = false
				this.getRoomTotal(1)
				this.getshishi(1)
			} else if (num == 2) {
				// 昨日
				this.isActive1 = false
				this.isActive2 = true
				this.isActive3 = false
				this.isActive4 = false
				this.isActive5 = false
				this.isActive6 = false
				this.getRoomTotal(2)
				this.getshishi(2)
			} else if (num == 3) {
				// 本周
				this.isActive1 = false
				this.isActive2 = false
				this.isActive3 = true
				this.isActive4 = false
				this.isActive5 = false
				this.isActive6 = false
				this.getRoomTotal(3)
				this.getshishi(3)
			} else if (num == 4) {
				// 上周
				this.isActive1 = false
				this.isActive2 = false
				this.isActive3 = false
				this.isActive4 = true
				this.isActive5 = false
				this.isActive6 = false
				this.getRoomTotal(4)
				this.getshishi(4)
			} else if (num == 5) {
				// 本月
				this.isActive1 = false
				this.isActive2 = false
				this.isActive3 = false
				this.isActive4 = false
				this.isActive5 = true
				this.isActive6 = false
				this.getRoomTotal(5)
				this.getshishi(5)
			} else {
				// 上月
				this.isActive1 = false
				this.isActive2 = false
				this.isActive3 = false
				this.isActive4 = false
				this.isActive5 = false
				this.isActive6 = true
				this.getRoomTotal(6)
				this.getshishi(6)
			}
		},
		// 访问接口拿取观众列表统计
		getRoomTotal: function(time) {
			this.$http.get('/analyzes/audience/room/' + this.$route.params.id + '?access-token=' + localStorage.getItem('accessToken')).then((response) => {
				console.log('success')
				console.log(response.body)
					// 默认是今天的数据分析
				this.$http.post('/analyzes/data/room/' + this.$route.params.id, {
					time_slot: time
				}).then((response) => {
					console.log('success')
					console.log(response.body)
						// 观看总时长
					this.watch_Tduration = response.body.data.situation.watch_duration
						// 直播时长
					this.live_duration = response.body.data.situation.live_duration
						// UV
					this.audience_num = response.body.data.situation.audience_num
						// PV
					this.watch_times = response.body.data.situation.watch_times
						//观看数据
					this.watch_list = response.body.data.area
					if (time == 1) {
						this.nm = '今日'
					} else if (time == 2) {
						this.nm = '昨日'
					} else if (time == 3) {
						this.nm = '本周'
					} else if (time == 4) {
						this.nm = '上周'
					} else if (time == 5) {
						this.nm = '本月'
					} else {
						this.nm = '上月'
					}
					//如果没有人则不显示echart
					if (this.watch_list.length == 0) {

					} else {
						this.watch_province = []
						this.watch_num = []
						var maxnum = 0
							//这里先遍历拿到各个省份
							//然后定义一个变量拿到总人数
						for (var a = 0; a < this.watch_list.length; a++) {
							if(this.watch_list[a].province=='' || this.watch_list[a].province==null){
								this.watch_province[a]='无地域信息'
							}else{
								this.watch_province[a] = this.watch_list[a].province
							}
							maxnum = maxnum + parseInt(this.watch_list[a].audience_num)
							console.log(maxnum)
						}
						//这里再遍历一次 用每个省份的人数除以总人数得到百分比
						for (var a = 0; a < this.watch_list.length; a++) {
							this.watch_num[a] = parseInt(this.watch_list[a].audience_num / maxnum * 100)
							console.log(this.watch_num[a])
						}
						var mychart = Echarts.init(document.getElementById('echartid'))
						mychart.showLoading()
						var that = this
						mychart.setOption({
							title: {
								text: '',
								subtext: ''
							},
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								},
								formatter: "{a} <br/>{b} : {c}%"
							},
							legend: {
								data: ['2016年']
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: {
								type: 'value',
								boundaryGap: [0, 0.01],
								'axisLabel': {
									'interval': 0,
									formatter: '{value}%',
									textStyle: {
										color: '#20a0ff'
									}
								},
								'axisLine': {
									lineStyle: {
										color: '#20a0ff'
									}
								}
							},
							yAxis: {
								type: 'category',
								data: this.watch_province,
								'axisLine': {
									lineStyle: {
										color: '#20a0ff'
									}
								}
							},
							series: [{
								name: this.nm,
								type: 'bar',
								//在这里显示百分比
								data: this.watch_num,
								//然后在右部显示具体的人数
								label: {
									normal: {
										show: true,
										position: 'right',
										formatter: function(obj) {
											return Math.ceil(obj.value / 100 * maxnum) + '人'
										}
									}
								},
								itemStyle: {
									normal: {
										color: function(params) {
											return '#20a0ff'
										}
									}
								}
							}],
							textStyle: {
								color: 'black'
							}
						})
						mychart.hideLoading()
					}

				}, (response) => {
					console.log('error')
					console.log(response.body)
				})
			}, (response) => {
				console.log('error')
				console.log(response.body)
			})
		},
		// 拿到实时在线人数
		getshishi: function(time) {
			this.$http.post('/analyzes/data/room/' + this.$route.params.id, {
				time_slot: time
			}).then((response) => {
				console.log('successsuccess')
				console.log(response.body);
				var xdata = []
				var ydata = []
				if (response.body.data.real_time_num.length == 0) {
					this.echartif2 = false
				} else {
					this.echartif2 = true
					for (var a = 0; a < response.body.data.real_time_num.length; a++) {
						xdata[a] = new Date(response.body.data.real_time_num[a].time * 1000).toLocaleString()
						ydata[a] = response.body.data.real_time_num[a].num
					}
					// 实时在线人数echart
					var mychart2 = Echarts.init(document.getElementById('echartid2'))
					mychart2.showLoading()
					mychart2.setOption({
						// 提示框组件
						tooltip: {
							trigger: 'axis',
							positon: function(pt) {
								return [pt[0], '10%']
							}
						},
						title: {
							left: 'center',
							text: '大数据量面积图'
						},
						// 图例组件
						legend: {
							top: 'bottom',
							data: ['意向']
						},
						// 工具栏
						toolbox: {
							// 工具栏配置项
							feature: {
								dataZoom: {
									yAxisIndex: 'none'
								},
								restore: {},
								saveAsImage: {}
							}
						},
						// X轴
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: xdata
						},
						// y轴
						yAxis: {
							type: 'value',
							boundaryGap: [0, '100%'],
						},
						dataZoom: [{
							type: 'inside',
							start: 0,
							end: 10
						}, {
							start: 0,
							end: 10,
							handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
							handleSize: '80%',
							handleStyle: {
								color: '#fff',
								shadowBlur: 3,
								shadowColor: 'rgba(0,0,0,0.6)',
								shadowOffsetX: 2,
								shadowOffsetY: 2
							}
						}],
						series: [{
							name: '人数',
							type: 'line',
							smooth: true,
							symbol: 'none',
							sampling: 'average',
							itemStyle: {
								normal: {
									color: '#20a0ff'
								}
							},
							areaStyle: {
								normal: {
									color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#20a0ff'
									}, {
										offset: 1,
										color: '#20a0ff'
									}])
								}
							},
							data: ydata
						}]
					})
					mychart2.hideLoading()
				}
			}, (response) => {
				console.log('errorerror');
				console.log(response.body);
			})
		}
	},
	create() {

	},
	mounted() {
		// 拿到该直播间的统计 并实例化Echart
		this.getRoomTotal(1)
		this.getshishi(1)

	}
}
</script>

<style lang='less'>
.active {
    color: white;
    background: #20a0ff;
}

.groupitem {
    width: 47px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.secitem {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.livepeople {
    h6 {
        border-left: 1px solid black;
        padding: 0.2rem;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        cursor: pointer;
    }
    .livecontent {
        h2.contentitle {
            background: gainsboro;
            padding-left: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            border-radius: 0.5rem;
        }
    }
    .gaiitems {
        /*margin-top: 2rem;*/
        text-align: center;
        /*border: 1px solid #20a0ff;*/
        border-radius: 6px;
        /*padding-bottom: 2rem;*/
        .el-row {
            /*margin-top: 48.5px;*/
        }
    }
}
</style>
