<template>
    <div class="goods-info">

        <!-- 小球 -->
        <transition 
            @before-enter="beforeEnter"
            @enter="Enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Swiper :arr="lunbotu" :isfull="false"></Swiper>
                </div>
            </div>
        </div>


        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价
                        <span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p class="shopp">
                        <span>购买数量：</span> 
                        <goods-number @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></goods-number>
                    </p>
                    <p>
                        <mt-button ty="primary" size="small" class="ae">立即购买</mt-button>
                        <mt-button ty="danger" size="small" class="as" @click="addFoShopp">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车，拿到选择的数量 -->
                        <!-- 1、经过分析，按钮属于 goodsinfo 页面，数字属于 numberbox 组件 -->
                        <!-- 2、涉及到父子组件的嵌套，所以无法直接在当前组件中获取 选中的商品数量值 -->
                        <!-- 3、如何解决：涉及到了 子组件向父组件传值(事件调用机制) -->
                        <!-- 4、事件调用本质：父向子传递方法，子调用这个方法，同时把 数据当做参数 传递给这个方法 -->
                    </p>
                </div>
            </div>
        </div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain  @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 引入轮播图组件
import Swiper from '../subcomponents/Swiper'
// 引入数字选择框
import GoodsNumber from '../goods/GoodsNumber'
export default {
    data() {
        return {
            id:this.$route.params.id, // 将路由参数中的 id 挂载到 data，方便调用
            lunbotu: [], // 存放轮播图数组
            goodsinfo: {}, // 存放商品参数的数组
            ballFlag: false, //小球的显示与隐藏
            selectedCound: 1 //用户选中的商品数量
        }
    },
    created() {
        this.getLunbo()
        this.getGoodsInfo()
        // this.goDesc()
        // this.goComment()
        this.getSelectedCount()
    },
    methods: {
        getLunbo(){
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if(result.body.status === 0){
                    // 在赋值之前循环数组的每一项，为 item 添加 img 属性，因为 :arr 只认识 item.img ，不认识 item.src
                    result.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.lunbotu = result.body.message
                    // console.log(this.goodslist)
                }
            })
        },
        // 获取商品的信息
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then( result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0]
                    // console.log(this.goodsinfo)
                }
            })
        },
        // 点击使用编程式导航跳转到 图文介绍页面
        goDesc(id){
            this.$router.push({name: 'goodsdesc', params: {id}})
        },
        // 点击跳转到评论页面
        goComment(id){
            this.$router.push({name: 'goodscomment', params: {id}})
        },
        // 控制小球的显示与隐藏
        addFoShopp(){
            this.ballFlag = !this.ballFlag
            // {id: 商品id, count:要购买的数量, price: 商品单价, selcecte: true // 是否被选中}

            // 拼接出一个要保存到 store 中 car 数组里的商品信息对象
            let goodsinfo = {id: this.id, count: this.selectedCound, price: this.goodsinfo.sell_price, selected: true}
            // console.log(goodsinfo.count)

            // 调用 sotre 中的 mutations 来将商品加入购物车
            this.$store.commit('addToCar',goodsinfo)
        },
        // 设置小球的初始动画样式
        beforeEnter(el){
            el.style.opacity = 1
            el.style.transform = "translate(0, 0)"
        },
        Enter(el, done){
            el.offsetWidth;

            // 小球动画优化思路
            // 1、分析导致 小球动画不准确的本质原因：我们把小球最终 位移到的位置已经局限在了某一分辨率下 滚动条未滚动的情况下
            // 2、只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后，问题就出现了
            // 结论：
                // 不能把小球的位移的横纵坐标写死，而是应该根据不同情况，动态计算这个坐标值
            // 解析思路：
                // 要先得到 徽标的 横纵坐标，再得到 小球的横纵坐标，然后让 y 值求差，x 值也求差，就是横纵坐标位移的距离
            // 如何获取徽标和小球的位置？
                // 用 domObject.getBoundingClientRect()

            // 获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            // 获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()

            const xDist = badgePosition.left - ballPosition.left
            const Ydist = badgePosition.top - ballPosition.top

            el.style.transform = `translate(${xDist}px, ${Ydist}px)`
            el.style.transition ='all .5s cubic-bezier(.4,-0.3,1,.68)'

            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
        // 
            this.selectedCound = count
            // console.log(this.selectedCound)
        }
    },
    components: {
        Swiper,
        GoodsNumber
    }
}
</script>

<style lang="less" scoped>
.goods-info{
    background: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
}
.shopp{
    display: flex;
    line-height: 31px;
}

.ae{
    background: blue;
    color: white;
}
.as{
    background: red;
    color: #fff;
}
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    z-index: 999;
    top: 509px;
    left: 146px;;
}
</style>
