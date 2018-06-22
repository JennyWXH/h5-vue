<template>
    <div v-title data-title="抽一抽" id="app">
        <!--pages/reward/reward.wxml-->
        <div style="display: inline-block;font-size: 0;margin-bottom: 0.88rem;">
            <div class="topView">
                <img src="../../assets/reward/reward_index_top.jpg" alt="">
                <div class="rewardList">
                    <div class="rewardItem" v-for="item in rewardLucky" v-key="id">
                        <span><span class="gray_content_color">{{item.userName}}</span><span class="default_input_gray_color" style="margin-left:0.1rem">抽中了</span><span class="gray_title_color" style="margin-left:0.1rem">{{item.giftName}}</span></span>
                    </div>
                </div>
            </div>
            <div class="back" v-for="(item,index) in rewardData" v-key="id" @click="goDetail(item.id)">
                <div class="itemImg" :style="{backgroundImage: 'url('+item.img+')'}">
                </div>
                <div class="overView" v-if="item.type==3">
                    <img class="overImg" src="../../assets/reward/reward_end.png"/>
                </div>
                <div class="coinView">
                    <div class="coinImg">
                        <img class="coinIcon" src="../../assets/reward/coin.png"/>
                        <span>{{item.gungCoin}}</span>
                    </div>
                </div>
                <div class="titleView">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <load-more class="moreBack" :hasmore="hasMore"></load-more>
        </div>


        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-footer :selectnum="'2'"></my-footer>
    </div>
</template>
<script>
    import footer from "common/vue/footer.vue"
    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import {mapGetters} from 'vuex'
    var content
    export default {
        data() {
            return {
                hasMore: true,
            }
        },
        computed: {
            ...mapGetters({
                isLoading: 'reward_loading',
                isAlert: 'reward_isAlert', //弹窗
                alertTitle: 'reward_alertTitle',//弹窗提示

                pageNow: 'reward_index_page',
                rewardData: 'reward_list_data',
                rewardLucky: 'reward_index_lucky_data'
            })
        },
        components: {
            'my-footer': footer,
            LoadMore
        },
        created () {

            this.refresh()
            this.getLuckyData()
        },
        mounted () {
        },
        methods: {
            getRewardData() {
                let that = this
                this.$store.dispatch('getRewardListData').then(function (res) {
                    that.hasMore = res
                });
            },
            getLuckyData() {
                let that = this
                this.$store.dispatch('getLuckyListData').then(function () {

                });
            },
            goDetail(id) {
                this.$router.push('/reward/detail/' + id)
            },
            loadMore() {
                var that = this
                var pageN = this.pageNow
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('REWARD_INDEX_PAGE', {data: pageN})
                this.getRewardData(1)
            },
            refresh() {
                var that = this
                this.$store.commit('REWARD_INDEX_PAGE', {data: 1})
                this.$store.commit('REWARD_LIST_DATA', {data: []})
                this.getRewardData(0)
            }
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/reward/reward.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: inline-block;
        font-size: 0;
    }
</style>