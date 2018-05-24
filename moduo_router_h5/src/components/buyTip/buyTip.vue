<template>
    <div v-title data-title="购票" id="app" style="overflow: hidden;">
        <div style="">
            <div style="display: inline-block;">
                <div class="circleCateList" v-for="item in dataList" :key="item.id">
                    <my-cell :item="item" @goTipDetail="goDetail(item)"></my-cell>
                </div>
            </div>
            <load-more @OVERSCROLL="judgeScroll" :hasmore="hasMore"></load-more>
        </div>
        <my-footer :selectnum="'3'" v-if="scrollOver"></my-footer>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import footer from "common/vue/footer.vue"
    import cell from './tipCell.vue'
    import {mapGetters} from 'vuex'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    export default {
        data() {
            return {
                hasMore: true,
                scrollOver: true
            }
        },
        components: {
            'my-footer': footer,
            'my-cell': cell,
            LoadMore
        },
        created () {
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
                dataList: 'tip_home_dataList',
                page: 'tip_home_page'
            })
        },
        methods: {
            judgeScroll(judge) {
                this.scrollOver = !judge;
            },
            goDetail(item) {
                if (item.showStatus == 0) {
                    this.$router.push('/buyTip/detail/' + item.showId+'?isWeb=1')
                } else {
                    this.$store.dispatch('showAlert', "活动已结束")
                }
            },
            getData(index) {
                let that = this
                //防止多次拖动加载更多
                this.$store.dispatch('get_tip_data',{isLoadmore:index}).then(function (res) {
                    that.hasMore = res
                })
            },
            refresh() {
                var that = this
                this.$store.commit('TIP_HOME_PAGE', {data: 1})
                this.$store.commit('TIP_HOME_DATALIST', {data: []})
                this.getData(0)
                this.$nextTick(() => {
                    setTimeout(() => {
                        that.$refs.scroller.donePulldown()
                    }, 10)
                })
            },
            loadMore() {
                var that = this
                var pageN = this.page
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('TIP_HOME_PAGE', {data: pageN})
                this.getData(1)
                setTimeout(() => {
//                    that.$refs.scroller.donePullup()
                }, 10)
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
    @import '../../css/buyTip/buyTip.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
