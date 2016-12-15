<template>
	<div id="studio">
		<template v-if="studio">
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
			
		</template>	
		
		

	</div>
</template>

<script>
	import StudioConfig from './config.vue'
	import StudioAudience from './audience.vue'
	import StudioAnalysis from './analysis.vue'

	import store from '../../vuex/store'
	// Example(Only applies to the current global mode). 用配置项的话仅支持全局模式来配置，否则不会生效

	

	export default {
		data: function() {

			return {
				studio:null,
				url:false,
				videoOptions:{
					source: {
						"type": "application/x-mpegURL",
//						 "src": 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8',
						"src": null,
						"withCredentials": false
					},
					"poster": "http://live.icloudinn.com/img3/logo.png",
					"live": true,
					"autoplay": false,
					"height": 414 * 2 / 3,
					"language": 'zh-cn'
				},
				
				activeName: 'config'
			}
		},
		store,
		components: {
			'config': StudioConfig,
			'analysis': StudioAnalysis,
			'audience': StudioAudience

		},
		
		methods: {
			goto: function(text) {
				this.currentView = text;
			}

		},
		beforeCreate() {

			var self = this;
			
			
				self.studio = store.getters.getStudio;
	
				function isEmptyObject(e) {
					var t;
					for(t in e)
						return !1;
					return !0
				}
	
				if(isEmptyObject(self.studio)) {
					var id = self.$router.currentRoute.params.id;
	
					var url = "/rooms/" + id;
					self.$http.get(url).then((response) => {
	
						var tempObj = response.body;
						var d=new Date();
						//如果服务器有时间就取服务器，没有的话时间选择器就默认显示当前时间。
						tempObj.play_time_show = tempObj.play_time ? tempObj.play_time * 1000 : null;
						
						store.commit('setStudio', tempObj);
						self.studio = store.getters.getStudio; //统一使用这个来调用
						console.log(tempObj,self.studio,'转换时间戳');

						//self.videoOptions.source.src ='http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8';
	
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