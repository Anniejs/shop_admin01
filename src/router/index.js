import Vue from 'vue'
import Router from 'vue-router'
// @表示src的绝对路径
import Home from '@/components/Home'

import Login from '@/components/Login'
// 导入users组件
import Users from '@/components/Users'
Vue.use(Router)
/*
  如何配置嵌套路由
  1. 给某个路由规则，使用children属性，可以配置当前路由的子路由
  2. app.vue中router-view,顶层出口， 还需要在当前组件中使用router-view,用于显示子路由
*/
export default new Router({
  routes: [

    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // 用于配置home路由的子路由
      children: [{
        path: '/users',
        component: Users
      }]
    }
  ]
})
