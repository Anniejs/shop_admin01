import Vue from 'vue'
import App from './App'
import router from './router'
// 导入ElementUI插件
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式文件
import '@/assets/base.css'
// 使用eement-ui插件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
