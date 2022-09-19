<template>
  <div class="changePic-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div>
        <!-- 上方核心功能部分 -->
        <div class="core-box">
          <!-- 左侧裁剪部分 -->
          <div class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
            ></vueCropper>
          </div>
          <!-- 右侧预览部分 -->
          <div class="preview-box">
            <!-- 图片 -->
            <div class="preview">
              <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img" />
              </div>
            </div>
            <!-- 更换头像 -->
            <div type="flex" justify="center">
              <el-upload
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadImg"
              >
                <el-button size="mini" type="primary"> 更换头像 </el-button>
              </el-upload>
            </div>
            <br />
            <!-- 各种操作 -->
            <div>
              <el-button icon="el-icon-plus" circle @click="changeScale(1)"></el-button>
              <el-button icon="el-icon-minus" circle @click="changeScale(-1)"></el-button>
              <el-button icon="el-icon-download" circle @click="down('blob')"></el-button>
              <el-button icon="el-icon-refresh-left" circle @click="rotateLeft"></el-button>
              <el-button icon="el-icon-refresh-right" circle @click="rotateRight"></el-button>
            </div>
          </div>
        </div>
        <!-- 下方按钮选择部分区域 -->
        <div class="btn-box">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="iptRef"
            @change="onFileChange"
          />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
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
      user_pic: '',

      // 剪切图片相关变量
      editAvatarDialog: false,
      previews: {},
      option: {
        img: '/avatar.jpg', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成额图片的格式
        canMove: true, // 能否拖动图片
        original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true // 截图框固定大小
      }
    }
  },
  methods: {
    // 通过选择图片按钮 来间接点击隐藏的 input的file标签
    chooseImg() {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },

    // 选择图片--图片预览（原生方式）
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
          this.user_pic = e.target.result // 显示上传图片按钮的标识
          this.option.img = e.target.result
        }
      }
    },

    // 更换头像--上传本地图片（element的el-upload组件方式）
    uploadImg(file) {
      const _this = this
      const reader = new FileReader()
      // 转化为base64
      reader.readAsDataURL(file.raw)
      // 转化为blob
      // reader.readAsArrayBuffer(file.raw)

      reader.onload = (e) => {
        // let data
        // if (typeof e.target.result === 'object') {
        //   // 把Array Buffer转化为blob 如果是base64不需要
        //   data = window.URL.createObjectURL(new Blob([e.target.result]))
        // } else {
        //   data = e.target.result
        // }

        const data = e.target.result

        _this.user_pic = data // 显示上传图片按钮的标识
        _this.option.img = data
      }
    },

    // 更新数据--上传图片
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
    },

    // ---------------

    // 保存头像修改
    // saveEditAvatar() {
    //   this.finish('blob')
    // },

    // 保存上传图片
    // finish(type) {
    //   if (type === 'blob') {
    //     this.$refs.cropper.getCropBlob((data) => {
    //       this.user_pic = window.URL.createObjectURL(data)
    //       // 访问接口保存到数据库写这儿!
    //     })
    //   } else {
    //     this.$refs.cropper.getCropData((data) => {
    //       // 访问接口保存到数据库写这儿!
    //     })
    //   }
    // },

    // 右侧部分功能实现
    // 1、实时预览函数
    realTime(data) {
      this.previews = data
    },

    // 2、五大附属功能
    // ①、放大/缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // ②、左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // ③、右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // ④、下载图片
    down(type) {
      const aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          aLink.href = data
          aLink.click()
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 上方
.core-box {
  width: 600px;
  height: 300px;
  .cropper {
    float: left;
    width: 50%;
    height: 100%;
  }
  .preview-box {
    float: right;
    width: 40%;
    height: 100%;
    text-align: center;
    padding: 20px 30px;
    .preview {
      width: 150px;
      height: 150px;
      margin: 0px auto 20px auto;
      border-radius: 50%;
      border: 1px solid #ccc;
      background-color: #ccc;
      overflow: hidden;
    }
  }
}

// 下方
.btn-box {
  margin-top: 20px;
  display: block;
}
</style>
