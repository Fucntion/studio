<template>
	<div class="videoList" v-if="videoList.length>0" v-loading="loading"
		element-loading-text="拼命加载中">

		<el-row class="video_box">
			<!--传入add然后让业务逻辑知道是创建新的直播间-->
			<template v-for="(video,index) in videoList">

				<div class="videoItem" >
					<img width="210px" src="~assets/img/video_demo.png" class="thumb" alt="room.title" />
					<h4 class="video_title">{{video.name}}</h4>
					<div class="info"><span class="cleartime">{{video.clearTime}}过期</span>   <span class="size">{{video.size}}</span></div>
					<el-row class="controlbtn_box">
						<el-col class="btn_item" :span="8">
							<div @click="intoRoom(room.id)">编辑房间</div>
						</el-col>
						<el-col class="btn_item" :span="8">
							<div @click="show(room.id)">预览房间</div>
						</el-col>
						<!--数据分析-->
						<el-col class="btn_item" :span="8">
							<div @click="analysis(room.id)">数据分析</div>
						</el-col>
					</el-row>	
					<div class="mask"></div>	
					<div class="player"></div>
				</div>


			</template>
			<!-- <el-col :span="1" >&nbsp;</el-col> -->
		</el-row>
		<div class="control">
			<el-pagination layout="prev, pager, next" :total="videoList.length">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	import store from 'store'

	export default {
		data: function() {

			return {
				loading:true,
				videoList:[
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				{
					name:'关于百度百科新特性是否实用的调研与公司开业典礼开业典礼',
					size:'512M',
					href:'http://baidu.com',
					thumb:'',
					clearTime:'1天2小时3分钟后过期'//过期的时间戳
				},
				]
				
			}
		},
		methods: {

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
			show: function(id) {
				window.open("http://tv.icloudinn.live/" + id);
			}
		},
		mounted() {

			this.loading =false;
			// var url = "/rooms";
			// this.$http.get(url).then((response) => {
			// 	// success callback
			// 	this.roomList = response.body;
			// 	this.loading =false;
			// }, (response) => {

			// });

		}
	}
</script>
<style lang="less">





	.videoList{
		margin-left: 15px;
		.video_box{

			.videoItem{
				margin:0 15px 15px 0;
				border-radius: 6px;
				background-color: rgb( 255, 255, 255 );
				box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.4);
				position: relative;
				overflow: hidden;
				width:210px;
				float: left;
				.mask{
					position: absolute;
					height: 119px;
					width: 210px;
					top: 0;
					left: 0;
					background-color: rgb( 0, 0, 0 );
					opacity: 0.2;
					z-index: 2;
				}
				.player{
					position: absolute;
					height: 119px;
					width: 210px;
					top: 0;
					left: 0;
					background: url('~assets/img/player.png') no-repeat center center;
					z-index: 3;
					cursor: pointer;
				}
				.thumb{

				}
				.video_title{
					padding: 0 5px;
				}
				.info{
					// height: 36px;
					font-size:12px;
					line-height: 36px;
					color:#e55a84;
					padding:0 5px;
					.size{
						float:right;
					}
					.cleartime{

					}
				}
				.controlbtn_box{
					.btn_item{
						height: 36px;
						line-height: 36px;
						border:1px solid #f2f2f2;
						color: #20a0ff;
						font-size:14px;
						text-align: center;
						cursor: pointer;
					}
				}

			}
		}

	}
</style>