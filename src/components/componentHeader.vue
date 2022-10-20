<template>
  <div class="component-header">
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini" @click="showMenu"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="quitLogin">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="quitLogin">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    //展开或收起菜单
    showMenu(){
      this.$store.commit('updataCollapse')
    },
    //退出登录
    quitLogin(val) {
      if (val == "quitLogin") {
        //调用vuex中的deleteData方法，退出登录
        this.$store.commit("deleteData");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    // 通过监听属性获取tab状态树中的面包屑数据
    // 当数据发生变化时，页面也会重新渲染
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="scss" scoped>
.component-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      background-color: #fff;
      color: #606266;
      border-color: #606266;
      margin-right: 20px;
    }
    .el-button:hover,
    .el-button:focus {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    .el-breadcrumb {
      ::v-deep .el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;
          &.is-link {
            color: #777;
          }
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: #fff !important;
          }
        }
      }
    }
  }
  .r-content {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
