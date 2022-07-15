import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/global.less'
// 引入element-ui
import '@/element-ui/index.js'
// 引入富文本编辑器
import '@/utils/vue-quill-editor/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
