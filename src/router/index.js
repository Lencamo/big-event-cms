import Vue from 'vue'
import VueRouter from 'vue-router'

import $store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // 使用 路由✨懒加载
    component: () => import('@/views/login/comLogin.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/comRegister.vue')
  },
  {
    path: '/layout',
    // 使用 路由✨懒加载
    component: () => import('@/views/layout/comLayout.vue')
  }
]

const router = new VueRouter({
  routes
})

// 发生页面跳转时触发
router.beforeEach((to, from, next) => {
  // 初次：有token时，才触发获取用户信息的函数
  // 处于登录状态时：跳转时不用重复触发
  if ($store.state.token && !$store.state.userInfo.username) {
    $store.dispatch('initUserInfo')
  }

  next()
})

export default router
