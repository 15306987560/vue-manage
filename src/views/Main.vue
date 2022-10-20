<template>
  <div class="main-view">
    <el-container style="height:100%">
      <el-aside width="auto">
        <component-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <component-header/>
        </el-header>
        <el-main>
          <component-tag/>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import componentHeader from '@/components/componentHeader.vue'
import ComponentAside from '@/components/componentAside.vue'
import ComponentTag from '@/components/componentTag.vue'
export default{
  components: { componentHeader, ComponentAside, ComponentTag },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #333;
  padding: 0;
}
.el-main {
   padding:0 20px 20px;
}

</style>

