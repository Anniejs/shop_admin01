<template>
<div class="login">
<el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
  <img src="../assets/avatar.jpg" alt="">
     <el-form-item label="用户名" prop='username'>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop='password'>
        <el-input @keyup.enter.native='login' v-model="form.password" placeholder="请输入密码" type='password'></el-input>
     </el-form-item>
     <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
</el-form>
</div>
</template>

<script>
// 引入axios
// import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    reset() {
      // 重置表单
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(valid => {
        // 说明没有校验成功就直接给阻止掉
        if (!valid) return false
        // 校验成功，发送ajax请求，请求数据
        this.axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          // console.log(res.data)
          if (res.meta.status === 200) {
            // 说明登录是成功的
            // 显示登录成功的提示信息
            this.$message({
              message: '登录成功了',
              type: 'success',
              duration: 1000
            })
            // 实现状态保持
            // 1-把token给存到localstroage里面
            localStorage.setItem('token', res.data.token)
            // 2- 转到首页组件
            this.$router.push('/home')
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      })
      console.log('submit!!')
    }
  }
}
</script>

<style lang='less'>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 20px;
    margin: 200px auto;
    padding: 75px 40px 15px;
    position: relative;
    img {
      width: 120px;
      height: 120px;
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 10px solid #fff;
    }
  }
}
</style>
