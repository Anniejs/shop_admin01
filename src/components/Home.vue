<template>
<el-container>
  <el-header>
    <div class="logo"></div>
    <div class="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="logout">欢迎光临
      <a href="javascript:;" @click='logout'>退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      // 弹出一个确认框
      this.$confirm('您确定要退出系统吗？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        // 到这一步表示点击了确定
        // 移除存储的token
        localStorage.removeItem('token')
        // 跳转到登录页
        this.$router.push('/login')
        // 显示提示信息
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.error('取消退出')
      })
    }
  }
}
</script>

<style lang='less'>
.el-container{
  width: 100%;
  height: 100%;
  .el-header{
    padding: 0;
    width: 100%;
    height: 60px;
    background-color: #B3C1CD;
    display: flex;
    .logo{
      width: 200px;
      background-image: url('../assets/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
    .title{
      flex: 1;
      h1{
        color: #fff;
        font-weight: 800;
        text-align: center;
        line-height: 60px;
      }
    }
    .logout{
      width: 200px;
      // text-align: center;
      line-height: 60px;
      text-align: right;
      font-weight: 700;
      a{
        color: orange;
      }
    }
  }
  .el-aside{
    height: 100%;
    width: 200px;
    background-color: #545C64;
  }
  .el-main{
    background-color: #D4DFE4;
  }
}
</style>
