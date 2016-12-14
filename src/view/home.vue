<template>

	<div id="studio">

		<top></top>

		<el-row class="panel-center">
			<el-col class="left" :span="4">
				<left></left>
			</el-col>
			<el-col class="right" :span="20">
				<el-row>
					<el-col :span="24" class="crumb-box">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
							<el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
						</el-breadcrumb>
						<div class="hr"></div>
					</el-col>

					<el-col :span="24" class="container">
						<transition name="fade">
							<router-view></router-view>
						</transition>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	//公共布局组件
	import Top from '../components/header.vue'
	import Left from '../components/left.vue'

	export default {
		data: function() {

			return {
				currentPathName: '首页',
				currentPathNameParent: '',
			}
		},
		methods: {
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function(a, b) {}
		},
		components: {
			Top,
			Left,

		},
		watch: {
			'$route' (to, from) { //监听路由改变

				this.currentPathName = to.name;
				this.currentPathNameParent = to.matched[0].name;
			}
		},
		mounted() {

		}
	}
</script>
<style lang="less">

</style>