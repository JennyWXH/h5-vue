<template>
    <div v-title data-title="抽一抽" id="app">
        <!--pages/reward/reward.wxml-->
        <!--------------------------首页banner图---------------------->
        <mt-swipe height="4rem" auto loop style="margin-top:0;">
            <mt-swipe-item v-for="item in detailData.gifts" :key="item.id">
                <!--要加跳转-->
                <div class="swiper-item">
                    <a style="display: block" @click="bannerPage(item)"><img
                           class="slide-image" v-lazy="item.img==null?'assets/lazy.gif':item.img"></a>
                    <div class="swiper-pagination-title">
                        <span :style="{'color':item.isRed?'rgba(246,116,120,1)':'white'}">{{item.remainStr}}</span>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="content">
            <span class="title">{{detailData.name}}</span>
            <img class="coinIcon" src="../../assets/reward/coin.png"/>
            <span class="coin">{{detailData.gungCoin}}</span>
            <span class="count">/次</span>
        </div>
        <div class="luckyView">
            <img src="../../assets/reward/reward_detail_reward_list_icon.png" alt="">
            <div class="rewardList">
                <div class="rewardItem" v-for="item in detailLucky" v-key="id">
                    <span><span class="gray_content_color">{{item.userName}}</span><span class="default_input_gray_color" style="margin-left:0.1rem">抽中了</span><span class="gray_title_color" style="margin-left:0.1rem">{{item.giftName}}</span></span>
                </div>
            </div>
        </div>
        <div class="commonDivider" style="height: 0.05rem"></div>
        <div class="titleView">
            <span class="titleLine"></span>
            <span>主题说明</span>
        </div>
        <div class="htmlContent" v-html="detailData.introduce">
        </div>

        <div class="buySeat">
            <div v-if="detailData.type==1 || detailData.type==2">
                <img src="../../assets/reward/reward_bottom_buy.jpg" alt="" @click="goDetail">
            </div>
            <div v-if="detailData.type==3">
                <span :style="{backgroundColor:'rgba(203, 203, 203, 1)',width:'100%'}">抽光了</span>
            </div>
            <div v-if="detailData.type==0">
                <span :style="{backgroundColor:'rgba(203, 203, 203, 1)',width:'100%'}">未开始</span>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import SwiperNew from '../../../static/swiper-3.4.2.min'
    import {Swiper, SwiperItem} from 'vux'

    export default {
        data() {
            return {
                detailId: this.$route.params.id
            }
        },
        computed: {
            ...mapGetters({
                isLoading: 'reward_loading',
                isAlert: 'reward_isAlert', //弹窗
                alertTitle: 'reward_alertTitle',//弹窗提示

                detailData: 'reward_detail_data',
                detailLucky: 'reward_detail_lucky_data'
            })
        },
        components: {
            'mt-swipe': Swiper,
            'mt-swipe-item': SwiperItem,
        },
        created () {
            this.getDetailData()
            this.getLuckyData()
        },
        methods: {
            getDetailData(){
                let that = this
                this.$store.dispatch('getDetailData',{'id':this.detailId}).then(function () {

                });
            },
            getLuckyData() {
                let that = this
                this.$store.dispatch('getLuckyDetailData',{'id':this.detailId}).then(function () {

                });
            },
            goDetail() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$store.commit('MINE_ADDRESS_DATA', {data: []})
                    that.$router.push('/reward/get/' + that.detailId + '?coin='+that.detailData.gungCoin)
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/reward/rewardDetail.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 1rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>