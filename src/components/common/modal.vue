<template>
	<el-dialog :title="dialog.title" v-model="dialog.visible">
		<div   :dialog="dialog" :is="dialog.current" :key="new Date()"></div>
	</el-dialog>
</template>

<script>
	import store from 'store';
	import goodsBox from "./goodsBox.vue"
	import menuEdit from "../dialog/menuEdit.vue"
	import titleEdit from "../dialog/titleEdit.vue"
	import advertEdit from "../dialog/advertEdit.vue"

	export default {
		data: function() {

			return {
				dialog: {}
			}
		},
		store,
		methods: {
// 			close_dialog:function(){
// 				console.log(window.editor)
// 				if(window.editor!==undefined){
// 					window.editor.destroy()
// 					console.log('here')
// 				}
// 			}
		},
		components: {
			goodsBox,
			menuEdit,
			advertEdit,
			titleEdit
		},
		mounted() {

			this.dialog = store.getters.getDialog;

		}
	}
</script>

<style lang="less">

</style>