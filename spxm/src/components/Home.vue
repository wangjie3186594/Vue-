<template>
    <div class="box">
        <!-- 轮播图区域 -->
        <Swipers :arr="arr" :isfull="true"></Swipers>

        <!-- 九宫格区域 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9" style="margin-top:0">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photolist">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul> 
        </div>


    </div>
</template>

<script>
// 按需导入 swiper 的组件
import '../../node_modules/mint-ui/lib/swipe/style.css'
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


import Vue from 'vue';

// 引入 vue-resource 的组件
import VueResource from 'vue-resource';
Vue.use(VueResource)

// 引入 mui-ui 的组件
import '../assets/dist/css/mui.min.css'
import MintUi from 'mint-ui';

// 引入 swiper 组件
import Swiper from 'swiper';
import '../assets/css/swiper.css'

// 引入轮播图组件
import Swipers from './subcomponents/Swiper'

export default {
    data() {
        return {
            arr: []
        }
    },
    created() {
        this.getLunbotu()
    },
    methods: {
        // 获取轮播图数据的方法
        getLunbotu(){
            this.$http.get('api/getlunbo').then( result => {
                // console.log(result.body)
                this.arr = result.body.message
                // console.log(this.arr)
            })
        }
    },
    mounted() {
        let mySwiper2 = new Swiper(".swiper-container", {
            direction: "horizontal",
            loop: true,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    components:{
        Swipers
    }
}
</script>

<style lang="less" scoped>
.box{
    overflow-x: hidden;
}

</style>
