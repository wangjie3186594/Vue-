<template>
    <div>
        <!-- 轮播图区域 -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../assets/image/1.jpg"></div>
                <div class="swiper-slide"><img src="../assets/image/2.jpg"></div>
                <div class="swiper-slide"><img src="../assets/image/3.jpg"></div>
                <div class="swiper-slide"><img src="../assets/image/4.jpg"></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <!-- 九宫格区域 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </a>
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
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource)

import '../assets/dist/css/mui.min.css'
import MintUi from 'mint-ui';

import Swiper from 'swiper';
import '../assets/css/swiper.css'

export default {
    data() {
        return {
            
        }
    },
    created() {
        // this.getLunbotu()
    },
    methods: {
        // 获取轮播图数据的方法
        getLunbotu(){
            // this.$http.get('http://vue.studyit.io/api/getlunbo').then( result => {
            //     console.log(result.body)
            // })
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
}
</script>

<style lang="less" scoped>
.swiper-container{
    width: 100%;
    height: 300px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>
