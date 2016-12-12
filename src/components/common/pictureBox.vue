<template>
<div class="pictureBox">
<div class="upload"><span>logo尺寸建议150*150,封面尺寸建议750*1334像素 </span>
<el-upload
  action="//jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :multiple="true">
  <el-button type="primary" size="small">上传图片</el-button>
</el-upload>
<div class="hr"></div>
</div>

<div class="img_box">
	<div class="img_item" v-for="(item,index) in imgList">
	<div class="img" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
	<div class="img_title">{{item.title}}</div>
</div>

</div>

<div class="control">
  	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="100"
      layout="prev, pager, next,jumper"
      :total="1000">
    </el-pagination>
  	<!-- <el-button class="export">邮件发送</el-button> -->
  	<el-button disabled class="export"  type="primary">确定</el-button>

  </div>

</div>
</template>

<script>

export default {
    data: function() {
  
         return {
         	imgList:[
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称'}
         	]
       }
    },
    methods: {
    	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    components:{


    }
}

</script>

<style lang="less">
.pictureBox{

	// font-size:16px;

	.upload{
		text-align:right;
    .el-upload{
      display: inline-block;
      width: auto;
      .el-upload__files{
        display: none;
      }
    }
		button{
			margin-left:10px;
		}
	}
	.el-pagination{
		float:right;
		// margin-top:25px;
		// text-align:right;
		.el-pagination__total{
			// float:right;
		}
	}
	.control{
		overflow:hidden;
		padding-top:10px;
		margin:15px 0 0px; 
		// text-align:right;
	}

}

.img_box{
	
	overflow:hidden;
	.img_item{
		float:left;
		.img{
			width:100px;
			height:100px;
			background-size:cover;
			background-position:center center;
		}
		.img_title{
			text-align: center;
			width:100px;
		}
	}
}
</style>