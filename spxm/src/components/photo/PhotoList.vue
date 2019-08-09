<template>
    <div class="mui-content">
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);transition-duration: 0ms;transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);position: absolute;z-index: 1;">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : ''] " v-for="item in cates" :key="item.id" @click="getImages(item.id)">  {{ item.title }}</a>
                </div>
            </div>
        </div>
        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+ item.id" v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1> {{ item.title }} </h1>
                    <b> {{ item.zhaiyao }} </b>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 导入mui的js 
import mui from '../../assets/dist/js/mui.min.js'

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
})
export default {
    data() {
        return {
            cates: [], // 所有分类列表数组
            list: [] // 图片列表的数组
        }
    },
    created() {
        this.getAllCate()
        this.getImages(0)
    },
    methods: {
        // 获取所有的图片分类
        getAllCate(){
            this.$http.get("api/getimgcategory").then(result => {
                if(result.body.status === 0){
                    result.body.message.unshift({title: "全部", id: 0})
                    this.cates = result.body.message
                    // console.log(this.cates)
                }else{

                }
            })
        },
        // 根据 分类id 获取图片列表
        getImages(cateId){
            this.$http.get('api/getimages/'+ cateId).then(result => {
                if(result.body.status === 0){
                    this.list = result.body.message
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
*{
    touch-action: pan-y;
}


.photo-list{
    margin: 0;
    padding: 8px;
    padding-bottom: 0;
    li{
        background: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 8px #999;
        position: relative;
        cursor: pointer;
        img{
            width: 100%;
            vertical-align: middle;
            position: relative;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            text-overflow: ellipsis;
            // white-space: nowrap;
            overflow: hidden;
            h1{
                font-size: 14px;
            }
            b{
                font-size: 13px;
            }
        }
    }
}
</style>
