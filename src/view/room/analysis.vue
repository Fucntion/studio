<template>
	<el-row class='analy_container'>
		<el-col :span='24' style='display: flex;'>
			<div class='navcontainer' style='flex-basis: 15%;'>
				<el-row style='width: 100%;'>
					<el-col :span='24'>
						<div style='background:#20a0ff;cursor:pointer;display: flex;justify-content: space-around;padding-top: 20px;padding-bottom: 20px;'>
							<img style='width:20px;height:20px;' src="~assets/img/data.png" alt="">
							<p style='font-size:16px;color:white;'>直播数据</p>
							<img src="~assets/img/youyou.png" alt="">
						</div>
					</el-col>
				</el-row>
				<el-row style='width: 100%;'>
					<el-col :span='24'>
						<el-popover placement='right' width='150' trigger='hover' content='功能即将上线'>
							<div slot='reference' style='cursor:not-allowed;display: flex;justify-content: space-around;padding-top: 20px;padding-bottom: 20px;'>
								<img style='width:20px;height:20px;' src="~assets/img/sale.png" alt="">
								<p style='font-size:16px;color:#666666;'>商品销售</p>
								<img src="~assets/img/you.png" alt="">
							</div>
						</el-popover>
					</el-col>
				</el-row>
				<el-row style='width: 100%;'>
					<el-col :span='24'>
						<el-popover placement='right' width='150' trigger='hover' content='功能即将上线'>
							<div slot='reference' style='cursor:not-allowed;display: flex;justify-content: space-around;padding-top: 20px;padding-bottom: 20px;'>
								<img style='width:20px;height:20px;' src="~assets/img/form.png" alt="">
								<p style='font-size:16px;color:#666666;'>表单数据</p>
								<img src="~assets/img/you.png" alt="">
							</div>
						</el-popover>
					</el-col>
				</el-row>
				<el-row style='width: 100%;'>
					<el-col :span='24'>
						<el-popover placement='right' width='150' trigger='hover' content='功能即将上线'>
							<div slot='reference' style='cursor:not-allowed;display: flex;justify-content: space-around;padding-top: 20px;padding-bottom: 20px;'>
								<img style='width:20px;height:20px;' src="~assets/img/question.png" alt="">
								<p style='font-size:16px;color:#666666;'>问卷调查</p>
								<img src="~assets/img/you.png" alt="">
							</div>
						</el-popover>
					</el-col>
				</el-row>
				<el-row style='width: 100%;'>
					<el-col :span='24'>
						<el-popover placement='right' width='150' trigger='hover' content='功能即将上线'>
							<div slot='reference' style='cursor:not-allowed;display: flex;justify-content: space-around;padding-top: 20px;padding-bottom: 20px;'>
								<img style='width:20px;height:20px;' src="~assets/img/fenxi.png" alt="">
								<p style='font-size:16px;color:#666666;'>收益分析</p>
								<img src="~assets/img/you.png" alt="">
							</div>
						</el-popover>
					</el-col>
				</el-row>
			</div>
			<div style='flex-basis: 85%;background: white;'>
				<div id="main">
					<div :is='analysisTemplate'></div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import Echarts from 'echarts'
	import livePeople from '../../components/analysisTemplate/livepeople.vue'
	import store from 'store'

	export default {
		name: 'analysis',
		store,
		data() {
			return {
				analysisTemplate: 'livePeople',
				dataselected: true
			}
		},
		components: {
			livePeople
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		create() {

		}
	}
</script>

<style lang="less">
	.analy_container{
		display: flex;
    justify-content: center;
    margin-left: 10%;
    margin-right: 10%;
    border: 1px solid #dadcdf;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
	}
	.navcontainer {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		background: #e4e7ec;
		.el-button {
			flex-basis: 100%;
			margin-left: 0;
			margin-top: 1.5rem;
			text-align: left;
			i {
				margin-right: 0.5rem;
			}
		}
	}
	
	.iselected {
		color: white;
		background: #4db3ff;
	}
</style>