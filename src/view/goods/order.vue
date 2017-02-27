<template>
	<div>
		<el-table v-loading="loading" element-loading-text="拼命加载中" :data="orderDataList" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column prop="orderId" min-width="50px" label="订单号"></el-table-column>
			<el-table-column inline-template min-width="220px" label="商品" align="center">
				<div class="goods_info">

					<img style="max-width: 100px;" :src="row.goodsImg" />
					<div class="info">{{row.goodsName}}
						<h2>{{row.shopPrice}}</h2>
					</div>
				</div>
			</el-table-column>
			<el-table-column prop="number" min-width="50px" align="center" label="数量"></el-table-column>
			<el-table-column prop="shopPrice" min-width="50px" align="center" label="价格"></el-table-column>

			<el-table-column prop="total" min-width="60px" align="center" label="总价(￥)"></el-table-column>
			<el-table-column inline-template align="center" min-width="80px" label="联系人">
				<div style="text-align:center;">{{row.userName}}<br/>{{row.tel}}</div>
			</el-table-column>
			<el-table-column inline-template min-width="100px" label="操作" align="center">
				<template>
					<el-button>{{row.orderStatus}}</el-button>
				</template>

			</el-table-column>
		</el-table>
		<div class="control">
			<el-pagination class="audience_total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="20"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
				<!-- <el-button class="export">邮件发送</el-button> -->
				<!-- <el-button class="export" type="primary">保存到本地</el-button> -->
		</div>
	</div>
</template>

<script>
	export default {
		data: function () {

			return {
				orderDataList: [],
				loading: true,
				total: null
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			init: function () {
				var url = "shop=http://shop.icloudinn.com/index.php/Api/Orders/queryShopOrders--token--&currPage=1&pageSize=20"
				this.$http.get(url).then((response) => {

					this.orderDataList = response.body.data.root
					this.total = parseInt(response.body.data.total)

					this.loading = false
				}, (response) => {

				})
			}
		},
		components: {

		},
		mounted() {
			this.init()
		}
	}

</script>

<style lang="less">
	.goods_info {
		margin: 10px 0;
		overflow: hidden;
		img {
			float: left;
		}
		.info {
			float: left;
			text-align: left;
			margin-left: 15px;
			width: 200px;
		}
	}
</style>