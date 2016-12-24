<template>
	<div class="videoList" v-if="videoList.length>0" v-loading="loading"
		element-loading-text="拼命加载中">

		<el-row class="video_box">
			<!--传入add然后让业务逻辑知道是创建新的直播间-->
			<template v-for="(video,index) in videoList">

				<div class="videoItem" >
					<img width="300px" src="~assets/img/video_demo.png" class="thumb" alt="room.title" />
					<h4 class="video_title">{{video.name}}</h4>
					<div class="info"><span class="cleartime">{{video.clearTime}}过期</span>   <span class="size">{{video.size}}</span></div>
					<div class="controlbtn_box">
						<el-button class="btn" type="primary">保存</el-button>	
						<el-button class="btn" type="primary">下载</el-button>	
						<el-button class="btn" type="primary">删除</el-button>	
					</div>			
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
	import store from '../../vuex/store'

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

			
			var url = "/rooms";
			this.$http.get(url).then((response) => {
				// success callback
				this.roomList = response.body;
				this.loading =false;
			}, (response) => {

			});

		}
	}
</script>
<style lang="less">



	.videoList{
		margin-left: 15px;
		.video_box{

			.videoItem{
				margin:0 15px 15px 0;
				border-width: 1px;
				border-color: rgb(192, 192, 192);
				border-style: solid;
				border-radius: 10px;
				overflow: hidden;
				width:300px;
				float: left;
				.thumb{

				}
				.video_title{
					padding: 0 5px;
				}
				.info{
					height: 36px;
					font-size:14px;
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
					padding:0px 10px 15px;
					display:flex;
					.btn{
						flex:1;
					}
				}

			}
		}

	}
</style>