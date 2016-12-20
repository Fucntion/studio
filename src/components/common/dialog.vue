<template>

<el-modal  :title="dialog.title"   v-model="dialog.visible">
  <div   :class="dialog.type"  :studio="studio"  :dialog="dialog"   :is="dialog.current"></div>
</el-modal>


</template>

<script>
import store from '../../vuex/store';

import pictureBox from "./pictureBox.vue"
import videoBox from "./videoBox.vue"
import goodsBox from "./goodsBox.vue"

import menuEdit from "../dialog/menuEdit.vue"
import advertEdit from "../dialog/advertEdit.vue"

export default {
    data: function() {
  
         return {
         	dialog:{}
       }
    },
    store,
    methods: {

    },
    props:['studio'],
    components:{
    	pictureBox,
			goodsBox,
			videoBox,
        menuEdit,
        advertEdit

    },mounted() {

			this.dialog = store.getters.getDialog;


		}
}

</script>

<style lang="less">
.menuModal{
	.el-tabs__header{
		.el-tabs__item:first-child{
			.el-icon-close{
				display: none;
			}
		}
	}
}
</style>