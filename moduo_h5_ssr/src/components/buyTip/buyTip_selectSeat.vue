<template>
    <div v-title data-title="请选择座位" id="app">
        <div class="seatTop">
            <span class="absoluteS">舞台</span>
            <img class="seatTopImg" src="../../assets/buyTip/buyTip_seat_top_back.png" alt="">
            <div class="seatView">
                <span class="leftS">已售</span>
                <span class="rightS">已选</span>
            </div>
            <div class="commonDivider" style="background-color: rgba(203, 203, 203, 1);margin-bottom:0.3rem;"></div>
        </div>
        <div v-if="data">
            <div style="margin-top: 0.2rem" v-for="n in data.rowCount">
                <div class="selectSeat">
                    <span v-for="(item,index) in data.seats" :style="{backgroundColor:item.color}" v-if="n==item.row" @click="seatClick(index)">
                        <img v-show="selectArr[index]" src="../../../static/buyTip/buyTip_select_right.png" alt="">

                    </span>
                </div>
            </div>
        </div>

        <div v-if="selectItems" class="showSeatView" :style="{'height':selectItems.length*1 + 'rem'}" v-show="isUp">
            <div class="showSeatItem" v-for="(item,index) in selectItems">
                <span class="left">{{item.name}}&nbsp;&nbsp;{{item.row}}排{{item.column}}座</span>
                <span class="right">¥{{item.price}}</span>
                <img src="../../assets/buyTip/buyTip_seat_cancel.png" alt="" @click="cancelSeat(index)">
            </div>
        </div>
        <div class="buySeat">
            <img :src="isUp?'../../../static/buyTip/buyTip_seat_up.png':'../../../static/buyTip/buyTip_seat_down.png'" alt="" @click="upOrDown">
            <span><p class="price">¥ {{allPrice}}</p>&nbsp;&nbsp;<p class="count">({{selectItems.length}}张)</p></span>
            <a @click="showPayway()">支付</a>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import API from '../../../config/api/API'

    var api = new API();
    export default {
        data() {
            return {
                detailId: this.$route.query.showId,
                areaId: this.$route.query.areaId,
                selectArr: [],
                selectItems: [],
                allPrice: 0,
                isUp: false
            }
        },
        components: {},
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getData()
            },function () {
                that.$router.push('/')
            })

        },
        mounted() {

        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示

                data: 'tip_area_seat_data'
            })
        },
        methods: {
            getData() {
                var that = this;
                this.$store.dispatch('get_area_seat_data', {
                    'showId': this.detailId,
                    'areaId': this.areaId
                }).then(function () {
                    //生成数组
                    for (var i=0;i<that.data.seats.length;i++) {
                        that.selectArr.push(false)
                    }
                })
            },
            seatClick(index) {
                var item = this.selectArr[index]
                item = !item
                this.selectArr.splice(index,1,item)
                //此处存储被选择的座位
                var items = [], itemPrice=0;
                for (var i=0; i<this.selectArr.length; i++) {
                    var newItem = this.selectArr[i]
                    if (newItem == true) {
                        var item = this.data.seats[i]
                        item.index = i
                        itemPrice = itemPrice + parseFloat(item.price)
                        items.push(item)
                    }
                }
                this.allPrice = itemPrice
                this.selectItems = items

                this.isUp = this.selectItems.length > 0
            },
            cancelSeat(index) {
                var item = this.selectItems[index]
                var boleen = this.selectArr[item.index]
                boleen = !boleen
                this.selectArr.splice(item.index,1,boleen)
                this.selectItems.splice(index,1)

                //是否展示选择座位
                this.isUp = this.selectItems.length > 0
                //计算总价
                var itemPrice=0;
                for (var i=0; i<this.selectItems.length; i++) {
                    var item = this.selectItems[i]
                    itemPrice = itemPrice + parseFloat(item.price)
                }
                this.allPrice = itemPrice

            },
            upOrDown() {
                if (this.selectItems.length) {
                    this.isUp = !this.isUp
                }
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/buyTip/buyTip_selectSeat.less';

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
</style>