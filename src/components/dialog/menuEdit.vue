<template>
	<el-tabs v-if="studio" type="card" @tab-click="handleClick" @tab-remove="handleRemove">
		<template v-if="studio.pluginObj.length>0">
			<el-tab-pane v-for="(item, key, index)  in studio.pluginObj" label="item.title">

			</el-tab-pane>

		</template>
		<!--如果菜单长度小于4，就显示添加菜单的选项卡-->
		<el-tab-pane v-if="studio.pluginObj.length<5" label="创建菜单+">
			<!--<p>目前还没有自定义菜单</p><br />-->
			<el-form ref="formadd" :rules="rules"  :model="formadd" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="formadd.title" placeholder="菜单名称不超过四个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型"  prop="type">
					<el-select v-model="formadd.type" placeholder="请选择菜单的类型">
						<el-option label="图文内容" select value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='article'">
					<el-input type="textarea"  prop="article" v-model="formadd.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='goods'">	
					<div>
						<el-table @selection-change="handleSelectionChange" v-if="goodsData" :data="goodsData" stripe>
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column prop="goodsName" label="商品"></el-table-column>
							<!--<el-table-column inline-template label="缩略图"><div><img style="max-width: 66px;" :src=row.goodsThums /></div></el-table-column>-->
							<el-table-column prop="shopPrice" label="价格"></el-table-column>
							<el-table-column prop="goodsStock" label="库存"></el-table-column>
							<el-table-column prop="saleCount" label="销量"></el-table-column>
						</el-table>
					</div>

				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmit" type="primary">立即创建</el-button>
					<el-button @click="dialog.visible=false">取消</el-button>
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
		        if (value === '') {
		          callback(new Error('请输入菜单名称'));
		        } else {
		          callback();
		        }
		      };
			var validateType = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请选择菜单类型'));
		        } else {
//		        	if(value=='goods'){
//		        		this.$refs.formadd.validateField('Goods');
//		        	}
//		        	if(value=='article'){
//		        		this.$refs.formadd.validateField('Article');
//		        	}
		          callback();
		        }
		      };
			var validateGoods = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请至少选择一个商品'));
		        } else {
		          callback();
		        }
		      };
			var validateArticle = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('输入内容不能为空'));
		        } else {
		          // console.log(this);
		
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
					goods: ''
				},
				rules: {
					title: [
					{ validator: validateTitle,required: true,trigger: 'blur' },
		           
		            ],
		            type: [
		            { validator: validateType,required: true},
		           
		            ]
        		},

			}
		},
		store,
		props:['dialog'],
		methods: {

			onSubmit:function(ev){
				
				var self =this;

				self.$refs.formadd.validate((valid) => {
		          if (valid) {
//		            console.log(self.formadd.goods=='',self.formadd.type=='goods');
		            if(self.formadd.goods==''&&self.formadd.type=='goods'){
		            	this.$notify({
	                      title: '提示',
	                      message: '商品信息不能为空',
	                      type: 'warning'
	                    });
		            }
		            console.log(self.formadd.article=='',self.formadd.type=='article');
		            if(self.formadd.article==''&&self.formadd.type=='article'){
		            	this.$notify({
	                      title: '提示',
	                      message: '图文内容不能为空',
	                      type: 'warning'
	                    });
		            }
		            

		            
		          } else {
		            
		            return false;
		          }
		        });
			},
			handleSelectionChange(val) {
				var self = this,str='';
				for(var i=0;i<val.length;i++){
					str +=val[i].goodsId+'-';
				}
				self.formadd.goods ='';
				self.formadd.goods += str;
//				console.log(self.form);
			},
			sort: function(a, b) {
				if(a < b) {
					return -1;
				} else if(a > b) {
					return 1;
				} else {
					return 0;
				}
			},
			handleRemove(tab) {

			},
			handleClick(tab, event) {

			},
			init() {
				var self = this;
				self.studio = store.getters.getStudio;
				//native= 表示这个是不需要自动添加host信息的
				var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/merchantGoodsList'
				this.$http.get(url).then((response) => {

					self.goodsData = response.body.data.root;

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

</style>