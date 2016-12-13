<template>
	<div class="mobile_menu" @click="checkDialog('menuEdit','自定义菜单')">
		<div v-for="(item,index) in listData" class="menu_item" :style="{width:liWidth}"  :data-id="item.index">{{item.name}}</div>
	</div>
</template> 

<script>

import store from '../../../../vuex/store'
	export default {
		data: function() {

			return {
				listData: [{
					name: '观众评论',
					index: 1
				},{
					name: '商品列表',
					index: 4
				}, {
					name: '公司简介',
					index: 2
				}, {
					name: '活动报名',
					index: 3
				}],
				liWidth:414/4+'px'

			}
		},
		components: {

		},store,
		methods: {
			checkDialog:function(components,title){
				var obj ={};
				obj.components= components;
				obj.title = title;
				store.commit("openModal",obj);
			}
		}
	}
</script>

<style lang="less">
</style>