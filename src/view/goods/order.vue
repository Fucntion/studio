<template>
	<div>
		<el-table v-loading="loading" element-loading-text="拼命加载中" :data="orderDataList" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column prop="orderId" min-width="50px" label="订单号"></el-table-column>
			<!-- <el-table-column prop="goodsName" min-width="230px" label="商品"></el-table-column> -->
			<el-table-column inline-template min-width="220px" label="商品" align="center">
				<div class="goods_info">

					<img style="max-width: 100px;" :src="row.goodsImg" />
					<div class="info">{{row.goodsName}}
						<h2>{{row.shopPrice}}</h2></div>
				</div>
			</el-table-column>
			<el-table-column prop="number" min-width="50px" align="center" label="数量"></el-table-column>
			<el-table-column prop="shopPrice" min-width="50px" align="center" label="价格"></el-table-column>

			<el-table-column prop="total" min-width="60px" align="center" label="总价(￥)"></el-table-column>
			<el-table-column inline-template align="center" min-width="80px" label="联系人">
				<div style="text-align:center;">{{row.linkName}}<br/>{{row.tel}}</div>
			</el-table-column>
			<el-table-column inline-template min-width="100px" label="操作" align="center">
				<template>
					<el-button>{{row.orderStatus}}</el-button>

				</template>

			</el-table-column>
		</el-table>
		<div class="control">
			<el-pagination class="audience_total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[50, 100, 200, 400]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
			<!-- <el-button class="export">邮件发送</el-button> -->
			<!-- <el-button class="export" type="primary">保存到本地</el-button> -->
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {

			return {
				orderDataList: [{
						orderId: 89757,
						goodsName: '阳光MAX能理疗的远红外碳管电热水暖器',
						shopPrice: '2016', //商品价格
						number: 10,
						address: '海口市演丰镇瑶城村西河路1号',
						linkName: '汪君相',
						tel: '15607683921',
						total: 255,
						goodsImg: 'http://saaslive.oss-cn-shanghai.aliyuncs.com/%E9%9D%92%E4%BA%91/TB1TGZ_OpXXXXcLXXXXSutbFXXX.jpg_q90.jpg',
						orderStatus: '已支付'
					}, {
						orderId: 89757,
						goodsName: '阳光MAX能理疗的远红外碳管电热水暖器',
						shopPrice: '2016', //商品价格
						number: 10,
						address: '海口市演丰镇瑶城村西河路1号',
						linkName: '汪君相',
						tel: '15607683921',
						total: 255,
						goodsImg: 'http://saaslive.oss-cn-shanghai.aliyuncs.com/%E9%9D%92%E4%BA%91/TB1TGZ_OpXXXXcLXXXXSutbFXXX.jpg_q90.jpg',
						orderStatus: '已支付'
					}, {
						orderId: 89757,
						goodsName: '阳光MAX能理疗的远红外碳管电热水暖器',
						shopPrice: '2016', //商品价格
						number: 10,
						address: '海口市演丰镇瑶城村西河路1号',
						linkName: '汪君相',
						tel: '15607683921',
						total: 255,
						goodsImg: 'http://saaslive.oss-cn-shanghai.aliyuncs.com/%E9%9D%92%E4%BA%91/TB1TGZ_OpXXXXcLXXXXSutbFXXX.jpg_q90.jpg',
						orderStatus: '已支付'
					}, {
						orderId: 89757,
						goodsName: '阳光MAX能理疗的远红外碳管电热水暖器',
						shopPrice: '2016', //商品价格
						number: 10,
						address: '海口市演丰镇瑶城村西河路1号',
						linkName: '汪君相',
						tel: '15607683921',
						total: 255,
						goodsImg: 'http://saaslive.oss-cn-shanghai.aliyuncs.com/%E9%9D%92%E4%BA%91/TB1TGZ_OpXXXXcLXXXXSutbFXXX.jpg_q90.jpg',
						orderStatus: '已支付'
					}, {
						orderId: 89757,
						goodsName: '阳光MAX能理疗的远红外碳管电热水暖器',
						shopPrice: '2016', //商品价格
						number: 10,
						address: '海口市演丰镇瑶城村西河路1号',
						linkName: '汪君相',
						tel: '15607683921',
						total: 255,
						goodsImg: 'http://saaslive.oss-cn-shanghai.aliyuncs.com/%E9%9D%92%E4%BA%91/TB1TGZ_OpXXXXcLXXXXSutbFXXX.jpg_q90.jpg',
						orderStatus: '已支付'
					},

				]
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
		},
		components: {

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