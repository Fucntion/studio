<template>

	<div>
		<!--@current-change="handleCurrentChange"-->
		<el-table v-if="show" class="advert_table" :data="AdvertData" style="width: 100%">
			<el-table-column property="index" label="排序" width="30">
			</el-table-column>
			<el-table-column inline-template label="缩略图" width="130">
				<div>
					<template v-if="row.pic">
						<div>
							<el-upload action="http://saaslive.oss-cn-shanghai.aliyuncs.com" 
							:on-preview="handlePreview" :on-remove="handleRemove" 
							:on-success="call" :data="new_multipart_params"
							:before-upload="set_key" :multiple="false">
							<img width="100px" :src="row.pic" title="点我更换图片" alt="点我更换图片" />
						</el-upload>
						</div>

					</template>
					<template v-else>
						<div>
							<el-upload action="http://saaslive.oss-cn-shanghai.aliyuncs.com" 
							:on-preview="handlePreview" :on-remove="handleRemove" 
							:on-success="call" :data="new_multipart_params" 
							:before-upload="set_key" :multiple="false">
							<el-button size="small">添加图片</el-button>
						</el-upload>
						</div>

					</template>
				</div>
			</el-table-column>

			<el-table-column inline-template label="链接地址" width="200">
				<template>
					<el-input placeholder="请输入连接" v-model="row.link"></el-input>
				</template>
			</el-table-column>

			<el-table-column inline-template label="操作">
				<template>
					<i @click="handleUp(row)" class="advert_icon el-icon-arrow-up"></i>
					<i @click="handleDown(row)" class="advert_icon el-icon-arrow-down"></i>
					<i @click="handleDel(AdvertData,$index)" class="advert_icon el-icon-delete"></i>
				</template>

			</el-table-column>
		</el-table>
		<div class="hr"></div>
		<div class="advert_add">

			<el-button :disabled="AdvertData.length>3" @click="addAdvert()" type="primary">添加</el-button>
		</div>
	</div>
</template>

<script>
	import store from '../../vuex/store';
	import dialogBox from "../../components/common/dialog.vue"
	export default {
		data() {
				return {
					show:false,
					new_multipart_params:{},
					AdvertData: [{
						index: 2,
						pic: '',
						link: 'http://baidu.com1'
					}, {
						index: 1,
						pic: '',
						link: 'http://baidu.com2'
					}, {
						index: 4,
						pic: '',
						link: 'http://baidu.com3'
					}, {
						index: 3,
						pic: 'blob:http://localhost:8080/5fd13e62-cf14-4951-b960-cf43c93c525b',
						link: 'http://baidu.com4'
					}],
					dir:''
				}
			},
			computed: {

			},
			components: {
				dialogBox,
			},
			methods: {
				set_key(file){
			        var self =this;
			        this.new_multipart_params.name = file.name;
        			this.new_multipart_params.key = this.new_multipart_params.dir+file.name;
			        
			      },
			      handlePreview(file) {
			        console.log(file);
			      },
				call:function(response, file, fileList){
				      
				        var fileUlr =file.url;//file.name
//						console.log(response,file,fileList);
						return;
						
				        
				
				        var data ={
				          id:this.$router.currentRoute.params.id,
				          studio:this.studio,
				        }
				
				        // console.log(data);return;
				
				        store.commit('changeStudio',data);
				
				        var obj ={};
				        // 假装调用一下，然后就修改了modal的显示状态了
				
				        store.commit("closeModal");
				
				},
				checkDialog: function(components, title, type) {
					// type用来区分不同的用途，用来设置不同的回调
					var obj = {};
					obj.components = components;
					obj.title = title;
					obj.type = type;
					store.commit("openModal", obj);
				},
				addAdvert() {
					var self = this;
					self.AdvertData.push({
						index: self.AdvertData.length,
						pic: '',
						link: ''
					})
				},
				handleUp(val) {

					var self = this,
						index = val.index;
					if(index == self.AdvertData.length) return;
					var fromArr = _.find(self.AdvertData, {
							index: index
						}),
						toArr = _.find(self.AdvertData, {
							index: index + 1
						});
					fromArr.index++;
					toArr.index--;
				},
				handleDown(val) {
					var self = this,
						index = val.index;
					if(index == 1) return;
					var fromArr = _.find(self.AdvertData, {
							index: index
						}),
						toArr = _.find(self.AdvertData, {
							index: index - 1
						});
					fromArr.index--;
					toArr.index++;
					console.log(val);
				},
				handleDel(rows, index) {

					rows.splice(index, 1);

				},
				init() {
					var self = this;
					self.AdvertData = _.sortBy(self.AdvertData, function(item) {
						return -item.index;
					});
					
					var url = "/aliyuns/oss";
				      self.$http.get(url).then((response) => {
						
				        var tempObj ={
				            success_action_status : '200', //让服务端返回200,不然，默认会返回204
				          },obj={};
				          
				          if(Object.prototype.toString.call(response.body) === "[object String]"){
				            obj = JSON.parse(response.body).data;
				          }else{
				            obj =response.body.data;
				          }

				         tempObj.policy = obj.policy;
				        tempObj.OSSAccessKeyId = obj.accessid;
				        tempObj.signature = obj.signature;
				        tempObj.dir =obj.dir;
						tempObj.callbackbody = obj.callback;
				        this.new_multipart_params = tempObj;
				        self.show =true;

				      }, (response) => {
				        // error callback
				        // console.log(response);
				      });

				}
			},

			mounted() {
				this.init();
			}
	}
</script>

<style lang="less">
	.advert_icon {
		font-size: 18px;
		margin: 0 5px;
		cursor: pointer;
	}
	
	.advert_icon:hover {
		opacity: 0.6;
	}
	
	.advert_add {
		text-align: right;
	}
</style>