<template lang="html">
	<div class="videocontainer">
		<el-row class='firstline'>
			<el-col :span='10' v-if='showif' style='text-align:left;'>直播间:<span class='livename'>  {{title_name}}</span></el-col>
			<el-col :span='9' style='text-align:right;'>
				<p style='font-size:12px;color:#888888;'>免费会员暂存视频和回放视频都可保存15天，15天后自动删除</p>
				<p @click='go_update' class='go_update' style='font-size:14px;margin-top:0.5rem;color:#888888;cursor:pointer;'><span class='livename'>想永久保存?</span>请前往升级账户</p>
			</el-col>
			<el-col :span='5' style='text-align:right;'>
				<p v-if='showif' @click='backlive' class='backlive'>&lt;&lt;返回我的直播间</p>
			</el-col>
		</el-row>
		<el-row style='background: white;margin-top: 1rem;padding: 1rem;'>
			<el-tabs v-model='activeName' type='cardt'>
				<el-tab-pane label='直播暂存' name='first'>
					<el-row style='display:flex;'>
						<el-button class='hover_button' icon='delete' style='border:1px solid #888888;padding-left:2rem;padding-right:2rem;border-radius: inherit;' @click='deletehere2' type='text' size='large'>删除</el-button>
						<el-button class='hover_button' icon='upload' style='margin-left:1rem;border:1px solid #888888;padding-left:2rem;padding-right:2rem;border-radius: inherit;' @click='download_here2' type='text' size='large'>下载</el-button>
					</el-row>
					<el-row style='margin-top:1rem;'>

						<el-table :data='tableData_new' @selection-change='handleSelectionChange'>
							<el-table-column align='left' type='selection' width='55'></el-table-column>
							<el-table-column align='left' prop="background" label="缩略图">
								<template scope='scope'>
									<div class="suolue">
										<el-popover style='text-align:center;' @show='show_popover(scope.row.video_url)' ref='popover4' placement='right' width='400' height='300' trigger='click'>
											<video height='300' :src="scope.row.video_url" autoplay controls="control">

											</video>
										</el-popover>
										<img v-popover:popover4 style='height:10rem;cursor:pointer;' :src="scope.row.background" alt="">
										<img v-popover:popover4 class='video_hover' src="~assets/img/player.png" alt="">
										<!-- <el-dialog title='播放' v-model='dialogVisible' size='small'>
                      <div style='display:flex;justify-content:center;'>
                        <div id='video_content'>

                        </div>
                      </div>
                    </el-dialog> -->
									</div>
								</template>
							</el-table-column>
							<el-table-column align='left' prop="disable,name,size,upload" label="名称/时长/上传时间">
								<template scope='scope'>
									<div class="suolue" style='justify-content: space-between;'>
										<div class="items">
											<el-input :disabled='scope.row.disable' v-model='scope.row.name'></el-input>
											<p class='ntu'>{{scope.row.size}}s</p>
											<p class='ntu'>{{scope.row.upload}}</p>
											<p class='ntu'>还剩{{scope.row.cha}}天</p>
										</div>
										<div class="items">
											<img style='cursor:pointer;' @click='edit2(scope.row)' src="~assets/img/edit.png" alt="">
											<!-- <el-button @click='edit2(scope.row)' type='primary'>编辑</el-button> -->
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column align='center' prop="status" label="状态"></el-table-column>
							<el-table-column align='center' label="操作">
								<template scope='scope'>
									<div class="suolue">
										<el-button @click='tovideo(scope.row.id)' type='primary' size='large'>
											转入视频库
										</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-row style='margin-top:1rem;'>
							<div class="pagination">
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
								</el-pagination>
							</div>
						</el-row>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label='视频库' name='second'>
					<el-row class='kufirstline'>
						<el-col :span='2'>
							<el-button style='border-radius: inherit;' icon='document' id='upBtnId' type='primary'>添加视频</el-button>
						</el-col>
						<el-col :span='4' style='display:flex;'>
							<el-button class='hover_button' icon='delete' style='border-left:0;border:1px solid #888888;padding-left:2rem;padding-right:2rem;border-radius: inherit;' @click='deletehere' type='text'>删除</el-button>
							<el-button class='hover_button' icon='upload' style='border-left:0;border:1px solid #888888;padding-left:2rem;padding-right:2rem;border-radius: inherit;' @click='download_here' type='text'>下载</el-button>
						</el-col>
						<el-col :offset='1' style='display:flex;align-items:center;'>
							<p class='go_update' style='font-size；14px;color:#21a0ff;cursor:pointer;'>从暂存视频中添加视频</p>
						</el-col>
					</el-row>
					<p v-if='dialogp !== ""'>{{dialogp}} {{percent}}%</p>
					<el-row style='margin-top:1rem;'>
						<el-table :data='tableData2_new' @selection-change='handleSelectionChange2'>
							<el-table-column align='center' type='selection' width='55'></el-table-column>
							<el-table-column align='center' prop="background,status" label="缩略图">
								<template scope='scope'>
									<div class="suolue">
										<p v-if='scope.row.status == 1'>正在转码</p>
										<el-popover @show='show_popover(scope.row.video_url)' ref='popover5' placement='right' width='400' height='300' trigger='click'>
											<video height='300' :src="scope.row.video_url" autoplay controls="control">

											</video>
										</el-popover>
										<img v-popover:popover5 style='height:10rem;cursor:pointer;' :src="scope.row.background" alt="">
										<img v-popover:popover5 class='video_hover' src="~assets/img/player.png" alt="">
									</div>
								</template>
							</el-table-column>
							<el-table-column align='left' prop='disable,name,duration,upload,disable2' label="名称/时长/上传时间">
								<template scope='scope'>
									<div class="suolue" style='justify-content: space-between;'>
										<div class="items">
											<el-input :disabled='scope.row.disable' v-model='scope.row.name'></el-input>
											<p class='ntu'>{{scope.row.duration}}s</p>
											<p class='ntu'>{{scope.row.upload}}</p>
											<p class='ntu'>还剩{{scope.row.cha}}天</p>
										</div>
										<div class="items">
											<img style='cursor:pointer;' @click='edit2(scope.row)' src="~assets/img/edit.png" alt="">
											<!-- <el-button :disabled='scope.row.disable2' @click='edit2(scope.row)' type='primary'>编辑</el-button> -->
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column align='center' prop="source" label="来源"></el-table-column>
							<el-table-column align='center' label="操作" prop='setlive,disable2'>
								<template scope='scope'>
									<div class='btgroup'>
										<el-button :disabled='scope.row.disable2' @click='setlive(scope.row,0)' type='success' v-if='scope.row.setlive==1'>
											已设为视频直播
										</el-button>
										<el-button :disabled='scope.row.disable2' @click='setlive(scope.row,1)' type='primary' v-else-if='scope.row.setlive==0 || scope.row.setlive==2'>
											设为视频直播
										</el-button>
										<el-button :disabled='scope.row.disable2' @click='setlive(scope.row,0)' type='success' v-if='scope.row.setlive==2'>
											已设为预告/回放
										</el-button>
										<el-button :disabled='scope.row.disable2' @click='setlive(scope.row,2)' type='primary' v-else-if='scope.row.setlive==0 || scope.row.setlive==1'>
											设为预告/回放
										</el-button>
										<el-button :disabled='scope.row.disable2' type='primary'>
											分享
										</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-row style='margin-top:1rem;'>
							<div class="pagination">
								<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage5" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="total2">
								</el-pagination>
							</div>
						</el-row>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: 'video',
		data: function() {
			return {
				title_name: '',
				dialogVisible: false,
				// 总条数
				total: '',
				total2: '',
				// 当前每页显示的条数
				pagesize: 5,
				pagesize2: 5,
				// 分页当前页
				currentPage4: 1,
				currentPage5: 1,
				// 当前已选中视频的id数组 为了删除用
				chosenid: [],
				// 选中的暂存视频
				chosenid2: [],
				// 上传时的动态提示
				dialogp: '',
				// 上传时的动态百分比
				percent: '0',
				// 标签页显示的label
				// activeName: 'first',
				// 直播暂存表格的数据
				tableData: [],
				// 视频库表格的数据
				tableData2: [],
				item_url: ''
			}
		},
		computed: {
			activeName: function() {
				if(localStorage.getItem('fromconfig') == '1') {
					return 'second'
				} else {
					return 'first'
				}
			},
			// 如果数据改变 页面不动态改变 用这个方法 至于为什么 我也不知道
			tableData2_new: function() {
				var self = this;
				return(_.assign([], self.tableData2));
			},
			tableData_new: function() {
				var self = this;
				return(_.assign([], self.tableData));
			},
			// 标题 直播间和返回直播间显示与否 用于是否在直播间弹出框的选择
			showif: function() {
				console.log(this.$route);
				if(this.$route.fullPath.indexOf('studio') !== -1) {
					return false
				} else {
					return true
				}
			},
		},
		methods: {
			go_update: function() {
				this.$router.push('/update')
			},
			show_popover: function(url) {
				// this.open_video(url)
			},
			open_video: function(url) {
				// this.dialogVisible=true
				function callback() {
					var player = cyberplayer('video_content').setup({
						flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
						width: 359,
						height: 201,
						stretching: "uniform",
						file: url,
						autostart: true,
						repeat: false,
						volume: 90,
						controls: true,
						ak: '2f3e3d305f7d4e308d56f8d61577d723'
					})
				}
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.onreadystatechange = function() {
					if(this.readyState == 'complete')
						callback(self);
				}
				script.onload = function() {
					callback(self);
				}
				script.src = '/static/cyberplayer/cyberplayer.js';
				head.appendChild(script);
			},
			// 编辑视频库和暂存名称按钮事件
			edit2: function(item) {
				var self = this;
				item.disable = !item.disable;
				if(item.disable == true) {
					this.$http.put('/videos/' + item.id, {
						file_name: item.name
					}).then((response) => {
						console.log('success');
						this.$notify({
							title: '成功',
							message: '修改直播间名称成功',
							type: 'success'
						});
						console.log(response.body);
					}, (response) => {
						console.log('error');
						this.$notify.error({
							title: '错误',
							message: '修改直播间名称失败'
						});
						console.log(response.body);
					})
				}
			},
			// 选择项发生变化的函数
			handleSelectionChange: function(val) {
				console.log(val)
				this.chosenid2 = []
				for(var a = 0; a < val.length; a++) {
					this.chosenid2[a] = {
						id: val[a].id,
						url: val[a].video_url
					}
				}
			},
			download_here2: function() {
				if(this.chosenid2.length == 0) {
					this.$notify.info({
						title: '消息',
						message: '您还没有选择视频'
					});
				} else {
					for(var a = 0; a < this.chosenid2.length; a++) {
						var a_create = document.createElement('a')
						a_create.href = this.chosenid2[a].url
						a_create.setAttribute('download', 'video' + this.chosenid2[a].id)
						a_create.click()
					}
				}
			},
			download_here: function() {
				if(this.chosenid.length == 0) {
					this.$notify.info({
						title: '消息',
						message: '您还没有选择视频'
					});
				} else {
					for(var a = 0; a < this.chosenid.length; a++) {
						var a_create = document.createElement('a')
						a_create.href = this.chosenid[a].url
						a_create.setAttribute('download', 'video' + this.chosenid[a].id)
						a_create.click()
					}
				}
			},
			deletehere2: function() {
				if(this.chosenid2.length == 0) {
					this.$notify.info({
						title: '消息',
						message: '您还没有选择视频'
					});
				} else {
					console.log(this.chosenid2)
					// var formData=new FormData(this.chosenid)
					this.$http.post('/video/del-videos', {
						ids: this.chosenid2
					}).then((response) => {
						console.log('success');
						console.log(response.body);
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getvideolist2()
					}, (response) => {
						console.log('error');
						console.log(response.body);
					})
				}
			},
			// 从视频库中删除视频
			deletehere: function() {
				if(this.chosenid.length == 0) {
					this.$notify.info({
						title: '消息',
						message: '您还没有选择视频'
					});
				} else {
					console.log(this.chosenid)
					return
					// var formData=new FormData(this.chosenid)
					this.$http.post('/video/del-videos', {
						ids: this.chosenid
					}).then((response) => {
						console.log('success');
						console.log(response.body);
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getvideolist()
					}, (response) => {
						console.log('error');
						console.log(response.body);
					})
				}
			},
			handleSelectionChange2: function(val) {
				console.log(val)
				this.chosenid = []
				for(var a = 0; a < val.length; a++) {
					this.chosenid[a] = {
						id: val[a].id,
						url: val[a].video_url
					}
				}
				console.log(this.chosenid)
			},
			// 一页size改变
			handleSizeChange: function(val) {
				this.pagesize = parseInt(val)
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=' + this.currentPage4 + '&per-page=' + this.pagesize + '&room_id=' + this.$route.params.id + '&store_way=1').then((response) => {
					this.total = parseInt(response.body.data.pageInfo.totalCount)
					console.log(response.body.data.list);
					var videolists = response.body.data.list
					var mysource = ''
					this.tableData = []
					for(var a = 0; a < videolists.length; a++) {
						// 这里拿到上传时间 24小时制
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						// 这里拿到当前时间和上传时间的差
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(videolists[a].created_at, localtime)
						var videourl = ''
						for(var b = 0; b < videolists[a].play_set.length; b++) {
							if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
								videourl = videolists[a].play_set[b].url
							}
						}
						if(videourl == '') {
							videourl = videolists[a].play_set[0].url
						}
						if(videolists[a].play_set == null) {
							this.tableData[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								size: '未知',
								upload: videolists[a].created_at,
								disable: true,
								// 1是在转码 2是转码成功 3是再上传
								status: '无',
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								size: videolists[a].duration,
								upload: videolists[a].created_at,
								disable: true,
								//
								status: '无',
								id: videolists[a].id,
								cha: cha,
								video_url: videourl
							}
						}
					}
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			// 当前页改变
			handleCurrentChange: function(val) {
				this.currentPage4 = parseInt(val)
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=' + val + '&per-page=' + this.pagesize + '&room_id=' + this.$route.params.id + '&store_way=1').then((response) => {
					this.total = parseInt(response.body.data.pageInfo.totalCount)
					console.log(response.body.data.list);
					var videolists = response.body.data.list
					var mysource = ''
					this.tableData = []
					for(var a = 0; a < videolists.length; a++) {
						// 这里拿到上传时间 24小时制
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						// 这里拿到当前时间和上传时间的差
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(videolists[a].created_at, localtime)
						var videourl = ''
						for(var b = 0; b < videolists[a].play_set.length; b++) {
							if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
								videourl = videolists[a].play_set[b].url
							}
						}
						if(videourl == '') {
							videourl = videolists[a].play_set[0].url
						}
						if(videolists[a].play_set == null) {
							this.tableData[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								size: '未知',
								upload: videolists[a].created_at,
								disable: true,
								// 1是在转码 2是转码成功 3是再上传
								status: '无',
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								size: videolists[a].duration,
								upload: videolists[a].created_at,
								disable: true,
								//
								status: '无',
								id: videolists[a].id,
								cha: cha,
								video_url: videourl
							}
						}
					}
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			handleSizeChange2: function(val) {
				this.pagesize2 = parseInt(val)
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=' + this.currentPage5 + '&per-page=' + val + '&room_id=' + this.$route.params.id + '&store_way=2').then((response) => {
					console.log(response.body.data.list);
					this.total2 = parseInt(response.body.data.pageInfo.totalCount)

					var videolists = response.body.data.list
					var mysource = ''
					this.tableData2 = []
					for(var a = 0; a < videolists.length; a++) {
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(videolists[a].created_at, localtime)
						if(videolists[a].store_way == 1) {
							mysource = '直播暂存'
						} else {
							mysource = '视频上传'
						}
						var videourl = ''
						for(var b = 0; b < videolists[a].play_set.length; b++) {
							if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
								videourl = videolists[a].play_set[b].url
							}
						}
						if(videourl == '') {
							videourl = videolists[a].play_set[0].url
						}
						if(videolists[a].play_set == null) {
							this.tableData2[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								duration: '未知',
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: true,
								// 1是在转码 2是转码成功 3是再上传
								status: 1,
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData2[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								duration: videolists[a].duration,
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: false,
								//
								status: 2,
								id: videolists[a].id,
								playurl: videolists[a].play_set[0].url,
								cha: cha,
								video_url: videourl
							}
						}
					}

				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			handleCurrentChange2: function(val) {
				this.currentPage5 = parseInt(val)
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=' + this.currentPage5 + '&per-page=' + this.pagesize2 + '&room_id=' + this.$route.params.id + '&store_way=2').then((response) => {
					console.log(response.body.data.list);
					this.total2 = parseInt(response.body.data.pageInfo.totalCount)

					var videolists = response.body.data.list
					var mysource = ''
					this.tableData2 = []
					for(var a = 0; a < videolists.length; a++) {
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(videolists[a].created_at, localtime)
						if(videolists[a].store_way == 1) {
							mysource = '直播暂存'
						} else {
							mysource = '视频上传'
						}
						var videourl = ''
						for(var b = 0; b < videolists[a].play_set.length; b++) {
							if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
								videourl = videolists[a].play_set[b].url
							}
						}
						if(videourl == '') {
							videourl = videolists[a].play_set[0].url
						}
						if(videolists[a].play_set == null) {
							this.tableData2[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								duration: '未知',
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: true,
								// 1是在转码 2是转码成功 3是再上传
								status: 1,
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData2[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								duration: videolists[a].duration,
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: false,
								//
								status: 2,
								id: videolists[a].id,
								playurl: videolists[a].play_set[0].url,
								cha: cha,
								video_url: videourl
							}
						}
					}

				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			toupdate: function() {
				this.$router.push('/update')
			},
			backlive: function() {
				this.$router.push('/studio/' + this.$route.params.id)
				console.log(this.$route.params.id);
			},
			// 设置视频直播按钮
			setlive: function(row, index) {
				this.$http.post('/video/set-video-live', {
					video_id: row.id,
					room_id: this.$route.params.id,
					set_live_way: index,
					// video_play_url:row.playurl
				}).then((response) => {
					console.log('success');
					console.log(response.body);
					this.getvideolist()
					this.$confirm('设置成功', '提示', {
						confirmButtonText: '去直播间查看',
						cancelButtonText: '重新设置',
						type: 'success'
					}).then(() => {
						if(location.href.indexOf('studio')!==-1){
							this.$emit('close_dialog')
						}else{
							this.$router.push('/studio/' + this.$route.params.id)
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			// 设置回放按钮
			// sethui: function(index, status) {
			//     if (status == true) {
			//         this.tableData2[index].sethui = false
			//         console.log(this.tableData2)
			//     } else {
			//         var setlives = []
			//         for (var a = 0; a < this.tableData2.length; a++) {
			//             setlives[a] = this.tableData2[a].sethui
			//         }
			//         if (setlives.indexOf(true) !== -1) {
			//             this.$notify({
			//                 title: '警告',
			//                 message: '同时只能有一个视频设为预告/回放',
			//                 type: 'warning'
			//             });
			//         } else if (this.tableData2[index].setlive == true) {
			//             this.$notify({
			//                 title: '警告',
			//                 message: '一个视频不能同时设置为直播和预告回放',
			//                 type: 'warning'
			//             });
			//         } else {
			//             this.tableData2[index].sethui = true
			//         }
			//     }
			// },
			// 转入视频库
			tovideo: function(id) {
				this.$http.put('/videos/' + id, {
					store_way: 2
				}).then((response) => {
					console.log('success');
					console.log(response.body);
					this.$notify({
						title: '成功',
						message: '已成功转入视频库',
						type: 'success'
					});
					this.getvideolist2();
					this.getvideolist()
				}, (response) => {
					console.log('error');
					console.log(response.body);
					this.$notify.error({
						title: '错误',
						message: '转入失败'
					});
				})
			},
			gettime: function(t) {
				// 这里拿到上传时间 24小时制
				var timeStr = new Date(t * 1000).toLocaleString()
				var arr1 = timeStr.split(" ");
				var arr2 = arr1[0].split("/");
				for(var i = 1; i <= 2; i++) {
					if(parseInt(arr2[i], 10) < 10) {
						arr2[i] = "0" + arr2[i];
					}
				}
				var str1 = arr2.join("-");
				var arr3 = arr1[1].split(":");
				if(arr3[0].indexOf("上午") !== -1) {
					if(parseInt(arr3[0].replace(/上午/g, ""), 10) < 10) {
						arr3[0] = "0" + arr3[0].replace(/上午/g, "");
					} else {
						arr3[0] = arr3[0].replace(/上午/g, "");
					}
				}
				if(arr3[0].indexOf("下午") !== -1) {
					if(arr3[0] == '下午12') {
						arr3[0] = (parseInt(arr3[0].replace(/下午/g, ""), 10)).toString();
					} else {
						arr3[0] = (12 + parseInt(arr3[0].replace(/下午/g, ""), 10)).toString();
					}
				}
				var str2 = arr3.join(":");
				return str1 + " " + str2;
			},
			// 拿到时间段的差
			getcha: function(end, start) {
				var end_str = end.replace(/-/g, "/"); //一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。
				var end_date = new Date(end_str); //将字符串转化为时间
				//开始时间
				var sta_str = start.replace(/-/g, "/");
				var sta_date = new Date(sta_str);
				var num = (end_date - sta_date) / (1000 * 3600 * 24); //求出两个时间的时间差，这个是天数
				var days = parseInt(Math.ceil(num)); //转化为整天（小于零的话剧不用转了）
				return days
			},
			// 拿到暂存视频
			getvideolist2: function() {
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=1&per-page=5&room_id=' + this.$route.params.id + '&store_way=1').then((response) => {
					this.total = parseInt(response.body.data.pageInfo.totalCount)
					console.log(response.body.data.list);
					var videolists = response.body.data.list
					var mysource = ''
					this.tableData = []
					for(var a = 0; a < videolists.length; a++) {
						// 这里拿到上传时间 24小时制
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						// 这里拿到当前时间和上传时间的差
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(localtime, videolists[a].created_at)
						var videourl = ''
						for(var b = 0; b < videolists[a].play_set.length; b++) {
							if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
								videourl = videolists[a].play_set[b].url
							}
						}
						if(videourl == '') {
							videourl = videolists[a].play_set[0].url
						}
						if(videolists[a].play_set == null) {
							this.tableData[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								size: '未知',
								upload: videolists[a].created_at,
								disable: true,
								// 1是在转码 2是转码成功 3是再上传
								status: '无',
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								size: videolists[a].duration,
								upload: videolists[a].created_at,
								disable: true,
								//
								status: '无',
								id: videolists[a].id,
								cha: cha,
								video_url: videourl
							}
						}
					}

				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			// 拿到视频库列表
			getvideolist: function() {
				this.$http.get('/videos?access-token=' + localStorage.getItem('accessToken') + '&page=1&per-page=5&room_id=' + this.$route.params.id + '&store_way=2').then((response) => {
					this.total2 = parseInt(response.body.data.pageInfo.totalCount)
					console.log(response.body.data.list);
					var videolists = response.body.data.list
					var mysource = ''
					this.tableData2 = []
					for(var a = 0; a < videolists.length; a++) {
						videolists[a].created_at = this.gettime(videolists[a].created_at)
						var localtime = Math.round(new Date().getTime() / 1000)
						localtime = this.gettime(localtime)
						var cha = 15 - this.getcha(localtime, videolists[a].created_at)
						if(videolists[a].store_way == 1) {
							mysource = '直播暂存'
						} else {
							mysource = '视频上传'
						}
						var videourl = ''
						if(videolists[a].play_set !== null) {
							for(var b = 0; b < videolists[a].play_set.length; b++) {
								if(videolists[a].play_set[b].url.indexOf('mp4') !== -1) {
									videourl = videolists[a].play_set[b].url
								}
							}
							if(videourl == '') {
								videourl = videolists[a].play_set[0].url
							}
						}
						if(videolists[a].play_set == null) {
							this.tableData2[a] = {
								background: 'http://pic1.ooopic.cn/uploadfilepic/ziku/2008-08-12/OOOPIC_vipvip4_200808121222168b83104fc4bfa31c143.jpg',
								name: '无',
								duration: '未知',
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: true,
								// 1是在转码 2是转码成功 3是再上传
								status: 1,
								id: videolists[a].id,
								cha: cha
							}
						} else {
							this.tableData2[a] = {
								background: videolists[a].cover_url,
								name: videolists[a].file_name,
								duration: videolists[a].duration,
								upload: videolists[a].created_at,
								source: mysource,
								disable: true,
								setlive: videolists[a].set_live_way,
								// sethui:false,
								disable2: false,
								//
								status: 2,
								id: videolists[a].id,
								playurl: videolists[a].play_set[0].url,
								cha: cha,
								video_url: videourl
							}
						}
					}

				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
			// 拿到直播间标题
			get_live_title: function() {
				this.$http.get('/deals/room/' + this.$route.params.id).then((response) => {
					console.log('success');
					console.log(response.body);
					this.title_name = response.body.data.title
				}, (response) => {
					console.log('error');
					console.log(response.body);
				})
			},
		},
		mounted() {
			this.get_live_title()
			this.getvideolist();
			this.getvideolist2()
			// 上传视频
			var ErrorCode = qcVideo.get('ErrorCode');
			var that = this
			ErrorCode.UN_SUPPORT_BROWSE !== qcVideo.uploader.initUGC({
					upBtnId: 'upBtnId', //上传按钮ID（任意页面元素ID）
					/*
					    @desc 从服务端获取签名的函数。该函数包含两个参数：
					    argObj: 待上传文件的信息，关键信息包括：
					        f: 视频文件名(可从getSignature的argObj中获取)，
					        ft: 视频文件的类型(可从getSignature的argObj中获取)，
					        fs: 视频文件的sha1值(必须从getSignature的argObj中获取)
					    callback：客户端从自己的服务端得到签名之后，调用该函数将签名传递给SDK
					*/
					getSignature: function(argObj, callback) {
						// 调用APP后台服务器，返回签名

						var sigUrl = 'http://saas.icloudinn.com/api/v1/deal/ugcsign?' + 'f=' + encodeURIComponent(argObj.f) + '&ft=' + encodeURIComponent(argObj.ft) + '&fs=' + encodeURIComponent(argObj.fs);
						$.get(sigUrl).done(function(ret) {
							console.log("签名：", ret);
							callback(ret.data.signature);
						})
					},
					after_sha_start_upload: true, //上传分为两个阶段，sha计算和文件网络传输；这个选项设置是否在sha计算完成后，立即进行网络传输上传 (默认非立即上传)
					sha1js_path: 'http://icloudinn.live/calculator_worker_sha1.js' //计算sha1的位置  ，默认为 'http://你的域名/calculator_worker_sha1.js'
				}
				//2: 回调函数
				, {
					/**
					 * 更新文件状态和进度
					 * @param args { id: 文件ID, size: 文件大小, name: 文件名称, status: 状态, percent: 进度,speed: 速度, errorCode: 错误码 }
					 */
					onFileUpdate: function(args) {
						console.log("更新文件状态和进度", args);
						if(args.code_name == '等待上传') {
							// that.dialogVisible = true
							that.dialogp = '等待上传'
						} else if(args.code_name == '即将上传') {
							that.dialogp = '即将上传'
						} else if(args.code_name == '上传进度更新') {
							that.dialogp = '上传进度更新'
							that.percent = parseFloat(args.percent)
						} else if(args.code_name == '上传完成') {
							that.$http.post('/videos', {
								room_id: that.$route.params.id,
								file_id: args.serverFileId
							}).then((response) => {
								console.log('success');
								console.log(response.body);
								that.dialogp = '上传成功'
								that.getvideolist()
							}, (response) => {
								console.log('error');
								console.log(response.body);
								that.dialogp = '上传失败'
							})
						}
					},
					/**
					 * 文件状态发生变化
					 * @param info  { done: 完成数量 , fail: 失败数量 , sha: 计算SHA或者等待计算SHA中的数量 , wait: 等待上传数量 , uploading: 上传中的数量 }
					 */
					onFileStatus: function(info) {
						console.log('各状态总数', info);
					},
					/**
					 *  上传时错误文件过滤提示
					 * @param args {code:{-1: 文件类型异常,-2: 文件名异常} , message: 错误原因 ， solution: 解决方法 }
					 */
					onFilterError: function(args) {
						console.log('上传错误');
						console.log('message:' + args.message + (args.solution ? (';solution==' + args.solution) : ''));
					}
				}
			);
		}
	}
</script>

<style lang="less">
	.videocontainer .firstline {
		background: white;
		padding: 1rem;
		display: flex;
		align-items: center;
		.livename {
			color: #21a0ff;
		}
		.toupdate {
			cursor: pointer;
		}
		.backlive {
			cursor: pointer;
		}
	}
	
	.el-tabs__item.is-active {
		background: #20a0ff;
		color: white;
	}
	
	.hover_button:hover {
		background: #20a0ff;
		color: white;
	}
	
	.el-popover {
		text-align: center;
	}
	
	.el-tabs__header {
		padding-bottom: 1px;
	}
	
	.el-tabs__item {
		background: #f2f2f2;
		color: black;
	}
	
	.el-table__fixed-header-wrapper thead div,
	.el-table__header-wrapper thead div {
		background-color: white;
	}
	
	.el-table th {
		background-color: white;
	}
	
	.ntu {
		font-size: 12px;
		color: #888888;
		margin-top: 1rem;
	}
	
	.suolue {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 1rem;
		padding-bottom: 1rem;
		flex-wrap: wrap;
		p {
			flex-basis: 100%;
		}
	}
	
	.btgroup {
		display: flex;
		flex-wrap: wrap;
		width: 50%;
		margin: 0 auto;
	}
	
	.el-button--success {
		background-color: #21a0ff;
		border-color: #21a0ff;
	}
	
	.video_hover {
		position: absolute;
		cursor: pointer;
	}
	
	.btgroup .el-button--primary {
		background-color: #f2f2f2;
		border-color: #f2f2f2;
		color: #21a0ff;
	}
	
	.el-button--success:focus,
	.el-button--success:hover {
		color: white;
		border-color: #20a0ff;
		background: #20a0ff;
	}
	
	.btgroup button {
		flex-basis: 100%;
		margin-top: 0.1rem;
	}
	
	.el-button+.el-button {
		margin-left: 0;
	}
	
	.pagination {
		text-align: right;
	}
	
	.kufirstline {
		display: flex;
	}
	
	.btgroup button:hover {
		background: #21a0ff;
		color: white;
	}
	
	.go_update:hover {
		text-decoration: underline;
	}
</style>