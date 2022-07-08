import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
