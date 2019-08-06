import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Huiyuan from '@/components/Huiyuan'
import Shopp from '@/components/Shopp'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/huiyuan',
      name: 'Huiyuan',
      component: Huiyuan
    },
    {
      path: '/shopp',
      name: 'Shopp',
      component: Shopp
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
