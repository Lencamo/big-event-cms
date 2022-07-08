import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  actions: {},
  getters: {},
  modules: {},
  // vuex数持久化存储
  plugins: [createPersistedState()]
})
