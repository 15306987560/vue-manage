import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect:'/home',
    component: () => import('../views/Main.vue'),

    children:[]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



// 配置路由前置守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  console.log('路由将要去往：',to.name)
  if(!token && to.name != 'login'){
    // token不存在，且不是去login页面
    // 直接跳转到login页面，让用户登录
    next({name:'login'})
  }else if(token && to.name=='login'){
    // token已存在，说明用户还在登录状态，
    // 直接前往首页
    next({name:'user'})
  }else{
    next()
  }
})
export default router
