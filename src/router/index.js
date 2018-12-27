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
const router = new Router({
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
// 给router对象注册导航守卫
// to: 要去哪儿
// from: 从哪儿来
// next: 是否放行   next(): 方向  next('/login')  next('/home')
router.beforeEach((to, from, next) => {
  // 判断如果是去登录就放行
  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是去登录，就判断有没有token，如果有就放行
  // 如果没有token就去登录
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
