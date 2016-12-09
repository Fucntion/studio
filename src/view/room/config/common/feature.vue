<template>
	<div class="feature">
		 <div class="header">
		 	<span class="header_tab" :class="showStatus.cover?'active':''"  @click="changeShow('cover')">封面</span>
		
		 <span class="header_tab" :class="showStatus.logo ?'active':''" @click="changeShow('logo')">logo</span>
		 </div>

		<div class="container" v-if="showStatus.cover">
			<h5>设置封面，会让你的直播更有范哦</h5>
			<div class="cover">
				<template v-if="studio.cover_img_url">
				<img  :src="studio.cover_img_url" />
				<el-button type="primary" @click="checkDialog('pictureBox','设置封面')" >更改封面</el-button>
			</template>
			<template v-else>
				<el-button  type="primary" @click="checkDialog('pictureBox','设置封面')" >设置封面</el-button>
			</template>
			</div>
		</div>
		
		<div class="container"  v-if="showStatus.logo">
			<h5>有创意的logo会使直播间显得高大上</h5>
			<div class="logo">
			<template v-if="studio.logo_url">
				<img  class="logo_img" :src="studio.logo_url" />
				<el-button type="primary" @click="checkDialog('pictureBox','设置logo')" >更改Logo</el-button>
			</template>
			<template v-else>
				<el-button type="primary" @click="checkDialog('pictureBox','设置logo')" >设置Logo</el-button>
			</template>

			

		</div>

	</div>
</template>

<script>
	import store from '../../../../vuex/store'
	export default {
		data: function() {

			return {
				showStatus:{
					cover:true,
					logo:false,
					
				}
			}
		},store,
		props: ['studio'],
		methods: {
			changeShow:function(name){

				for(var k in this.showStatus){

					if(k ==name){
						this.showStatus[k] =true;
						continue;
					}
					this.showStatus[k] =false;
				}
			},
			logo:function(){
				var data = {
						logo_url: "http://ww1.sinaimg.cn/thumb180/61e7f4aajw1fajnxpl30fj20dw03wmxj.jpg"
					},
				id = this.$router.currentRoute.params.id;
				var url = "/rooms/"+id;
				this.$http.put(url,data).then((response) => {
					console.log(response.body);
					store.commit("changeStudio",response.body);


				}, (response) => {
					// error callback
					// console.log(response);
				});
			},
			checkDialog:function(components,title){
				var obj ={};
				obj.components= components;
				obj.title = title;
				store.commit("openDialog",obj);
			},
		},
		components: {

		}
	}
</script>

<style lang="less">

</style>