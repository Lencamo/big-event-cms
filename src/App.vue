<template>
  <div class="app-container">
    <el-button type="primary">按钮</el-button>
  </div>
</template>
<script>
import { getDemoAPI } from '@/api/index.js'
export default {
  created() {
    this.getDemoFn()
  },
  methods: {
    async getDemoFn() {
      const { data: res } = await getDemoAPI()
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped></style>
