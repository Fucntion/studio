<template>
	<div class="feature">
		 <div class="header">
		 	<span class="header_tab" :class="showStatus.cover?'active':''"  @click="changeShow('cover')">封面</span>
		 <span class="header_tab" :class="showStatus.countDown ?'active':''" @click="changeShow('countDown')">倒计时</span>
		 <span class="header_tab" :class="showStatus.logo ?'active':''" @click="changeShow('logo')">logo</span>
		 </div>

		<div v-if="showStatus.cover">
			封面
		</div>
		<div v-if="showStatus.countDown">
			倒计时
		</div>
		<div v-if="showStatus.logo">
			logo
		</div>

	</div>
</template>

<script>
	export default {
		data: function() {

			return {
				showStatus:{
					cover:true,
					logo:false,
					countDown:false

				}
			}
		},
		methods: {
			changeShow:function(name){

				for(var k in this.showStatus){

					if(k ==name){
						this.showStatus[k] =true;
						continue;
					}
					this.showStatus[k] =false;
				}
			}
		},
		components: {

		}
	}
</script>

<style lang="less">

</style>