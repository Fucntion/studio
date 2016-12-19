<template>
	<el-tabs v-if="studio" ref="Menutab" active-name="1"  type="border-card"  @tab-click="initMenuTab" @tab-remove="removeMenuTab"  >
		<!--如果菜单长度小于4，就显示添加菜单的选项卡-->
		<el-tab-pane :name="add" class="addMenuTab" label="创建菜单">
			<div class="menuEditTip" v-if="studio.pluginObj.menu.length>3">为了更好的用户体验，最多允许设置四个自定义菜单</div>
			<el-form ref="formadd" :rules="rules" :model="formadd" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
						<el-input v-model="formadd.title" :disabled="studio.pluginObj.menu.length>3" placeholder="菜单名称不超过四个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型" prop="type">
					<el-select v-model="formadd.type"  :disabled="studio.pluginObj.menu.length>3" placeholder="请选择菜单的类型">
						<el-option label="图文内容" value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='article'">
					<el-input type="textarea" prop="article" v-model="formadd.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='goods'">
					<div>
						<el-table @selection-change="handleSelectionChange" v-if="goodsData" :data="goodsData" stripe>
							<!--<el-table-column type="selection" width="55"></el-table-column>-->
							<el-table-column prop="goodsName" label="商品"></el-table-column>
							<!--<el-table-column inline-template label="缩略图"><div><img style="max-width: 66px;" :src=row.goodsThums /></div></el-table-column>-->
							<el-table-column prop="shopPrice" label="价格"></el-table-column>
							<el-table-column prop="goodsStock" label="库存"></el-table-column>
							<el-table-column prop="saleCount" label="销量"></el-table-column>
							<el-table-column inline-template label="选择商品">
								<div>
									<template v-if="row.isSelect">
										<el-button size="small" type="primary" @click="handleSelectionChange(row)">
											已选中
										</el-button>
									</template>
									<template v-else>
										<el-button size="small" @click="handleSelectionChange(row)">
											未选中
										</el-button>
									</template>
								</div>
							</el-table-column>
						</el-table>
					</div>

				</el-form-item>
				<el-form-item>
					<template v-if="studio.pluginObj.menu.length>3">
						<el-button type="primary" :disabled="true">最多只能拥有四个菜单</el-button>
					</template>
					<template v-else>
						<el-button @click="onSubmit" type="primary">立即创建</el-button>
						<el-button @click="dialog.visible=false">取消</el-button>
					</template>
					
				</el-form-item>
			</el-form>
		</el-tab-pane>

		<!--不同的name表示两种类别的tab.item和add-->
		<el-tab-pane v-if="studio.pluginObj.menu.length>0" v-for="(item, key, index)  in studio.pluginObj.menu" :name="'edit'+key" :label="item.title">

			<el-form ref="formedit" :rules="rules" :model="item" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="item.title" placeholder="菜单名称不超过四个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型" prop="type">
					<el-select v-model="item.type" placeholder="请选择菜单的类型">
						<el-option label="图文内容" select value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="item.type&&item.type=='article'">
					<el-input type="textarea" prop="article" v-model="item.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="item.type&&item.type=='goods'">
					<div>
						<el-table @selection-change="handleSelectionChange" v-if="goodsData" :data="formEditData(item.goods,goodsData)" stripe>
							<el-table-column prop="goodsName" label="商品"></el-table-column>
							<el-table-column prop="shopPrice" label="价格"></el-table-column>
							<el-table-column prop="goodsStock" label="库存"></el-table-column>
							<el-table-column prop="saleCount" label="销量"></el-table-column>
							<el-table-column inline-template label="选择商品">
								<div>
									<template v-if="row.isSelect">
										<el-button size="small" type="primary" @click="handleSelectionChange(row)">已选中</el-button>
									</template>
									<template v-else>
										<el-button size="small" @click="handleSelectionChange(row)">未选中</el-button>
									</template>
								</div>
							</el-table-column>
						</el-table>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmitEdit(item)" type="primary">保存</el-button>
					<el-button @click="dialog.visible=false">取消</el-button>
					<el-button @click="onDelete(key)">删除</el-button>
				</el-form-item>
			</el-form>

		</el-tab-pane>

	</el-tabs>
</template>

<script>
	import store from '../../vuex/store';
	export default {
		data: function() {
			var validateTitle = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入菜单名称'));
				} else if(value.length > 4) {
					callback(new Error('菜单长度不能超过四个字符'));
				} else {
					callback();
				}
			};
			var validateType = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请选择菜单类型'));
				} else {
					callback();
				}
			};

			return {
				studio: null,
				goodsData: null,
				formadd: {
					title: '',
					type: '',
					article: '',
					goods: [],//线上用
				},
				rules: {
					title: [{
						validator: validateTitle
					}],
					type: [{
						validator: validateType
					}]
				},

			}
		},
		store,
		computed: {
			
		},
		props: ['dialog'],
		methods: {
			onDelete:function(key){
				var self =this;
				self.$confirm('确认删除该菜单？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		       }).then(() => {
					

		        	if(self.studio.pluginObj.menu.length ==1){
		        		self.studio.pluginObj.menu = [];
		        		self.$refs.Menutab.currentName='1';//切换到"创建菜单tab-pane"
						this.$notify({
							title: '提示',
							message: '自定义菜单为空',
							type: 'warning'
						});


		        	}else{
		        		self.studio.pluginObj.menu.splice(key,1);
		        	}
		        }).catch(() => {
		            self.$message({
					  type: 'warning',
					  message: '删除失败!'
					});       
		        });
				
			},
			checkDialog: function(components, title, type) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.type = type;
				store.commit("openModal", obj);
			},
			formEditData:function(goods,goodsData){
				var self =this;
				var tempDataArr = self.deepCopy(goodsData);
				for(var keyA in tempDataArr){
					for(var keyB in goods){
						if(goods[keyB] ==tempDataArr[keyA].goodsId){
							tempDataArr[keyA].isSelect = true;
						}
					}
				}
				return self.deepCopy(tempDataArr);
			},
			initMenuTab: function(tab) {
				var self = this;

				if(tab.label=='创建菜单' &&self.studio.pluginObj.menu.length>3){
					this.$notify({
						title: '提示',
						message: '最多可设置四个自定义菜单',
						type: 'warning'
					});
				}
			},
			removeMenuTab: function(tab) {
				
//				var self=this,index = parseInt(tab.index.replace('edit','')),
//				tempArr =self.deepCopy(self.studio.pluginObj.menu);
//				if(tempArr.length ==1){
//					this.$notify({
//						title: '提示',
//						message: '自定义菜单为空',
//						type: 'warning'
//					});
//	        		tempArr.menu = [];
//	        		self.dialog={};
//					self.checkDialog('menuEdit','自定义菜单','menuModal');	
//	        	}else{
//	        		tempArr.splice(index,1);
//	        	}
//	        	 self.studio.pluginObj.menu=self.deepCopy(tempArr);
//	        	 console.log(tempArr);
	        	

			},
			deepCopy: function(o) {
				var self = this;
				if(o instanceof Array) {
					var n = [];
					for(var i = 0; i < o.length; ++i) {
						n[i] = self.deepCopy(o[i]);
					}
					return n;

				} else if(o instanceof Object) {
					var n = {}
					for(var i in o) {
						n[i] = self.deepCopy(o[i]);
					}
					return n;
				} else {
					return o;
				}
			},
			//只要修改对应的item数据即可，至于格式化之类的操作全部写在store里面
			onSubmitEdit: function(item) {
				var self =this;
				if(item.article == '' && item.type == 'article') {
							this.$notify({
								title: '提示',
								message: '图文内容不能为空',
								type: 'warning'
							});
							return;
						}
					

						if(item.type == 'goods' &&item.goods.length < 1) {
							this.$notify({
								title: '提示',
								message: '商品信息不能为空',
								type: 'warning'
							});
							return;
						}
						
						var data = {
							id: this.$router.currentRoute.params.id,
							studio: this.studio,
						}

						store.commit('changeStudio', data);

			},
			onSubmit: function(ev) {

				var self = this;

				self.$refs.formadd.validate((valid) => {
					if(valid) {
						
						//这里只改动本地的对象,一切的关于studioObj的处理,放在store中.
						var self = this;

						if(self.formadd.article == '' && self.formadd.type == 'article') {
							this.$notify({
								title: '提示',
								message: '图文内容不能为空',
								type: 'warning'
							});
							return;
						}
							
						//恢复goodsData状态并更新goods
						var total = 0,tempArrGoods = [];
						for(var i = 0; i < self.goodsData.length; i++) {
							if(self.goodsData[i].isSelect) {
								total++;
								tempArrGoods.push(self.goodsData[i].goodsId);
							}
							self.goodsData[i].isSelect = false; //把商品列表的信息回复初始化

						}
						
						self.formadd.goods = self.deepCopy(tempArrGoods);
						tempArrGoods = [];//方便下次用
						

						if(total < 1 && self.formadd.type == 'goods') {
							this.$notify({
								title: '提示',
								message: '商品信息不能为空',
								type: 'warning'
							});
							return;
						}
						
						//将新建的实例添加到pluginObj中
					var Arr1 = self.deepCopy(self.formadd);
						self.studio.pluginObj.menu.push(Arr1);
						
						
						//更新sutdio和服务器配置
						var data = {
							id: this.$router.currentRoute.params.id,
							studio: this.studio,
						}
						store.commit('changeStudio', data);

						//打扫战场，清理痕迹
						self.$refs.formadd.resetFields();
						self.formadd={
							title:'',
							type:'',
							article:'',
							goods:[],
						}
						

					} else {

						return false;
					}
				});
			},
			handleSelectionChange(row) {
				var self = this;

				if(!row.goodsId) {
					this.$notify.info({
						title: '提示信息',
						message: '商品信息错误',
						type: 'warning'
					});
					return;
				}
				row.isSelect = !row.isSelect; //切换选中状态

			},
			init() {
				var self = this;
				self.studio = store.getters.getStudio;
				//native= 表示这个是不需要自动添加host信息的
				var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/merchantGoodsList'
				this.$http.get(url).then((response) => {

					var tempObj = response.body.data.root;
					for(var key in tempObj) {
						tempObj[key].isSelect = false;
					}
					self.goodsData = tempObj;

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

<style lang="less">
.addMenuTab{
	.el-icon-close{
		display: none !important;
	}
}
.menuEditTip{
	background: #C0CCDA;
    padding: 5px;
    margin: 5px 0 20px;
}

</style>