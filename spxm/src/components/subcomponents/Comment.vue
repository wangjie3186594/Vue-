<template>
    <div class="cmt-cont">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容(最多吐槽120字)"></textarea>
        <mt-button type="primary" siza="large" class="mui-btn mui-btn-primary ar">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in pageList" :key="item.add_time">
                <div class="cmt-title">
                    第 {{ index+1 }} 楼&nbsp;用户：{{ item.user_name }} &nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === "" ? "此用户很懒，什么都木的说" :  item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain class="mui-btn mui-btn-outlined as" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
    data() {
        return {
            pageIndex: 1, // 默认展示评论第一页数据
            pageList: []
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        //获取评论
        getComments(){
            this.$http.get("api/getcomments/"+ this.id +"?pageindex=" + this.pageIndex ).then(result => {
                if(result.body.status === 0){
                    // this.pageList = result.body.message
                    // 每当获取新评论数据不清空当前数据，而是拼接新数据
                    this.pageList = this.pageList.concat(result.body.message)
                    // console.log(this.pageList)
                }else{
                    Toast('获取评论数据失败')
                }
            })
        },
        // 加载更多评论
        getMore(){
            this.pageIndex ++;
            this.getComments()
        }
    },
    props: ["id"]
}
</script>

<style lang="less" scoped>
.cmt-cont{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .ar,.as{
        width: 100%;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
