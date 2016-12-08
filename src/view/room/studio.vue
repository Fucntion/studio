<template>
	<div id="studio">

			<el-tabs class="studio_tab"  type="border-card" :active-name="activeName">

			    <el-tab-pane label="直播设置" name="config"><config></config></el-tab-pane>
			    <el-tab-pane label="用户管理" name="analysis"><audience></audience></el-tab-pane>
			    <el-tab-pane label="数据分析" name="audience"><analysis></analysis></el-tab-pane>
		  </el-tabs>


	</div>
</template>

<script>
	import StudioConfig from './config.vue'
	import StudioAudience from './audience.vue'
	import StudioAnalysis from './analysis.vue'


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

			this.studio = store.getters.getStudio;


		}
	}
</script>
<style lang="less">

/*.el-tabs__header{
	width: 270px;
	margin: 0 auto !important;
}
.el-tabs__item{

}*/
</style>