<template lang="html">
	<div class="inforitems">
		<el-row style='padding: 1rem;background: white;'>
			<el-col :span='24'>
				<el-row>
					<el-col :span='6'>
						<p class='detail_p'>"{{liveTitle}}"收益详情</p>
					</el-col>
					<el-col :span='12' style='display: flex;justify-content: space-between;align-items: center;'>
						<p class='detail_p2'>总收益:<span class='detail_span'>￥{{totalIncome}}</span></p>
						<p>|</p>
						<p class='detail_p2'>付费:<span class='detail_span'>￥{{payIncome}}</span></p>
						<p>|</p>
						<p class='detail_p2'>打赏:<span class='detail_span'>￥{{getIncome}}</span></p>
						<p>|</p>
						<p class='detail_p2'>红包:<span class='detail_span'>￥{{redIncome}}</span></p>
					</el-col>
					<el-col :span='6' style='text-align: right;'>
						<p class='detail_p' @click='backToIncome' style='cursor:pointer;'>&lt;返回查看总收益</p>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<div class='row_container'>
			<el-row class='justButton'>
				<p :class='[{"active":activeItem[0]},"justp"]' @click='getIncomeDetail(0)' autofocus>全部类型</p>
				<p style='padding-left: 1.5rem;padding-right: 1.5rem;margin-left: 0.1rem;' :class='[{"active":activeItem[1]},"justp"]' @click='getIncomeDetail(1)'>付费</p>
				<p style='padding-left: 1.5rem;padding-right: 1.5rem;margin-left: 0.1rem;' :class='[{"active":activeItem[2]},"justp"]' @click='getIncomeDetail(2)'>打赏</p>
				<p style='padding-left: 1.5rem;padding-right: 1.5rem;margin-left: 0.1rem;' :class='[{"active":activeItem[3]},"justp"]' @click='getIncomeDetail(3)'>红包</p>
			</el-row>
			<el-row style='width:100%;'>
				<table style='width:100%;margin-top: 1rem;'>
					<tr style='border-bottom: 1px solid black;'>
						<th style='width:25%;' v-for='item in tableHeader'>{{item}}</th>
					</tr>
					<tr v-for='item in tableData'>
						<td class='listTd'>{{item.created_at}}</td>
						<td class='listTd'>￥{{item.money}}</td>
						<td class='listTd'>{{item.user_id}}</td>
						<td class='listTd'>无</td>
					</tr>
				</table>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				activeItem: ['', '', '', ''],
				totalIncome: '',
				payIncome: '',
				getIncome: '',
				redIncome: '',
				liveTitle: '',
				tableHeader: ['时间', '金额', '账号', '备注'],
				tableData: []
			}
		},
		methods: {
			// 根据roomid拿直播间名称
			getIncomeTotal: function() {
				this.$http.get('/income/my-income').then((response) => {
					console.log('success');
					console.log(response.body);
					for(var a = 0; a < response.body.data.list.length; a++) {
						if(response.body.data.list[a].room_id == this.$route.params.id) {
							this.liveTitle = response.body.data.list[a].title
							if(response.body.data.list[a].pay_income == null) {
								response.body.data.list[a].pay_income = 0
							}
							if(response.body.data.list[a].dashang_income == null) {
								response.body.data.list[a].dashang_income = 0
							}
							if(response.body.data.list[a].hongbao_income == null) {
								response.body.data.list[a].hongbao_income = 0
							}
							if(response.body.data.list[a].income_balance == null) {
								response.body.data.list[a].income_balance = 0
							}
							this.totalIncome = response.body.data.list[a].income_balance
							this.payIncome = response.body.data.list[a].pay_income
							this.getIncome = response.body.data.list[a].dashang_income
							this.redIncome = response.body.data.list[a].hongbao_income
							return;
						}
					}
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			getIncomeDetail: function(origin) {
				for(var a = 0; a < this.activeItem.length; a++) {
					if(a == origin) {
						this.activeItem[a] = true
					} else {
						this.activeItem[a] = false
					}
				}
				if(origin == 0) {
					this.$http.get('/income?access-token=' + localStorage.getItem('accessToken') + '&page=1&per-page=20&room_id=' + this.$route.params.id).then((response) => {
						console.log('success');
						console.log(response.body);
						for(var a = 0; a < response.body.data.list.length; a++) {
							response.body.data.list[a].created_at = new Date(response.body.data.list[a].created_at * 1000).toLocaleString()
						}
						this.tableData = response.body.data.list

					}, (response) => {
						console.log('error');
						console.log(response.body);
					})
				} else {
					this.$http.get('/income?access-token=' + localStorage.getItem('accessToken') + '&page=1&per-page=20&room_id=' + this.$route.params.id + '&origin=' + origin).then((response) => {
						console.log('success');
						console.log(response.body);
						for(var a = 0; a < response.body.data.list.length; a++) {
							response.body.data.list[a].created_at = new Date(response.body.data.list[a].created_at * 1000).toLocaleString()
						}
						this.tableData = response.body.data.list

					}, (response) => {
						console.log('error');
						console.log(response.body);
					})
				}
			},
			backToIncome: function() {
				this.$router.push('/information')
			}
		},
		mounted() {
			this.getIncomeTotal()
			this.getIncomeDetail(0)
		}
	}
</script>

<style lang="less">
	.row_container {
		background: white;
		margin-top: 1rem;
		padding: 1rem;
	}
	
	.detail_p2 {
		font-size: 14px;
		.detail_span {
			font-size: 16px;
			color: #f7ab00;
		}
	}
	
	.inforitems {}
	
	.detail_p {
		font-size: 18px;
	}
	
	.listTd {
		text-align: center;
		padding-top: 1.5rem;
	}
	
	.justButton {
		display: flex;
		p {
			cursor: pointer;
			padding: 0.5rem;
			font-size: 18px;
		}
	}
	
	.row_container {
		table {
			tr {
				th {
					padding-bottom: 1rem;
					border-bottom: 1px solid #c0c0c0;
				}
				th:first-child {
					text-align: left;
				}
				th:nth-child(4) {
					text-align: right;
				}
				td:first-child {
					text-align: left;
				}
				td:nth-child(4){
					text-align: right;
				}
			}
		}
	}
	
	.justp {
		background: #f2f2f2;
	}
	
	.active {
		background: #21a0ff;
		color: white;
	}
</style>