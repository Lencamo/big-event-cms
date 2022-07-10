<template>
  <div class="app-container">
    <!-- 一级路由挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'comApp'
  // created() {
  //   this.$store.dispatch('initUserInfo')
  // }
}
</script>

<style lang="less" scoped>
.app-container {
  // 解决登录页面的父级高度问题
  height: 100%;
}
</style>
