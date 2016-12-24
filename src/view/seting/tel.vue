<template>
<div>
<el-form ref="form" :model="form" label-width="100px" style="width:400px;">
  <el-form-item label="当前手机号">
     156****3921
  </el-form-item>
  <el-form-item label="手机号码">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input v-model="form.name" style="display:inline-block;">  </el-input><el-button type="primary"  style="margin-left:15px;" size="small">发送验证码</el-button>
  </el-form-item>
  <el-form-item  label="">
    <el-button type="primary"@click="onSubmit">确认更改</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>

 export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="less">

</style>