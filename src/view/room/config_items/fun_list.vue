<template>
	<div class="plugin">
		<el-row>
			<div class="title">功能列表</div>
			<div class="box">
				<fieldset class="base">
					<legend> 基础 </legend>
					<el-popover class='plugin_item' v-if='item.type=="base"' v-for='(item,index) in pluginList' placement='top-start' width='200' trigger='hover' :content='msghover(item)'>
						<template slot='reference' v-if="item.checked">
							<div @click='pluginAdd(item)' :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>

							<div class="name">{{item.name}}</div>

						</template>
						<template @click='pluginAdd(item)' slot='reference' v-else>
							<div @click='pluginAdd(item)' :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>
							<div class="name">{{item.name}}</div>
						</template>
					</el-popover>
				</fieldset>

				<fieldset class="interaction">
					<legend> 互动 </legend>
					<el-popover class='plugin_item' v-if='item.type=="interaction"' v-for='(item,index) in pluginList' placement='top-start' width='200' trigger='hover' :content='msghover(item)'>
						<template slot='reference' v-if="item.checked">
							<div @click="pluginAdd(item)" :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>
							<div class="name">{{item.name}}</div>
						</template>
						<template slot='reference' v-else>
							<div @click="pluginAdd(item)" :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>
							<div class="name">{{item.name}}</div>
						</template>
					</el-popover>

				</fieldset>
				<fieldset class="plus">
					<legend> 高级 </legend>
					<el-popover class='plugin_item' v-if='item.type=="plus"' v-for='(item,index) in pluginList' placement='top-start' width='200' trigger='hover' :content='msghover(item)'>
						<template slot='reference' v-if="item.checked">
							<div @click='pluginAdd(item)' :style="{backgroundImage: 'url(' + item.srcActive + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>
							<div class="name">{{item.name}}</div>
						</template>
						<template slot='reference' v-else>
							<div @click='pluginAdd(item)' :style="{backgroundImage: 'url(' + item.src + ')'}" class="icon">
								<sup class="el-badge__content is-fixed" v-if="item.usable">hot</sup>
							</div>
							<div class="name">{{item.name}}</div>
						</template>
					</el-popover>

				</fieldset>

			</div>
		</el-row>
	</div>
</template>

<script>
	import store from 'store'
	export default {
		store,
		data: function() {
			return {
				studio: null
			}
		},
		components: {

		},
		computed: {
			pluginList: function() {
				var self = this
				var storeList = store.getters.getPluginList //本地的数据模板
				var	onlineList = self.studio.pluginObj;
				//通过两个数组的比对，然后获得最终会被渲染的pluginList,不过这么多循环看得我好难受
				for(var k in onlineList) {
					//过滤没有内容并且未选中的组件，例如advert中可能没有元素，但是他被选中了,在pluginAdd函数中修改未选中状态，但是如果用户不设置，则页面刷新后不显示.这里不包含require类型组件
					if(onlineList[k].length < 1) {
						continue;
					}
					for(var j in storeList) {
						//拿pluginObj的属性名和store中的pluginData默认信息的键名对比,只要以后线上的pluginObj和pluginData按照目前格式增删,就可以正确初始化了
						if(k == j) {
							storeList[j].checked = true;
						}
					}
				}
				return storeList;
			}
		},
		methods: {
			//这里是左侧功能列表 hover的显示文字
			msghover: function(itemObj) {
				//输入哪个模块的参数就在模拟器中渲染刷新对应的模块，如果传的是all那就全部刷新。
				var self = this;
				//排除必选
				if(typeof(itemObj.require) != 'undefined' && itemObj.require == true) {
					return '是必选功能哦'
				}
				//排除未上线
				if(itemObj.usable == false) {
					return '功能即将上线'
				}
				//已选中情况
				if(itemObj.checked == true) {
					return '你已经选择该功能,点击取消'
				} else {
					//正常添加
					return '点击选择并编辑该功能'
				}
			},
			pluginAdd: function(itemObj) {
				//输入哪个模块的参数就在模拟器中渲染刷新对应的模块，如果传的是all那就全部刷新。
				var self = this;
				//排除必选
				if(typeof(itemObj.require) != 'undefined' && itemObj.require == true) {
					return
				}
				//排除未上线
				if(itemObj.usable == false) {
					return;
				}
				//已选中情况
				if(itemObj.checked == true) {

					this.$confirm(name + '功能已经存在，是否删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {

						itemObj.checked = false;
						for(var k in self.studio.pluginObj) {
							if(k == itemObj.title) {
								self.studio.pluginObj[k] = []; //清空对应的组件在studio信息
							}
						}
						self.subConfig();
						this.$notify.info({
							title: '提示信息',
							message: '删除成功'
						});
					}).catch(() => {
						this.$notify.info({
							title: '提示信息',
							message: '已取消删除'
						});
					});
				} else {
					//正常添加
					itemObj.checked = true;
					this.$notify({
						title: '提示信息',
						message: name + '添加成功!',
						type: 'success'
					});
					//针对advert做优化
					if(itemObj.title == 'advert') {
						self.checkDialog('advertEdit', '设置广告栏', 'advertModal');
					}
				}
			},
			checkDialog: function(components, title, callback) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.callback = callback;
				store.commit("openModal", obj);
			},
		},
		created(){
			this.studio = store.getters.getStudio;
		},
		mounted() {

		}
	}
</script>

<style>

</style>