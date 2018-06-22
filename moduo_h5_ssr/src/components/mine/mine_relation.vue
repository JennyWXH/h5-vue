<template>
    <div v-title :data-title="type==1?'我的粉丝':'我的关注'" id="app">
        <div>
            <div style="display: inline-block;font-size: 0">
                <div class="relation" v-for="item in dataList" :key="item.id" @click="goUserDetail(item.userId)">
                    <img v-lazy="item.headerImg" alt="">
                    <span>{{item.name}}</span>
                    <div class="commonDivider"></div>
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
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: false,
            }
        },
        components: {
            LoadMore,
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.$store.commit('MINE_RELATION_TYPE', {data: that.$route.params.type})

                that.$store.commit('MINE_RELATION_LIST', {data: []})
                that.getData()
            },function () {
                that.$router.push('/')
            })
        },
        mounted () {
//            if (mySwiper) {
//                mySwiper.destroy(false)
//                mySwiper = null
//            }
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                dataList: 'mine_relation_list',
                type: 'mine_relation_type',
                pageNow: 'mine_relation_page'
            })
        },
        methods: {
            goUserDetail(uId) {
                this.$router.push('/mine/user_info/' + uId)
            },
            getData(index) {
                let that = this
                this.$store.dispatch('get_mine_relationList',{isLoadmore:index}).then(function (res) {
                  that.hasMore = res
                })
            },
            refresh() {
                var that = this
                this.$store.commit('MINE_RELATION_PAGE', {data: 1})
                this.$store.commit('MINE_RELATION_LIST', {data: []})
                this.getData(1)
            },
            loadMore() {
                var that = this
                var pageN = this.pageNow
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('MINE_RELATION_PAGE', {data: pageN})
                this.getData(0)
            }
        }
    }


</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_relation.less';
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
