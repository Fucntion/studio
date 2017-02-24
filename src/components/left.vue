<template>
	<div class="left">
		<el-menu class="nav" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
			<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
				<el-submenu class="nav_item" :index="index+''" v-if="item.children && !item.leaf">
					<!--为了满足hover变白色的需要，所以改用nav_navname的形式定义className-->
					<template slot="title"><i :class="'nav_'+item.iconCls" class="nav_icon"></i><span class="nav_name">{{item.name}}</span></template>
					<el-menu-item v-for="child in item.children"  v-if="!child.hidden" :index="child.path">{{child.name}}</el-menu-item>
				</el-submenu>
				<el-menu-item class="leaf nav_item" v-else :index="item.path">
					<i :class="'nav_'+item.iconCls" class="nav_icon"></i>
					<span class="nav_name">{{item.name}}</span>
				</el-menu-item>
			</template>
		</el-menu>
		<a class="kefu" target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=1327244494&site=qq&menu=yes">
			<img src="~assets/img/kefu.png" />
		</a>
	</div>

</template>

<script>
	export default {

		data: function() {

			return {

			}

		},
		mounted() {
			console.log(this.$router)
		},
		methods: {
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function(index, path) {
				// console.log(index,path)
			}
		},
		components: {

		},
		watch: {
			'$route' (to, from) { //监听路由改变

				// this.defaultLink=to.path;
			}
		},

	}
</script>
<style lang="less">
	.nav_item {
		position: relative;
	}

	.nav_icon {
		position: absolute;
		top: 20px;
		/*left*/
		display: inline-block;
		height: 20px;
		width: 20px;
	}

	.nav_name {
		margin-left: 30px;
	}

	.nav_home {
		background-image: url('~assets/img/nav/home_icon.png');
	}

	.nav_room {
		background-image: url('~assets/img/nav/room_icon.png');
	}

	.nav_goods {
		background-image: url('~assets/img/nav/goods_icon.png');
	}

	.nav_source {
		background-image: url('~assets/img/nav/source_icon.png');
	}

	.nav_dz {
		background-image: url('~assets/img/nav/dz_icon.png');
	}

	.nav_user {
		background-image: url('~assets/img/nav/user_icon.png');
	}

	.nav_money {
		background-image: url('~assets/img/nav/money_icon.png');
	}

	.nav_seting {
		background-image: url('~assets/img/nav/seting_icon.png');
	}

	.el-submenu__title:hover {
		.nav_home {
			background-image: url('~assets/img/nav/home_icon_white.png');
		}
		.nav_room {
			background-image: url('~assets/img/nav/room_icon_white.png');
		}
		.nav_goods {
			background-image: url('~assets/img/nav/goods_icon_white.png');
		}
		.nav_source {
			background-image: url('~assets/img/nav/source_icon_white.png');
		}
		.nav_dz {
			background-image: url('~assets/img/nav/dz_icon_white.png');
		}
		.nav_user {
			background-image: url('~assets/img/nav/user_icon_white.png');
		}
		.nav_money {
			background-image: url('~assets/img/nav/money_icon_white.png');
		}
		.nav_seting {
			background-image: url('~assets/img/nav/seting_icon_white.png');
		}
	}

	.is-active {
		.nav_home {
			background-image: url('~assets/img/nav/home_icon_white.png');
		}
		.nav_room {
			background-image: url('~assets/img/nav/room_icon_white.png');
		}
		.nav_goods {
			background-image: url('~assets/img/nav/goods_icon_white.png');
		}
		.nav_source {
			background-image: url('~assets/img/nav/source_icon_white.png');
		}
		.nav_dz {
			background-image: url('~assets/img/nav/dz_icon_white.png');
		}
		.nav_user {
			background-image: url('~assets/img/nav/user_icon_white.png');
		}
		.nav_money {
			background-image: url('~assets/img/nav/money_icon_white.png');
		}
		.nav_seting {
			background-image: url('~assets/img/nav/seting_icon_white.png');
		}
	}
</style>
