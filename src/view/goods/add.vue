<template>
	<div class="goodsAdd">
		<el-form ref="form" class="form" :model="form" label-width="100px">
			<el-form-item required label="商品名称">
				<el-input v-model="form.goodsName"></el-input>
			</el-form-item>
			<el-form-item required label="商品库存">
				<el-input v-model="form.goodsStock"></el-input>
			</el-form-item>
			<el-form-item required label="商品单价">
				<el-input v-model="form.shopPrice"></el-input>
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
				<quill-editor ref="myTextEditor" v-model="form.goodsDesc" :config="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
				</quill-editor>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>

		</el-form>

	</div>
</template>

<script>
	export default {

		data() {
				return {
					form: {
						goodsSn: new Date().getTime(),
						goodsName: '',
						goodsStock: '', //库存
						marketPrice: 999, //市场价格
						shopPrice: '', //商品价格
						goodsImg: null,
						goodsDesc: '', //商品介绍
						goodsUnit: '个'
					},
					content: '<h2>商品信息</h2>',
					editorOption: {
						// something config
					},
					new_multipart_params: null,
				}
			},
			components: {

			},
			methods: {
				onSubmit: function() {
					//native= 表示这个是不需要自动添加host信息的
					var url = 'shop=' + 'http://shop.icloudinn.com/index.php/Api/Goods/add';
					this.$http.post(url, this.form).then((response) => {
						if(response.body.code == 100) {
							this.$notify.info({
								title: '提示信息',
								message: '添加成功'
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
				}) {
					// console.log('editor change!', editor, html, text)
					this.content = html
				}
			},
			computed: {
				editor() {
					return this.$refs.myTextEditor.quillEditor
				}
			},
			mounted() {
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
	.goodsAdd {
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
					width:500px !important;
				}
				.el-upload__files {
					display:none;
				}
			}
			.thumb {
				float:left;
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