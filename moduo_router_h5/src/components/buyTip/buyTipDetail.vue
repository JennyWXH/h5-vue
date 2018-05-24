<template>
    <div v-title data-title="购票详情" id="app">
        <!--<div>-->
            <!--<div class="header" style="z-index: 102">-->
                <!--<my-header title="购票详情" title-color="black" :showDevider=true :showBack=true></my-header>-->
            <!--</div>-->
        <!--</div>-->
        <div style="margin-bottom: 0.88rem;display: inline-block;overflow: scroll;overflow-y:visible;overflow-x:hidden" :style="{marginTop:isWeb?'0':'1.2rem'}">
            <div v-if="data">
                <my-cell :item="data"></my-cell>
                <div class="space">
                    <div class="time"><span class="t">时间 :</span> <span class="timeRange">{{data.detailStart}}~{{data.detailEnd}}</span>
                    </div>
                    <div class="commonDivider"></div>
                    <div class="place"><span class="t">场馆 :</span> <span class="address">{{data.spaceName}}({{data.address}})</span>
                    </div>
                    <div class="commonDivider" style="height: 0.1rem"></div>
                    <div class="itemDetail">
                        <div class="titleView">
                            <span class="titleLine"></span>
                            <span>项目详情</span>
                        </div>
                        <img v-if="data.digestImg" class="detailImg" :src="data.digestImg" alt="">
                        <span class="detailText" v-html="data.detail"></span>
                        <span v-if="data.hasDetailPage" class="moreDetail" @click="moreDetail(1)">更多详情&gt;&gt;</span>
                    </div>
                    <div class="commonDivider" style="height: 0.1rem"></div>
                    <div class="itemDetail">
                        <div class="titleView">
                            <span class="titleLine"></span>
                            <span>购买须知</span>
                        </div>
                        <div class="specialNotice" v-if="data.specialNotice">
                            <div class="line"></div>
                            <p class="title">特别须知</p>
                            <div class="line"></div>
                            <span class="detailText" v-html="data.specialNotice"></span>
                        </div>
                        <span class="detailText" v-html="data.notice"></span>
                        <span v-if="data.hasNoticePage" class="moreDetail" @click="moreDetail(2)">更多须知&gt;&gt;</span>
                    </div>

                    <!--<my-detail-cell style="margin-top: 0.2rem" src="../../../static/buyTip/ticket_detail_need.png"-->
                                    <!--name="项目详情" :content="data.detail" ref="test1"></my-detail-cell>-->
                    <!--<my-detail-cell style="margin-top: 0.2rem;margin-bottom: 0.9rem" src="../../../static/buyTip/ticket_detail_item.png"-->
                                    <!--name="购买须知" :content="data.notice" ref="test2"></my-detail-cell>-->
                </div>
            </div>
        </div>
        <div class="buySeat">
            <img v-if="!isWeibo" @click="goKefu()" src="../../assets/buyTip/kefu.png" alt=""><span :style="{backgroundColor:showStatus?'rgba(212,181,252, 1)':'rgba(203, 203, 203, 1)',width:isWeibo?'100%':'6.6rem'}" @click="goDetail(data)">{{data?(showStatus?(data.seat==1?'选座购买':'立即购买'):(isDown?(countDownTime+'后开售'):('开售时间'+data.saleTime))):'立即购买'}}</span>
        </div>
        <my-download :back="true" :isHide="isWeb"></my-download>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <my-confirm @on-confirm="sure" title="跳转至下载页" v-model="showConfirm"><slot name="default">下载后，你的欧气会满满滴哟 (๑• ₃•๑)</slot></my-confirm>
    </div>
</template>
<script>
    import cell from './tipCell.vue'
    import detailCell from '../../common/vue/buytip/detailCell.vue'
    import downloader from 'common/vue/GuildDownload.vue'
    import {mapGetters} from 'vuex'
    import { Confirm } from 'vux'
    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                isWeb: this.$route.query.isWeb,
                showConfirm: false,
                isDown: false,  //是否倒计时
                countDownTime: null, //倒计时时间
                currentTime: 0,  //当前时间
                showStatus: false, //是否待开售
                isWeibo: false,
                canScroll: false,
            }
        },
        components: {
            'my-download': downloader,
            'my-cell': cell,
            'my-detail-cell': detailCell,
            'my-confirm': Confirm
        },
        created () {
            this.$store.commit('TIP_DETAIL_ID', {data: this.$route.params.id})
            this.$store.commit('TIP_DETAIL_DATA', {data: null})
            this.getData()
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/WeiBo/i) == "weibo"){
                this.isWeibo = true
            }
        },
        computed: {
            ...mapGetters({
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                isLoading: 'tip_loading',
                isAlert: 'tip_isAlert', //弹窗
                alertTitle: 'tip_alertTitle',//弹窗提示
                data: 'tip_detail_data'
            })
        },
        methods: {
            showDetailItem(index) {
                this.canScroll = index
            },
            downLoad() {
                api.download({'did':this.$route.params.id},this.alertView)
            },
            goKefu() {
                if (api.browser_versions().mobile) {
                    var ua = navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i)=="micromessenger") {
                        window.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=3048209938'
                    }else if(ua.match(/WeiBo/i) == "weibo"){
                        this.isWeibo = true
                    }else {
                        window.location.href = 'mqq://im/chat?chat_type=wpa&uin=3048209938&version=1&src_type=web'
                    }
                }else {
                    window.open('http://wpa.qq.com/msgrd?v=3&uin=3048209938')
                }
            },
            isShowStatus() {
                if (this.currentTime < this.data.timingSaleTime && this.data.timeType == 2) {
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
                var interval = this.data.timingSaleTime - this.currentTime
                if (interval < 3600) {
                    this.isDown = true
                    this.countDownTime = api.getFormatTime(this.data.timingSaleTime - this.currentTime,'mm分ss秒')
                    if (interval == 0) {
                        this.showStatus = true
                        window.clearInterval(timer)
                    }
                }else {
                    this.isDown = false
                }
            },
            alertView() {
                let that = this
                this.showConfirm = true;
                setTimeout(function () {
                    that.showConfirm = false;
                },2000)
            },
            sure() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
            },
            goDetail(data) {
                if (this.isWeb) {
                    if (this.data.seat == 1) {//选座购买
                        this.$router.push('/buyTip/buyTip_area/' + data.showId)
                    } else {//无座下单
                        this.$router.push('/buyTip/buyTip_purchase/' + data.showId)
                    }
                }else {
                    this.downLoad()
                }
            },
            getData() {
                let that = this
                this.$store.dispatch('get_detail_data').then(function () {

                    setTimeout(function () {
                        window.wxShare.weixinShare(that.data.title, that.data.title, that.data.img)
                    },2000)
                    that.currentTime = that.data.currentTime
                    that.isShowStatus()
                })
            },
            moreDetail(mode) {
                this.$router.push('/buyTip/webDetail/'+ this.data.showId + '?mode=' + mode)
            },
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
    @import '../../css/buyTip/buyTipDetail.less';

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