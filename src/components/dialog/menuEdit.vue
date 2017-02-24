<template>
	<div v-if="show">

		<div style="margin-bottom: 20px;">
			<el-button size="small" type="primary" @click="add()">添加菜单</el-button>
		</div>

		<template v-if="menuList.length>0">
			<el-tabs class="menuEditBox" closable ref="Menutab" type="border-card" @tab-remove="removeMenuTab">
				<el-tab-pane v-for="(item, key, index)  in menuList" :name="key+''" :label="item.title">

					<el-form :ref="'formedit'+key" :rules="rules" :model="item" label-width="80px" :key="index">
						<el-form-item label="菜单名称" prop="title">
							<el-input v-model="item.title" placeholder="菜单名称不超过三个中文字"></el-input>
						</el-form-item>
						<el-form-item label="菜单类型" prop="type">
							<el-select v-model="item.type" placeholder="请选择菜单的类型">
								<el-option label="图文内容" select value="show"></el-option>
								<el-option label="商品列表" value="goods"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="菜单内容" v-if="item.type&&item.type=='show'">
							<quill-editor :ref="'myTextEditor'+key" :value="escape2Html(item.show)" :config="editorOption" @change="onEditorChange($event,item,key)">
							</quill-editor>
							<!--<textarea id="editor_content" v-html="item.show" name="content" style="height:300px;">
							</textarea>-->
						</el-form-item>
						<el-form-item label="菜单内容" v-if="item.type&&item.type=='goods'">
							<div style="height: 300px;overflow-y: scroll">
								<el-table v-if="goodsData" :key="index" :data="goodsData">
									<el-table-column prop="goodsName" width="180px" label="商品"></el-table-column>
									<el-table-column inline-template label="缩略图">
										<div><img style="width: 100px;" :src=row.goodsImg /></div>
									</el-table-column>
									<el-table-column prop="shopPrice" label="价格"></el-table-column>
									<el-table-column prop="goodsStock" label="库存"></el-table-column>
									<el-table-column prop="saleCount" label="销量"></el-table-column>
									<el-table-column inline-template label="选择商品">
										<div>
											<template v-if="item.goods.indexOf(row.goodsId)!=-1">
												<el-button size="small" type="primary" @click="handleSelectionChange(row,item)">已选中</el-button>
											</template>
											<template v-else>
												<el-button size="small" @click="handleSelectionChange(row,item)">未选中</el-button>
											</template>
										</div>
									</el-table-column>
								</el-table>
							</div>
						</el-form-item>
						<el-form-item>
							<el-button @click="onSubmitEdit(item,key)" type="primary">保存</el-button>
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
	import store from 'store'
	import {
		quillEditor
	} from 'vue-quill-editor'
	export default {
		name: 'menuEdit',
		data: function () {
			var validateTitle = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入菜单名称'));
				} else if (value.length > 4) {
					callback(new Error('菜单长度不能超过三个字符'));
				} else {
					callback();
				}
			};
			var validateType = (rule, value, callback) => {
				if (value === '') {
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
				menuList: null,
				editorOption: {
					// something config
				},
				Tempcontent: '',//暂存文章素材的变量
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
		props: ['dialog'],
		computed: {
			editor() {
				// return this.$refs.myTextEditor.quillEditor
			}
		},
		methods: {
			onEditorBlur(editor) {
				// console.log('editor blur!', editor)
			},
			onEditorFocus(editor) {
				// console.log('editor focus!', editor)
			},
			onEditorReady(editor) {
				// console.log('editor ready!', editor)
			},
			onEditorChange({
				editor,
				html,
				text
			}, item, key) {
				var self = this,
					tempRefsEditor = {};
				for (var k in self.$refs) {

					//替换富文本编辑器中内容
					if (k == 'myTextEditor' + key) {
						tempRefsEditor = self.$refs[k][0]
					}
				}
				tempRefsEditor.tempStr = html;
				// console.log(tempRefsEditor)

			},
			html2Escape: function (sHtml) {
				return sHtml.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
			},
			removeMenuTab: function (tabItem) {


				var self = this;
				self.menuList = _.filter(self.menuList, function (item) {
					return item.title !== tabItem.label
				});

				self.subConfig();

			},
			subConfig(obj) {

				var self = this;
				self.studio.pluginObj.menu = (_.assign([], self.menuList));

				var data = {
					id: self.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);
			},
			//只要修改对应的item数据即可，至于格式化之类的操作全部写在store里面
			onSubmitEdit: function (item, key) {

				var self = this,
					tempRefsObj = {}, tempRefsEditor = {};

				for (var k in self.$refs) {

					// 用ref来定位是哪个表单
					if (k == 'formedit' + key) {

						tempRefsObj = self.$refs[k][0]; //0有点坑
					}

					//替换富文本编辑器中内容
					if (k == 'myTextEditor' + key) {
						tempRefsEditor = self.$refs[k][0]
					}
				}
				if (item.type == 'show') {
					item.show = tempRefsEditor.tempStr || ''
				}

				// console.log(item)
				// return;

				//表单验证
				tempRefsObj.validate((valid) => {
					if (valid) {

						if (item.show == '' && item.type == 'show') {
							this.$notify({
								title: '提示',
								message: '图文内容不能为空',
								type: 'warning'
							});
							return;
						}

						if (item.type == 'goods' && item.goods.length < 1) {
							this.$notify({
								title: '提示',
								message: '商品信息不能为空',
								type: 'warning'
							});
							return;
						}

						if (item.type == '') {
							console.log('类别未选')
							return
						}

						self.subConfig();

					} else {
						this.$notify({
							title: '提示',
							message: '表单格式有误',
							type: 'warning'
						});
						return false;
					}
				});

			},
			add: function () {

				var self = this;
				if (self.studio.pluginObj.menu.length > 2) {
					this.$notify({
						title: '提示',
						message: '最多可以添加三个菜单',
						type: 'warning'
					});
					return;
				}

				var addObj = {
					title: 0,
					type: 'show',
					show: '',
					goods: [], //线上用
				};

				function name(title) {
					for (var k in self.studio.pluginObj.menu) {

						if (self.studio.pluginObj.menu[k].title == 'tab' + title) {
							title++;
						}
					}
					return title;
				}

				addObj.title = 'tab' + name(addObj.title);

				self.menuList.push(_.assign({}, addObj)); //这里是对象

				// self.subConfig();

			},
			handleSelectionChange(row, item) {
				if (!row.goodsId) {
					this.$notify.info({
						title: '提示信息',
						message: '商品信息错误',
						type: 'warning'
					});
					return;
				}
				var self = this,
					index = item.goods.indexOf(row.goodsId);
				if (index == -1) {
					item.goods.push(row.goodsId);
				} else {
					item.goods.splice(index, 1);
				}

			},
			escape2Html: function (str) {
				var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
				return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
			},
			init() {
				var self = this;
				self.studio = store.getters.getStudio;
				self.show = true;



				self.menuList = _.assign([], self.studio.pluginObj.menu);

				//native= 表示这个是不需要自动添加host信息的
				var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/merchantGoodsList'
				this.$http.get(url).then((response) => {

					var tempObj = response.body.data.root;
					for (var key in tempObj) {
						tempObj[key].isSelect = false;
					}
					self.goodsData = tempObj;

				}, (response) => {

				});

			}
		},
		components: {
			quillEditor
		},
		created() {
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