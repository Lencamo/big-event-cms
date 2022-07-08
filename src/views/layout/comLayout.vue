<template>
  <div class="comLayout-container">
    <!-- 使用element-ui的✨布局容器 -->
    <el-container class="main-container">
      <!-- 1、头部区域 -->
      <el-header>
        <!-- 左侧logo -->
        <img src="../../assets/images/logo.png" alt="" />
        <!-- 右侧菜单 —— 采用element-ui的✨导航菜单 -->
        <el-menu
          class="el-menu-top"
          mode="horizontal"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <!-- 个人中心 —— 使用element-ui的图标 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 头像 -->
              <img src="../../assets/images/avatar.jpg" alt="" class="avatar" />
              <span>个人中心</span>
            </template>
            <el-menu-item index="1-1"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="1-2"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="1-3"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu>
          <!-- 退出 -->
          <el-menu-item index="2" @click="menu_logiout"
            ><i class="el-icon-switch-button"></i>退出</el-menu-item
          >
          >
        </el-menu>
      </el-header>
      <el-container>
        <!-- 2、侧边栏区域 -->
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <!-- 3.1页面主体区域 -->
          <el-main>Main</el-main>
          <!-- 3.2底部footer区域 -->
          <el-footer>© www.deer-sir.cn - 鹿先生</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'comLayout',
  methods: {
    menu_logiout() {
      this.$confirm('您确认退出登录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('退出成功!')
          this.$store.commit('updateToken', '')
          this.$router.replace('/login')
        })
        .catch(() => {
          this.$message.info('已取消退出操作')
        })
    }
  }
}
</script>
<style lang="less" scoped>
.comLayout-container {
  height: 100%;
  .main-container {
    height: 100%;
    .el-header,
    .el-aside {
      background-color: #23262e;
    }
    .el-header {
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
    .el-main {
      overflow-y: scroll;
      height: 0;
      background-color: #f2f2f2;
    }
    .el-footer {
      background-color: #eee;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
</style>
