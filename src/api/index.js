import http from '../utils/axios'


// 请求首页数据
export const  getData = async () => {
  const data = await http.get('/home/getData')
  return data
}


// 请求菜单列表数据
export const getMenu = (data) => {
  // const obj = await http.post('/permission/getMenu',data)
  return http.post('/permission/getMenu',data)
}