<template>
	<div>
        <el-input style="width:400px;" v-model="studio.title" placeholder="菜单名称不超过三个中文字"></el-input><br/><br/>
        <el-button @click="subConfig()" type="primary">保存配置</el-button>
	</div>
</template>

<script>
	import store from 'store';
	export default {
        name:'titelEdit',
		store,
		data() {
			return {
				show: false,
				studio: null,
				
			}
		},
		computed: {

		},
		components: {
			
		},
		methods: {

			init() {
				var self = this;

				self.studio = store.getters.getStudio;
				

			},
            subConfig() {
				var self = this;
				var data = {
					id: self.$router.currentRoute.params.id,
					studio: this.studio,
				}

				store.commit('changeStudio', data);
			},
		},
		
		mounted() {
			this.init();
		}
	}

</script>

<style lang="less">
	
</style>