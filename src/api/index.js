import reqAxios from '@/utils/axios-instance.js'

// 接口请求测试
// 升级：使用解构赋值传参
export const registerAPI = ({ username, password, repassword }) => {
  return reqAxios({
    method: 'POST',
    url: '/api/reg',

    data: {
      // 简写形式
      username,
      password,
      repassword
    }
  })
}
