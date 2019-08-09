import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import './assets/examples/hello-mui/css/icons-extra.css'
import './assets/dist/css/mui.min.css'

// 按需导入 Mint-UI 中的组件
// import {Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


// 引入 Lazyload 懒加载
// Vue.use(Lazyload)

Vue.config.productionTip = false


// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 是表单数据的组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

// 导入时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattrn = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattrn)
})

// 安装 图片预览 插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
