<template>
<el-row class="warp">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="default">表格</el-breadcrumb-item>
      <el-breadcrumb-item class="default">什么列表2</el-breadcrumb-item>
      <el-breadcrumb-item>广告列表2</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>

<el-col :span="6" class="warp-main">
    <el-input 
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" size="small"></el-input-number>

</el-col>

  
 


</el-row>  
</template>

<script>
export default {
  data() {
    return {
      textarea: '啊时打发的萨芬大神范德萨范德萨范德萨范德萨范德萨发的范德萨发生',
      num1:5,
    }
  },
  methods: {
      handleChange(value) {
        console.log(value);
      }
    }
}
</script>
<style lang="scss">
  .content {
    margin: 0 auto;
    width: 200px;
    .line {
      margin: 10px 0;
    }
  }
</style>