import reqAxios from '@/utils/axios-instance.js'

// import $store from '@/store/index'

/**
 * 注册接口
 * @param {*} param0 {username: 用户名, password: 密码, repassword: 确认密码}
 * @returns Promise对象
 */
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

/**
 * 登录接口
 * @param {*} param0 {username: 用户名, password: 密码}
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return reqAxios({
    method: 'POST',
    url: '/api/login',

    data: {
      username,
      password
    }
  })
}

/**
 * 获取-用户基本资料接口
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return reqAxios({
    method: 'GET',
    url: '/my/userinfo'

    // headers: {
    //   Authorization: $store.state.token
    // }
  })
}

/**
 * 获取-侧边栏数据接口
 * @returns Promise对象
 */
export const getMenusAPI = () => {
  return reqAxios({
    method: 'GET',
    url: '/my/menus'

    // headers: {
    //   Authorization: $store.state.token
    // }
  })
}

/**
 * 更新-用户基本资料接口
 * @param {*} param0  { id: 用户id, email: 用户邮箱, nickname: 用户昵称, user_pic: 用户头像地址, username: 用户名 }
 * @returns  Promise对象
 */
export const updateUserInfoAPI = ({
  id,
  email,
  nickname,
  user_pic,
  username
}) => {
  return reqAxios({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      email,
      nickname,
      user_pic,
      username
    }
  })
}
