<template>
  <div class="comLogin-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box">个人笔记库后台系统</div>
      <!-- 登录的表单区域 —— 使用element-ui -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="btn_login">登录</el-button>
          <el-link class="change-link" type="info" @click="$router.push('/register')"
            >没有账号?</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { mapMutations } from 'vuex'

export default {
  name: 'comLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的字母数字',
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
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),

    btn_login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // console.log(this.loginForm)
          const { data: res } = await loginAPI(this.loginForm)
          // console.log(res)

          // 登录成功、失败提示
          if (res.code === 0) {
            this.$message.success(res.message)
            // console.log(res.token)
            // 方式1
            // this.$store.commit('updateToken', res.token)
            // 方式2
            this.updateToken(res.token)

            this.$router.push('/layout')
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comLogin-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
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

    .btn-login {
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
