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
    <el-aside width="200px">
       <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      router
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/users">
             <i class="el-icon-menu"></i>
             <span>用户列表</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
             <i class="el-icon-menu"></i>
             <span>角色列表</span>
          </el-menu-item>
           <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
             <span>权限列表</span>
           </el-menu-item>
      </el-submenu>
     </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 弹出一个确认框
      this.$confirm('您确定要退出系统吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          // 到这一步表示点击了确定
          // 移除存储的token
          localStorage.removeItem('token')
          // 跳转到登录页
          this.$router.push('/login')
          // 显示提示信息
          this.$message.success('退出成功')
        })
        .catch(() => {
          this.$message.error('取消退出')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    padding: 0;
    width: 100%;
    height: 60px;
    background-color: #b3c1cd;
    display: flex;
    .logo {
      width: 200px;
      background-image: url('../assets/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
    .title {
      flex: 1;
      h1 {
        color: #fff;
        font-weight: 800;
        text-align: center;
        line-height: 60px;
      }
    }
    .logout {
      width: 200px;
      // text-align: center;
      line-height: 60px;
      text-align: right;
      font-weight: 700;
      a {
        color: orange;
      }
    }
  }
  .el-aside {
    height: 100%;
    width: 200px;
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
