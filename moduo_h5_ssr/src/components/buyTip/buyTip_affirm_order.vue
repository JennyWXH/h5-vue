<template>
    <div v-title data-title="确认订单" id="app">
        <div class="scroll">
            <!--<div class="header" style="z-index: 102">-->
                <!--<my-header title="确认订单" title-color="black" :showDevider=true :showBack=true></my-header>-->
            <!--</div>-->
            <div class="content" v-if="data">
                <!--项目详情-->
                <div style="display: inline-block" class="circle">
                    <img class="leftImg" :style="{background:'url('+data.showInfo.img+') no-repeat center center'}"
                         alt="">
                    <div class="right">
                        <img class="end" v-if="data.showInfo.showStatus==1" src="../../assets/buyTip/buyTip_haveEnd.png"
                             alt="">
                        <span class="name">{{data.showInfo.title}}</span>
                        <span class="content">时间:{{data.showInfo.detailStart}}~{{data.showInfo.detailEnd}}</span>
                        <span class="content2">场馆:{{data.showInfo.spaceName}}</span>
                    </div>
                    <!--<div class="divider" style="margin-top: 0.1rem"></div>-->
                </div>
                <div class="commonDivider" style="height: 0.1rem"></div>
                <!--购票详情-->
                <div class="itemDetail">
                    <div class="titleView" style="border-bottom: 0.01rem solid rgb(240,239,245);">
                        <span class="titleLine"></span>
                        <span>购票详情</span>
                    </div>
                    <div class="table" v-for="item in data.ticketDetails">
                        <span style="width: 2rem;margin-left:0.6rem;text-align: left">{{item.typeName}}</span>
                        <span style="width: 1.8rem; text-align: center">¥ {{item.price}}/张</span>
                        <span style="width: 1.2rem; text-align: center">{{item.num}}张</span>
                        <span style="text-align: right; width: 1.3rem">¥ {{item.amountMoney}}</span>
                    </div>
                    <div class="extraFee" v-if="data.showInfo.saleTicketType==3">
                        <span style="flex-shrink:0;margin-left:0.6rem;">{{selectType==0?'运费:':'电子票专享优惠'}}</span>
                        <span style="flex-shrink:1;margin-right: 0.62rem">{{selectType==0?('¥ '+data.showInfo.expressFee):('- ¥ '+data.showInfo.discountPrice)}}</span>
                    </div>
                    <div class="all" v-if="data.showInfo.saleTicketType!=3">
                        应付:&nbsp;&nbsp;<span>¥ {{data.realPay}}</span>
                    </div>
                    <div class="all" v-if="data.showInfo.saleTicketType==3">
                        应付:&nbsp;&nbsp;<span>¥ {{selectType==0?data.transportMoney:data.eleMoney}}</span>
                    </div>
                </div>
                <div class="commonDivider" style="height: 0.1rem"></div>
                <div class="itemDetail">
                    <div class="titleView">
                        <span class="titleLine"></span>
                        <span>配送方式</span>
                    </div>
                    <div style="font-size: 0" v-if="data.showInfo.saleTicketType==1">
                        <div class="eleTip">
                            <img src="../../../static/buyTip/ticket_purchase_elec_selected.png" alt="">
                            <div class="eleRight">
                                <span class="black26 ele purple">电子票</span>
                                <span class="gray24 ele purple">免快递费,快速入场</span>
                            </div>
                        </div>
                        <div class="commonDivider"></div>
                        <div class="eleTicketTip">
                            <div class="inputView">
                                <span>联系人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input placeholder="填输入姓名" type="text">
                            </div>
                            <div class="inputView">
                                <span>联系方式: </span><input placeholder="填输入手机号" type="text">
                            </div>
                            <span class="black28 eleTicketTipSpan">1. 免快递费，快速入场<br>2. 购票后，电子票将在我的订单里，请入场时出示给工作人员</span>
                        </div>
                    </div>
                    <div style="font-size: 0" v-if="data.showInfo.saleTicketType==2">
                        <div class="eleTipTransport">
                            <img src="../../../static/buyTip/ticket_purchase_realTip_selected.png" alt="">
                            <div class="eleRight">
                                <span class="black26 ele purple">实体票</span>
                                <span class="gray24 ele purple">快递费 ¥ {{data.showInfo.expressFee}}</span>
                            </div>
                        </div>
                        <div class="address" @click="goAddressDetail(data.orderAddress)">
                            <div v-if="data.orderAddress" style="position: relative;display: inline-block">
                                <span>收件人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.orderAddress.consignee}}</span>
                                <span>联系方式: {{data.orderAddress.phoneNumber}}</span>
                                <span>收货地址: {{data.orderAddress.fullAddress}}</span>
                                <img class="right" src="../../assets/more.png" alt="">
                            </div>
                            <div v-else>
                                <span style="text-align: center">添加收货地址&nbsp;&gt;</span>
                            </div>
                        </div>
                    </div>
                    <div style="font-size:0;" v-if="data.showInfo.saleTicketType==3">
                        <div class="eleTipSelect" @click="changeStatus(0)">
                            <div class="containImg">
                                <img :src="selectType==0?'../../../static/buyTip/ticket_purchase_realTip_selected.png':'../../../static/buyTip/ticket_purchase_realTip.png'" alt="">
                            </div>
                            <div class="eleRight">
                                <span class="black26 ele" :class="selectType==0?'purple':'black26'">实体票</span>
                                <span class="gray24 ele" :class="selectType==0?'purple':'gray24'">快递费 ¥ {{data.showInfo.expressFee}}</span>
                            </div>
                        </div>
                        <div style="display: inline-block;width: 0.01rem ;height:1rem;background-color: lightgrey;float: left;margin-top:0.2rem;"></div>
                        <div class="eleTipSelect" @click="changeStatus(1)">
                            <div class="containImg">
                                <img :src="selectType==0?'../../../static/buyTip/ticket_purchase_elec.png':'../../../static/buyTip/ticket_purchase_elec_selected.png'" alt="">
                            </div>

                            <div class="eleRight">
                                <span class="black26 ele" :class="selectType==0?'black26':'purple'">电子票</span>
                                <span class="gray24 ele red" :class="selectType==0?'gray24':'purple'">优惠 ¥ {{data.showInfo.discountPrice}}</span>
                            </div>
                        </div>
                        <div class="commonDivider"></div>
                        <div class="eleTicketTip" v-if="selectType==1">
                            <div class="inputView">
                                <span>联系人:</span><input placeholder="填输入姓名" type="text" ref="input1" v-model="elecName"><img
                                    src="../../assets/buyTip/ticket_purchase_edit.png" alt="" @click="editTextView(0)">
                            </div>
                            <div class="inputView">
                                <span>联系方式: </span><input placeholder="填输入手机号" type="text" ref="input2" v-model="elecPhone"><img
                                    src="../../assets/buyTip/ticket_purchase_edit.png" alt="" @click="editTextView(1)">
                            </div>
                            <span class="black28 eleTicketTipSpan">1. 免快递费，快速入场<br>2. 购票后，电子票将在我的订单里，请入场时出示给工作人员</span>
                        </div>
                        <div v-if="selectType==0" class="address" @click="goAddressDetail(data.orderAddress)">
                            <div v-if="data.orderAddress" style="position: relative;display: inline-block">
                                <span>收件人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.orderAddress.consignee}}</span>
                                <span>联系方式: {{data.orderAddress.phoneNumber}}</span>
                                <span>收货地址: {{data.orderAddress.fullAddress}}</span>
                                <img class="right" src="../../assets/more.png" alt="">
                            </div>
                            <div v-else>
                                <span style="text-align: center">添加收货地址&nbsp;&gt;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <input placeholder="填写备注" class="inputClass" type="text">
            </div>
        </div>
        <div class="buySeat">
            <a @click="showPayway()">支付</a>
            <span>应付&nbsp;&nbsp;<p>¥ {{data?data.realPay:'0.0'}}</p></span>
        </div>
        <my-payway :show="change" @SUREDOWN="payOrder" @CANCEL="cancel"></my-payway>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import {mapGetters} from 'vuex'
    import payWay from 'common/vue/buytip/payWay.vue'
    export default {
        data() {
            return {
                change: false,
                num: 0,
                ticketId: 0,
                showId: 0,
                selectType: 0, //0是快递,1是电子票
                allPrice: 0,
                orderId: 0,
                elecName: '',
                elecPhone: '',
            }
        },
        components: {
            'my-intro': intro,
            'my-payway': payWay
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getValue()
                that.getData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                isLoading: 'tip_loading',
                isAlert: 'tip_isAlert', //弹窗
                alertTitle: 'tip_alertTitle',//弹窗提示

                data: 'tip_affirm_order'
            })
        },
        methods: {
            getValue() {
                this.num = this.$route.query.num
                this.ticketId = this.$route.query.ticketId
                this.showId = this.$route.params.id
                this.$store.commit('TIP_DETAIL_ID', {data: this.$route.params.id})
            },
            cancel() {//取消订单
                let that = this
                this.$store.dispatch('order_cancel', {
                    "orderId": that.orderId,
                    "userId": window.localStorage.userId,
                    "remark": '用户手动关闭',
                }).then(function () {
                })
            },
            goAddressDetail(item) {
                this.$router.push('/mine/mine_address?select=1')
            },
            changeStatus(index) {
                this.selectType = index
            },
            showPayway() {
                let that = this
                var allMoney = 0
                if (this.data.showInfo.saleTicketType == 2) {
                    allMoney = this.data.transportMoney
                } else if (this.data.showInfo.saleTicketType == 3) {
                    if (this.selectType == 0) {
                        allMoney = this.data.transportMoney
                    } else {
                        allMoney = this.data.eleMoney
                    }
                } else {
                    allMoney = this.data.realMoney
                }
                this.$store.dispatch('order_submit', {
                    "showId": that.data.showInfo.showId,
                    "userId": window.localStorage.userId,
                    "address": that.data.orderAddress.address,
                    "consignee": that.data.orderAddress.consignee,
                    "totalMoney": allMoney,
                    "realPay": that.data.realPay,
                    "ticketType": 0,
                    "ticketId": that.data.ticketDetails[0].tickentId,
                    "num": that.data.sum,
                    "phoneNumber": that.data.orderAddress.phoneNumber
                }).then(function (orderId) {
                    that.orderId = orderId
                })
                this.change = !this.change
            },
            payOrder(index) {
                this.change = !this.change
                if (index == 0) {//微信支付
                    console.log('微信支付')
                } else if (index == 1) {//支付宝支付
                    console.log('支付宝支付')
                } else {
                    console.log('其他')
                }
            },
            editTextView(index) {
                if (index == 0) {//编辑联系人
                    this.$refs.input1.focus()
                }else {//编辑手机号
                    this.$refs.input2.focus()
                }
            },
            getData() {
                let that = this
                this.$store.dispatch('confirm_order_data', {
                    'num': this.num,
                    'showId': this.showId,
                    'ticketId': this.ticketId
                }).then(function () {
                    if (that.$store.getters.mine_address_select) {
                        that.data.orderAddress = that.$store.getters.mine_address_data
                        that.$store.commit('MINE_ADDRESS_SELECT', {data: false})
                    }
                })
            }
        },
        mounted () {

        },
        watch: {},
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/buyTip/buyTip_affirm_order.less';

    #app {
        overflow: scroll;
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
        margin-top: 0;
    }

    #app::-webkit-scrollbar {
        width: 0;
    }

    .scroll {
        width: 100%;
        margin-bottom: 0.88rem;
        background-color: rgb(240, 239, 245);
        display: inline-block;
        overflow: scroll;
        overflow-x: hidden;
    }
</style>
