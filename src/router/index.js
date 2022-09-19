import Vue from 'vue'
import VueRouter from 'vue-router'

import $store from '@/store/index'

Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况🍗
const originalPush = VueRouter.prototype.push
const originalReplace =
  VueRouter.prototype.replace

// push
VueRouter.prototype.push = function push(
  location,
  onResolve,
  onReject
) {
  // if (onResolve || onReject) {
  //   return originalPush.call(this, location, onResolve, onReject)
  // }
  return originalPush
    .call(this, location)
    .catch((err) => err)
}

// replace
VueRouter.prototype.replace = function push(
  location,
  onResolve,
  onReject
) {
  // if (onResolve || onReject) {
  //   return originalReplace.call(this, location, onResolve, onReject)
  // }
  return originalReplace
    .call(this, location)
    .catch((err) => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // 使用 路由✨懒加载
    component: () =>
      import('@/views/login/comLogin.vue')
  },
  {
    path: '/register',
    component: () =>
      import('@/views/register/comRegister.vue')
  },
  {
    path: '/layout',
    // 使用 路由✨懒加载
    component: () =>
      import('@/views/layout/comLayout.vue'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () =>
          import('@/components/home.vue')
      },
      {
        path: 'user-info',
        component: () =>
          import(
            '@/components/person-center/userInfo.vue'
          )
      },
      {
        path: 'user-avatar',
        component: () =>
          import(
            '@/components/person-center/changePic.vue'
          )
      },
      {
        path: 'user-avatarPro',
        component: () =>
          import(
            '@/components/person-center/changePic-Pro.vue'
          )
      },
      {
        path: 'user-pwd',
        component: () =>
          import(
            '@/components/person-center/resetPassword.vue'
          )
      },
      {
        path: 'art-cate',
        component: () =>
          import(
            '@/components/article-manage/articleCase.vue'
          )
      },
      {
        path: 'art-list',
        component: () =>
          import(
            '@/components/article-manage/articleList.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register']

// 发生页面跳转时触发
router.beforeEach((to, from, next) => {
  const token = $store.state.token

  // 权限访问控制
  if (token) {
    // 如果有token, 证明已登录
    if (!$store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      $store.dispatch('initUserInfo')
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    }
    next() // 路由放行
  } else {
    // 如果无token
    // 【因为登录、注册页面也没有token，根据全局前置守卫的定义不做白名单处理，会一直处于跳转——触发——跳转循环中】
    // 如果去的是白名单✨页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
  next()
})

export default router
