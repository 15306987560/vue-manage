<template>
  <div class="component-tag">
    <el-tag v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!='home'" :type="tag.type" size="mini" @click="changMenu(tag)" @close="handleClose(tag,index)" :effect="tag.path==$route.path?'dark':'plain'">{{tag.label}}</el-tag>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      
      }
    },
    computed:{
      tags(){
        return this.$store.state.tab.tabsList
      }
    },
    methods:{
      // 点击标签跳转页面
      changMenu(item){
        if(item.path==this.$route.path)return
        this.$router.push(item.path)
      },
      // 点击标签关闭
      handleClose(item,index){
        // 调用修改面包屑数据的方法
        this.$store.commit('CloseTag',item)
        // 删除完对应的标签后，执行跳转页面
        const length = this.tags.length
        console.log(index,length)
        if(item.path != this.$route.path)return
        if(index == length){
          //关闭的是最后一个标签
          this.$router.push(this.tags[index-1].path)
        }else{
          //关闭的是中间标签
          this.$router.push(this.tags[index].path)
        }

      }
    },
  }
</script>

<style lang="scss" scoped>
  .component-tag {
    padding: 20px;
    .el-tag{
      margin-right: 15px;
    }
  }
</style>