<template>
  <div class="articlList-container">
    <!-- 核心页面 -->
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
              <!-- 文章分类选择 - 搜索栏区域 -->
              <!-- label是页面展示的值，value的🚩值是给js调用待使用的数据 -->
              <el-option
                :label="item.cate_name"
                :value="item.id"
                v-for="item in cateList"
                :key="item.id"
              >
              </el-option>
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
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>
    </el-card>

    <!-- 发布文章-对话框 -->
    <el-dialog
      title="发表"
      :visible.sync="pubdialogVisible"
      fullscreen
      :before-close="handleClose"
    >
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <!-- 文章分类选择 - 发布文章区域 -->
            <!-- label是页面展示的值，value的🚩值是给js调用待使用的数据 -->
            <el-option
              :label="item.cate_name"
              :value="item.id"
              v-for="item in cateList"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="pubForm.content"></quill-editor>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI } from '@/api/index'

export default {
  name: 'articleList',
  data() {
    return {
      // 文章分类数据
      cateList: [],
      // articleList组件的查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubdialogVisible: false,
      // 发布文章对话框表单数据对象
      pubForm: {
        title: '',
        cate_id: '',
        content: ''
      },
      // 发布文章对话框表单验证规则对象
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 进入页面时就 请求分类数据
    this.getCateListFn()
  },
  methods: {
    // 获取文章分类
    async getCateListFn() {
      const { data: res } = await getArtCateListAPI()
      // console.log(res)
      this.cateList = res.data
    },

    // 发表文章-触发按钮
    // 使用dialog对话框🤔（删除了确认、取消按钮）
    showPubDialogFn() {
      this.pubdialogVisible = true
    },
    // 发表文章-对话框关闭前的回调🚩
    // 这个方法将代替原先dialog对话框的确认、取消按钮
    handleClose(done) {
      // 使用element-ui的MessageBox弹框（前面退出功能也用过）
      // 这里从异步的角度分析
      // const confirmResult = await this.$confirm(……)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 若选择确定的操作
        .then(() => {
          // 关闭对话框
          done()
        })
        // 若选择取消的操作
        .catch(() => {
          this.$message.success('已取消！')
        })
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
// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}
</style>
