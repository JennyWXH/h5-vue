<template>
    <div v-title data-title="订单详情" id="app">
        <div class="scroll">
            <div class="content" v-if="data">
                <!--项目详情-->
                <div style="display: inline-block" class="circle">
                    <img class="leftImg" :style="{background:'url('+data.showInfo.img+') no-repeat center center'}"
                         alt="">
                    <div class="right">
                        <img class="end" v-if="data.showInfo.showStatus==1" src="../../assets/buyTip/buyTip_haveEnd.png"
                             alt="">
                        <span class="name">{{data.showInfo.title}}</span>
                        <span class="content">时间:{{data.showInfo.startTime}}~{{data.showInfo.endTime}}</span>
                        <span class="content2">场馆:{{data.showInfo.spaceName}}</span>
                    </div>
                    <div class="divider" style="margin-top: 0.1rem"></div>
                </div>
                <!--购票详情-->
                <my-intro title="购票详情" src="../../../static/mine/order_detail_buytip.png" :showSrc="true"
                          :showDevider="true">
                    <div slot="right">
                        <div class="table" v-for="item in data.ticketDetails">
                            <span style="width: 2.5rem">{{item.typeName}}</span>
                            <span style="width: 2rem; text-align: center">¥ {{item.price}}/张</span>
                            <span style="width: 1.2rem; text-align: center">{{item.num}}张</span>
                            <span style="text-align: right; width: 1.5rem">¥ {{item.amountMoney}}</span>
                        </div>
                        <div class="extraFee" v-if="data.showInfo.saleTicketType==3">
                            <span style="width: 2.5rem">{{data.ticketType==0?'运费:':'电子票专享优惠'}}</span>
                            <span style="float: right;margin-right: 0.2rem">{{data.ticketType==0?('¥ '+data.showInfo.expressFee):('- ¥ '+data.showInfo.discountPrice)}}</span>
                        </div>
                        <div class="all">
                            应付:<span>¥ {{data.realPay}}</span>
                        </div>
                    </div>
                </my-intro>
                <!--购票详情-->
                <my-intro style="margin-top: 0.15rem" :title="data.ticketType==0?'收货信息':'电子票'"
                          :src="data.ticketType==0?'../../../static/mine/order_detail_receiveInfo.png':'../../../static/mine/order_detail_eletip.png'"
                          :showSrc="true" :showDevider="true"
                          :tip="data.ticketType==1?'('+data.useCount + '/' + data.sum+')':''">
                    <div slot="right">
                        <div v-if="data.ticketType==1">
                            <div class="eleTip">
                                <img src="../../../static/buyTip/ticket_purchase_elec_selected.png" alt="">
                                <div class="eleRight">
                                    <span class="black30 ele">电子票</span>
                                    <span v-if="data.showInfo.discountPrice!=0" class="gray28 ele" style="color: red">优惠 ¥ {{data.showInfo.discountPrice}}</span>
                                    <span v-if="data.showInfo.discountPrice==0" class="gray28 ele">免快递费,快速入场</span>
                                </div>
                            </div>
                            <div class="checkCode">
                                <div class="outsideCode">
                                    <div class="qrCode" v-for="item in data.qrCodeIds">
                                        <my-code type="canvas" :value="item.userId+','+item.qrCode" :size=40
                                                 bg-color="white"></my-code>
                                        <span v-if="item.isUsed">{{item.useTime}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="data.ticketType==0">
                            <!--<div class="eleTipTransport">-->
                            <!--<img src="../../assets/buyTip/buytip_transport.png" alt="">-->
                            <!--<div class="eleRight">-->
                            <!--<span class="black30 ele">快递</span>-->
                            <!--<span class="gray30 ele">快递费 ¥ {{data.expressFee}}</span>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="address" @click="goAddressDetail()">
                                <div style="position: relative;display: inline-block">
                                    <span>收件人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.address?data.address.consignee:data.consignee}}</span>
                                    <span>联系方式: {{data.address?data.address.phoneNumber:data.phoneNumber}}</span>
                                    <span>收货地址: {{data.address?data.address.fullAddress:data.orderAddress}}</span>
                                    <span class="change" v-if="data.status==2">更改</span><img class="right"
                                                                                             src="../../assets/more.png"
                                                                                             alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </my-intro>
                <my-intro src="../../../static/mine/order_detail_remark.png"
                          style="margin-top: 0.15rem;margin-bottom: 0.5rem" title="备注" :showSrc="true"
                          :showDevider="true">
                    <div slot="right">
                        <span style="font-size: 0.3rem">{{data.remark?'data.remark':'暂无'}}</span>
                    </div>
                </my-intro>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import {mapGetters} from 'vuex'
    import {Qrcode} from 'vux'

    export default {
        data() {
            return {
                orderId: this.$route.params.id
            }
        },
        components: {
            'my-intro': intro,
            'my-code': Qrcode,
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示

                data: 'mine_order_detail'
            })
        },
        methods: {

            goAddressDetail(item) {
                if (this.data.status == 2) {
                    this.$router.push('/mine/mine_address?select=1')
                }
            },
            getData() {
                let that = this
                this.$store.dispatch('mine_order_detail', {'id': this.orderId}).then(function () {
                    if (that.$store.getters.mine_address_select) {
                        that.data.address = that.$store.getters.mine_address_data
                        that.$store.commit('MINE_ADDRESS_SELECT', {data: false})
                        console.log(that.data)
                    }
                })
            },
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/buyTip/buyTip_affirm_order.less';
    @import '../../css/mine/mine_order_detail.less';

    #app {
        height: 100%;
        background-color: rgb(240, 239, 245);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }

    #app::-webkit-scrollbar {
        width: 0px
    }

    .scroll {
        width: 100%;
        background-color: rgb(240, 239, 245);
        display: inline-block;
        overflow: scroll;
        overflow-x: hidden;
    }
</style>
