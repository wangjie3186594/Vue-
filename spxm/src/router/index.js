import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Huiyuan from '@/components/Huiyuan'
import Shopp from '@/components/Shopp'
import Search from '@/components/Search'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photo/PhotoList'
import PhotoInfo from '@/components/photo/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GoodsDesc from '@/components/goods/GoodsDesc'
import GoodsComment from '@/components/goods/GoodsComment'

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
    {
      path: '/home/photolist',
      name: 'PhotoList',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      name: 'PhotoInfo',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      name: 'GoodsInfo',
      component: GoodsInfo,
      name: 'goodsinfo'
    },
    {
      path: '/home/goodsdesc/:id',
      name: 'GoodsDesc',
      component: GoodsDesc,
      name: 'goodsdesc'
    },
    {
      path: '/home/goodscomment/:id',
      name: 'GoodsComment',
      component: GoodsComment,
      name: 'goodscomment'
    },
  ]
})
