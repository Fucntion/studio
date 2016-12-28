<template>
	<div v-if="show">

		<div style="margin-bottom: 20px;">
			<el-button size="small" type="primary" @click="add()">添加菜单</el-button>
		</div>
		<!--<el-tabs type="card" closable>
  <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.name">{{item.content}}</el-tab-pane>
</el-tabs>-->

		<!--<el-tab-pane :name="add" class="addMenuTab" label="创建菜单">
			<div class="menuEditTip" v-if="studio.pluginObj.menu.length>2">为了更好的用户体验，最多允许设置三个自定义菜单</div>
			<el-form ref="formadd" :rules="rules" :model="formadd" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
						<el-input v-model="formadd.title"  :disabled="studio.pluginObj.menu.length>2" placeholder="菜单名称不超过三个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型" prop="type">
					<el-select v-model="formadd.type"  :disabled="studio.pluginObj.menu.length>2" placeholder="请选择菜单的类型">
						<el-option label="图文内容" value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='article'">
					<el-input type="textarea" prop="article" v-model="formadd.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='goods'">
					<div>
						<el-table v-if="goodsData" :data="goodsData" stripe>
							<el-table-column prop="goodsName" width="180px" label="商品"></el-table-column>
							<el-table-column inline-template label="缩略图"><div><img style="width: 100px;" :src=row.goodsImg /></div></el-table-column>
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
					<template v-if="studio.pluginObj.menu.length>2">
						<el-button type="primary" :disabled="true">最多只能拥有三个菜单</el-button>
					</template>
					<template v-else>
						<el-button @click="onSubmit" type="primary">立即创建</el-button>
					</template>
					
				</el-form-item>
			</el-form>
		</el-tab-pane>-->

		<template v-if="menuList.length>0">
			<el-tabs class="menuEditBox" closable ref="Menutab" type="border-card" @tab-remove="removeMenuTab">
				<el-tab-pane v-for="(item, key, index)  in menuList" :name="key+''" :label="item.title">

					<el-form ref="formedit" :rules="rules" :model="item" label-width="80px">
						<el-form-item label="菜单名称" prop="title">
							<el-input v-model="item.title" placeholder="菜单名称不超过三个中文字"></el-input>
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
								<el-table v-if="goodsData" :data="                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 (item.goods,goodsData)" stripe>
									<el-table-column prop="goodsName" width="180px" label="商品"></el-table-column>
									<el-table-column inline-template label="缩略图">
										<div><img style="width: 100px;" :src=row.goodsImg /></div>
									</el-table-column>
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
							<!--<el-button @click="onDelete(key)">删除</el-button>-->
						</el-form-item>
					</el-form>

				</el-tab-pane>
			</el-tabs>
		</template>
		<template v-else>
			暂无数据，请添加
		</template>

	</div>

</template>

<script>
	import store from 'store';
	export default {
		name: 'menuEdit',
		data: function() {
			var validateTitle = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入菜单名称'));
				} else if(value.length > 4) {
					callback(new Error('菜单长度不能超过三个字符'));
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
				show: false,
				tabs: [],
				studio: null,
				goodsData: null,

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
			menuList:function(){
				var self=this;
				return self.studio.pluginObj.menu;
			}
		},
		props: ['dialog'],
		methods: {
			removeMenuTab: function(tabItem) {

				var self = this,
					obj = self.studio.pluginObj.menu;
				for(var i = 0; i < obj.length; i++) {
					//不允许自定义标题有同名的
					if(obj[i].title == tabItem.label) {
						obj.splice(i, 1);
						break;
					}

				}

				//更新sutdio和服务器配置
				var data = {
					id: self.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);
				
			},
			subConfig(obj) {

				var self = this;

				var data = {
					id: self.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);
			},
			checkDialog: function(components, title, type) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.type = type;
				store.commit("openModal", obj);
			},
			formEditData: function(goods, goodsData) {
				var self = this;
				var tempDataArr = self.deepCopy(goodsData);
				for(var keyA in tempDataArr) {
					for(var keyB in goods) {
						if(goods[keyB] == tempDataArr[keyA].goodsId) {
							tempDataArr[keyA].isSelect = true;
						}
					}
				}
				return self.deepCopy(tempDataArr);
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
				var self = this;

				if(item.article == '' && item.type == 'article') {
					this.$notify({
						title: '提示',
						message: '图文内容不能为空',
						type: 'warning'
					});
					return;
				}

				if(item.type == 'goods' && item.goods.length < 1) {
					this.$notify({
						title: '提示',
						message: '商品信息不能为空',
						type: 'warning'
					});
					return;
				}

				self.subConfig();

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
						var total = 0,
							tempArrGoods = [];
						for(var i = 0; i < self.goodsData.length; i++) {
							if(self.goodsData[i].isSelect) {
								total++;
								tempArrGoods.push(self.goodsData[i].goodsId);
							}
							self.goodsData[i].isSelect = false; //把商品列表的信息回复初始化

						}

						self.formadd.goods = self.deepCopy(tempArrGoods);
						tempArrGoods = []; //方便下次用

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

						self.subConfig();

						//打扫战场，清理痕迹
						self.$refs.formadd.resetFields();
						self.formadd = {
							title: '',
							type: '',
							article: '',
							goods: [],
						}

					} else {

						return false;
					}
				});
			},
			add: function() {

				var self = this;
				if(self.studio.pluginObj.menu.length > 2) {
					this.$notify({
						title: '提示',
						message: '最多可以添加三个菜单',
						type: 'warning'
					});
					return;
				}
				
				
				var addObj = {
					title: 0,
					type: '',
					article: '',
					goods: [], //线上用
				};
				function name(title){
					for(var k in self.studio.pluginObj.menu){

						if(self.studio.pluginObj.menu[k].title==title){	
							title++;
						}else{
							continue;
						}
						
						name(obj.title);
					}
					return title;
				}

				
				
				addObj.title ='tab'+name(addObj.title);

				self.studio.pluginObj.menu.push(self.deepCopy(addObj));
				self.subConfig();
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
				self.show = true;
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
	.addMenuTab {
		.el-icon-close {
			/*display: none !important;*/
		}
	}
	
	.menuEditTip {
		background: #C0CCDA;
		padding: 5px;
		margin: 5px 0 20px;
	}
	
	.menuEditBox {
		width: 100%;
	}
</style>