<template>
	<el-dialog :title="dialog.title" v-model="dialog.visible" >
		<div   :dialog="dialog" :is="dialog.current" :key="new Date()"></div>
	</el-dialog>
</template>

<script>
	import store from 'store';
	import goodsBox from "./goodsBox.vue"
	import menuEdit from "../dialog/menuEdit.vue"
	import advertEdit from "../dialog/advertEdit.vue"

	export default {
		data: function() {

			return {
				dialog: {}
			}
		},
		store,
		methods: {
 
		},
		components: {
			goodsBox,
			menuEdit,
			advertEdit
		},
		mounted() {

			this.dialog = store.getters.getDialog;

		}
	}
</script>

<style lang="less">

</style>