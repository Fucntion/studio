<template>
	<div>
		<el-table v-if="show" @cell-click="changepic" class="advert_table" :data="AdvertData" style="width: 100%">
			<el-table-column property="index" label="排序" width="100">
			</el-table-column>

			<el-table-column inline-template label="缩略图" width="150">
				<div>
					<template v-if="row.pic">
						<img width="100px" :src="row.pic" style="cursor: pointer;" title="点我更换图片" alt="点我更换图片" />
					</template>
					<template v-else>
						<el-button size="small">添加图片</el-button>
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
					<!--index属性从小到大排列,并且每次列表有变动时会自动重排，如果需要改变排序只要改变对应两个index即可-->
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
	import pictureBox from "plugin/common/pictureBox.vue"
	export default {
		store,
		data() {
			return {
				show: false,
				studio: null,
				new_multipart_params: {},
				AdvertData: [],
				dir: '',
				isUploadItem: {},//标记哪一行正在上传图片，方便回到利用。
				setAdvertImg: function () { }
			}
		},
		computed: {

		},
		components: {
			pictureBox
		},
		methods: {
			openPicture: function (title, callback) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.title = title;
				obj.callback = callback;
				store.commit("openPicture", obj);
			},
			changepic(row, column, cell, event) {
				var self = this;
				self.isUploadItem = row;
				if (column.label != '缩略图') {
					return
				}
				self.setAdvertImg = function (imgUrl, obj = self.isUploadItem) {
					obj.pic = imgUrl
				}
				self.openPicture('幻灯片图片', self.setAdvertImg)
			},
			//保存配置点击事件
			subConfig() {
				var self = this;
				self.studio.pluginObj.advert = self.AdvertData;
				var data = {
					id: self.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);
			},
			set_key(file) {
				var self = this;
				this.new_multipart_params.name = file.name;
				this.new_multipart_params.key = this.new_multipart_params.dir + file.name;

			},
			handlePreview(file) {
				console.log(file);
			},
			call: function (response, file, fileList) {
				var self = this,

					fileUlr = 'http://saaslive.oss-cn-shanghai.aliyuncs.com/' + this.new_multipart_params.dir + file.name

				self.isUploadItem.pic = fileUlr;

				self.subConfig();

			},
			addAdvert() {
				var self = this, max = 1;
				for (var i = 0; i < self.AdvertData.length; i++) {
					if (self.AdvertData[i].index > max) {
						max = self.AdvertData[i].index;
					}
				}
				self.AdvertData.push({
					index: max + 1,
					pic: '',
					link: ''
				})

			},
			handleUp(val, $index) {

				var self = this,
					index = val.index;
				var fromArr = _.find(self.AdvertData, {
					index: index
				})
				//获取要向前排序的元素在数组中的index，如果为0则不动了
				var INDEX = _.findIndex(self.AdvertData, function (item) {
					return item.index == index
				})
				if (INDEX == 0) {
					console.log('已经是第一了')
					return
				}

				var toArr = self.AdvertData[INDEX - 1]
				var temp2 = fromArr.index
				fromArr.index = toArr.index;
				toArr.index = temp2;
				var toArr = self.AdvertData[INDEX - 1]
				var temp = _.assign({}, fromArr);
				self.AdvertData[INDEX] = _.assign({}, self.AdvertData[INDEX - 1]);
				self.AdvertData[INDEX - 1] = temp;

				self.subConfig();

			},
			handleDown(val) {
				var self = this,
					index = val.index;
				var fromArr = _.find(self.AdvertData, {
					index: index
				})
				//获取要向前排序的元素在数组中的index，如果为0则不动了
				var INDEX = _.findIndex(self.AdvertData, function (item) {
					return item.index == index
				})
				if (INDEX == self.AdvertData.length - 1) {
					console.log('已经在最下面了')
					return
				}

				var toArr = self.AdvertData[INDEX + 1]
				var temp2 = fromArr.index
				fromArr.index = toArr.index;
				toArr.index = temp2;
				var toArr = self.AdvertData[INDEX + 1]
				var temp = _.assign({}, fromArr);
				self.AdvertData[INDEX] = _.assign({}, self.AdvertData[INDEX + 1]);
				self.AdvertData[INDEX + 1] = temp;
				self.subConfig();

			},
			handleDel(rows, index) {
				var self = this;
				rows.splice(index, 1);
				self.subConfig();

			},
			init() {
				var self = this;

				self.studio = store.getters.getStudio;
				self.AdvertData = _.sortBy(self.studio.pluginObj.advert, 'index')


				var url = "/aliyuns/oss";
				self.$http.get(url).then((response) => {

					var tempObj = {
						success_action_status: '200', //让服务端返回200,不然，默认会返回204
					}, obj = {};

					if (Object.prototype.toString.call(response.body) === "[object String]") {
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
					self.show = true;

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
	
	.advert_pic {
		.el-upload__files {
			display: none;
		}
	}
</style>