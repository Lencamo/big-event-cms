import Vue from 'vue'
// 导入dayjs方法
import dayjs from 'dayjs'

// 定义一个待调用的时间格式化函数(使用原型)
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}
