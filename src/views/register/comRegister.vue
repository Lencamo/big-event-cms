<template>
  <div class="comRegister-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box">个人笔记库后台系统</div>
      <!-- 注册的表单区域 —— 【element-ui✨】 -->
      <el-form ref="form" :model="regFrom" :rules="regRules">
        <el-form-item prop="username">
          <el-input v-model="regFrom.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regFrom.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="regFrom.repassword"
            placeholder="请再次确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="btn_reg">立即创建</el-button>
          <el-link class="change-link" type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index.js'

export default {
  name: 'comRegister',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.regFrom.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象 —— 【数据使用对象呢的形式、✨对象属性名与接属性名一致】
      regFrom: {
        username: '',
        password: '',
        repassword: ''
      },
      // 表单规则校验对象 —— 【使用element-ui自带的表单验证、✨自定义表单验证】
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          // 自定义表单验证
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    btn_reg() {
      // 【使用element-ui内置的✨validate函数：JS兜底校验】
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // console.log(this.regFrom)
          const { data: res } = await registerAPI(this.regFrom)
          // console.log(res)
          // 注册成功、失败提示 —— 【element-ui的✨弹窗提示】
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)

          this.$router.push('/login')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comRegister-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #6f88a8;
    opacity: 0.8;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 600;
    }

    .btn-reg {
      width: 100%;
    }

    .change-link {
      color: #afbbc7;
      float: right;
      font-weight: 800;
      border-bottom: 2px solid red;
    }
  }
}
</style>
