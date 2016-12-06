<template>
	<div>
		<h2>直播间</h2>
		<div class="tab-title">

			<button @click="goto('config')">参数设置</button>
			<button @click="goto('analysis')">数据分析</button>
			<button @click="goto('audience')">用户管理</button>
		</div> {{studio}}

		<div class="tabs">

			<!-- <config></config> -->
			<div :is='currentView'></div>
		</div>

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
			goto: function(text) {
				this.currentView = text;
			}

		},
		mounted() {

			this.studio = store.getters.getStudio

		}
	}
</script>
<style>

</style>