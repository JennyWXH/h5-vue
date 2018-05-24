<template>
    <scroller lock-x use-pullup use-pulldown :height="pageHeight-0.1-0.6+'rem'" @on-pullup-loading="loadMore"
              @on-pulldown-loading="refresh" v-model="status" ref="scroller" :pulldown-config="pullDownConfig"
              :pullup-config="pullUpConfig">
        <slot name="content"></slot>
    </scroller>
</template>
<style lang="less" scoped>
    body .header-table {
        background-color: #eee;
        color: #333;
    }

    .app-header {
        /*filter:blur(10px);*/
        /*-webkit-filter:blur(10px);*/
        /*-moz-filter:blur(10px);*/
        /*-ms-filter:blur(10px);*/
        /*-o-filter:blur(10px);*/
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 1rem;
        z-index: 100;
        /*line-height: 0.5rem;*/
        /*filter:alpha(opacity=60);-moz-opacity:0.6;*/
        background: #ffffff;
        color: #333333;

    .h-left, .h-right {
        /*display: block;*/
        position: absolute;
        top: 0.2rem;
        z-index: 1000;
        width: 1rem;
        height: 0.6rem;
        text-align: center;

    img {
        width: 0.6rem;
        height: 0.5rem;
    }

    }
    .h-left {
        left: 0.05rem;
    }

    .h-right {
        right: 0.05rem;
    }

    .app-title {
        z-index: 101;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        height: 1rem;
        line-height: 1rem;
        width: 100%;
        text-align: center;
        font-size: 0.35rem;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .divider {
        display: block;
        position: absolute;
        float: left;
        width: 7.5rem;
        bottom: 0;
        left: 0rem;
        height: 0.05rem;
        background-color: #eeeeee;
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
            headerBg: String,
            titleBg: Boolean,
            showBack: Boolean,
            showDevider: Boolean,
            backAlpha: {
                type: Number,
                default: 1
            }
        },
        components: {
            Group
        },
        methods: {
            goBack(){
                window.history.back()
            }
        }
    }
</script>