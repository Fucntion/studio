<template>
	<div>
		<top></top>
		<left v-on:changeCrumb="changeCrumb"></left>
		<div id="main">
			<div class="crumb-box">
				<h3 class="crumb">{{crumb}}</h3>
				<div class="hr"></div>
			</div>

			<router-view></router-view>
			<!-- -->
		</div>

	</div>
	<!--    
    <div>
        <top></top>
        <left></left>
        <div id="main" class="main_home">

            <div class="hot"><i class="horn"></i><a href="#">新功能上线啦~</a><i class="close"><i></div>

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

            <div class="new">
                <div class="list list_l">
                    <div class="crumb-box"><h3 class="crumb">直播间列表</h3><div class="hr"></div></div>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                    <a href="#">猫咪老师的直播<span class="inputtime">2016-10-05</span></a>
                </div>
                <div class="list list_r">
                    <div class="crumb-box"><h3 class="crumb">直播百科</h3><div class="hr"></div></div>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                    <a href="#">最严网络直播新规今起实施 快手邀媒体入驻自律委员会</a>
                   
                </div>
            </div>

        </div>

    </div> -->
</template>

<script>
	//公共布局组件
	import Top from '../components/header.vue'
	import Left from '../components/left.vue'

	export default {
		data: function() {

			return {

			}
		},
		methods: {

		},
		components: {
			Top,
			Left,

		},
		mounted() {

		}
	}
</script>
<style lang="less">
	#main.main_home {
		background: #f2f2f2;
		.crumb-box {
			padding: 0;
		}
	}
</style>