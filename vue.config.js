const { defineConfig } = require('@vue/cli-service')
let externals = {}

let CDN = { css: [], js: [] }

// 生产环境判断
if (process.env.NODE_ENV === 'production') {
  externals = {
    // 基本格式：
    // '包名' : '在项目中引入的名字'
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT' // cdn里的源代码配置💖在ELEMENT这个变量
    // （一定要去修改掉引入Element用的变量名, 这里要匹配ELEMENT去替换）
    // ……
  }
  CDN = {
    css: [
      'https://unpkg.com/element-ui@2.15.9/lib/theme-chalk/index.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.core.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.snow.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.bubble.css'
      // ……
    ],
    js: [
      // vue must at first!
      'https://unpkg.com/echarts@5.3.3/dist/echarts.min.js',
      'https://unpkg.com/vue@2.6.14/dist/vue.js',
      'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
      'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
      'https://unpkg.com/dayjs@1.11.3/dayjs.min.js',
      'https://unpkg.com/element-ui@2.15.8/lib/index.js',
      'https://unpkg.com/quill@1.3.7/dist/quill.js',
      'https://unpkg.com/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
      'https://unpkg.com/vuex-persistedstate@3.2.1/dist/vuex-persistedstate.umd.js'
      // ……
    ]
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',

  // 需要排除的包对象
  configureWebpack: {
    externals: externals
  },
  // 需要配置的 CDN 链接
  chainWebpack(config) {
    // 注入cdn变量 (打包时会执行)
    config.plugin('html').tap((args) => {
      args[0].cdn = CDN // 配置 CDN 给插件
      return args
    }) // 省略其他...
  }
})
