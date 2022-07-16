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
          <!-- 筛选与重置 -->
          <el-form-item>
            <el-button type="primary" size="small" @click="onChooseFn"
              >筛选</el-button
            >
            <el-button type="info" size="small" @click="resetChooseFn"
              >重置</el-button
            >
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
      <!-- 下方文章列表内容区域 -->
      <el-table :data="artList" style="width: 100%" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template slot-scope="scope">
            <el-link type="primary" @click="showDetailFn(scope.row.id)">{{
              scope.row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <!-- 巧用✨插槽自定义显示内容 -->
          <template slot-scope="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="danger"
              size="mini"
              @click="removeArticleFn(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 文章列表的分页区域 -->
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
        :current-page.sync="q.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size.sync="q.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 发布文章-对话框 -->
    <el-dialog
      title="发表"
      :visible.sync="pubdialogVisible"
      fullscreen
      :before-close="handleClose"
      @closed="dialogCloseFn"
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
            <!-- label是页面展示的值，value的🚩值是给js调用待使用的数据（pubForm.cata_id） -->
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
          <quill-editor
            v-model="pubForm.content"
            @change="contentChangeFn"
          ></quill-editor>
        </el-form-item>
        <!-- 文章封面 -->
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="onCoverChangeFn"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImgFn">+ 选择封面</el-button>
        </el-form-item>
        <!-- 发布与存为草稿按钮 -->
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看文章详情-对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
        <span>发布时间：{{ $formatDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态：{{ artDetail.state }}</span>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 文章的封面 -->
      <!-- 追加图片基地址 -->
      <img :src="baseURL + artDetail.cover_img" alt="" />

      <!-- 文章的详情 -->
      <!-- 注意✨：这里的内容要用v-html进行解析 -->
      <div v-html="artDetail.content" class="detail-box"></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtCateListAPI,
  uploadArticleAPI,
  getArticleListAPI,
  getArticleDetailFn,
  delArticleAPI
} from '@/api/index'
// 注意✨：js中引入图片要所以import
import defaultImg from '@/assets/images/cover.jpg'
// 引入图片基地址
import { baseURL } from '@/utils/axios/axios-instance'

export default {
  name: 'articleList',
  data() {
    return {
      baseURL: baseURL,
      // 文章分类数据
      cateList: [],
      // articleList组件的查询参数对象
      q: {
        pagenum: 1, // 默认显示第一页数据
        pagesize: 5, // 默认当前页显示几条数据
        cate_id: '',
        state: ''
      },
      // 文章的列表数据
      artList: [],
      // 总数据条数
      total: 0,
      pubdialogVisible: false,
      detailVisible: false,
      // 文章详情数据
      artDetail: {},
      // 发布文章对话框表单数据对象
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: null, // 用户选择的封面图片（null 表示没有选择任何封面）
        state: '' // 文章的发布状态，可选值有两个：草稿、已发布
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
          // 使用change事件✨对下拉菜单进行校验
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          // 由于quil-editor是引入的，不会自动走校验
          // 解决办法：用它自带触发函数间接进行校验
          { required: true, message: '输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          // 这里的图片校验和前面的富文本器校验一样的解决方法（单独校验）
          { required: true, message: '请选择封面', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 进入页面时就 请求分类数据、列表数据
    this.getCateListFn()
    this.getArtListFn()
  },
  methods: {
    // 获取文章分类
    async getCateListFn() {
      const { data: res } = await getArtCateListAPI()
      // console.log(res)
      this.cateList = res.data
    },
    // 获取文章列表
    async getArtListFn() {
      const { data: res } = await getArticleListAPI(this.q)

      // console.log(res)
      if (res.code !== 0) return this.$message.error('获取文章列表失败!')
      this.artList = res.data
      this.total = res.total
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
    },
    // 间接代替文件选择框的点击事件
    chooseImgFn() {
      this.$refs.iptFileRef.click()
    },
    // 封面选择改变的事件（图片预览：这里采用第二种方式 【注意比较与前面的图片预览所以的区别】）
    onCoverChangeFn(e) {
      // 获取用户选择的文件列表
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择封面
        this.pubForm.cover_img = null

        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }

      // 封面图片单独校验解决
      this.$refs.pubFormRef.validateField('cover_img')
    },
    // 发布文章或草稿-按钮点击事件
    pubArticleFn(str) {
      // 1. 设置发布状态
      this.pubForm.state = str

      // // 2. 表单预校验（兜底校验）
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          // 创建 FormData 表单数据对象
          // FormData类是THML5的内容（是一个用于装文件的容器）
          const fd = new FormData()

          // 向 FormData 中追加数据
          // 方式1
          // fd.append('title', this.pubForm.title)
          // fd.append('cate_id', this.pubForm.cate_id)
          // fd.append('content', this.pubForm.content)
          // fd.append('cover_img', this.pubForm.cover_img)
          // fd.append('state', this.pubForm.state)
          // 方式2：使用Object.keys加forEach()
          Object.keys(this.pubForm).forEach((key) => {
            fd.append(key, this.pubForm[key])
          })
          console.log(fd)
          // 发起请求
          const { data: res } = await uploadArticleAPI(fd)
          console.log(res)
          if (res.code !== 0) {
            this.$message.error('发布文章失败！')
          } else {
            this.$message.success('发布文章成功！')

            // 关闭对话框
            this.pubdialogVisible = false

            // 刷新主页面文章列表数据
            this.getArtListFn()
          }
        } else {
          return false
        }
      })
    },
    // 使用element-ui中的validateField()方法让富文本编辑器实现校验功能
    contentChangeFn() {
      // validateField()对部分表单字段进行校验的方法
      this.$refs.pubFormRef.validateField('content')
    },
    // 发布文章或草稿后的操作
    dialogCloseFn() {
      // 清空关键数据
      this.$refs.pubFormRef.resetFields()
      // 因为这2个变量对应的标签不是表单绑定的, 所以需要✨单独控制
      this.pubForm.content = ''
      this.$refs.imgRef.setAttribute('src', defaultImg)
    },
    // 文章列表条数发生改变时(element-ui内置回调参数)
    handleSizeChangeFn(newSize) {
      // 为 pagesize 赋值
      this.q.pagesize = newSize

      // 解决在非第一页文章列表进行列表条数n切换后，内容不显示的bug
      // 问题分析1：通过network可以发现切换分页时，发生了两次getArtListFn()请求
      // bug产生原因：对比请求可以发现 ——
      // ① 由于条数改变而触发getArtListFn()请求【当然页的n条数据】，结果为空
      // ② 由于页面改变而触发getArtListFn()请求【页面改变后的n条数据】，结果正常
      // 若①请求的速度快与②请求的速度时，就会产生一个✨偶发性的bug✨
      // 解决问题：
      // 默认展示第一页数据（有能力的也可以让人展示最后一页数据）
      this.q.pagenum = 1

      // 重新发起请求
      this.getArtListFn()
    },
    // 文章列表页数发生改变时(element-ui内置回调参数)
    handleCurrentChangeFn(newPage) {
      // 为页码值赋值
      this.q.pagenum = newPage
      // 重新发起请求
      this.getArtListFn()
    },
    // 触发筛选文章按钮
    onChooseFn() {
      this.getArtListFn()
    },
    // 触发重置文章筛选按钮
    resetChooseFn() {
      // 1. 重置查询参数对象
      this.q = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      }
      // 2. 重新发起请求
      this.getArtListFn()
    },
    // 展示文章详情链接
    async showDetailFn(id) {
      const { data: res } = await getArticleDetailFn(id)
      // console.log(res)

      if (res.code !== 0) return this.$message.error('获取文章详情失败!')
      this.artDetail = res.data
      // 展示文章详情对话框
      this.detailVisible = true
    },
    // 文章删除按钮
    async removeArticleFn(id) {
      // 1. 询问用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 2. 取消了删除
      if (confirmResult === 'cancel') return

      // 执行删除的操作
      const { data: res } = await delArticleAPI(id)

      if (res.code !== 0) return this.$message.error('删除文章失败!')
      this.$message.success('删除文章成功!')

      // 问题：在最后一页中删除最后一篇文章时，虽然页码能会到上一页，但数据没有出现的小bug
      // 解决方法：让它重点跳转到上一页
      // if (this.artList.length === 1) {
      //   if (this.q.pagenum > 1) {
      //     this.q.pagenum--
      //   }
      // }

      // 刷新列表数据
      this.getArtListFn()
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

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

// 文章列表样式
.el-pagination {
  margin-top: 15px;
}

// 文章详情对话框样式美化
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>
