<template>
	<el-row>
		<h2 class="room_title">直播间名字-用户管理</h2>
		<div class="info">
			<el-col class="info_item" :span="8">总观看人数: 333</el-col>
			<el-col class="info_item" :span="8">总播放时长: 400min</el-col>
			<el-col class="info_item" :span="8">开播时间: 2016-12-05 09:14</el-col>
		</div>
		<div class="hr"></div>
		<el-table :data="tableData" stripe>
			<el-table-column prop="id" label="序号"></el-table-column>
			<el-table-column prop="nickname" label="昵称"></el-table-column>
			<el-table-column prop="tel" label="手机号"></el-table-column>
			<el-table-column prop="totalTime" label="总观看时长(min)"></el-table-column>
			<el-table-column prop="lastTime" label="最后进入时间"></el-table-column>
			<el-table-column prop="sex" label="性别"></el-table-column>
			<el-table-column prop="address" label="地区"></el-table-column>

		</el-table>

		<div class="control">
			<el-pagination class="audience_total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[50, 100, 200, 400]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
			<!-- <el-button class="export">邮件发送</el-button> -->
			<el-button class="export" type="primary">保存到本地</el-button>
		</div>
		</di>
</template>
<script>
	export default {
		data: function() {
			return {
				tableData: [{
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}, {
					id: 6,
					nickname: '王小虎',
					address: '上海市',
					tel: '15607683922',
					totalTime: 59,
					lastTime: '2016-12-05 23:09',
					sex: '男'
				}]
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			}
		},
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
			text-align: center;
		}
	}
	
	.control {
		text-align: right;
		margin-top: 15px;
		padding-top: 5px;
		border-top: 1px solid #c0c0c0;
		// 统计分页
		.audience_total {
			display: inline-block;
		}
		.export {
			float: left;
		}
	}
</style>