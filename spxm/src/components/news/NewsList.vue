<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in list" :key="index">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1> {{ item.title }} </h1>
                        <p class='mui-ellipsis'>
                            <!-- dateFormat('YYYY-MM-DD') 可以传参 -->
                            <span>发表时间：{{item.add_time | dateFormat }}</span>
                            <span>点击：{{item.click}}次 </span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        // 获取新闻列表
        getNewsList(){
            this.$http.get('api/getnewslist').then(result => {
                if(result.body.status === 0){
                    this.list = result.body.message
                    console.log(this.list)
                }else{
                    Tost('获取新闻列表失败')
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
