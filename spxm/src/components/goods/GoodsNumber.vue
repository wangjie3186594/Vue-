<template>
    <div>
        <!-- 不知道什么时候能拿到 max 值 -->
        <!-- 我们可以使用 watch 属性监听父组件传递过来的 max 值，不管 watch 会被触发几次，但最后一次肯定会是一个 正确的值 -->
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
        <!-- 分析：子组件什么情况下传递给父组件值？ -->
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
            // 每当文本框的值被改变的时候，将值传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getCount',parseInt(this.$refs.numbox.value));
        }
    },
    props: ['max'],
    watch: {
        'max': function(newVal, oldVal){
            mui(".mui-numbox").numbox().setOption('max', newVal)
        }
    },
}
</script>

<style lang="less" scoped>

</style>
