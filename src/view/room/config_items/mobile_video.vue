<template>
	<div class="mobile">
		<div style='justify-content:center;' class="header">直播间名称</div>
		<div class="wrap">
			<div id="id_video_container"></div>
			<template v-if="studio.pluginObj.advert.length>0">
				<div class="mobile_advert mobile_content" @click="checkDialog('advertEdit','设置广告栏','advertModal')">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(value,index) in studio.pluginObj.advert" :style="{backgroundImage: 'url(' + value.pic + ')'}"></swiper-slide>
					</swiper>
				</div>
			</template>
			<div class="mobile_menu mobile_content" @click="checkDialog('menuEdit','自定义菜单','menuModal')">
				<div class="menu_item" :data-id="1">观众点评</div>
				<template v-if="studio.pluginObj.menu.length>0">
					<div v-for="(item,index) in studio.pluginObj.menu" class="menu_item" :data-id="item.title">{{item.title}}</div>
				</template>
				<div v-if='plusif' style='font-size:2rem;' class="menu_item">+</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from 'store'
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'
	export default {
		store,
		data: function() {
			return {
				studio: null,
				swiperOption: {
					name: 'currentSwiper',
					notNextTick: true,
					autoplay: 3000
				},
//				live_address:{
//					address1:'',
//					address2:''
//				}
			}
		},
		components: {
			swiper,
			swiperSlide,
		},
		computed: {
			live_address:function(){
				return store.getters.getAddress1
			},
			live_address2:function(){
				return store.getters.getAddress2
			},
			value_object:function(){
				return store.getters.getValueObject
			},
			plusif: function() {
				console.log('here')
				console.log(this.studio.pluginObj.menu.length)
				if(this.studio.pluginObj.menu.length > 3 || this.studio.pluginObj.menu.length == 3) {
					console.log('here1')

					return false
				} else {
					console.log('here2')

					return true
				}
			},
		},
		watch:{
			live_address(newvalue,oldvalue){
				console.log('watch success')
				this.loadPlayer()
			},
			live_address2(newvalue,oldvalue){
				console.log('watch success')
				this.loadPlayer()
			},
			value_object(newvalue,oldvalue){
				console.log('watch success')
				this.loadPlayer()
			}
		},
		methods: {
			loadPlayer: function() {
				var self = this
				var address1=store.getters.getAddress1
				var address2=store.getters.getAddress2
				var valueObject=store.getters.getValueObject
				function callback(self) {
					// 正在直播
					if(self.studio.status == '1') {
						var player = cyberplayer("id_video_container").setup({
							flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
							width: 359,
							height: 201,
							stretching: "uniform",
							file: self.studio.flv_downstream_address,
							autostart: true,
							repeat: false,
							volume: 90,
							controls: 'none',
							ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
						});
					} else {
						// 没有直播
						if(address1 == '' && address2 == '') {
							var player = cyberplayer("id_video_container").setup({
								flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
								width: 359,
								height: 201,
								stretching: "uniform",
								file: self.studio.flv_downstream_address,
								autostart: true,
								repeat: false,
								volume: 90,
								controls: 'none',
								ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
							});
						} else {
							if(valueObject.yugao_value == true && address1 !== '') {
								var player = cyberplayer("id_video_container").setup({
									flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
									width: 359,
									height: 201,
									stretching: "uniform",
									file: address1,
									autostart: true,
									repeat: true,
									volume: 90,
									controls: 'none',
									ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
								});
							} else if(valueObject.video_value == true && address2 !== '') {

								if(valueObject.repeat_value == true) {
									var player = cyberplayer("id_video_container").setup({
										flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
										width: 359,
										height: 201,
										stretching: "uniform",
										file: address2,
										autostart: true,
										repeat: true,
										volume: 90,
										controls: 'none',
										ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
									});
								} else {
									var player = cyberplayer("id_video_container").setup({
										flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
										width: 359,
										height: 201,
										stretching: "uniform",
										file: address2,
										autostart: true,
										repeat: false,
										volume: 90,
										controls: 'none',
										ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
									});
								}
							} else {
								var player = cyberplayer("id_video_container").setup({
									flashplayer: "http://www.easydarwin.org/cyberplayer.flash.swf",
									width: 359,
									height: 201,
									stretching: "uniform",
									file: self.studio.flv_downstream_address,
									autostart: true,
									repeat: false,
									volume: 90,
									controls: 'none',
									ak: '2f3e3d305f7d4e308d56f8d61577d723' // 公有云平台注册即可获得accessKey
								});
							}
						}
					}
				}
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');
				script.type = 'text/javascript';
//				script.onreadystatechange = function() {
//					if(this.readyState == 'complete'){
//					alert('ready')
//						callback(self);
//				}
				script.onload = function() {
					callback(self);
				}
				script.src = '../static/cyberplayer/cyberplayer.js';
				head.appendChild(script);
			},
			checkDialog: function(components, title, callback) {
				// type用来区分不同的用途，用来设置不同的回调
				var obj = {};
				obj.components = components;
				obj.title = title;
				obj.callback = callback;
				store.commit("openModal", obj);
			},
		},
		created() {
			this.studio = store.getters.getStudio;
		},
		mounted() {
			this.loadPlayer()
		}
	}
</script>

<style>

</style>