<template>
	<el-row>
		<el-col :span="4">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-menu-item index="1"><i class="el-icon-menu"></i>直播人数</el-menu-item>
				<el-menu-item index="2"><i class="el-icon-setting"></i>商品销售</el-menu-item>
				<el-menu-item index="3"><i class="el-icon-setting"></i>表单数据</el-menu-item>
				<el-menu-item index="4"><i class="el-icon-setting"></i>问卷调查</el-menu-item>
				<el-menu-item index="5"><i class="el-icon-setting"></i>收益分析</el-menu-item>
			</el-menu>
		</el-col>
		<el-col :span="20">
			<div id="main" :style="{width:'600px',height:'400px'}"></div>
		</el-col>
	</el-row>
</template>

<script>

import Echarts from 'echarts'

export default {
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	},
	mounted(){
    	// 基于准备好的dom，初始化echarts实例
    	var myChart = Echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			title: { text: '商品销售' },
			series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
                {value:400, name:'搜索引擎'},
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'}
            ]
        }
    ]
		});
	}
}
</script>