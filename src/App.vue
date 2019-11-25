<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
  .el-header {
    background-color: #FFFFFF;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  a {
  text-decoration: none;
  }
 a:active{
        color:none; /*这是鼠标点击后*/
    }
.router-link-active {
  text-decoration: none;
  color:none;
}
</style>


<script>

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
}
</script>


