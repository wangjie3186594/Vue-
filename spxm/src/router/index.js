import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Huiyuan from '@/components/Huiyuan'
import Shopp from '@/components/Shopp'
import Search from '@/components/Search'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'

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
    {
      path: '/home/newslist',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/home/NewsInfo/:id',
      name: 'NewsInfo',
      component: NewsInfo
    },
  ]
})
