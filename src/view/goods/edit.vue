<template>
	<div class="goodsEdit" v-if="show">
		<el-form ref="form" class="form" :model="form" label-width="100px">
			<el-form-item required label="商品名称">
				<el-input v-model="form.goodsName"></el-input>
			</el-form-item>
			<el-form-item required label="商品库存">
				<el-input v-model="form.goodsStock"></el-input>
			</el-form-item>
			<el-form-item required label="商品单位">
				<el-input v-model="form.goodsUnit" placeholder="个"></el-input>
			</el-form-item>
			<el-form-item required label="商品单价">
				<el-input v-model="form.shopPrice"  placeholder="人民币"></el-input>
			</el-form-item>
			<el-form-item required label="图片上传">
				<el-upload v-if="new_multipart_params" class="upload" ref="uploads" type="drag" v-model="form.goodsImg" action="http://saaslive.oss-cn-shanghai.aliyuncs.com" :data="new_multipart_params" :on-success="call" :before-upload="set_key" :on-preview="handlePreview" :on-remove="handleRemove" :on-error="handleError" :default-file-list="fileList">
					<i class="el-icon-upload"></i>
					<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">150*150或以上尺寸png/jpg格式图片，且不超过500kb</div>
				</el-upload>
				<img :src="form.goodsImg" v-if="form.goodsImg" height="160px;" class="thumb">
			</el-form-item>
			<el-form-item required label="商品介绍">
				<quill-editor ref="goodsEdit"  
				:value="escape2Html(form.goodsDesc)" 
				:config="editorOption" 
				@change="onEditorChange($event)" >
							</quill-editor>
				<!--<textarea id="editor_goods_edit" v-html="form.goodsDesc" name="content" style="width:900px;height:500px;">
					
				</textarea>-->

			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>


		</el-form>

	</div>
</template>

<script>

	import {
		quillEditor
	} from 'vue-quill-editor'

	export default {

		data() {
				return {
					show:false,
					form:{},
					content: '<h2>商品信息</h2>',
					editorOption: {
						lineNumbers: true,
        				line: true,
						mode: 'text/html',
					},
					ue:null,
					new_multipart_params: null,
				}
			},
			components: {
				quillEditor
			},
			methods: {
			onEditorChange({
				editor,
				html,
				text
			}) {
				this.$refs.goodsEdit.tempStr = html
			},
				onSubmit: function() {

					this.form.goodsDesc = this.$refs.goodsEdit.tempStr||'无介绍'
					//native= 表示这个是不需要自动添加host信息的
					var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/edit';
					this.$http.post(url, this.form).then((response) => {
						if(response.body.code == 100) {
							this.$notify.info({
								title: '提示信息',
								message: '修改成功'
							});
							this.$router.push('/list');
						} else {
							alert(response.body.msg);
						}

					}, (response) => {
						// error callback
						// console.log(response);
					});
				},
				call: function(response, file, fileList) {

					var fileUlr = 'http://saaslive.oss-cn-shanghai.aliyuncs.com/' + this.new_multipart_params.dir + file.name;
					console.log(fileUlr);
					this.$refs.uploads.clearFiles();
					this.form.goodsImg = fileUlr;

				},
				set_key(file) {
					// this.$refs.uploads.clearFiles();
					this.new_multipart_params.name = file.name;
					this.new_multipart_params.key = this.new_multipart_params.dir + file.name;
					// console.log(this.new_multipart_params);return;
				},
				 escape2Html:function(str) {
					var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
					return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
				},
				 HTMLEncode:function(html) {
					var temp = document.createElement("div");
					(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
					var output = temp.innerHTML;
					temp = null;
					return output;
				},
				
				init:function(){
					// console.log()
					var id = this.$route.params.id
					var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/edit'
					console.log(id)
					this.$http.post(url,{goodsId:id}).then(function(response){
						if(response.body.code!=100){
							console.log('商品信息获取失败')
							return
						}
						this.form =response.body.data
						this.show =true

						
					},function(response){

					})

				}
			},
			computed: {
				editor() {

				}
			},
			mounted() {


				this.init()
				

				
				// console.log('商品描述', this.editor);
				var url = "/aliyuns/oss";

				this.$http.get(url).then((response) => {

					var tempObj = {
							success_action_status: '200'
						},
						obj = {}; //让服务端返回200,不然，默认会返回204

					if(Object.prototype.toString.call(response.body) === "[object String]") {
						obj = JSON.parse(response.body).data;
					} else {
						obj = response.body.data;
					}

					tempObj.policy = obj.policy;
					tempObj.OSSAccessKeyId = obj.accessid;
					tempObj.signature = obj.signature;
					tempObj.dir = obj.dir;
					tempObj.callbackbody = obj.callback;
					this.new_multipart_params = tempObj;

				}, (response) => {
					// error callback
					// console.log(response);
				});

			}
	}
</script>

<style lang="less">
	.goodsEdit {
		.form {
			position: relative;
			padding-right: 50px;
			input {
				width: 500px;
			}
			.upload {
				float: left;
				.el-dragger {
					width: 300px;
					height: 140px;
				}
				.el-upload__tip {
					font-size: 14px;
					width: 500px !important;
				}
				.el-upload__files {
					display: none;
				}
			}
			.thumb {
				float: left;
				margin-left: 25px;
				display: block;
			}
		}
	}
	
	.ql-container .ql-editor {
		min-height: 20em;
		padding-bottom: 1em;
		max-height: 25em;
	}
</style>