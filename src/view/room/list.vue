<template>
	<div class="roomList"  v-loading="loading"
    element-loading-text="拼命加载中">

		<el-row class="room_box">
			<!--传入add然后让业务逻辑知道是创建新的直播间-->
				<div class="roomAdd roomlist2">
					<img style='width:4rem;' src="~assets/img/add.png" alt="">
					<div style='flex-basis: 100%;text-align: center;margin-top: 1rem;'  @click="addRoom()">创建直播间</div>
				</div>

			<template v-if="roomList.length>0" v-for="(room,index) in roomList">
					<div class="roomItem roomlist2" :id="room.id">
						<img :src="room.logo_url" class="thumb"/>
						<h3 class="room_title">{{room.title}}</h3>
						<el-row class="btn">
							<el-col class="btn_item" :span="6">
								<div @click="intoRoom(room.id)">编辑</div>
							</el-col>
							<el-col class="btn_item" :span="6">
								<div @click="show(room.id)">数据</div>
							</el-col>
							<el-col class="btn_item" :span="6">
								<div @click="analysis(room.id)">视频库</div>
							</el-col>
							<el-col class="btn_item" :span="6">
								<el-tooltip placement='top' effect='light'>
									<qrcode slot='content' :size='150' :val="'http://tv.icloudinn.com/'+room.id"></qrcode>
									<div @click="share(room.id)">分享</div>
								</el-tooltip>
							</el-col>
						</el-row>
						<div class="mask"></div>
						<div class="room_control">
							<img @click='stop(room.id)' src="~assets/img/room/stop_icon.png" title="正在直播，点击停止" class="icon live_stop" />
							<img @click='start(room.id)' src="~assets/img/room/start_icon.png"  title="直播停止，点击开启" class="icon live_start" />
							<img @click="del(room.id,index)" src="~assets/img/room/delete_icon.png"  title="删除直播间" class="icon live_delete" />
						</div>
					</div>
			</template>
			<!-- <el-col :span="1" >&nbsp;</el-col> -->
		</el-row>
		<div class="control">
			<el-pagination layout="prev, pager, next" :total="roomTotal" :page-size="7">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	import store from 'store'
	import Qrcode from 'plugin/common/Qrcode.vue'
	import { Loading } from 'element-ui'

	export default {
		data: function() {

			return {
				roomList: [],
				loading:true,
				roomTotal:0,
				ctime:0


			}
		},
		components:{
			Qrcode
		},
		methods: {
			addRoom: function() {
				//创建好直播间
				console.log('add room');
				let loadingInstance = Loading.service({ fullscreen: true,text:'努力创建' })
				var d = new Date(),
					data = {
						cover_img_url: "http://www.icloudinn.com/statics/images/logo.png",
						title: "云商直播间",
						is_record_play: 1,
						style: ' ',
						plugin: JSON.stringify({
							menu: [],
							advert: []
						}),
						created_at: d.getTime()

					},
					url = "/rooms";

				this.$http.post(url, data).then((response) => {
					loadingInstance.close()
					this.$router.push('studio/' + response.body.data.id);
					console.log(r);
				}, (response) => {

				});

				//回调中拿到直播间基础信息
				//跳转到对应的页面。

			},
			// 停止直播
			stop:function(id){
				this.$confirm('是否关闭直播?','提示',{
					confirmButtonText: '确定',
          cancelButtonText: '取消',
					type:'warning'
				}).then(()=>{
					this.$message({
						type:'success',
						message:'已关闭'
					})
				}).catch(()=>{
					this.$message({
						type:'info',
						message:'已取消'
					})
				})
			},
			// 开启直播
			start:function(id){
				this.$confirm('是否开启直播?','提示',{
					confirmButtonText: '确定',
          cancelButtonText: '取消',
					type:'warning'
				}).then(()=>{
					this.$message({
						type:'success',
						message:'已开启'
					})
				}).catch(()=>{
					this.$message({
						type:'info',
						message:'已取消'
					})
				})
			},
			del: function(id,index) {
				//创建好直播间

				console.log('delete room' + id);
				this.$confirm(name + '是否删除该直播间?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '删除',
					type: 'warning'
				}).then(() => {

					var url = "/rooms/" + id;
					this.$http.delete(url).then((response) => {
						if(response.body.code ==100){
							this.$notify.info({
								title: '提示信息',
								message: '删除成功'
							});
							 _.remove(this.roomList, function(item) {
							  return item.index  == index;
							});
							this.roomList.splice(index,1);
						}else{
							this.$notify.info({
								title: '提示信息',
								message: '删除失败'
							});
						}


					}, (response) => {
						this.$notify.info({
							title: '提示信息',
							message: '删除失败'
						});
					});
				})
			},
			intoRoom: function(id) {
				//创建好直播间
				console.log('into room');

				this.$router.push('studio/' + id);
				//回调中拿到直播间基础信息
				//跳转到对应的页面。

			},
			show: function(id) {
				// window.open("http://tv.icloudinn.com/" + id);
				this.$router.push('studio/'+id)
				localStorage.setItem('toanalysis', true)
			},
			analysis:function(id){
				this.$router.push('video/'+id)
			}
		},
		mounted() {

			var url = "/rooms--token--&page=1&per-page=20";
			this.$http.get(url).then((response) => {
				console.log(response.body)
				this.roomList = response.body.data.list;
				this.roomTotal = parseInt(response.body.data.pageInfo.totalCount)
				this.loading =false;

			}, (response) => {
			});

		}
	}
</script>
<style lang="less">
	.room_box{
		display: flex;
		flex-wrap: wrap;
	}
	.roomAdd{
		flex-wrap: wrap;
    align-content: center;
	}
	.roomList{
		background: white;
		padding:3rem;
	}
	.control{
		text-align: right;
	}
	.listcontent{
		display: flex;
		justify-content: center;
	}
	.roomlist2{
		flex-basis: 25%;
	}
</style>
