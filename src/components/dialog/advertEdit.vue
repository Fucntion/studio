<template>

	<div>
		<el-table v-if="show" @cell-click="changepic" class="advert_table" :data="AdvertData" style="width: 100%">
			<el-table-column property="index" label="排序" width="100">
			</el-table-column>

			<el-table-column  inline-template label="缩略图" width="150">
				<div>
					<template v-if="row.pic">
							<el-upload action="http://saaslive.oss-cn-shanghai.aliyuncs.com" 
							:on-preview="handlePreview" :on-remove="handleRemove" 
							:on-success="call" :data="new_multipart_params"
							class="advert_pic"
							:before-upload="set_key" :multiple="false">
							<img width="100px" :src="row.pic" style="cursor: pointer;" title="点我更换图片" alt="点我更换图片" />
						</el-upload>
					</template>
					<template v-else>	
							<el-upload action="http://saaslive.oss-cn-shanghai.aliyuncs.com" 
							:on-preview="handlePreview" :on-remove="handleRemove" 
							:on-success="call" :data="new_multipart_params" 
							class="advert_pic"
							:before-upload="set_key" :multiple="false">
							<el-button size="small" >添加图片</el-button>
						</el-upload>
					
					</template>
				</div>
			</el-table-column>

			<el-table-column inline-template label="链接地址" width="300">
				<template>
					<el-input placeholder="请输入连接" v-model="row.link"></el-input>
				</template>
			</el-table-column>

			<el-table-column inline-template label="操作">
				<template>
					<i @click="handleUp(row,$index)" class="advert_icon el-icon-arrow-up"></i>
					<i @click="handleDown(row,$index)" class="advert_icon el-icon-arrow-down"></i>
					<i @click="handleDel(AdvertData,$index)" class="advert_icon el-icon-delete"></i>
				</template>

			</el-table-column>
		</el-table>
		<div class="hr"></div>
		<div class="advert_add">
			<el-button @click="subConfig()" type="primary">保存配置</el-button>
			<el-button :disabled="AdvertData.length>3" @click="addAdvert()" type="primary">添加</el-button>
		</div>
	</div>
</template>

<script>
	import store from 'store';
	import dialogBox from "plugin/common/modal.vue"
	export default {
		store,
		data() {
				return {
					show:false,
					studio:null,
					new_multipart_params:{},
					AdvertData: [],
					dir:'',
					isUploadItem:{},//标记哪一行正在上传图片，方便回到利用。
					setAdvertImg:function(){}
				}
			},
			computed: {

			},
			
			components: {
				dialogBox,
			},
			methods: {
				changepic(row, column, cell, event){
					var self =this;
					if(column.label !='缩略图')return;
					self.isUploadItem = row;
					self.setAdvertImg = function(imgUrl,obj=self.isUploadItem){
						obj.pic =imgUrl
					}
				},
				subConfig(){
					var self =this;
					self.studio.pluginObj.advert = self.AdvertData;
			        var data ={
			          id:self.$router.currentRoute.params.id,
			          studio:this.studio,
			        }
		
			        store.commit('changeStudio',data);
				},
				set_key(file){
			        var self =this;
//			        console.log(file,self);
			        this.new_multipart_params.name = file.name;
        			this.new_multipart_params.key = this.new_multipart_params.dir+file.name;
			        
			      },
			      handlePreview(file) {
			        console.log(file);
			      },
				call:function(response, file, fileList){
				      var self =this,

				       fileUlr ='http://saaslive.oss-cn-shanghai.aliyuncs.com/'+this.new_multipart_params.dir+file.name
			
						self.isUploadItem.pic =fileUlr;

				        self.subConfig();
				
				},
				addAdvert() {
					var self = this,max=1;
					for(var i=0;i<self.AdvertData.length;i++){
						if(self.AdvertData[i].index>max){
							max =self.AdvertData[i].index;
						}
					}
					self.AdvertData.push({
						index: max+1,
						pic: '',
						link: ''
					})
//					self.subConfig();
					

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
					self.subConfig();
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
					self.subConfig();
					
				},
				handleDel(rows, index) {
					var self =this;
					rows.splice(index, 1);
					
					self.subConfig();

				},
				init() {
					var self = this;
					
					self.studio = store.getters.getStudio;
					self.AdvertData =self.studio.pluginObj.advert;

					
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
	.advert_pic{
            .el-upload__files{
                display:none;
            }
        }
</style>