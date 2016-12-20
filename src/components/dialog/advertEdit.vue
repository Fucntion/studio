<template>
	
	<div>
		    <!--@current-change="handleCurrentChange"-->
		<el-table
	class="advert_table"
    :data="tableData"
    highlight-current-row

    style="width: 100%">
  	<el-table-column
    	property="index"
		label="#"
		width="30"
      >
    </el-table-column>
    <el-table-column
    inline-template
      label="缩略图"
      width="130"
      >
      <div><img width="100px" src="~assets/img/logo.png"/></div>
    </el-table-column>
   
    <el-table-column
      property="link"
      label="链接地址"
      width="200">
    </el-table-column>
    <el-table-column
      :context="_self"
      inline-template
      label="操作">
      <template>
      	<i @click="handleUp(row)" class="advert_icon el-icon-arrow-up"></i>
      	<i @click="handleDown(row)" class="advert_icon el-icon-arrow-down"></i>
      	<i @click="handleDel(row)" class="advert_icon el-icon-delete"></i>
      </template>

    </el-table-column>
  </el-table>
  <div class="hr"></div>
	<div class="advert_add">
		
<el-button type="primary">主要按钮</el-button>
	</div>
	</div>
</template>

<script>
	import store from '../../vuex/store';
	export default {
    data() {
      return {
        tableData: [{
        	index:1,
          pic: '王小虎',
          link: 'http://baidu.com'
        },{
        	index:2,
          pic: '王小虎',
          link: 'http://baidu.com'
        },{
        	index:3,
          pic: '王小虎',
          link: 'http://baidu.com'
        },{
        	index:4,
          pic: '王小虎',
          link: 'http://baidu.com'
        },{
        	index:5,
          pic: '王小虎',
          link: 'http://baidu.com'
        }
        ],
        currentRow: null
      }
    },

    methods: {
      handleUp(val) {
       	console.log(val);
      },
      handleDown(val) {
       	console.log(val);
      },
      handleDel(val) {
       	console.log(val);
      }
    }
  }
</script>

<style lang="less">
 .advert_icon{
            font-size:18px;
            margin: 0 5px;
            cursor: pointer;
            
            
        }
         .advert_icon:hover{
        	opacity: 0.6;
        }
        .advert_add{
        	text-align: right;
        }

</style>