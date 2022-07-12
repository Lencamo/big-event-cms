<template>
  <div class="changePic-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div>
        <!-- 图片，用来展示用户选择的头像 -->
        <img
          v-if="!user_pic"
          class="the_img"
          src="../../assets/images/avatar.jpg"
          alt=""
        />

        <img v-else class="the_img" :src="user_pic" alt="" />
        <!-- 按钮区域 -->
        <div class="btn-box">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="iptRef"
            @change="onFileChange"
          />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
            >选择图片</el-button
          >
          <el-button
            type="success"
            icon="el-icon-upload"
            :disabled="user_pic === ''"
            @click="updateImg"
            >上传头像</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { updateAvatarAPI } from '@/api/index'

export default {
  name: 'changePic',
  data() {
    return {
      // 保存图片连链接/base64字符串
      user_pic: ''
    }
  },
  methods: {
    // 通过选择图片按钮 来间接点击隐藏的 input的file标签
    chooseImg() {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },

    // 图片预览
    onFileChange(e) {
      // 打印触发事件的对象
      // console.log(e.target)
      // 使用该标签的files属性
      // console.log(e.target.files)

      // 拿取图片文件的数组数据
      const files = e.target.files

      if (files.length === 0) {
        this.user_pic = ''
      } else {
        // 方式一： 使用URL.createObjURL()返回一个内存临时地址【blob:http://localhost:8080/ 开头】
        // console.log(URL.createObjectURL(files[0]))
        // this.user_pic = URL.createObjectURL(files[0])

        // 方式二：使用HTML5构造函数FileReader操作后可以得到一个base64字符串【data:image/jpeg;base64,/ 开头】
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        // 调用监听事件
        fr.onload = (e) => {
          // console.log(e.target)
          this.user_pic = e.target.result
        }
      }
    },

    // 更新数据
    async updateImg() {
      const { data: res } = await updateAvatarAPI(this.user_pic)
      // console.log(res)
      if (res.code === 0) {
        this.$message.success('上传头像成功！')
        this.$store.dispatch('initUserInfo')

        // 上传头像后清空预览
        this.user_pic = ''
      } else {
        this.$message.error('上传头像失败！')
        this.user_pic = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img {
  width: 350px;
  height: 350px;
}
</style>
