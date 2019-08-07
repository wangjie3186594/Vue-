<template>
    <div class="newsinfo">
        <!-- 标题 -->
        <h3 class="title"> {{ newsInfo[0].title }} </h3>
        <!-- 发表时间 -->
        <p class="subtitle">
            <span> 发表时间：{{ newsInfo[0].add_tiem | dateFormat}} </span>
            <span>点击：{{ newsInfo[0].click }}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo[0].content"></div>
        <!-- 评论区域 -->
        <Comment :id="this.id"></Comment>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
// 导入评论子组件
import Comment from '../subcomponents/Comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsInfo: {}
        }
    },
    created() {
        this.newsList()
    },
    methods: {
        newsList(){
            this.$http.get('api/getnew/' + this.id).then(reslut => {
                if(reslut.body.status === 0){
                    this.newsInfo = reslut.body.message
                    console.log(this.newsInfo)
                }else{
                    Toast('获取数据失败')
                }
            })
        }
    },
    components:{
        Comment
    }
}
</script>

<style lang="less">
.newsinfo{
    width: 100%;
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: salmon;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
