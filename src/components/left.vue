<template>

	<div id="left">
		{{menuData}}
		<!-- <div v-for="(val, key, index) in menuData" class="sidebar-item">
			<template v-if="!val.meta.hidden">
				<div class="sidebar-title" v-on:click="toggleFoldStatus(val)">
					{{val.meta.title}}
				</div>
				<ul v-if="val.children" v-show="val.meta.toggle" class="sidebar-trans">
					<li v-on:click="toggleFoldStatus(val)" :class="nav-item" v-for="(val, key, index) in val.children">{{val.meta.title}}
						<li>
				</ul>
			</template>

		</div> -->

		<a class="kefu" target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=1327244494&site=qq&menu=yes">
			<img src="~assets/img/kefu.png" />
		</a>
	</div>

</template>

<script>
	import store from '../vuex/store';

	export default {

		data: function() {
			console.log(this.$router.options.routes);

			return {
                menuData:{1:'23'}
			}

		},
        store,
		mounted() {
            this.menuData =store.getters.getMenuData


		},
		methods: {
			toggleFoldStatus: function(obj) {
					//传入对应的data对象
                    
					if(obj.children) {
						//有二级菜单,打开二级菜单
						obj.meta.toggle = !obj.meta.toggle;
						if(!obj.meta.toggle) return; //若是打开折叠菜单则关闭其他的，如果是关闭折叠菜单则不便利其他数据浪费新能。因为肯定都是折叠的
						//关闭其他二级菜单

						for(var key in this.menuData) {
							if(this.menuData[key] == obj){continue} ;
							this.menuData[key].meta.toggle = false;
						}
					} else {
						// store.commit('changeCrumb',obj.title);
						//无二级菜单，执行路由跳转
						//居然二级菜单的逻辑也莫名其妙可以用这个来搞定，爽歪歪。。。

						// location.hash = location.hash.split('\/')[0] + ;
						this.$router.push(obj.path)
						// console.log(location.hash);
						// this.$router.push();
					}

				}
				// clearMenu:function(obj){
				//     //对路由里面的数据进行整理，然后作为导航栏的数据
				//     var tempArr =[];
				//     for(var k in obj){
				//         //目前只做到一级菜单来区分是否显示
				//         if(obj[k].meta.showMenu){
				//             tempObj.push(obj[k]);
				//         }
				//     }
				//     return tempArr;
				//     console.log(tempArr);
				// }
		},
		components: {

		}
	}
</script>
<style lang="less">

</style>