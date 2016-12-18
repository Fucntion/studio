<template>

<el-modal  :title="dialog.title"   v-model="dialog.visible">
  <div   :class="dialog.type" :dialog="dialog"   :is="dialog.current"></div>
</el-modal>


</template>

<script>
import store from '../../vuex/store';

import pictureBox from "./pictureBox.vue"
import videoBox from "./videoBox.vue"
import goodsBox from "./goodsBox.vue"

import menuEdit from "../dialog/menuEdit.vue"

export default {
    data: function() {
  
         return {
         	dialog:{}
       }
    },
    store,
    methods: {

    },
    components:{
    	pictureBox,
		goodsBox,
		videoBox,
        menuEdit

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