<template>
<el-row style='margin-left: 10%;margin-right: 10%;'>
	<el-col :span='24'>
		<!--<h2 class="room_title">直播间名字-用户管理</h2>-->
		<div class="info" style='display: flex;justify-content: space-between;'>
			<!--<el-col class='info_item'>
					<el-checkbox disabled v-model='radio1'>
						仅显示观看时长大于一分钟的用户
					</el-checkbox>
				</el-col>-->
			<el-col class="info_item" style='display: flex;justify-content:flex-end;align-items: center;'>
				<p style='margin-right: 1rem;'>观看用户量: {{totalnum}}</p>
				<!--<el-button @click='getList("time")' type='primary'>按时间先后排序</el-button>
				<el-button @click='getList("location")' type='primary'>按地区排序</el-button>-->
				<p style='margin-right: 1rem;' :class='{"orderactive":orderactive1}' class='orderbutton' @click='getList("time")'>按时间先后排序</p>
				<p :class='{"orderactive":orderactive2}' class='orderbutton' @click='getList("location")'>按地区排序</p>
			</el-col>
			<!--<el-col class="info_item" :span="8">总播放时长: {{totaltime}}min</el-col>-->
		</div>
		<div class="hr"></div>
		<el-table :data="tableData" stripe fit>
			<el-table-column prop="id" label="序号"></el-table-column>
			<el-table-column prop="user_name" label="昵称"></el-table-column>
			<!--<el-table-column prop="userid" label="手机号"></el-table-column>-->
			<el-table-column prop="watch_times" label="总观看时长(min)"></el-table-column>
			<el-table-column prop='earliest_enter_time' label='首次登陆时间'></el-table-column>
			<el-table-column prop="latest_out_time" label="最后离开时间"></el-table-column>
			<el-table-column prop="sex" label="性别"></el-table-column>
			<el-table-column prop="province" label="地区"></el-table-column>

		</el-table>

		<div class="control">
			<!-- <el-pagination class="audience_total" layout='prev,pager,next' :page-size='5' :total='setMaxPage' @current-change='handleCurrentChange'>
			</el-pagination> -->
			<el-pagination class='audience_total' @size-change='handleSizeChange' @current-change='handleCurrentChange' :page-sizes='[5,10,15,20]' :total='setMaxPage' :page-size='setPageSize' layout='total,sizes,prev,pager,next,jumper'>

			</el-pagination>
			<!--<el-button class="export">邮件发送</el-button>-->
			<el-button @click='save' class="export" type="primary">保存到本地</el-button>
		</div>
	</el-col>
</el-row>
</template>
<script>
export default {
	data: function() {
		return {
			//表格数据
			tableData: [],
			//总观看人数
			totalnum: '',
			//总直播时长
			totaltime: '',
			//开播时间
			startime: '',
			//分页最大数
			maxpage: '',
			//单选框的model
			radio1: false,
			//当前选择的排序方式
			orderby: 'enter_time',
			// 当前以多少数一页
			pagesize: '5',
			orderactive1: true,
			orderactive2: false,
		}
	},
	computed: {
		//由于分页total只能是数字
		setMaxPage: function() {
			return parseInt(this.maxpage)
		},
		setPageSize: function() {
			return parseInt(this.pagesize)
		}
	},
	methods: {
		//拿到用户管理列表
		getList: function(way) {
			if (way == 'time') {
				this.orderactive1 = true
				this.orderactive2 = false
				this.orderby = 'enter_time'
				this.$http.get('/analyzes/audience/room/' + this.$route.params.id + '?page=1&per-page=' + this.pagesize + '&orderby=' + this.orderby + '&access-token=' + localStorage.getItem('accessToken')).then((response) => {
					console.log('success')
					console.log(response.body)
					this.totalnum = response.body.data.watch_num
					this.tableData = response.body.data.list
					for (var b = 0; b < this.tableData.length; b++) {
						// 这里做的是时间戳的转码
						this.tableData[b].earliest_enter_time = new Date(parseInt(this.tableData[b].earliest_enter_time * 1000)).toLocaleString()
						this.tableData[b].latest_out_time = new Date(parseInt(this.tableData[b].latest_out_time * 1000)).toLocaleString()
							// 这里是对后台返回的性别参数的判断
						if (this.tableData[b].sex == null) {
							this.tableData[b].sex = '男'
						} else if (this.tableData[b].sex == 1) {
							this.tableData[b].sex = '男'
						} else {
							this.tableData[b].sex = '女'
						}
						// 这里是表格序号的字段
						this.tableData[b].id = b + 1
					}
					this.maxpage = response.body.data.pageInfo.totalCount
					this.$http.post('/analyzes/data/room/' + this.$route.params.id, {
						time_slot: 0
					}).then((response) => {
						console.log('success')
						console.log(response.body)
						this.totaltime = response.body.data.situation.live_duration
					}, (response) => {
						console.log('error')
						console.log(response.body)
					})
				}, (response) => {
					console.log('error')
					console.log(response.body)
				})
			} else {
				this.orderactive1 = false
				this.orderactive2 = true
				this.orderby = 'province'
				this.$http.get('/analyzes/audience/room/' + this.$route.params.id + '?page=1&per-page=' + this.pagesize + '&orderby=' + this.orderby + '&access-token=' + localStorage.getItem('accessToken')).then((response) => {
					console.log('success')
					console.log(response.body)
					this.totalnum = response.body.data.watch_num
					this.tableData = response.body.data.list
					for (var b = 0; b < this.tableData.length; b++) {
						this.tableData[b].earliest_enter_time = new Date(parseInt(this.tableData[b].earliest_enter_time * 1000)).toLocaleString()
						this.tableData[b].latest_out_time = new Date(parseInt(this.tableData[b].latest_out_time * 1000)).toLocaleString()
						if (this.tableData[b].sex == null) {
							this.tableData[b].sex = '男'
						} else if (this.tableData[b].sex == 1) {
							this.tableData[b].sex = '男'
						} else {
							this.tableData[b].sex = '女'
						}
						this.tableData[b].id = b + 1
					}
					this.maxpage = response.body.data.pageInfo.totalCount
					this.$http.post('/analyzes/data/room/' + this.$route.params.id, {
						time_slot: 0
					}).then((response) => {
						console.log('success')
						console.log(response.body)
						this.totaltime = response.body.data.situation.live_duration
					}, (response) => {
						console.log('error')
						console.log(response.body)
					})
				}, (response) => {
					console.log('error')
					console.log(response.body)
				})
			}

		},
		//当前页改变时的函数
		handleCurrentChange: function(val) {
			console.log(val)
			this.$http.get('/analyzes/audience/room/' + this.$route.params.id + '?page=' + val + '&per-page=' + this.pagesize + '&orderby='+this.orderby+'&access-token=' + localStorage.getItem('accessToken')).then((response) => {
				console.log('success')
				console.log(response.body)
				this.tableData = response.body.data.list
				for (var b = 0; b < this.tableData.length; b++) {
					this.tableData[b].earliest_enter_time = new Date(parseInt(this.tableData[b].earliest_enter_time * 1000)).toLocaleString()
					this.tableData[b].latest_out_time = new Date(parseInt(this.tableData[b].latest_out_time * 1000)).toLocaleString()
					if (this.tableData[b].sex == null) {
						this.tableData[b].sex = '男'
					} else if (this.tableData[b].sex == 1) {
						this.tableData[b].sex = '男'
					} else {
						this.tableData[b].sex = '女'
					}
					if (val == 1) {
						this.tableData[b].id = b + 1
					} else {
						this.tableData[b].id = (val - 1) * this.pagesize + b + 1
					}
				}
			}, (response) => {
				console.log('error')
				console.log(response.body)
			})
		},
		//当前显示多少数一页改变后
		handleSizeChange: function(val) {
			console.log(val)
				// 一页显示的数量改变后
			this.pagesize = val
			this.$http.get('/analyzes/audience/room/' + this.$route.params.id + '?page=1&per-page=' + val + '&orderby=' + this.orderby + '&access-token=' + localStorage.getItem('accessToken')).then((response) => {
				console.log('success')
				console.log(response.body)
				this.totalnum = response.body.data.watch_num
				this.tableData = response.body.data.list
				for (var b = 0; b < this.tableData.length; b++) {
					this.tableData[b].earliest_enter_time = new Date(parseInt(this.tableData[b].earliest_enter_time * 1000)).toLocaleString()
					this.tableData[b].latest_out_time = new Date(parseInt(this.tableData[b].latest_out_time * 1000)).toLocaleString()
					if (this.tableData[b].sex == null) {
						this.tableData[b].sex = '男'
					} else if (this.tableData[b].sex == 1) {
						this.tableData[b].sex = '男'
					} else {
						this.tableData[b].sex = '女'
					}
					this.tableData[b].id = b + 1
				}
				this.maxpage = response.body.data.pageInfo.totalCount
				this.$http.post('/analyzes/data/room/' + this.$route.params.id, {
					time_slot: 0
				}).then((response) => {
					console.log('success')
					console.log(response.body)
					this.totaltime = response.body.data.situation.live_duration
				}, (response) => {
					console.log('error')
					console.log(response.body)
				})
			}, (response) => {
				console.log('error')
				console.log(response.body)
			})
		},
		save: function() {
			console.log('here');

		}
	},
	mounted() {
		this.getList("time")
	}
}
</script>
<style lang="less">
.room_title {
    text-align: center;
    padding: 15px 0;
}

.info {
    overflow: hidden;
    .info_item {
        /*text-align: center;*/
    }
}

.control {
    text-align: right;
    margin-top: 15px;
    padding-top: 5px;
    border-top: 1px solid #c0c0c0;
    .audience_total {
        display: inline-block;
    }
    .export {
        float: left;
    }
}

.orderbutton {
    padding: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
}

.orderactive {
    background: #4db3ff;
    color: white;
}
</style>
