import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 导入所需要的API
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录成功后的token值
    token: ''
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    // 获取用户基本信息
    async initUserInfo(store) {
      const { data: res } = await getUserInfoAPI()
      console.log(res)
    }
  },
  getters: {},
  modules: {},
  // vuex数持久化存储
  plugins: [createPersistedState()]
})
