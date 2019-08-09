<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="(item, index) in gooslist" :key="index" to="'/home/goodsinfo'+ item.id" tab="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中存在两种跳转方式， -->
        <!-- 1、使用 a 标签的形式，叫标签跳转 -->
        <!-- 2、使用 window.location href 的形式，叫 编程式导航 -->
        <div class="goods-item" v-for="(item, index) in gooslist" :key="index" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex: 1, //分页的页数
            gooslist: [] //存放商品列表的数组
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        // 获取商品列表
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+ this.pageindex).then( result => {
                if(result.body.status === 0){
                    // this.gooslist = result.body.message
                    this.gooslist = this.gooslist.concat(result.body.message)
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        goDetail(id){
        // 使用js的形式进行路由导航
            // console.log(this)
        // 注意:this.$route 是路由参数对象，所有路由中的参数， params，query都属于它
        //      this.$router 是一个路由导航对象，用它可以方便的 使用 js代码，实现路由的 前进、后退，跳转到新的 URL 地址

            // 2、传递对象跳转
            // this.$router.push({path: "/home/goodsinfo/" + id})
            // 3、传递一个命名的路由
            this.$router.push({name: "goodsinfo", params: {id} })
        }
    },
}
</script>

<style lang="less" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>