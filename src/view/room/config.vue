<template>
	<el-row class="config" :gutter="30">
	<el-col :span="1">&nbsp;</el-col>
		<el-col :span="6">
			<!-- 组件 -->
			<mobile-plugin :showStatus="showStatus"><mobile-plugin>
		</el-col>
		<el-col :span="10">
			<!-- 模拟器 -->
			<div class="mobileBox">
				<video-player v-if="showStatus.player" id="player" :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
				<mobile-advert v-if="showStatus.advert"></mobile-advert>
				<mobile-menu v-if="showStatus.menu"></mobile-menu>
			</div>
		</el-col>

		<el-col :span="6">
			<!-- 公共设置 -->
			<div class="commonBox">
			<div>
				<button @click="goto('origin')">直播源设置</button>
				<button @click="goto('feature')">风格设置</button>
				<button @click="goto('allow')">授权观看</button>
				<div class="hr"></div>
				<div :is="currentView"></div>
			</div>
		</el-col>
		<el-col :span="1">&nbsp;</el-col>
<!-- Table -->
		<el-button type="text" @click="checkDialog('pictureBox','图片库')">打开嵌套表格的 Dialog</el-button>
		<el-button type="text" @click="checkDialog('goodsBox','商品列表')">商品box</el-button>
		<el-dialog size="large" :title="dialog.title" v-model="dialog.visible">
		  <div :is="dialog.current"></div>
		</el-dialog>

		
	</el-row>
</template>

<script>

import mobileMenu from "../../components/room/menu.vue"
import mobilePlugin from "../../components/room/plugin.vue"
import mobileAdvert from "../../components/room/advert.vue"
import pictureBox from "../../components/common/pictureBox.vue"
import videoBox from "../../components/common/videoBox.vue"
import goodsBox from "../../components/common/goodsBox.vue"

import origin from "./common/origin.vue"
import feature from "./common/feature.vue"
import allow from "./common/allow.vue"

import store from '../../vuex/store';

export default {
	data: function() {

		return {
			currentView: 'origin',
			showStatus: {
				'player': true,
				'advert': false,
				'menu': true
			},
			videoOptions: {
				"source": {
					"type": "application/x-mpegURL",
					"src": "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
					"withCredentials": false
				},
				"poster": "http://live.icloudinn.com/img3/logo.png",
				"live": true,
				"autoplay": false,
				"height": 414 * 2 / 3,
				"language": 'zh-cn'
			},
			 dialog:{
			 	visible:false,
			 	title:'dialog',
			 	current:'pictureBox'
			 } 

		}
	},
	components: {
		mobilePlugin,
		mobileMenu,
		mobileAdvert,
		pictureBox,
		goodsBox,
		videoBox,
		'origin': origin,
		'feature': feature,
		'allow': allow
	},
	methods: {
		playerStateChanged(playerCurrentState) {
			// console.log(playerCurrentState);
			// console.log(this.$data);
		},
		playerAction(action) {
			this.$emit('playerAction', action)
		},
		goto: function(text) {
			this.currentView = text;
		},
		checkDialog:function(components,title){
			if(!components && !title) {console.log('参数有误无法弹出dialog');return}
			this.dialog.visible = !this.dialog.visible;
			this.dialog.title =title;
			this.dialog.current = components;
		}
	},
	mounted() {
		

	}
}
</script>

<style src="video.js/dist/video-js.css"></style>
<style>
	#studio-config {
		display: flex;
	}
	
	.mobile {
		width: 414px;
		height: 736px;
		margin: 0 100px;
	}
	
	#player {
		width: 414px;
	}
	/*.video-js{
  min-height: 100px;
  height: 200px;
}*/
</style>