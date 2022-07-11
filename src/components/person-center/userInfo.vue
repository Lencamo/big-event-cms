<template lang="">
  <div class="userInfo-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本资料</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="userFormRef"
        label-width="100px"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input
            v-model="userForm.nickname"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { updateUserInfoAPI } from '@/api/index'

export default {
  name: 'userInfo',
  data() {
    return {
      userForm: {
        username: this.$store.state.userInfo.username, // 默认值用登录后获取到的用户名
        nickname: '',
        email: ''
      },
      // 表单的验证规则对象
      userFormRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '昵称必须是1-10位的非空字符串',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.userFormRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.userForm)
          // 根据接口要求，必须要一个id值
          this.userForm.id = this.$store.state.userInfo.id

          const { data: res } = await updateUserInfoAPI(this.userForm)
          // console.log(res)

          if (res.code === 0) {
            this.$message.success('修改用户信息成功！')
            this.$store.dispatch('initUserInfo')
          } else {
            this.$message.success('修改用户信息失败！')
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      // 传统方式
      // this.userForm.nickname = ''
      // this.userForm.email = ''

      // 使用element-ui的✨方法
      this.$refs.userFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
