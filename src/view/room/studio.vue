<template>
	<div id="studio">

		<el-tabs class="studio_tab" type="border-card" :active-name="activeName">
			<el-tab-pane label="直播设置" name="config">
				<config :studio="studio"></config>
			</el-tab-pane>
			<el-tab-pane label="用户管理" name="analysis">
				<audience :studio="studio"></audience>
			</el-tab-pane>
			<el-tab-pane label="数据分析" name="audience">
				<analysis :studio="studio"></analysis>
			</el-tab-pane>
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
		beforeCreate() {

			this.studio = store.getters.getStudio;

			function isEmptyObject(e) {
				var t;
				for(t in e)
					return !1;
				return !0
			}
			if(isEmptyObject(this.studio)) {
				var id = this.$router.currentRoute.params.id;

				var url = "/rooms/" + id;
				this.$http.get(url).then((response) => {

					var tempObj = response.body;
					tempObj.play_time_show = tempObj.play_time ? tempObj.play_time * 1000 : null;
					store.commit('setStudio', tempObj);
					this.studio = store.getters.getStudio; //统一使用这个来调用

				}, (response) => {
					console.log(response);
				});

			}

			//本来以为可以在创建房间成功后或者点击列表的item后动态修改vuex中的stuido,但是后台数据返回不对所以只能暂时手动拿了。
			// 

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