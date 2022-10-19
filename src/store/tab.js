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
    menu:[]
  },
  mutations:{
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
    }
  }
}