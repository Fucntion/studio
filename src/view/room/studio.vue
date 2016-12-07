<template>
	<div>
	<el-row>
		<el-col :span="24">
			<el-tabs class="studio_tab"  type="border-card" :active-name="activeName">

			    <el-tab-pane label="直播设置" name="config"><config></config></el-tab-pane>
			    <el-tab-pane label="用户管理" name="analysis"><audience></audience></el-tab-pane>
			    <el-tab-pane label="数据分析" name="audience"><analysis></analysis></el-tab-pane>
		  </el-tabs>
		</el-col>
	</el-row>
		

	</div>
</template>

<script>
	import StudioConfig from './config.vue'
	import StudioAudience from './audience.vue'
	import StudioAnalysis from './analysis.vue'
	import AwesomeSwiper from 'vue-awesome-swiper'

	import store from '../../vuex/store'

	export default {
		data: function() {

			return {
				studio: {},
				activeName: 'config'
			}
		},
		store,
		components: {
			'config': StudioConfig,
			'analysis': StudioAnalysis,
			'audience': StudioAudience,

		},
		methods: {
			goto: function(text) {
				this.currentView = text;
			}

		},
		mounted() {

			this.studio = store.getters.getStudio

		}
	}
</script>
<style lang="less">
.studio_tab{
	// width: 100%;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: #f2f2f2;
	.el-tabs__header{
		// width: 270px;
		text-align: center;

		.el-tabs__item{
			display: inline-block;
			float: none;
			width: 120px;
		}
	}
}
/*.el-tabs__header{
	width: 270px;
	margin: 0 auto !important;
}
.el-tabs__item{

}*/
</style>