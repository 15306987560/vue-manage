// 引入mockjs工具
import Mock from 'mockjs'
// 引入mockjs数据文件
import homeApi from './mockData/home'
import permission from './mockData/permission'
import user from './mockData/user'

// 定义mock请求拦截
// 拦截首页请求
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)


// 用户列表的数据
//列表菜单数据(登录用户的权限不同，数据也不同)
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
// 用户数据请求
Mock.mock(/api\/user\/get/,'get',user.getUserList)
//新增用户数据
Mock.mock(/api\/user\/add/,'post',user. createUser)
// 修改用户数据
Mock.mock('/api/user/edit','post',user.updateUser)
// 删除数据
Mock.mock('/api/user/del','post',user.deleteUser)