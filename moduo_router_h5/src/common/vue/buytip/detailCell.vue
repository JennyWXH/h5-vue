<template>
    <div style="font-size: 0;background-color: white;display: inline-block">
        <div v-if="show" class="loading">
            <div class="load-box" @touchstart @touchmove>
                <span class="detailTitle">{{name}}</span>
                <span class="detail" v-html="detail">
</span>
            </div>
            <a @click="cancel()">关闭</a>
        </div>
        <div class="divider top" v-if="showTopDevider"></div>
        <a @click="goDetail()">
            <img v-if="showImg" class="left" :src="src" alt="">
            <span :style="{left:showImg?'0.8rem':'0.3rem'}" class="title">{{name}}</span>
            <img class="right" src="../../../assets/more.png" alt="">
        </a>
        <div class="divider middle"></div>
        <span class="content">{{content}}</span>
        <div class="divider bottom" v-if="showBottomDevider"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                detail: '',
                title: '',
            }
        },
        props: {
            src: {
                type: String,
                default: ''
            },
            showImg: {
                type: Boolean,
                default: true
            },
            showTopDevider: {
                type: Boolean,
                default: true
            },
            showBottomDevider: {
                type: Boolean,
                default: true
            },
            content: null,
            name: null
        },
        computed: {},
        created() {
            document.body.addEventListener('touchmove', function(evt) {
                if(!evt._isScroller){
                    evt.preventDefault();
                }
            });
        },
        watch: {},
        methods: {
            start(el) {
                var top = el.target.scrollTop;
                var totalScroll = el.target.scrollHeight;
                var currentScroll = top + el.target.offsetHeight;
                if(top === 0) {
                    el.target.scrollTop = 1;
                }else if(currentScroll === totalScroll){
                    el.target.scrollTop = top - 1;
                }
            },
            move(el) {
                console.log('offsetHeight is',el.target.offsetHeight,'scrollHeight is',el.target.scrollHeight)
                if(el.target.offsetHeight < el.target.scrollHeight){
                    el.target._isScroller = true;
                }else {

                    console.log('2222')
                }
            },
            cancel() {
                this.show = false
                this.$parent.showDetailItem(0);
            },
            goDetail() {
                this.show = true
                this.$parent.showDetailItem(1);
                this.detail = this.content.replace(/\n/g,"<br/>")
            }
        }
    }
</script>
<style lang="less" scoped>
    .loading {
        z-index: 10001;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 7.5rem;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        color: #fff;

    .load-box {
        background-color: white;
        position: absolute;
        left: 50%;
        top: 45%;
        width: 85%;
        height: 60%;
        transform: translate(-50%, -55%);
        overflow: scroll;
        overflow-y: visible;
    }

    .detailTitle {
        position: fixed;
        text-align: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333333;
        font-size: 0.33rem;
        font-weight: 500;
        border-bottom: 0.03rem solid #f9f9f9;
        /*background-color: #f9f9f9;*/
    }

    .detail {
        margin-top: 0.8rem;
        padding: 0.2rem;
        color: #333333;
        font-size: 0.3rem;
        overflow: scroll;
        display: inline-block;
        text-align: justify;
    }

    a {
        font-size: 0.3rem;
        position: fixed;
        top: 72%;
        width: 85%;
        transform: translateX(-50%);
        height: 0.8rem;
        line-height: 0.8rem;
        color: black;
        /*background-color: #f9f9f9;*/
    }

    }
    a {
        position: relative;
        width: 100%;
        background-color: white;
        display: inline-block;
        height: 0.85rem;
    }

    a:active {
        background-color: gainsboro;
    }

    .left, .title, .right, .red, .tip, .rightImg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .left {
        left: 0.2rem;
        width: 0.45rem;
        height: 0.45rem;
    }

    .title {
        left: 0.8rem;
        width: 1.5rem;
        text-align: left;
        font-size: 0.29rem;
    }

    .content {
        margin: 0.2rem;
        display: inline-block;
        width: 7.1rem;
        color: gray;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        overflow: hidden;
        font-size: 0.29rem;
        line-height: 0.35rem;
    }

    .right {
        right: 0.15rem;
        width: 0.4rem;
        height: 0.4rem;
    }

    .divider {
        display: inline-block;
        position: relative;
        float: left;
        width: 7.5rem;
        left: 0rem;
        background-color: #e2e2e2;
    }

    .middle {
        width: 7.1rem;
        height: 0.015rem;
        margin-left: 0.2rem;
    }

    .top {
        height: 0.015rem;
    }

    .bottom {
        height: 0.01rem;
    }
</style>