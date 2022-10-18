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

    children:[
      {path:'/home',name:'home',component:() => import('../views/Home.vue')},
      {path:'user',name:'user',component:() => import('../views/User.vue')},//用户管理
      {path:'mall',name:'mall',component:() => import('../views/Mall.vue')},//商品管理
      {path:'page1',name:'page1',component:() => import('../views/PageOne.vue')},//页面1
      {path:'page2',name:'page2',component:() => import('../views/PageTwo.vue')},//页面2
    ]
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

export default router
