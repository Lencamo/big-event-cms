import reqAxios from '@/axios-instance/back.js'

// 接口请求测试
export const getDemoAPI = () => {
  return reqAxios({
    method: 'GET',
    url: '/api/getbooks',

    // get请求url中的查询参数 —— ✨params
    params: { id: 2 }
  })
}
