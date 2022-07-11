<template>
  <div class="home-container">
    <div class="container-top">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6">
          <div class="spannel">
            <em>10015</em><span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel scolor01">
            <em>123</em><span>篇</span>
            <b>日新增文章数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel scolor02">
            <em>35</em><span>条</span>
            <b>评论总数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel scolor03">
            <em>123</em><span>条</span>
            <b>日新增评论数</b>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container-center">
      <el-row class="curve-pie" :gutter="10">
        <el-col :xs="16" :sm="16"
          ><div class="gragh_pannel" id="curve_show"></div
        ></el-col>
        <el-col :xs="8" :sm="8"
          ><div class="gragh_pannel" id="pie_show"></div
        ></el-col>
      </el-row>
    </div>
    <div class="container-button">
      <div class="column_pannel" id="column_show"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myHome'
}
</script>
<style lang="less" scoped>
.spannel_list {
  margin-top: 20px;
}

.spannel {
  height: 100px;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  margin-bottom: 20px;
}

.spannel em {
  font-style: normal;
  font-size: 50px;
  line-height: 50px;
  display: inline-block;
  margin: 10px 0 0 20px;
  font-family: 'Arial';
  color: #83a2ed;
}

.spannel span {
  font-size: 14px;
  display: inline-block;
  color: #83a2ed;
  margin-left: 10px;
}

.spannel b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}

.scolor01 em,
.scolor01 span {
  color: #6ac6e2;
}

.scolor02 em,
.scolor02 span {
  color: #5fd9de;
}

.scolor03 em,
.scolor03 span {
  color: #58d88e;
}

.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}

.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
