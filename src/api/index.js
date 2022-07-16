import reqAxios from '@/utils/axios/axios-instance.js'

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

/**
 * 更新-用户头像接口
 * @param {*} avatar 头像的base64字符串
 * @returns Promise对象
 */
export const updateAvatarAPI = (avatar) => {
  return reqAxios({
    url: '/my/update/avatar',
    method: 'PATCH',

    data: {
      avatar
    }
  })
}

/**
 * 更新-用户密码
 * @param {*} param0 { old_pwd: 旧密码, new_pwd: 新密码, re_pwd: 新密码确认 }
 * @returns Promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return reqAxios({
    url: '/my/updatepwd',
    method: 'PATCH',

    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取-文章分类接口
 * @returns Promise对象
 */
export const getArtCateListAPI = () => {
  return reqAxios({
    method: 'GET',
    url: '/my/cate/list'
  })
}

/**
 * 增加-文章分类接口
 * @param {*} param0 { cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return reqAxios({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 更新-文章分类接口
 * @param {*} param0 { id: 文章分类id, cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return reqAxios({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除-文章分类接口
 * @param {*} id 要删除的-文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return reqAxios({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

// 上面要求传入的是(application/json)json数据
// 下面这个要求传入的是(multipart/form-data)表单数
/**
 * 发布文章
 * @param {*} fd ForData 表单数据对象
 * @returns Promise对象
 */
export const uploadArticleAPI = (fd) => {
  return reqAxios({
    url: '/my/article/add',
    method: 'POST',
    data: fd // 参数要的是表单对象, 不能✨写普通对象（若填的是一个普通对象，axios会把它转换为JSON字符串在请求体里交给后台）
  })
}

/**
 * 获取文章列表接口
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns Promise对象
 */
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return reqAxios({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取-文章详情接口
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const getArticleDetailFn = (id) => {
  return reqAxios({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

/**
 * 删除-文章详情接口
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const delArticleAPI = (id) => {
  return reqAxios({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
