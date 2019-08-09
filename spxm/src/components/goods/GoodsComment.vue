<template>
    <div>
        <Comment :id="$route.params.id"></Comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/Comment'
export default {
    components: {
        Comment
    }
}
</script>

<style lang="less" scoped>

</style>
