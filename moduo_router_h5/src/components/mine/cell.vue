<template>
    <div style="font-size: 0">
        <div class="divider top" v-if="showTopDevider"></div>
        <a @click="goDetail()" :style="{height:cellType==3?'1.3rem':'0.85rem'}">
            <img v-if="showImg" class="left" :src="src" alt="">
            <span :style="{left:showImg?'0.8rem':'0.3rem'}" class="title">{{name}}</span>
            <div class="red" v-if="cellType==1"></div>
            <span class="tip" v-if="cellType==2">{{tipCount}}</span>
            <img v-if="cellType==3" class="rightImg" :src="headImg" alt="">
            <img class="right" src="../../assets/more.png" alt="">
        </a>
        <div class="divider bottom" v-if="showBottomDevider"></div>
    </div>
</template>
<script>
    export default {
        props: {
            tipCount: {
                type: String,
                default: ''  //
            },
            cellType: {
                type: Number,
                default: 0
            },
            src: {
                type: String,
                default: ''
            },
            showImg: {
                type: Boolean,
                default: true
            },
            headImg: {
                type: String,
                default: ''
            },
            showTopDevider: {
                type: Boolean,
                default: true
            },
            showBottomDevider: {
                type: Boolean,
                default: true
            },
            name: null,
            testNum: null
        },
        data() {
            return {
//              a:this.testNum
            }
        },
        computed: {
            a: function () {
                return {'abc': this.testNum}
            }
        },
        watch: {
            testNum: function (e) {
                console.log(this.a)
            },
//            testNum(curVal,oldVal){
//                console.log(curVal,oldVal);
//            },
        },
        methods: {
            goDetail() {
//                console.log(this.testNum);
                this.$emit('SELECT_CELL')
            }
        }
    }
</script>
<style lang="less" scoped>
    a {
        position: relative;
        width: 100%;
        height: 0.85rem;
        background-color: white;
        display: inline-block;
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

    .red {
        right: 0.55rem;
        width: 0.12rem;
        height: 0.12rem;
        background-color: rgb(233, 60, 40);
        border-radius: 50%;
    }

    .tip {
        text-align: right;
        right: 0.6rem;
        width: 4rem;
        height: 0.3rem;
        line-height: 0.35rem;
        font-size: 0.26rem;
        color: gray;
    }

    .rightImg {
        right: 0.6rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
    }

    .right {
        right: 0.15rem;
        width: 0.4rem;
        height: 0.4rem;
    }

    .divider {
        display: block;
        position: relative;
        float: left;
        width: 7.5rem;
        bottom: 0;
        left: 0rem;
        background-color: #e2e2e2;
    }

    .top {
        height: 0.015rem;
    }

    .bottom {
        height: 0.02rem;
    }
</style>
