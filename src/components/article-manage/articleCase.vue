<template>
  <div class="articleCase-container">
    <!-- 预览文章分类 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" @click="dialogVisible = true"
          >添加分类</el-button
        >
      </div>
      <!-- 使用element-ui的table组件 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column align="操作">
          <!-- 利用插槽获取行数据 -->
          <!-- scope对象：{row: 行对象} -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="updateCateBtnFn(scope.row)"
              >修改</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加、修改文章分类-对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="35%"
      @closed="ondialogCloseFn"
    >
      <!-- 内部表单区域 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getArtCateListAPI, addArtCateAPI } from '@/api/index'

export default {
  name: 'articleCase',
  data() {
    return {
      cateList: [],
      dialogVisible: false,
      // 添加表单的数据对象
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 添加表单的验证规则对象
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
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
    },
    // 添加文章对话框取消按钮
    cancelFn() {
      this.dialogVisible = false
    },
    // 添加文章对话框确认按钮
    confirmFn() {
      // 表单校验
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await addArtCateAPI(this.addForm)
          // console.log(res)
          // 请求成功、失败提示
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)

          // 刷新列表数据 并 关闭对话框
          this.initCateListFn()
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加文章-关闭时的清空数据
    ondialogCloseFn() {
      this.$refs.addRef.resetFields()
    },
    // 修改文章-触发按钮
    updateCateBtnFn(obj) {
      console.log(obj)

      // 实现数据回显
      this.dialogVisible = true
      this.addForm.cate_name = obj.cate_name
      this.addForm.cate_alias = obj.cate_alias
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
