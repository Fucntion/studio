<template>
	<div class="container">

		<!-- {{roomList}} -->
		<div class="room_box">
			<!--传入add然后让业务逻辑知道是创建新的直播间-->
			<div @click="addRoom()" class="roomAdd">创建房间</div>
			<div class="roomItem" :id="room.id" v-for="(room,index) in roomList">

				<img :src="room.cover_img_url" class="thumb" alt="room.title" />
				<div class="info">
					<h3>{{room.title}}</h3>
					<span>观看人数323</span>
				</div>
				<div class="clear"></div>
				<div class="btn">
					<a @click="goto(room.id)">编辑房间</a>
					<a @click="show(room.id)">预览房间</a>
					<a>数据分析</a>
				</div>

			</div>
		</div>

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
				// return;
				this.$router.push('studio/' + id);
			},
			addRoom: function() {
				//创建好直播间
				var data = {
						cover_img_url: "https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/img/home/qcloud-logo-dark.png",
						title: "你323",
						is_record_play: 333
					},
					url = "http://saas.icloudinn.com/api/v1/rooms?access-token=oVhZgg4Skvks9dsCA3iKVbivqsONiUCVrxN6q4Ye";
				this.$http.post(url, data, {
					emulateJSON: true
				}).then((response) => {

					store.commit('changeStudio', response.body);
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

			var url = "http://saas.icloudinn.com/api/v1/rooms?access-token=oVhZgg4Skvks9dsCA3iKVbivqsONiUCVrxN6q4Ye";
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