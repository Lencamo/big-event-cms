<template>
  <div class="articlList-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub"
          >发表文章</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  data() {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.articlList-container {
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .btn-pub {
      margin-top: 5px;
    }
  }
}
</style>
