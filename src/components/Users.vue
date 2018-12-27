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
  <el-button type="success" plain>成功按钮</el-button>
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
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      baseUrl: 'http://localhost:8888/api/private/v1/'
    }
  },
  created() {
    // 在钩子函数created里面一有数据就开始发送请求
    this.getUserList()
  },
  methods: {
    getUserList() {
      axios({
        method: 'get',
        url: this.baseUrl + 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.meta.status === 200) {
          this.userList = res.data.data.users
          this.total = res.data.data.total
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
      axios({
        method: 'put',
        url: this.baseUrl + `users/${user.id}/state/${user.mg_state}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.meta.status === 200) {
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
          axios({
            method: 'delete',
            url: this.baseUrl + `users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res.data)
            // 当状态码为200时说明成功就重新渲染
            if (res.data.meta.status === 200) {
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
