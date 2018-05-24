<template>
    <div v-show="showing" class="loading">
        <div class="bottom" :style="{height:2.52+titleArr.length+'rem'}">
            <div class="price">

                总计: <span>¥{{this.price}}</span>

            </div>
            <div @click="selectChange(index)"
                 :style="{backgroundColor:index==selectIndex?'rgb(240,239,213)':'transparent'}" class="way"
                 v-for="(item,index) in titleArr">
                <img class="tag" v-if="imgArr.length==titleArr.length" :src="imgArr[index]" alt="">
                <span>{{item}}</span>
                <img class="select" v-if="index==selectIndex" src="../../../../static/buyTip/select_right.png" alt="">
            </div>
            <div @click="sure" class="sure">
                <span>确定</span>
            </div>
            <img @click="hideSelf" class="close" src="../../../assets/buyTip/close.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showing: false,
                selectIndex: 0
            }
        },
        props: {
            show: {
                type: Boolean,
                default: true
            },
            price: {
                type: String,
                default: '0.03'
            },
            titleArr: {
                type: Array,
                default: function () {
                    return ['微信支付', '支付宝', '抽热闹']
                }
            },
            imgArr: {
                type: Array,
                default: function () {
                    return ['../../../../static/buyTip/wx_pay.png', '../../../../static/buyTip/aliPay.png', '../../../../static/buyTip/ticket_detail_need.png',]
                }
            }
        },
        watch: {
            show: function () {
                this.showing = !this.showing
            }
        },
        methods: {
            selectChange(index) {
                this.selectIndex = index
            },
            sure() {
                this.$emit('SUREDOWN', this.selectIndex)
            },
            hideSelf() {
                this.$emit('CANCEL')
                this.showing = false
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
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.9);

    .price {
        margin-top: 0.6rem;
        font-size: 0.38rem;
        color: black;
        margin-bottom: 0.3rem;

    span {
        font-style: italic;
        font-size: 0.4rem;
        font-weight: 400;
        line-height: 0.5rem;
        color: red;
    }

    }
    }
    .way {
        height: 1rem;
        color: rgba(0, 0, 0, 0.9);
        border-bottom: 0.015rem solid rgb(222, 222, 222);

    .tag {
        display: inline-block;
        float: left;
        width: 0.6rem;
        margin: 0.2rem;
    }

    .select {
        display: inline-block;
        float: right;
        width: 0.4rem;
        margin: 0.3rem;
    }

    span {
        float: left;
        margin-top: 0.2rem;
        line-height: 0.6rem;
        font-size: 0.32rem;

    }

    }
    .sure {
        width: 100%;
        position: absolute;
        height: 0.9rem;
        bottom: -0.01rem;
        background-color: rgba(175,155,252, 1);

    span {
        line-height: 0.9rem;
    }

    }
    .close {
        position: absolute;
        right: -0.05rem;
        top: -0.1rem;
        width: 0.6rem;
    }

    }
</style>
