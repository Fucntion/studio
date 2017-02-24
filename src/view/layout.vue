<template>
	<div id="studio">
		<top></top>
		<left></left>
		<div class="right">
			<el-row>
				<el-col :span="24" class="crumb-box" v-if="currentPathName!=''&&$route.path!='/home'">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
						<el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="hr"></div>
				</el-col>
				<el-col :span="24"  class="container">
					<transition name="fade">
						<router-view ></router-view>
					</transition>
				</el-col>
			</el-row>
		</div>

	</div>

</template>

<script>
	//公共布局组件
	import Top from 'plugin/header.vue'
	import Left from 'plugin/left.vue'

	export default {
		name:'wrap',
		data: function() {

			return {
				currentPathName: '',
				currentPathNameParent: '',
			}
		},
		methods: {
		},
		components: {
			'top':Top,
			'left':Left,

		},
		watch: {
			'$route' (to, from) { //监听路由改变

				this.currentPathName = to.name;
				this.currentPathNameParent = to.matched[0].name;
			}
		},
		mounted() {
			this.currentPathName =this.$route.name;



		}
	}
</script>
<style lang="less">

</style>
