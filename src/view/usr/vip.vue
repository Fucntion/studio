<template>
<el-table
      :data="vipData"  border
      style="width: 80%;margin:0 10%;">
      <el-table-column
        prop="name"
        align="center"
        label="功能名称">
      </el-table-column>
      <el-table-column
        prop="default"
        align="center"
        label="普通用户">
      </el-table-column>
      <el-table-column
        prop="prefer"
        align="center"
        label="高级用户">
      </el-table-column>
      <el-table-column
        prop="vip"
        align="center"
        label="Vip用户">
      </el-table-column>
    </el-table>
</template>

<script>
	export default {
		data: function() {

			return {
				vipData:[
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},
				{
					name:'互动聊天',
					default:'√',
					prefer:'√',
					vip:'√',
				},

				]
			}
		},
		methods: {

		},
		components: {

		}
	}
</script>

<style lang="less">

</style>