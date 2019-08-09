<template>
    <div>
        <mt-swipe>
            <!-- 此时的 arr 应该是 父组件向子组件传值设置 -->
            <mt-swipe-item v-for="(item, index) in arr" :key="index">
                <img :src="item.img" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
    <!-- 
        分析：为什么商品评论中的 轮播图 样式难看？ 
            1、首页中的图片宽高都使用了 100% 的宽度
            2、在商品详情页，轮播图的图片，假如也使用 100% 布局，难看
            3、商品详情页中的轮播图，期望 高度是 100%，宽度自适应
    -->
    
<script>
export default {
    props: ['arr', 'isfull'],
}
</script>

<style lang="less" scoped>
.mint-swipe{
    height: 300px;
    .mint-swiper-item{
        text-align: center;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .mint-swipe-indicator.is-active{
        background: black;
    }
}
.full{
    width: 100%;
}
</style>
