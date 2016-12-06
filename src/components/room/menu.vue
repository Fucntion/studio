<template>
	<div class="mobile-menu">
		<ul>
			<li>观众评论</li>
			<li v-for="(item,index) in listData" :data-id="index">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data: function() {

			return {
				listData: [{
					name: '商品列表',
					index: 2
				}, {
					name: '观众评论',
					index: 1
				}, {
					name: '活动报名',
					index: 3
				}]

			}
		},
		components: {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	.rest {
		padding: 0;
		margin: 0;
	}
	
	.mobile-menu {
		color: red;
		height: 40px;
		ul {
			.rest;
			display: block;
			height: 40px;
			white-space: nowrap;
			list-style: none;
			overflow-y: hidden;
			overflow-x: scroll;
			li {
				display: inline;
				padding-left: 10px;
			}
			li:hover {
				cursor: pointer;
			}
		}
	}
</style>