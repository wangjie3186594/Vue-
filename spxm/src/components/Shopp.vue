<template>
    <div class="shopp-contair">
        <div class="goods-list">

        
            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item, index) in goodslist" :key="index">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]" 
                        @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>  {{item.title}} </h1>
                            <p>
                                <span class="price">￥{{item.sell_price}} </span>
                                <ShoppNumber :init="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></ShoppNumber>
                                <!-- 如何能从购物车中获取商品的数量？ -->
                                <!-- 我们可以先创建一个空对象，然后哦循环购物车中所有商品的数量，把 当前循环这条商品的 ID，作为对象的属性名，count值作为对象的属性值，这样，当把所有的商品循环一遍，就会得到一个对象 
                                {88: 2, 90: 4, 91: 5}
                                88:ID值   2:数量
                                 -->
                                <a href="###" @click.prevent="remove(item.id, index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red"> {{$store.getters.getGoodsCountAndAmount.count}} </span> 件，总价<span class="red"> ￥ 
                            {{$store.getters.getGoodsCountAndAmount.amount}}</span> </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <!-- <p> {{$store.getters.getGoodsSelected}} </p> -->
    </div>
</template>

<script>
import ShoppNumber from './subcomponents/ShoppNumber'
export default {
    data() {
        return {
            goodslist: [] //购物车中所有商品的数据
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            // 获取 到 store 中所有商品的id，然后拼接处一个 用逗号分割的 字符串
            let idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id))
            // idArr有可能是空的 所以请求数据会报错 所以请求之前先判断一下
            if(idArr.length <= 0){
                return
            }
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            })
        },
        remove(id, index){
            // 点击删除，把商品从 store 中根据传递 id 删除，把当前组件中 goodslist 中的对应删除的那个商品，使用 index 来删除
            this.goodslist.splice(index,1)
            this.$store.commit('removeFormCar', id)
        },
        selectedChange(id, val){
            // 每当点击开关，把最新的开关状态 同步到 store 中
            // console.log()
            this.$store.commit('undateGoodsSelected', {id, selected: val})
        }
    },
    components: {
        ShoppNumber
    }
}
</script>

<style lang="less" scoped>
.shopp-contair{
    background: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
            }
            .price{
                color: red;
            }
        }
    }
}
.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
