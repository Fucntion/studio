<template>
	
	<transition name="bounce">
		<router-view></router-view>
	</transition>

</template>

<script>

	export default {
		name:'app',
		data: function() {

			return {
				
			}
		},
		methods: {

		},
		components: {

		},
		watch: {

		},
		mounted() {

		}
	}
</script>
<style lang="less">
	@import "../node_modules/font-awesome/css/font-awesome.min.css";
	@import './lib/theme-default/index.css';
	@import './assets/css/app.less';
	@import '../node_modules/quill/dist/quill.snow.css';
	@import '../node_modules/quill/dist/quill.bubble.css';
	@import '../node_modules/quill/dist/quill.core.css';

</style>