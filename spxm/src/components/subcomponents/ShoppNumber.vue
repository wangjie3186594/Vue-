<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' style="height: 25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="init" @change="countChanged" ref="numbox" readonly/>
            <!-- readonly：只读 不能修改 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../assets/dist/js/mui.min.js'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        // 初始化数字选择框
        mui('.mui-numbox').numbox()
        // console.log(this.max)
    },
    methods: {
        countChanged(){
            // 数量改变了
            // console.log(this.$refs.numbox.value)
            this.$store.commit('undateGoodsInfo', {
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ['init', 'goodsid']
}
</script>

<style lang="less" scoped>

</style>
