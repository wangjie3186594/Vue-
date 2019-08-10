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

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会调用 main.js，在刚调用的时候，先从本地存储中，吧购物车的数据读取出来，放到 store 中
let car = JSON.parse(localStorage.getItem('car') || '[]')

let store = new Vuex.Store({
  state: { // this,$store.state.***
    car: car // 将购物车中商品的数据，用一个数组存储起来 {id: 商品id, count:要购买的数量, price: 商品单价, selcecte: true // 是否被选中}
  },
  mutations: { //this.$store.commit('方法名', '按需传递的唯一参数')
    addToCar(state, goodsinfo){
      // 点击加入购物车，把商品信息，保存到store 的car 上

      // 假设在购物车中没有找到对应的商品
      let flag = false

      // 找到了
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          // console.log(item.count)
          flag = true
          return true
        }
      })
      // 如果最终循环完毕，得到 flag 还是 false，则把商品数据直接 push 到 购物车中
      if(!flag){
        state.car.push(goodsinfo)
      }

      // 当更新 car 之后，将 car 存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    undateGoodsInfo(state, goodsinfo){
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数量保存到本地存储
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id){
      // 根据id 值，删除 store 中对应的商品数据
      state.car.some((item, index) => {
        if(item.id == id){
          state.car.splice(index, 1)
          return true
        }
      })
      // 将删除完毕后最新的数据同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    undateGoodsSelected(state, info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      // 把最新的所有购物车中商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {  // this.$store.getters.***
    // 相当于 计算属性，也相当于计算属性
    getAllCount(state){
      let all = 0;
      state.car.forEach(item=> {
        all += item.count
      })
      return all
    },
    getGoodsCount(state){
      let corr = {}
      state.car.forEach(item => {
        corr[item.id] = item.count
      })
      return corr
    },
    getGoodsSelected(state){
      let a = {}
      state.car.forEach(item => {
        a[item.id] = item.selected
      })
      return a
    },
    // 计算购物车中商品的总数量以及总价
    getGoodsCountAndAmount(state){
      let o = {
        count: 0, //勾选的数量
        amount: 0 //勾选的总价
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

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
  render: h => h(App),
  store // 挂载 store 转台管理对象
})
