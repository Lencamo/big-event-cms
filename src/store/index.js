import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 导入所需要的API
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  // Vuex中的数据
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    // 登录成功后的token值
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 用于存储获取的用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    // 获取用户基本信息
    async initUserInfo(context) {
      const { data: res } = await getUserInfoAPI()
      // console.log(res)
      // console.log(res.data)
      if (res.code === 0) {
        context.commit('updateUserInfo', res.data)
      }
    }
  },
  getters: {
    nickname: (state) => state.userInfo.nickname,
    username: (state) => state.userInfo.username,
    user_pic: (state) => state.userInfo.user_pic
  },
  modules: {},
  // vuex数持久化存储
  plugins: [createPersistedState()]
})
