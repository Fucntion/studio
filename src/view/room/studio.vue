<template>
	<div id="studio" v-if="show">
	<div class="top_bar">
		<div class="item_box">
			<div @click="setcurrentView('config')" v-bind:class="{isActive:currentView=='config'}" class="item">直播间设置</div>
			<div @click="setcurrentView('audience')" v-bind:class="{isActive:currentView=='audience'}" class="item">用户管理</div>
			<div @click="setcurrentView('analysis')"  v-bind:class="{isActive:currentView=='analysis'}" class="item">数据分析</div>
		</div>
	</div>
	<config v-if="currentView=='config'" :studio="studio"></config>
	<audience v-if="currentView=='audience'"  :studio="studio"></audience>
	<analysis v-if="currentView=='analysis'"  :studio="studio"></analysis>
	</div>
</template>

<script>
	import StudioConfig from './config.vue'
	import StudioAudience from './audience.vue'
	import StudioAnalysis from './analysis.vue'
	import { Loading } from 'element-ui'
	import store from '../../vuex/store'

	export default {
		name:'studio',
		data: function() {

			return {
				studio:null,
				show:false,
				currentView: 'config'
			}
		},
		store,
		components: {
			'config': StudioConfig,
			'analysis': StudioAnalysis,
			'audience': StudioAudience,
		},	
		methods: {
			setcurrentView:function(type){
				
				this.currentView = type;
				console.log(type,this.currentView);
			},
			init:function(){
				
				let loadingInstance = Loading.service({text:'拼命加载中'});
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
					loadingInstance.close();


				}, (response) => {
					console.log(response);
				});
				
			}

		},
		mounted() {
			
			this.init();


		}
	}
</script>
<style lang="less">

// .矩形_15 {
//   background-color: rgb(32, 160, 255);
//   position: absolute;
//   left: 431px;
//   top: 57px;
//   width: 94px;
//   height: 4px;
//   z-index: 5;
// }

</style>