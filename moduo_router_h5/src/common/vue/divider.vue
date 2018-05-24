<template>
    <div class="divider"></div>
</template>
<style lang="less" scoped>
    .divider {
        display: block;
        float: left;
        width: 7.5rem;
        margin-left: -0.1rem;
        height: 0.07rem;
        background-color: #eeeeee;
    }
</style>
<script>
    export default {
        data () {
            return {}
        },
        props: {
            title: String,
            titleColor: String,
            headerBg: String,
            titleBg: Boolean
        }
    }
</script>
