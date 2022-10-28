<template>
  <div class="comLayout-container">
    <!-- 使用element-ui的✨布局容器 -->
    <el-container class="main-container">
      <!-- 1、头部区域 -->
      <el-header>
        <!-- 左侧logo -->
        <!-- <img src="../../assets/images/logo.png" alt="" /> -->
        <div class="title-box">个人笔记库后台系统</div>
        <!-- 右侧菜单 —— 采用element-ui的✨导航菜单 -->
        <el-menu
          class="el-menu-top"
          mode="horizontal"
          background-color="#2e3846"
          text-color="#fff"
          active-text-color="#409EFF"
          router
        >
          <!-- 个人中心 —— 使用element-ui的图标 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 头像 -->
              <img
                v-if="!$store.state.userInfo.user_pic"
                src="../../assets/images/avatar.jpg"
                alt=""
                class="avatar"
              />
              <img v-else :src="$store.state.userInfo.user_pic" alt="" class="avatar" />
              <span>个人中心</span>
            </template>
            <el-menu-item index="/layout/user-info"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="/layout/user-avatar"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="/layout/user-avatarPro"
              ><i class="el-icon-camera-solid"></i>更换头像</el-menu-item
            >
            <el-menu-item index="/layout/user-pwd"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu>
          <!-- 退出 -->
          <!-- 此处对index特殊✨处理，防止其受router属性的影响 -->
          <el-menu-item index="" @click="menu_logiout"
            ><i class="el-icon-switch-button"></i>退出</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-container>
        <!-- 2、侧边栏区域 -->
        <el-aside width="200px">
          <div class="user-box">
            <img v-if="user_pic" :src="user_pic" alt="" />
            <img v-else src="../../assets/images/logo.png" alt="" />
            <span>欢迎 {{ nickname || username }}</span>
          </div>
          <!-- 侧边栏导航部分 -->
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#2e3846"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            router
          >
            <!-- 外部嵌套template标签 -->
            <!-- ① 进行数据的一次循环 -->
            <template v-for="item in menus">
              <!-- 不包含二级菜单 -->
              <el-menu-item
                v-if="item.children === null"
                :index="'/layout' + item.indexPath"
                :key="'/layout' + item.indexPath"
              >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>

              <!-- 包含二级菜单 -->
              <el-submenu
                v-else
                :index="'/layout' + item.indexPath"
                :key="'/layout' + item.indexPath"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </template>
                <!-- ② 进行数据的二次循环 -->
                <el-menu-item
                  v-for="subItem in item.children"
                  :key="'/layout' + subItem.indexPath"
                  :index="'/layout' + subItem.indexPath"
                >
                  <i :class="subItem.icon"></i>{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 3.1页面主体区域 -->
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- 3.2底部footer区域 -->
          <el-footer
            ><a target="_blank" href="https://github.com/Lencamo/big-event-cms"
              >© Lencamo</a
            ></el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMenusAPI } from '@/api/index'

export default {
  name: 'comLayout',
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    menu_logiout() {
      // 使用element-ui的MessageBox弹框
      this.$confirm('您确认退出登录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('退出成功!')
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', '')
          this.$router.replace('/login')
        })
        .catch(() => {
          this.$message.info('已取消退出操作')
        })
    },

    // element-ui侧边导航栏附带函数
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },

    async getMenusListFn() {
      const { data: res } = await getMenusAPI()
      // console.log(res)
      // console.log(res.data)
      // 数据处理
      this.menus = res.data
    }
  },
  created() {
    // 当进入当前组件时，获取侧边栏导航数据
    this.getMenusListFn()
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
      background-color: #2e3846;
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

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #2e3846;
  border-bottom: 1px solid #2e3846;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}

.title-box {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  background-color: #f2f2f2;
  padding: 0px 10px;
}
</style>
