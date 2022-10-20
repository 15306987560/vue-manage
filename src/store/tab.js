export default {
  state:{
    //菜单区展开状态
    isCollapse:false,
    //面包屑数据
    tabsList:[
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home.vue'
      },
    ],
    // 当前账户权限菜单数据
    menu:sessionStorage.getItem('menu') || [],
    token:sessionStorage.getItem('token') || ''
  },
  mutations:{
    //修改菜单展开或收起的状态变量
    updataCollapse(state){
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑导航
    selectMenu(state,item){
      console.log(state.tabsList)
      // 判断item是否为首页x选项的数据
      if(item.path !== '/home') {
        // 判断点击项的数据是否已存在
        const index = state.tabsList.findIndex(val => val.name == item.name)
        // 不存在则存入变量
        if(index == -1) {
          state.tabsList.push(item)
          
        }
      }else{return}
    },
    CloseTag(state,item){
      const index = state.tabsList.findIndex(val => val.name == item.name)
      state.tabsList.splice(index,1)
    },
    //存入token
    setToken(state,token){
      state.token = token
      sessionStorage.setItem('token',token)
    },
    //存入权限数据
    setMenu(state,menu){
      state.menu = menu
      sessionStorage.setItem('menu',JSON.stringify(menu))
    },
    //动态配置路由
    addMenu(state,router){
      // 判断缓存中是否有数据
      if(!sessionStorage.getItem('menu'))return
      const menu = JSON.parse(sessionStorage.getItem('menu'))
      // 组装路由
      const menuArray = []
      menu.forEach(item => {
        if(!item.children){
          //首先组装没有子路由的
          item.component = ()=>import(`../views/${item.url}`)
          menuArray.push(item)
        }else{
          item.component = item.children.map(val => {
            val.component = () => import(`../views/${val.url}`)
            return val
          })
          menuArray.push(...item.component)
        }
      });
      menuArray.forEach(item => {
        router.addRoute('main',item)
      })
    },
    // 用户退出登录，删除token及menu的方法
    deleteData(state){
      state.menu = []
      state.token = ''
      sessionStorage.removeItem('menu')
      sessionStorage.removeItem('token')
    }
  }
}