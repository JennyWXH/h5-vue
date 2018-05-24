<template>
    <div v-title data-title="立即购买" id="app">
        <div class="content">
            <my-intro title="请选择:" :showDevider="true">
                <div slot="right">
                    <div class="tipRange">
                        <div v-for="item in data" @click="selectPrice(item)" :style="{'opacity': item.count==0?'0.5':'1'}" class="selectPrice">
                            <img v-if="item.count==0" class="out" src="../../assets/buyTip/ticket_sale_out.png" alt="">
                            <img :style="{'opacity': item.count==0?'0':'1'}" class="selectImg" :src="item.isSelect?'../../../static/buyTip/ticket_select.png':'../../../static/buyTip/ticket_unselect.png'" alt="">
                            <div class="priceImg">
                                <span>{{item.price}}元</span>
                            </div>
                            <div class="welfare" v-if="item.welfare">
                                <div class="line"></div>
                                <p class="title">福利</p>
                                <div class="line"></div>
                                <span>{{item.welfare}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </my-intro>
            <div class="commonDivider" style="height: 0.1rem"></div>
            <my-intro title="数量:" :showDevider="true">
                <div slot="right">
                    <div class="countRange">
                        <img @click="ctrlNum(0)" src="../../assets/buyTip/ticket_reduce_normal.png" alt="">
                        <!--<span :style="{color:number<=1?'darkGray':'black'}" @click="ctrlNum(0)" class="ctrlNum"-->
                              <!--style="margin-left: 0.2rem">-</span>-->
                        <span class="showNum">{{number}}</span>

                        <img @click="ctrlNum(1)" src="../../assets/buyTip/ticket_add_normal.png" alt="">
                        <!--<span :style="{color:number==(selectItem?selectItem.count:0)?'darkGray':'black'}"-->
                              <!--@click="ctrlNum(1)" class="ctrlNum">+</span>-->
                        <span class="allPrice">¥ {{price}}元</span>
                    </div>
                </div>
            </my-intro>
        </div>
        <div class="buySeat">
            <span @click="goDetail()">{{data?(data.seat==1?'选座购买':'立即购买'):'立即购买'}}</span>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import cell from './tipCell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                number: 0,
                price: 0,
                selectItem: null
            }
        },
        components: {
            'my-intro': intro,
            'my-cell': cell
        },
        created () {
            this.$store.commit('TIP_DETAIL_ID', {data: this.$route.params.id})
            this.$store.commit('TIP_DETAIL_PRICE', {data: []})
            this.getData()
        },
        computed: {
            ...mapGetters({
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                isLoading: 'tip_loading',
                isAlert: 'tip_isAlert', //弹窗
                alertTitle: 'tip_alertTitle',//弹窗提示
                data: 'tip_detail_price',
                detailId: 'tip_detail_id'
            })
        },
        methods: {
            goDetail() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    if (that.selectItem == null) {
                        that.$store.dispatch('showAlert', "请选择票价")
                        return
                    }
                    that.$router.push('/buyTip/buyTip_affirm_order/' + that.detailId + '?num=' + that.number + '&ticketId=' + that.selectItem.ticketId)
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            ctrlNum(ctrl) {
                if (this.selectItem == null) {
                    this.$store.dispatch('showAlert', "请选择票价")
                    return
                }
                if (ctrl == 0) {//    --操作
                    if (this.number > 1) {
                        this.number--
                        this.price = this.number * this.selectItem.price
                    } else {
                        return
                    }
                } else {//    ++操作
                    if (this.number < this.selectItem.count && this.number < this.selectItem.limitCount) {
                        this.number++
                        this.price = this.number * this.selectItem.price
                    }else if(this.number >= this.selectItem.limitCount){
                        this.$store.dispatch('showAlert', '单次最多购买'+this.selectItem.limitCount+'张')
                    } else {
                        this.$store.dispatch('showAlert', "没有更多了! ! !")
                    }
                }
            },
            selectPrice(item) {
                if (item.count == 0) {
                    this.$store.dispatch('showAlert', "暂无库存")
                } else {
                    for (var i = 0; i < this.data.length; i++) {
                        var newData = this.data[i]
                        newData.isSelect = false
                    }
                    this.selectItem = item
                    item.isSelect = true
                    this.number = 1
                    this.price = this.selectItem.price
                }
            },
            getData() {
                let that = this
                this.$store.dispatch('get_detail_price').then(function () {

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
    @import '../../css/buyTip/buyTip_purchase.less';

    #app {
        height: 100%;
        /*background-color: rgb(240,239,245);*/
        background-color: white;
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
</style>