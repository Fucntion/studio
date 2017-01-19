<template>
	<div class="taocan_box">
		<h3>直播时长套餐</h3>
		<p>购买直播时长（分钟），用户观看直播消耗时长。例如某直播间有一千用户在线观看一小时，则消耗的分钟数为1000*1*60=60000</p>
		<div class="hr"></div>
		<template v-for="(item,index) in taocanList">
			<div  class="taocan_item">
			<div class="desc">时长<br/>2000分钟 <img class="jiaobiao" src="~assets/img/jiaobiao.png" /></div>
			<div class="info">
				<p class="price_new">￥{{item.price}}<span>每分钟仅需</span></p>
				<div class="hr"></div>
				<p class="price_old">原价 ￥{{item.original_price}}<br/>平均每分钟</p>
				<el-button type="primary" class="buy" >立即购买</el-button>
			</div>
		</div>
		</template>
		


	</div>
</template>

<script>
	export default {
		data: function () {

			return {
				taocanList:[]
			}
		},
		methods: {
			init:function(){
				this.$http.get('/valuepackages').then((response)=>{
					this.taocanList = response.body.data.list

				},(response)=>{

				})
			}
		},
		components: {

		},
		mounted(){
			this.init()
		}
	}
</script>

<style lang="less">
.taocan_box{
	border-width: 1px;
	border-color: rgb(192, 192, 192);
	border-style: solid;
	border-radius: 4px;
	margin:10px;
	padding: 10px;
	overflow: hidden;
	h3{
		color:#222222;
		margin:5px 0 10px;
	}
	p{
		color:#888888;
		font-size: 14px;
	}
	.hr{
		margin-bottom: 15px;
	}
	.taocan_item{
		float: left;
		margin:10px 10px 0 0;
		width: 200px;
		border-width: 1px;
		border-color: rgb(192, 192, 192);
		border-style: solid;
		border-radius: 4px;
		.desc{

			color: white;
			position: relative;
			background:#20a0ff;
			background-repeat:no-repeat;
			padding:25px;
			background-image:url('~assets/img/icon_taocan.png');
			background-position:130px center;
			.jiaobiao{
				position:absolute;
				left:0;
				top: 0;

			}
		}
		.info{
			text-align: center;
			padding: 10px;
			.price_new{
				color: #e23c3e;
				text-align:center;
				font-size:18px;
				span{
					color: #555555;
					font-size: 14px;
					margin-left:10px;
				}
			}
			.price_old{
				font-size: 14px;
				text-align:center;
				color: #555555;
				/*text-decoration:line-through;*/
				
			}
			.buy{
				margin-top:15px;
				width:80%;
			}
		}
	}
}
</style>