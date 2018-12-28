import Vue from 'vue'
import App from './App'
import router from './router'
// 导入ElementUI插件
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式文件
import '@/assets/base.css'
/*
  解决每个都需要引入axios的问题
    把axios绑定到Vue的原型上
*/
import axios from 'axios'
Vue.prototype.axios = axios
// 给axios设置一个全局的默认的baseUrl
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 配置axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // console.log('你被拦截了', config)
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  function(res) {
  // 对响应数据做点什么
  // 响应拦截的时候直接返回res.data就是需要数据
    return res.data
  }, function(error) {
  // 对响应错误做点什么
    return Promise.reject(error)
  })
// 使用eement-ui插件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
