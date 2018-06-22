<template>
    <div style="display: inline-block" class="child_circle" @click="goTipDetail(item.id)">
        <img class="leftImg" :src="item.img" alt="">
        <div class="right">
            <img class="end" v-if="item.showStatus==1" src="../../assets/buyTip/buyTip_haveEnd.png" alt="">
            <span class="name">{{item.title}}</span>
            <div class="flex">
                <span class="content2">场馆:{{item.spaceName}}</span>
                <span class="content">时间:{{item.isCommonDay?item.startMonthTime:(item.startMonthTime + '~' + item.endMonthTime)}}</span>
            </div>
            <div v-if="showStatus">
                <span v-if="item.showStatus==0" class="selling">售票中</span>
                <span v-if="item.seat==1" class="seat">选座</span>
                <span v-if="item.isDiscount==1" class="discounts">惠</span>
            </div>
            <div v-if="!showStatus">
                <!--%@后开售-->
                <span class="countDown">{{isDown?(countDownTime+'后开售'):('开售时间'+item.saleTime)}}</span>
            </div>
            <span class="price" v-if="showStatus">¥ {{showStatus?item.priceRange:item.realPay}}</span>
        </div>
        <div class="divider" style="margin-top: 0.1rem"></div>
    </div>
</template>
<script>
    import API from '../../../config/api/API'
    var api = new API();
    export default {
        data () {
            return {
                showStatus: false,
                isDown: false,
                countDownTime: null,
                currentTime: this.item.currentTime
            }
        },
        props: {
            item: null
        },
        created() {

            this.isShowStatus()

        },
        methods: {
            isShowStatus() {
                if (this.currentTime < this.item.timingSaleTime && this.item.timeType == 2) {
                    var that =  this
                    this.showStatus = false
                    this.isCountDown()
                    var timer=setInterval(function () {
                        that.currentTime = that.currentTime + 1
                        that.isCountDown(timer)
                    },1000)
                }else {
                    this.showStatus = true
                }
            },
            isCountDown(timer) {
                var interval = this.item.timingSaleTime - this.currentTime
                if (interval < 3600) {
                    this.isDown = true
                    this.countDownTime = api.getFormatTime(this.item.timingSaleTime - this.currentTime,'mm分ss秒')
                    if (interval == 0) {
                        this.showStatus = true
                        window.clearInterval(timer)
                    }
                }else {
                    this.isDown = false
                }
            },
            goTipDetail() {
                this.$emit('goTipDetail')
            }
        }
    }
</script>
<style lang="less" scoped>
    .child_circle {
        display: inline-block;
        background-color: white;

    .leftImg {
        /*,   'background-size': '1.6rem 2.3rem';*/
        display: inline-block;
        float: left;
        border-radius: 0.1rem;
        width: 2.08rem;
        height: 2.7rem;
        margin: 0.15rem 0.05rem 0.1rem 0.15rem;
    }

    .right {
        float: left;
        width: 5rem;
        position: relative;

    .end {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.2rem;
        right: 0.3rem;
    }

    span {
        display: inline-block;
        float: left;
        text-align: left;
    }

    .name {
        line-height: 0.33rem;
        max-width: 5.5rem;
        height: 0.61rem;
        font-size: 0.29rem;
        line-height: 0.31rem;
        margin-top: 0.2rem;
        color: #000;
        margin-left: 0.1rem;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        overflow:hidden;
        text-overflow:ellipsis;

        display:-webkit-box;

        -webkit-box-orient:vertical;

        -webkit-line-clamp:2;
    }

    .content, .content2, .price {
        line-height: 0.35rem;
        font-size: 0.25rem;
        color: gray;
        margin-bottom: 0.1rem;
        margin-left: 0.1rem;
    }

    .flex {
        height: 1.54rem;
        display: flex;
        float: left;
        width: 100%;
        flex-wrap: nowrap;
        flex-direction: column-reverse;
    }

    .content, .content2 {
        width: 5.4rem;
    }

    .content {
        margin-top: 0rem;
    }

    .countDown {
        border: 0.025rem solid rgba(239,134,178,1);
        margin-top: 0.05rem;
        line-height: 0.39rem;
        height: 0.35rem;
        font-size: 0.25rem;
        padding-left: 0.08rem;
        padding-right: 0.08rem;
        color: rgba(239,134,178,1);
    }

    .selling, .seat, .discounts {
        margin-top: 0.05rem;
        line-height: 0.35rem;
        font-size: 0.25rem;
        text-align: center;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        margin-left: 0.1rem;
    }

    .selling {
        background: url("../../assets/buyTip/buyTip_selling.png") no-repeat;
        background-size: 100% 100%;
        height: 0.34rem;
        line-height: 0.39rem;
        color: red;
    }

    .seat {
        color: rgba(61, 202, 153, 1);
        border: 0.01rem solid rgba(61, 202, 153, 1);
        height: 0.34rem;
        border-radius: 0.1rem;
    }

    .discounts {
        border-radius: 0.1rem;
        color: darkred;
        height: 0.33rem;
        border: 0.01rem solid darkred;
    }

    .price {
        margin-top: 0.05rem;
        color: red;
        margin-left: 0.15rem;
        line-height: 0.4rem;
    }

    }
    }

    .divider {
        display: block;
        float: left;
        width: 7.5rem;
        /*margin-left: -0.1rem;*/
        height: 0.07rem;
        background-color: #eeeeee;
    }
</style>