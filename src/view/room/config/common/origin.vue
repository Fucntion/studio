<template>

<div class="origin">

	<div class="header">
		<span class="header_tab" :class="showStatus.origin ?'active':''"  @click="changeShow('origin')">直播源</span>
		<span class="header_tab" :class="showStatus.countDown ?'active':''" @click="changeShow('countDown')">定时开播</span>
		<span class="header_tab" :class="showStatus.total ?'active':''" @click="changeShow('total')">人数限制</span>
	</div>
	<div class="container"  v-if="showStatus.countDown">
		<!-- <h5>倒计时功能可以帮您有效留住用户</h5> -->
		<el-form   label-width="70px">
			<el-form-item label="开播时间">
				<el-date-picker
				v-model="studio.play_time"
				type="datetime"
				format="yyyy-MM-dd HH:mm"
				placeholder="选择日期时间">
			</el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit_origin">保存配置</el-button>
		</el-form-item>
	</el-form>
	
</div>
<div v-if="showStatus.origin" class="container origin_container">

	<el-form  class="origin_form" label-width="70px">
		<el-form-item label="房间名称">
			<el-input placeholder="直播间名称" v-model="studio.title"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit_origin">保存配置</el-button>
		</el-form-item>
	</el-form>
	<div class="origin_show">
		<div class="hr"></div>
		<div class="title">推流地址 <el-button size="small" type="primary">复制</el-button></div>
		<p>{{studio.upstream_address}}</p>

		<div class="title">预览地址 <el-button size="small" type="primary">复制</el-button></div>
		<p>http://tv.icloudinn.live/{{studio.id}}</p> 
		<div class="title">扫我预览</div>
		<qrcode :val="'http://tv.icloudinn.live/'+studio.id"></qrcode>
		<el-button size="small" @click="gocli()" type="primary">二维码美化</el-button>
	</div>
</div>

<div v-if="showStatus.total" class="container ">
	<el-form ref="form" class="origin_form" :model="form" label-width="70px">
		<el-form-item label="人数限制">
			<el-input placeholder="设置直播间同时观看的人数上限" v-model="form.name"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">保存配置</el-button>
		</el-form-item>
	</el-form>
</div>

	<!-- {{studio}} -->
</div>
</template>

<script>
	import Qrcode from '../../../../components/common/Qrcode.vue'
	import store from '../../../../vuex/store'
	export default {
		data: function() {

			return {
				showStatus:{origin:true,total:false,countDown:false},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},value1: ''

			}
		},
		store,
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
			onSubmit() {
				console.log('submit!');

			},
			onSubmit_origin(obj) {

				var time = this.studio.play_time;
				this.studio.play_time=time.getTime();//修改时间为datetime格式
				var data ={
					id:this.$router.currentRoute.params.id,
					studio:this.studio
				}

				store.commit('changeStudio',data);

			},gocli:function(){
				window.open('http://cli.im/');
			} 
		},
		components: {
			Qrcode
		},
		mounted(){
			

			
		}
	}
</script>

<style lang="less">

</style>