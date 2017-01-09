<template>
  <div class="pictureBox">
    <div class="upload"><span>logo尺寸建议150*150,封面尺寸建议750*1334像素 </span>
      <el-upload action="http://saaslive.oss-cn-shanghai.aliyuncs.com" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="call"
        :data="new_multipart_params" :before-upload="set_key" :multiple="false">
        <el-button type="primary" size="small">上传图片</el-button>
      </el-upload>
      <div class="hr"></div>
    </div>
    <div class="img_box">
      <div class="img_item" v-if="imgList.length>0" v-for="(item,index) in imgList" @click="select(item)" :class="{active: item.isActive}">
        <div class="img"  :style="{backgroundImage:'url(' + item.img_url + ')'}"></div>
      </div>
    </div>

    <div class="control">
      <el-pagination
  small
  layout="prev, pager, next" :page-size="24"
  @current-change="handleCurrentChange"
  :total="pagination.total">
</el-pagination>
      <el-button :disabled="isCheck" class="export" type="primary">确定</el-button>

    </div>

  </div>
</template>

<script>
  import store from 'store'
  export default {
    store,
    data: function () {

      return {
        isCheck:true,
        new_multipart_params: {},
        studio: {},
        pagination:{
          total:0
        },
        imgList: []
      }
    },
    props: ['dialog'],
    methods: {

      call: function (response, file, fileList) {
        console.log(response)
        var callback =this.dialog.callback,
          fileUlr = response.data.img_url

        // switch (type) {
        //   case 'cover':
        //     this.studio.cover_img_url = fileUlr;
        //     break;
        //   case 'logo':
        //     this.studio.logo_url = fileUlr;
        //     break;
        // }


        callback(fileUlr)
        //给他加上未选中的状态
        response.data.isActive = false
        
        if(this.imgList.length==24){ 
          //去掉最后一个咯
         this.imgList.length = 23

        }

       this.imgList = [response.data].concat(this.imgList)

        // store.commit("closeModal");
        // var data = {
        //   id: this.$router.currentRoute.params.id,
        //   studio: this.studio,
        // }
        // store.commit('changeStudio', data);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPage(val)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      set_key(file) {
        this.new_multipart_params.name = file.name;
        this.new_multipart_params.key = this.new_multipart_params.dir + file.name;
      },
      handlePreview: function (file) {
        console.log(file);
      },
      select: function (item) {
       
        for (var key in this.imgList) {
          this.imgList[key].isActive = false;
        }
        
        item.isActive = true
        this.isCheck =false
        // console.log(item)
      },
      getPage:function(page){
         //获取已有图片
        
        var picLink = '/materials/picture/list--token--&page='+page+'&per-page=24'
        this.$http.get(picLink).then((response) => {
          
          _.forEach(response.body.data.list,function(item,key){
            item.isActive =false
          })
          this.imgList = response.body.data.list
          this.pagination.total = parseInt(response.body.data.pageInfo.totalCount)

        }, (response) => {

        })
      },
      init: function () {

        //房间信息
        this.studio = store.getters.getStudio

        //初始化的时候是1
        this.getPage(this.page)

      
        //阿里云
        var url = "/aliyuns/oss";
        this.$http.get(url).then((response) => {

          var tempObj = {
            success_action_status: '200', //让服务端返回200,不然，默认会返回204
          }, obj = {};

          if (Object.prototype.toString.call(response.body) === "[object String]") {
            obj = JSON.parse(response.body).data;
          } else {
            obj = response.body.data;
          }
          tempObj.policy = obj.policy;
          tempObj.OSSAccessKeyId = obj.accessid;
          tempObj.signature = obj.signature;
          tempObj.dir = obj.dir;
          tempObj.callback = obj.callback;
          this.new_multipart_params = tempObj;
        }, (response) => {

        });
      }
    },
    components: {


    },
    mounted() {

      this.init()

    }
  }

</script>

<style lang="less">
.pictureBox{

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
		.el-pagination__total{

		}
	}
	.control{
		overflow:hidden;
		padding-top:10px;
		margin:15px 0 0px; 

	}

}

.img_box{	
	overflow:hidden;
   min-height: 448px;
	.img_item{
		float:left;
    margin: 5px 0 5px 10px;

		.img{
      cursor: pointer;
			width:100px;
			height:100px;
      border: 1px solid #e6effb;
      background-position: center;
      background-size: cover;
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