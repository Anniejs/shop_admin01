<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click='searchUser'></el-button>
  </el-input>
  <el-button type="success" plain @click='showAdd'>用户添加</el-button>
    <!-- 表格 -->
<el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态"
        width="200">
        <template slot-scope="scope">
          <el-switch
            @change='changeState(scope.row)'
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" size='mini' circle plain></el-button>
           <el-button type="danger" icon="el-icon-delete" size='mini' circle plain @click='delUser(scope.row.id)'></el-button>
           <el-button type="success" icon="el-icon-check" size='mini' round plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%">
        <el-form :model='addForm' ref='addForm' label-width="80px" :rules="rules" status-icon>
          <el-form-item label="用户名" prop='username'>
            <el-input v-model='addForm.username' placeholder="请输入用户名"></el-input>
          </el-form-item>
           <el-form-item label="密码" prop='password'>
            <el-input v-model='addForm.password' placeholder="请输入密码" type='password'></el-input>
          </el-form-item>
           <el-form-item label="邮箱" prop='email'>
            <el-input v-model='addForm.email' placeholder="请输入邮箱"></el-input>
          </el-form-item>
           <el-form-item label="电话" prop='mobile'>
            <el-input v-model='addForm.mobile' placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='addUser'>确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        email: [
          {type: 'email', message: '请输入一个合法的邮箱地址', trigger: 'change'}
        ],
        mobile: [
          {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    // 在钩子函数created里面一有数据就开始发送请求
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      }).then(res => {
        // console.log(res.data)
        if (res.meta.status === 200) {
          this.userList = res.data.users
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    },
    changeState(user) {
      this.axios({
        method: 'put',
        url: `users/${user.id}/state/${user.mg_state}`
      }).then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.$message.success('修改成功')
          this.getUserList()
        }
      })
    },
    searchUser() {
      this.currentPage = 1
      this.getUserList()
    },
    delUser(id) {
      this.$confirm('您确定要删除该用户吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          // 说明点击的是确定按钮，就发生ajax请求去带着id去向服务器发送请求去让数据库删除对应id的数据
          this.axios({
            method: 'delete',
            url: `users/${id}`
          }).then(res => {
            // console.log(res.data)
            // 当状态码为200时说明成功就重新渲染
            if (res.meta.status === 200) {
              if (this.userList.length <= 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getUserList()
              this.$message.success('删除成功')
            }
          })
        })
        .catch(() => {
          this.$message.error('取消删除')
        })
    },
    showAdd() {
      this.addDialogVisible = true
    },
    // 1. 给用户注册点击事件
    // 2. 弹出一个模态框
    // 3. 在模态框中放入一个表单组件
    // 4. 给表单组件添加校验
    // 5. 点击确定，给表单校验，校验成功了，需要发送ajax请求
    // 6. ajax请求成功了
    //    1. 关闭模态框
    //    2. 重新渲染页面
    //    3. 重置样式
    //    4. 给一个提示的消息

    addUser() {
      this.$refs.addForm.validate((valid) => {
        // 如果校验不成功就直接return掉
        if (!valid) return false
        // 校验成功就发送请求
        this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm

        }).then(res => {
          if (res.meta.status === 201) {
            // 重置表单
            this.$refs.addForm.resetFields()
            // 关闭对话框
            this.addDialogVisible = false
            // 重新渲染
            this.total++
            this.currentPage = Math.ceil(this.total / this.pageSize)
            this.getUserList()
            // 显示提示 消息
            this.$message.success('添加用户成功')
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      }
      )
    }

  }
}
</script>

<style lang='less'>
.el-breadcrumb {
  margin-bottom: 10px;
}
.el-input {
  width: 400px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
