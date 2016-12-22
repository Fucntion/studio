<template>
	<div class="goodsList" v-if="show">
		<el-table  :data="goodsTableData" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="goodsName" min-width="100px" label="商品"></el-table-column>
			<el-table-column inline-template min-width="150px" label="缩略图">
				<div><img style="max-width: 66px;"  :src=row.goodsThums /></div>
			</el-table-column>
			<el-table-column prop="shopPrice" label="价格"></el-table-column>
			<el-table-column prop="goodsStock" label="库存"></el-table-column>
			<el-table-column prop="saleCount" label="销量"></el-table-column>
			<el-table-column inline-template  min-width="200px" label="操作">
				<template>
					<el-button type="primary">编辑</el-button>
					<el-button type="primary">删除</el-button>
					
				</template>

			</el-table-column>
		</el-table>
	<div class="control">
			<el-pagination class="audience_total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[50, 100, 200, 400]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
			<!-- <el-button class="export">邮件发送</el-button> -->
			<el-button class="export" type="primary">保存到本地</el-button>
		</div>
	</div>
</template>

<script>
	//这个页面终于不要捣鼓烦人的studio对象了，放个注释庆祝下
	export default {
		data: function() {

			return {
				goodsTableData: [],
				show: false
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
			init: function() {

				var self = this;
				//native= 表示这个是不需要自动添加host信息的
				var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/merchantGoodsList'
				this.$http.get(url).then((response) => {

					self.goodsTableData = response.body.data.root;
					self.show = true;

				}, (response) => {

				});

			}
		},
		components: {

		},
		mounted() {
			this.init();
		}
	}
</script>

<style>

</style>