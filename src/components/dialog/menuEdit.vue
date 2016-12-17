<template>
	<el-tabs v-if="studio" type="card"  @tab-remove="removeMenuTab" @tab-click="initMenuTab()">
		<template v-if="studio.pluginObj.menu.length>0">
			<!--不同的name表示两种类别的tab.item和add-->
			<el-tab-pane v-for="(item, key, index)  in studio.pluginObj.menu" :name="'item'+key"   :label="item.title">

			<el-form ref="formedit" :rules="rules"  :model="item" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="item.title" placeholder="菜单名称不超过四个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型"  prop="type">
					<el-select v-model="item.type" placeholder="请选择菜单的类型">
						<el-option label="图文内容" select value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="item.type&&item.type=='article'">
					<el-input type="textarea"  prop="article" v-model="item.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="item.type&&item.type=='goods'" >	
					<div>
						<el-table @selection-change="handleSelectionChange" v-if="item.goods" :data="item.goods" stripe>
							<!--<el-table-column type="selection"  width="55"></el-table-column>-->
							<el-table-column prop="goodsName" label="商品"></el-table-column>
							<el-table-column prop="shopPrice" label="价格"></el-table-column>
							<el-table-column prop="goodsStock" label="库存"></el-table-column>
							<el-table-column prop="saleCount" label="销量"></el-table-column>
							<el-table-column inline-template label="选择商品" >
								<div>
									<template v-if="row.isSelect">
										<el-button
							          size="small" type="primary"
							          @click="handleSelectionChange(row)">
							          	已选中
							        </el-button>
									</template>
									<template v-else>
										<el-button
							          size="small"
							          @click="handleSelectionChange(row)">
							          	未选中
							        </el-button>
									</template>
									
								</div>
								 
							</el-table-column>
						</el-table>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmitEdit" type="primary">保存</el-button>
					<el-button @click="dialog.visible=false">取消</el-button>
				</el-form-item>
			</el-form>
			
			</el-tab-pane>

		</template>
		<!--如果菜单长度小于4，就显示添加菜单的选项卡-->
		<el-tab-pane v-if="studio.pluginObj.menu.length<4" name="add" label="创建菜单+">
			<!--<p>目前还没有自定义菜单</p><br />-->
			<el-form ref="formadd" :rules="rules"  :model="formadd" label-width="80px">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="formadd.title" placeholder="菜单名称不超过四个中文字"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型"  prop="type">
					<el-select v-model="formadd.type" placeholder="请选择菜单的类型">
						<el-option label="图文内容"  value="article"></el-option>
						<el-option label="商品列表" value="goods"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='article'">
					<el-input type="textarea"  prop="article" v-model="formadd.article">图文内容</el-input>
				</el-form-item>
				<el-form-item label="菜单内容" v-if="formadd.type&&formadd.type=='goods'">	
					<div>
						<el-table @selection-change="handleSelectionChange" v-if="goodsData" :data="goodsData" stripe>
							<!--<el-table-column type="selection" width="55"></el-table-column>-->
							<el-table-column prop="goodsName"  label="商品"></el-table-column>
							<!--<el-table-column inline-template label="缩略图"><div><img style="max-width: 66px;" :src=row.goodsThums /></div></el-table-column>-->
							<el-table-column prop="shopPrice" label="价格"></el-table-column>
							<el-table-column prop="goodsStock" label="库存"></el-table-column>
							<el-table-column prop="saleCount" label="销量"></el-table-column>
							<el-table-column inline-template label="选择商品">
								 <div><template v-if="row.isSelect">
								 	<el-button
						          size="small" type="primary"
						          @click="handleSelectionChange(row)">
						          选中
						        </el-button>
								 </template>
								 <template v-else>
								 	<el-button
						          size="small"
						          @click="handleSelectionChange(row)">
						          未选中
						        </el-button>
								 </template></div>
							</el-table-column>
						</el-table>
					</div>

				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmit" type="primary">立即创建</el-button>
					<el-button @click="dialog.visible=false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-tab-pane>
<!--<div v-for="(item, key, index)  in item.goods">
								 	<template v-if="item.goods.googsId ==row.goodsId">
									 	<el-button
							          size="small" type="primary"
							          @click="handleSelectionChange(row)">
							          	选中
							        </el-button>
								 </template>
								 <template v-else>
								 	<el-button
							          size="small"
							          @click="handleSelectionChange(row)">
							          未选中
							        </el-button>
								 </template>
								 </div>-->
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
					goods: []
				},
				rules: {
					title: [
					{ validator: validateTitle,required: true,trigger: 'blur' },
		            ],
		            type: [
		            { validator: validateType,required: true },
		            ]
        		},

			}
		},
		store,
		computed:{
			
		},
		props:['dialog'],
		methods: {
			initMenuTab:function(tab){
				
			},
			removeMenuTab:function(tab){
				
			},
			deepCopy:function(o) {
				var self =this;
			    if (o instanceof Array) {
			        var n = [];
			        for (var i = 0; i < o.length; ++i) {
			            n[i] = self.deepCopy(o[i]);
			        }
			        return n;
			
			    } else if (o instanceof Object) {
			        var n = {}
			        for (var i in o) {
			            n[i] = self.deepCopy(o[i]);
			        }
			        return n;
			    } else {
			        return o;
			    }
			},
			onSubmitEdit:function(){
				
				var self =this,
				studioMenu = self.studio.pluginObj.menu,tempStr='';
				for(var i=0;i<studioMenu.length;i++){
					for(var key in studioMenu[i].goods){
						if(studioMenu[i].goods[key].isSelect==true){
							tempStr += studioMenu[i].goods[key].goodsId+'-';
						}
						
					}
					studioMenu[i].goodsList =tempStr;
					tempStr='';
				}
//				studioMenu
//				console.log(self.studio);return;
				var data = {
					id: this.$router.currentRoute.params.id,
					studio: this.studio,
//					type:'plugin'
				}

				store.commit('changeStudio', data);
			},
			onSubmit:function(ev){
				
				var self =this;

				self.$refs.formadd.validate((valid) => {
		          if (valid) {

		            

		            if(self.formadd.article==''&&self.formadd.type=='article'){
		            	this.$notify({
	                      title: '提示',
	                      message: '图文内容不能为空',
	                      type: 'warning'
	                    });
	                    return;
		            }

		            
		            //为了后面渲染页面方便，所以直接把所有商品列表数据都存到goods里面去，这样比在渲染页面的时候遍历goodsData和goods好一些
		            //切断引用关系并没有什么卵用
					self.formadd.goods= self.deepCopy(self.goodsData);
					//数组序列化的过程
					var total=0;
					for(var i=0;i<self.goodsData.length;i++){
						if(self.goodsData[i].isSelect){
							total++
						}
						self.goodsData[i].isSelect =false;//把商品列表的信息回复初始化
						
					}
					
					
					if(total<1&&self.formadd.type=='goods'){
		            	this.$notify({
	                      title: '提示',
	                      message: '商品信息不能为空',
	                      type: 'warning'
	                    });
	                    return;
		            }
//					console.log(self.formadd.goods);return;
		            self.studio.pluginObj.menu.push(self.formadd);
		           
		            //清零formadd，完成一次提交
		            self.formadd = {
					title:'',
					type:'',
					article:'',
					goods: ''
					};
					
		          } else {
		            
		            return false;
		          }
		        });
			},
			handleSelectionChange(row) {
				var self = this;

				if(!row.goodsId){
					this.$notify.info({
                      title: '提示信息',
                      message:'商品信息错误',
                      type:'warning'
                   }); 
					return;
				}
				row.isSelect =!row.isSelect;//切换选中状态
//				if(row.isSelect==true){
//					self.formadd.goods.push(row.goodsId);//从false=》true即添加进去
//				
//				}else{
//					
//					for(var i=0;i<self.formadd.goods.length;i++){
//						if(self.formadd.goods[i] ==goodsId){
//							self.formadd.goods = self.formadd.goods.splice(i,1);
//						}
//					}
//				}
//				console.log(self.formadd);
				
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
			init() {
				var self = this;
				self.studio = store.getters.getStudio;
				//native= 表示这个是不需要自动添加host信息的
				var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/merchantGoodsList'
				this.$http.get(url).then((response) => {

					var tempObj = response.body.data.root;
					for(var key in tempObj){
						tempObj[key].isSelect = false;
					}
					self.goodsData=tempObj;

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