<template>
  <div class="component-aside">
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>通用后台管理系统</h3>
      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.icon">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="val in item.children" :key="val.path" :index="val.path" @click="clickMenu(val)">{{val.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenu } from "../api/index";
export default {
  data() {
    return {
      menu:[]
    };
  },
  methods: {
     //点击切换页面
    clickMenu(path){
      //为避免页面重复跳转，需判断点击项是否为当前页面path
      if(path.path == this.$route.path || (this.$route.path == '/' && path =='/home')) return
      this.$router.push(path.path)
      // 将每次点击的数据加入面包屑变量
      this.$store.commit('selectMenu',path)
    }
  },
  computed: {
    //获取菜单列表中没有子选项的数据
    noChildren(){
      return this.menu.filter(item => !item.children)
    },
    //获取菜单列表中有子选项的数据
    hasChildren(){
      return this.menu.filter(item => item.children)
    }
  },
  mounted() {
    //获取权限菜单列表数据
    getMenu({
      username: "admin",
      password: "admin",
    }).then(({data}) => {
      this.menu = data.data.menu
      console.log(data.data.menu)
    });
  },
};
</script>

<style lang="scss" scoped>
.component-aside {
  width: 200px;
  min-height: 400px;
  color: #fff;
  .el-menu {
    height: 100vh;
    user-select: none;
    border-right-width: 0px !important;
    h3{
      font-size: 16px;
      line-height: 48px;
      text-align: center;
    }
  }
}
</style>
