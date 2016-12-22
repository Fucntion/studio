<template>
<div class="pictureBox">
<div class="upload"><span>logo尺寸建议150*150,封面尺寸建议750*1334像素 </span>
<el-upload
  action="http://saaslive.oss-cn-shanghai.aliyuncs.com"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="call"
  :data="new_multipart_params"
  :before-upload="set_key"
  :multiple="false">
  <el-button type="primary" size="small">上传图片</el-button>
</el-upload>
<div class="hr"></div>
</div>
<div class="img_box">
	<div class="img_item" v-for="(item,index) in imgList" @click="select(item)"  :class="{active: item.isActive}" >
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
  import store from '../../vuex/store';
export default {
    store,
    data: function() {
  
         return {
           new_multipart_params:{},
         	imgList:[
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false},
         	{url:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=556936476,2584041442&fm=58',title:'图片名称',isActive:false}
         	
         	]
       }
    },
    props:['studio','dialog']
    ,methods: {
      call:function(response,file, fileList){
      	
        var type =this.dialog.type,fileUlr ='http://saaslive.oss-cn-shanghai.aliyuncs.com/'+this.new_multipart_params.dir+file.name;


        switch(type){
          case 'cover':
            this.studio.cover_img_url =fileUlr;
            break;
          case 'logo':
            this.studio.logo_url =fileUlr;
            break;
        }

        var data ={
          id:this.$router.currentRoute.params.id,
          studio:this.studio,
        }

//         console.log(data);return;

        store.commit('changeStudio',data);

        var obj ={};
        // 假装调用一下，然后就修改了modal的显示状态了

        store.commit("closeModal");


      },
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
      set_key(file){
        this.new_multipart_params.name = file.name;
        this.new_multipart_params.key = this.new_multipart_params.dir+file.name;
        // console.log(this.new_multipart_params);return;
      },
      handlePreview(file) {
        console.log(file);
      },select:function(item){

        
        var obj =this.imgList;
        for(var key in obj){
          if(obj[key] ==item){
            item.isActive = true;
            continue;
          }else{
            obj[key].isActive =null;
          }
        }
        console.log(item);
      }
    },
    components:{


    },
    mounted(){


      // this.type = store.getters.getDialog.type;


      var url = "/aliyuns/oss";
      this.$http.get(url).then((response) => {

        var tempObj ={
            success_action_status : '200', //让服务端返回200,不然，默认会返回204
          },obj={};
          
          if(Object.prototype.toString.call(response.body) === "[object String]"){
            obj = JSON.parse(response.body).data;
          }else{
            obj =response.body.data;
          }
       
        // console.log(obj);return;
        tempObj.policy = obj.policy;
        tempObj.OSSAccessKeyId = obj.accessid;
        tempObj.signature = obj.signature;
        tempObj.dir =obj.dir;
				tempObj.callbackbody = obj.callback;
        this.new_multipart_params = tempObj;
        // console.log(this.new_multipart_params);
      }, (response) => {
        // error callback
        // console.log(response);
      });

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
      box-sizing: border-box;
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
    .active{  
    border:1px solid red;
  }
  

}
</style>