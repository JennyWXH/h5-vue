<template>
    <div v-title data-title="系统消息" id="app" style="overflow: hidden;">
        <!--<div class="header" style="z-index: 102">-->
            <!--<my-header title="系统消息" titleColor="rgb(60,60,60)" :showDevider=true :showBack=true></my-header>-->
        <!--</div>-->
        <div>
            <scroller lock-x :scrollbar-y=false use-pulldown :height="contentHeight+1+'rem'"
                      @on-pulldown-loading="refresh" ref="scroller" :pulldown-config="pullDownConfig"
                      :pullup-config="pullUpConfig">
                <div style="display: inline-block">
                    <div v-if="dataList">
                        <div @click="goOrderDetail(item)" class="systemClass" v-for="item in dataList">

                            <span class="time">{{item.time}}</span>
                            <div class="newsContent">
                                <span class="title">系统消息</span>
                                <span class="content">{{item.content}}</span>
                                <span class="more" v-if="item.msgType==6 || item.msgType==7">查看电子票&gt;&gt;</span>
                            </div>
                            <div class="commonDivider" style="background-color: rgb(240, 239, 245);"></div>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import child_circle from 'common/vue/circle/child_circle.vue'
    import {Scroller} from 'vux'

    import {mapGetters} from 'vuex'

    export default {
        components: {
            Scroller,
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.refresh()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                pullDownConfig: 'pullDownConfig',
                pullUpConfig: 'pullUpConfig',
                netWork: 'netWork',

                dataList: 'mine_news_system',
            })
        },
        methods: {
            goOrderDetail(item) {
                if (item.msgType == 6 || item.msgType == 7) {
                    this.$router.push('/mine/mine_order_detail/' + item.relationId)
                }
            },
            getMoreCommunity() {
                let that = this
                this.$store.dispatch('get_mine_system_news').then(function () {
                    that.$refs.scroller.reset()
                })
            },
            refresh() {
                var that = this
                this.$store.commit('MINE_NEWS_SYSTEM', {data: []})
                this.getMoreCommunity()
                this.$nextTick(() => {
                    setTimeout(() => {
                        that.$refs.scroller.donePulldown()
                    }, 10)
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_news_system.less';

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
