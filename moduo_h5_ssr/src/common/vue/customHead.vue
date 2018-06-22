<template>
    <div class="outside">
        <div class="devider" :style="{backgroundColor:titleColor}"></div>
        <span>{{title}}</span>
        <div class="sepline"></div>
    </div>
</template>
<style lang="less" scoped>
    .outside {
        width: 100%;
        height: 1rem;
        position: relative;
        margin-top: 0;

    .devider {
        position: relative;
        margin-top: 0.15rem;
        margin-left: 0.25rem;
        width: 0.13rem;
        height: 0.7rem;
        float: left;
        background-color: red;
    }

    span {
        font-size: 0.35rem;
        line-height: 1rem;
        float: left;
        display: inline-block;
        position: relative;
        margin-left: 0.3rem;
    }

    .sepline {
        display: block;
        position: relative;
        float: left;
        /*top: 0.97rem;*/
        height: 0.01rem;
        opacity: 0.3;
        margin-left: 0.25rem;
        width: 7rem;
        background-color: gray;
    }

    }
</style>
<script>
    export default {
        data () {
            return {
                isB: true
            }
        },
        props: {
            title: String,
            titleColor: String,
            fontSize: String,
            titleBg: Boolean
        }
    }
</script>
