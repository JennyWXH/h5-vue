<template>
    <div class="app-header" :style="{backgroundColor: 'rgba(255,255,255,' + backAlpha+')',background:headerBg}"
         :class="{ 'header-table': titleBg}">
        <p class="h-left">
            <slot name="left">
                <div v-if="backWhite">
                    <img class="backImg" src="../../assets/back.png" alt="" @click="goBack()" v-if="showBack">
                </div>
                <div v-else><img class="backImg" src="../../assets/back_high.png" alt="" @click="goBack()"
                                 v-if="showBack"></div>
            </slot>
        </p>
        <h1 class="app-title" :style="{color:titleColor}">{{title}}</h1>
        <p class="h-right">
            <slot name="right"></slot>
        </p>
        <div class="divider" v-if="showDevider"></div>
    </div>
</template>
<style lang="less" scoped>
    body .header-table {
        color: #333;
    }

    .app-header {
        /*filter:blur(10px);*/
        /*-webkit-filter:blur(10px);*/
        /*-moz-filter:blur(10px);*/
        /*-ms-filter:blur(10px);*/
        /*-o-filter:blur(10px);*/
        position: relative;
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
    }

    .h-left {
        left: 0.05rem;

    .backImg {
        position: absolute;
        top: 50%;
        left: 0.1rem;
        transform: translateY(-50%);
        width: 0.4rem;
        height: 0.4rem;
    }

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
        width: 50%;
        left: 25%;
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
            backWhite: Boolean,
            showDevider: Boolean,
            backAlpha: {
                type: Number,
                default: 1
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>
