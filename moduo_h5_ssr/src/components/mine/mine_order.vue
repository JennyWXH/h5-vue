<template>
    <div v-title data-title="我的订单" id="app">
        <my-header title="我的订单" title-color="black" :showDevider=true :showBack=true>
        </my-header>
        <div>
            <div style="display: inline-block;font-size: 0">
                <div class="relation" v-for="item in dataList" :key="item.orderId"
                     @click="goOrderDetail(item.orderId)">
                    <div class="order">
                        <span class="orderNum">订单编号 : {{item.orderNo}}</span>
                        <span class="orderStatus">{{item.orderStatusName}}</span>
                        <span class="orderTime">下单时间 : {{item.createTime}}</span>
                        <span class="orderTime" style="width: 1rem;float: right;text-align: right">{{item.ticketType?'电子票':''}}</span>
                    </div>
                    <my-cell :showStatus="false" :item="item"></my-cell>
                </div>
                <load-more :hasmore="hasMore"></load-more>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import cell from '../buyTip/tipCell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: false,
            }
        },
        components: {
            LoadMore,
            'my-cell': cell,
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
                netWork: 'netWork',

                dataList: 'mine_order_list',
                page: 'mine_order_page'

            })
        },
        methods: {
            goOrderDetail (id) {
                this.$router.push('/mine/mine_order_detail/' + id)
            },
            getData(index) {
                let that = this
                this.$store.dispatch('mine_order',{isLoadmore:index}).then(function (res) {
                    that.hasMore = res
                })
            },
            refresh() {
                var that = this
                this.$store.commit('MINE_ORDER_PAGE', {data: 1})
                this.$store.commit('MINE_ORDER_LIST', {data: []})
                this.getData(0)
            },
            loadMore() {
                var that = this
                var pageN = this.page
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('MINE_ORDER_PAGE', {data: pageN})
                this.getData(1)
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_order.less';

    #app {
        height: 100%;
        background-color: rgb(245, 245, 245);
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
