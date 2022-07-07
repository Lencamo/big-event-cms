import axios from 'axios'

// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const reqAxios = axios.create({
  baseURL: 'http://www.liulongbin.top:3006'
})

// 导出自定义的axios方法, 供外面调用传参发请求
export default reqAxios
