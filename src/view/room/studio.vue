<template>
	<div id="studio">
		<template v-if="show">
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
		name:'studio',
		data: function() {

			return {
				
				studio:null,
				show:false,
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
			'audience': StudioAudience,


		},	
		methods: {
			init:function(){
				//只要打开页面,就是ajax,管他什么store
				
				

			}

		},
		mounted() {
			var self = this;		
				var id = self.$router.currentRoute.params.id;
				var url = "/rooms/" + id;
				self.$http.get(url).then((response) => {
					
					var tempObj = response.body;
					var d=new Date();
					//如果服务器有时间就取服务器，没有的话时间选择器就默认显示当前时间。
					tempObj.play_time_show = tempObj.play_time ? tempObj.play_time * 1000 : null;
					tempObj.pluginObj =JSON.parse(tempObj.plugin)?JSON.parse(tempObj.plugin):{menu:[],advert:[]};//空数组
					store.commit('setStudio', tempObj);
					self.studio = store.getters.getStudio; //统一使用这个来调用
					self.show =true;

					//self.videoOptions.source.src ='http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8';

				}, (response) => {
					console.log(response);
				});

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