<template>
    <div class="app-intro">
        <p class="h-title" :class="{custom:gray}">
            <slot name="left"><img v-if="showSrc" class="img" :src="src"><span class="title">{{title}}</span><span
                    class="tip">{{tip}}</span>
                <slot name="middle"></slot>
            </slot>
        </p>
        <div class="divider" v-if="showDevider"></div>
        <p class="h-content">
            <slot name="right"><span>{{content}}</span></slot>
        </p>

    </div>
</template>
<style lang="less" scoped>
    .app-intro {
        background-color: white;
        width: 100%;
        font-size: 0;

    .h-title, .h-content {
        width: 100%;
        font-size: 0;
        display: inline-block;
        text-align: left;

    .img, .title, .tip {
        display: inline-block;
        float: left;
    }

    .img {
        width: 0.5rem;
        height: 0.5rem;
    }

    .title {
        margin-left: 0.2rem;
        color: rgba(79, 80, 81, 1);
        line-height: 0.5rem;
        text-align: justify;
        font-size: 0.31rem;
        white-space: normal;
    }

    .tip {
        margin-left: 0.05rem;
        color: gray;
        line-height: 0.5rem;
        text-align: justify;
        font-size: 0.3rem;
        white-space: normal;
    }

    }
    .custom {
        background-color: rgb(228,228,228);
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
    }
    .h-title {
        margin-top: 0.2rem;
        margin-bottom: 0.1rem;
        font-weight: 500;
    }

    .h-content {
        margin-top: 0.02rem;
    }

    .divider {
        display: block;
        float: left;
        width: 7.4rem;
        margin-top: 0.05rem;
        margin-left: 0.15rem;
        height: 0.03rem;
        background-color: #eeeeee;
    }

    }

</style>
<script>
    export default {
        data () {
            return {
//        showDevider: true
            }
        },
        props: {
            gray: {
                type: Boolean,
                default: false
            },
            showSrc: {
                type: Boolean,
                default: false
            },
            src: {
                type: String,
                default: '../../../static/mine/mine_circle.png'
            },
            title: {
                type: String,
                default: ''
            },
            tip: String,
            content: String,
            showDevider: Boolean
        }
    }
</script>
