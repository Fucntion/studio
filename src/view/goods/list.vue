<template>
	<div class="goodsList">
		<el-table v-loading="loading" element-loading-text="拼命加载中" :data="goodsTableData" border style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="goodsName" min-width="230px" label="商品"></el-table-column>
			<el-table-column inline-template min-width="100px" label="缩略图">
				<div style="text-align:center;"><img style="max-width: 66px;" :src="row.goodsImg" /></div>
			</el-table-column>
			<el-table-column prop="shopPrice" label="价格"></el-table-column>
			<el-table-column prop="goodsStock" label="库存"></el-table-column>
			<el-table-column prop="saleCount" label="销量"></el-table-column>
			<el-table-column inline-template min-width="200px" label="操作">
				<template>
					<el-button type="primary" @click="edit(row.goodsId,row)">编辑</el-button>
					<el-button type="primary" @click="del(row.goodsId,row)">删除</el-button>

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

	//这个页面终于不要捣鼓烦人的studio对象了，放个注释庆祝下
	export default {
		data: function() {

			return {
				goodsTableData: [],
				loading: true
			}
		},
		methods: {
			edit(id,row){
				this.$router.push('/edit/'+id)
			},
			del(id, row) {

				this.$confirm(name + '功能已经存在，是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					var key = _.findIndex(this.goodsTableData, row);
					console.log(key);
					this.goodsTableData.splice(key, 1);

					var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/del/goodsId/' + id;
					this.$http.get(url).then((response) => {

						if(response.body.code == 100) {
							this.$notify.info({
								title: '提示信息',
								message: '删除成功'
							});
						} else {
							this.$notify.info({
								title: '删除失败',
								message: response.body.msg
							});
						}

					}, (response) => {

					});

				}).catch(() => {

				});

			},
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
					self.loading = false;

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