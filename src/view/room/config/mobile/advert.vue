<style>
@import './swiper.css';
	.swiper-container {
		width: 100%;
		height: 100px
	}
	
	.swiper-slide {
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		text-align: center;
		font-size: 38px;
		font-weight: 700;
		background: #eee;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background-size: cover;
	}
</style>

<template>
	<div id="advert">
		<swiper :options="swiperOption">

			<swiper-slide :style="{backgroundImage: 'url(' + testUrl + ')'}"></swiper-slide>
			<swiper-slide :style="{backgroundImage: 'url(' + testUrl + ')'}"></swiper-slide>
			<swiper-slide :style="{backgroundImage: 'url(' + testUrl + ')'}"></swiper-slide>
			<swiper-slide :style="{backgroundImage: 'url(' + testUrl + ')'}"></swiper-slide>
		</swiper>
	</div>
</template>

<script>
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'

	export default {

		data: function() {
			return {
				swiperOption: {
					// 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
					name: 'currentSwiper',
					// // 所有配置均为可选（同Swiper配置）
					autoplay: 3000
				},
				testUrl: "http://pic93.nipic.com/file/20160330/22800842_095503208960_2.jpg"
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		mounted() {
			// you can use current swiper object to do something(swiper methods)
			// console.log('this is current swiper object', this.swiper)
			// this.swiper.slideTo(3, 1000, false)
		}
	}
</script>