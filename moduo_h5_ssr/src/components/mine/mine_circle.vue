<template>
    <div v-title data-title="我的圈子" id="app" style="overflow: scroll;">
        <div>
            <div style="display: inline-block">
                <div class="circleCateList" v-for="item in dataList" :key="item.id">
                    <my-child :item="item"></my-child>
                </div>
                <!--<load-more :hasmore="hasMore"></load-more>-->
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import child_circle from 'common/vue/circle/child_circle.vue'

    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: false,
            }
        },
        components: {
            LoadMore,
            'my-child': child_circle
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getMoreCommunity()
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
                dataList: 'mine_circle_list',
            })
        },
        methods: {
            goPerCommunity(circleId) {
                this.$router.push('/community/perCommunity/' + circleId)
            },
            getMoreCommunity() {
                let that = this
                this.$store.dispatch('get_mine_circleList').then(function () {

                })
            },
            refresh() {
                var that = this
                this.getMoreCommunity()
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_circle.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
