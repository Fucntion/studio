<template>
	<div class="main">
		
		<div class="hot"><i class="horn"></i>
			<a href="#">新功能上线啦~</a><i class="close"><i></div>

		<div class="descript">
			<div class="crumb-box"><h3 class="crumb">信息概览</h3><div class="hr"></div>
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
		</div>
	</div>

	<el-row class="new">
		<el-col :span="12" class="list list_l">
			<div class="crumb-box"><h3 class="crumb">直播间列表</h3><div class="hr"></div></div>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
			<a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
		</el-col>
		<el-col :span="1">&nbsp;</el-col>
		<el-col :span="11" class="list list_r">
			<div class="crumb-box"><h3 class="crumb">直播百科</h3><div class="hr"></div></div>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			<a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
			
		</el-col>
	</el-row>
</div>
</template>

<script>

	export default {
		name:'home',
		data: function() {
			
			return {

			}
		},
		methods: {

		},
		components:{


		}
	}

</script>

<style lang="less">
	
</style>