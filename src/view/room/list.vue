<template>
	<div class="roomList">

		<el-row class="room_box">
			<!--传入add然后让业务逻辑知道是创建新的直播间-->

			<el-col :span="7" class="roomAdd">
				<div @click="addRoom()">创建房间</div>
			</el-col>
			<template v-for="(room,index) in roomList">
				<el-col :span="1">&nbsp;</el-col>

				<el-col :span="7" class="roomItem" :id="room.id">

					<img :src="room.cover_img_url" class="thumb" alt="room.title" />
					<div class="info">
						<h3>{{room.title}}</h3>
						<span>观看人数323</span>
					</div>
					<div class="clear"></div>
					<el-row class="btn">
						<el-col class="btn_item" :span="8">
							<div @click="intoRoom(room.id)">编辑房间</div>
						</el-col>
						<el-col class="btn_item" :span="8">
							<div @click="show(room.id)">预览房间</div>
						</el-col>
						<el-col class="btn_item" :span="8">数据分析</el-col>
					</el-row>

				</el-col>

			</template>
			<!-- <el-col :span="1" >&nbsp;</el-col> -->
		</el-row>

	</div>
</template>

<script>
	import store from '../../vuex/store'
	export default {
		data: function() {

			return {
				roomList: []

			}
		},
		methods: {
			goto: function(id) {
				console.log('studio/' + id);
				this.$router.push('studio/' + id);
			},
			addRoom: function() {
				//创建好直播间
				console.log('add room');
				var d = new Date(),
					data = {
						cover_img_url: "https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/img/home/qcloud-logo-dark.png",
						title: "你323",
						is_record_play: 1,
						plugin: '1',
						style: '1',
						created_at: d.getTime()

					},
					url = "/rooms";
				this.$http.post(url, data).then((response) => {
					// console.log(response.body);return;
					// store.commit('setStudio', response.body);
					this.$router.push('studio/' + response.body.id);

				}, (response) => {
					// error callback
					// console.log(response);
				});

				//回调中拿到直播间基础信息
				//跳转到对应的页面。

			},
			intoRoom: function(id) {
				//创建好直播间
				console.log('into room');
				var url = "/rooms/" + id;
				this.$http.get(url).then((response) => {

					store.commit('setStudio', response.body);
					this.$router.push('studio/' + response.body.id);

				}, (response) => {
					// error callback
					// console.log(response);
				});

				//回调中拿到直播间基础信息
				//跳转到对应的页面。

			},
			show: function(id) {
				window.open("http://tv.icloudinn.live/" + id);
			}
		},
		mounted() {

			var url = "/rooms";
			this.$http.get(url).then((response) => {
				// success callback
				this.roomList = response.body;

				// console.log(response.body);
			}, (response) => {
				// error callback
				// console.log(response);
			});

		}
	}
</script>
<style lang="less">

</style>