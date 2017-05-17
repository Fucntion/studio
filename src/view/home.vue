<template>
	<div class="main">

		<div class="descript">
			<el-row>
				<el-col style='text-align: right;'>
					<h3 style='font-size: 18px;color:#888888;'>客服电话:159xxxxxxxx</h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<h2>使用教程</h2>
				</el-col>
			</el-row>
			<el-row style='margin-top: 2rem;'>
				<el-col class='tur_div' :span='6'>
					<div class='tur_item'>
						<img src="~assets/img/index1.png"/>
					</div>
					<h3 class='stepby'>步骤1:</h3>
					<h3>创建直播间</h3>
					<p class='step_p'>选择推流直播或</p>
					<p>视频直播</p>
				</el-col>
				<el-col class='tur_div' :span='6'>
					<div class='tur_item'>
						<img src="~assets/img/index2.png"/>
					</div>
					<h3 class='stepby'>步骤2:</h3>
					<h3>设置直播观看页</h3>
					<p class='step_p'>企业封面,授权观看,自定义</p>
					<p>菜单-嘉宾介绍、课程内容等</p>
				</el-col>
				<el-col class='tur_div' :span='6'>
					<div class='tur_item'>
						<img src="~assets/img/index3.png"/>
					</div>
					<h3 class='stepby'>步骤3:</h3>
					<h3>发起直播</h3>
					<p class='step_p'>视频直播：选择直播视频发起</p>
					<p>推流直播：下载直播推流工具</p>
				</el-col>
				<el-col class='tur_div' :span='6'>
					<div class='tur_item'>
						<img src="~assets/img/index4.png"/>
					</div>
					<h3 class='stepby'>步骤4:</h3>
					<h3>观看直播</h3>
					<p class='step_p'>复制链接或分享二维码</p>
					<p>到微信就可观看</p>
				</el-col>
			</el-row>
			<!--<div class="crumb-box">
				<h3 class="crumb">信息概览</h3>
				<div class="hr"></div>
			</div>

			<div class="info-box">
				<div class="info">
					<h1 class="number">66</h1>
					<div class="title"><img src="~assets/img/total.png">直播场数</div>
				</div>
				<div class="info">
					<h1 class="number">666</h1>
					<div class="title"><img src="~assets/img/number.png">观看人数</div>
				</div>
				<div class="info">
					<h1 class="number">￥66666.0</h1>
					<div class="title"><img src="~assets/img/money.png">直播收益</div>
				</div>
			</div>-->
		</div>

		<!--<el-row class="new">
			<el-col :span="12" class="list list_l">
				<div class="crumb-box">
					<h3 class="crumb">直播间列表</h3>
					<div class="hr"></div>
				</div>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
				<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="11" class="list list_r">
				<div class="crumb-box">
					<h3 class="crumb">直播百科</h3>
					<div class="hr"></div>
				</div>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
				<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>

			</el-col>
		</el-row>-->
	</div>
</template>

<script>
	//	import direct from '../directive.js'
	export default {
		name: 'home',
		data: function() {

			return {

			}
		},
		methods: {

		},
		directives: {

		},
		components: {

		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.tur_item {
		width: 10rem;
    height: 10rem;
    background: #dadada;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
	}
	.tur_div{
		text-align: center;
	}
	.stepby{
		margin-top: 1rem;
		color: #21a0ff;
		font-size: 18px;
	}
	.step_p{
		margin-top: 1rem;
	}
</style>