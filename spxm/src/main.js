import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/examples/hello-mui/css/icons-extra.css'
import './assets/dist/css/mui.min.css'
import {Button} from 'mint-ui'

Vue.config.productionTip = false

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'

// 导入时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattrn = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattrn)
})

Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
