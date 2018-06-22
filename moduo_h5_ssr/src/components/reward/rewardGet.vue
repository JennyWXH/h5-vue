<template>
    <div v-title data-title="扭一扭" id="app">
        <!--pages/reward/reward.wxml-->
        <img class="backImage" src="../../assets/reward/reward_get_back.jpg"/>
        <div class="contentGet">
            <img class="contentImg" src="http://m.imoduo.com/img/reward_get_machine.png"/>
            <div class="coinView">
                <img class="coinIcon" src="../../assets/reward/coin.png"/>
                <span class="count">我的呱币: </span>
                <span class="coin">{{coin}}</span>
                <span @click="goCoinDetail" class="getCoin">免费获取呱币&gt;&gt;</span>
            </div>
        </div>
        <img v-if="showRotate" class="rewardRotate" src="../../assets/reward/reward_get_btn.png" alt="">
        <!--抽奖动画-->
        <div class="rewardAnimate" v-if="showAnimate">
            <div class="bg-mask"></div>
            <div class="chouJiang" id="choujiangId">
                <img class="imgDan" src="../../assets/reward/reward_egg_shake.png" alt="彩带">
            </div>
        </div>
        <!--获奖视图-->
        <div v-if="rewardData && showResult">
            <div class="getReward" v-if="rewardData.award">
                <div class="bg-mask"></div>
                <div class="rewardBack">
                    <img class="giftImg" :src="rewardData.giftImg">
                    <img @click="closeNone" class="cancel" src="../../assets/reward/reward_cancel.png" alt="">
                </div>
                <div class="bottom">
                    <span class="giftName">{{rewardData.giftName}}</span>
                    <span @click="shareGift(rewardData)" class="rewardBtn">晒一晒</span>
                </div>
                <div class="address" @click="goAddressDetail(rewardData.addressId)" style="position: relative;display: inline-block">
                    <div class="line"></div>
                    <p class="title">收货信息</p>
                    <div class="line"></div>
                    <span>收件人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{addressData?addressData.consignee:rewardData.consignee}}</span>
                    <span>联系方式: {{addressData?addressData.phoneNumber:rewardData.phone}}</span>
                    <span>收货地址: {{addressData?addressData.fullAddress:rewardData.address}}</span>
                    <img class="right" src="../../assets/reward/reward_address_more.png" alt="">
                </div>
                <!--<div v-else>-->
                    <!--<span style="text-align: center">添加收货地址&nbsp;&gt;</span>-->
                <!--</div>-->
            </div>
            <div class="noReward" v-if="!rewardData.award && showResult">
                <div class="bg-mask"></div>
                <img class="top" src="../../assets/reward/reward_not_get.png" alt="no">
                <span @click="closeNone" class="noRewardBack">继续努力,再来一发</span>
            </div>
        </div>
        <div class="rewardDiv" @click="rotate"></div>

        <span class="bottomTip">Tips:发货信息可以在中奖记录中查看哦</span>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                showRotate: false,
                detailId: this.$route.params.id,
                showAnimate: false,
                rewardData: null,
                showResult: false,
                addressData: null,
                spendCoin: this.$route.query.coin,
            }
        },
        computed: {
            ...mapGetters({
                isLoading: 'reward_loading',
                isAlert: 'reward_isAlert', //弹窗
                alertTitle: 'reward_alertTitle',//弹窗提示

                coin: 'mine_coin_count'
            })
        },
        beforeRouteEnter(to, from, next){
            if (from.name == "RewardDetail") {
                setTimeout(function () {
                    window.location.reload([false])
                },100)
            }
            next(vm=>{
                vm.num=19;
            })
        },
        components: {

        },
        created () {
            this.getUserData()
        },
        activated: function () {
            this.addressData = this.$store.getters.mine_address_data
            if (this.addressData && this.rewardData) {
                this.changeAddressData()
            }
        },
        methods: {
            getUserData() {
                this.$store.dispatch('get_mine_userData').then(function () {

                })
            },
            changeAddressData() {
                let that = this
                this.$store.dispatch('changeAddressData',{
                    'orderId': this.rewardData.orderId,
                    'consignee': this.addressData.consignee,
                    'phone': this.addressData.phoneNumber,
                    'address': this.addressData.fullAddress,
                }).then(data => {
                    console.log(data)
                });
            },
            goDetail(id) {
            },
            goCoinDetail() {
                this.$router.push('/mine/mine_coin?coin='+this.coin)
            },
            rotate() {
                let that = this
                that.showRotate = true
                setTimeout(function () {
                    that.showRotate = false
                    that.$store.dispatch('getRewardData',{'id':that.detailId}).then(data => {
                        //扣除呱币
                        that.$store.commit('MINE_COIN_COUNT',{data: that.coin-that.spendCoin})
                        that.rewardData = data
                        that.showAnimate = true
                        setTimeout(function () {
                            that.showAnimate = false
                            that.showResult = true
                        },4000)
                    });
                },1500)
            },
            //分享
            shareGift(data) {

            },
            closeNone() {
                this.showResult = false
            },
            goAddressDetail(item) {
                this.$router.push('/mine/mine_address?select=1')
            },

        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../css/reward/rewardGet.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>