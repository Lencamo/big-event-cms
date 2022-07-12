<template>
  <div class="articleCase-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary">添加分类</el-button>
      </div>
      <!-- 使用element-ui的table组件 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column align="操作">
          <el-button size="mini" type="primary">修改</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getArtCateListAPI } from '@/api/index'

export default {
  name: 'articleCase',
  data() {
    return {
      cateList: []
    }
  },
  created() {
    // 获取文章分类
    this.initCateListFn()
  },
  methods: {
    // 获取文章分类
    async initCateListFn() {
      const res = await getArtCateListAPI()
      this.cateList = res.data.data
    }
  }
}
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
