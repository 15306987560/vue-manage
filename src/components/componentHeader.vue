<template>
  <div class="component-header">
    <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  computed:{
    
  }
};
</script>

<style lang="scss" scoped>
.component-header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
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
}
</style>
