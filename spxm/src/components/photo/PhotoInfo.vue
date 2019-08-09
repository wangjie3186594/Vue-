<template>
    <div class="photo-title">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="sumimg">
            <vue-preview :slides="getThumbs()"></vue-preview>
        </div>
        
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 现成评论子组件 -->
        <Comment :id="id"></Comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/Comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, // 从路由中获取图片的id
            photoinfo: [],
            list: [] // 缩略图数组
        }
    },
    created() {
        this.getPhotoInfo(),
        // 获取图片数据
        this.$http.get('api/getthumimages/' + this.id).then(result => {
            if(result.body.status === 0){
                this.list = result.body.message
            }
        })
    },
    methods: {
        // 获取图片的详情
        getPhotoInfo(){
            this.$http.get('api/getimageinfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }
            })
        },
        // 获取缩略图
        getThumbs(){
            this.list.forEach( img => {
                img.src = img.src
                img.msrc = img.src
                img.w = 600
                img.h = 400
            })
            return this.list;
        }
    },
    components: {
        Comment
    }
}
</script>

<style lang="less" scoped>
.photo-title{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
        font-weight: 700;
    }
}

</style>
