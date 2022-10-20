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


// 请求用户数据
export const getUser = (data) =>{
  return  http.get('/user/get',data)
  
}


//新增用户数据
export const addUser = (data) => {
  return http.post('/user/add',data)
}

//修改用户数据
export const editUser = (data) => {
  return http.post('/user/edit',data)
}


//删除用户数据
export const delUser = (data) => {
  return http.post('/user/del',data)
}