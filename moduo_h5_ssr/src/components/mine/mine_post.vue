<template>
    <div v-title :data-title="type==1?'我的帖子':'我的收藏'" id="app" style="overflow: scroll;">
        <my-header title="我的帖子" title-color="black" :showDevider=true :showBack=true>
        </my-header>
        <div>
            <div style="display: inline-block">
                <div class="circleCateList" v-for="item in type==1?dataPostList:dataCollectList" :key="item.id">
                    <my-circle :type="1" @showActionView="showActionView(item)" :item="item"></my-circle>
                </div>
                <load-more :hasmore="hasMore"></load-more>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <action :actionArr="type==1?['删除帖子']:['取消收藏']" :isShow="showAct" @functionWay="postCtrl"></action>
    </div>
</template>
<script>
    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import action from 'common/vue/circle/actionView.vue'
    import footer from 'common/vue/footer.vue'
    import circle from 'common/vue/circle/circle_post.vue'
    import cell from './cell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: false,
                showAct: true,
                selectItem: null,
            }
        },
        components: {
            'my-footer': footer,
            'my-circle': circle,
            'my-cell': cell,
            'action': action,
            LoadMore
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.$store.commit('MINE_POST_TYPE', {data: that.$route.params.type})
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
                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                dataPostList: 'mine_post_list',
                dataCollectList: 'mine_collect_list',
                postPage: 'mine_post_page',
                collectPage: 'mine_collect_page',
                type: 'mine_post_type'
            })
        },
        methods: {
            postCtrl(content) {
                let that = this
                this.$store.commit('MINE_POST_ID', {data: this.selectItem.postId})
                if (this.type == 1) {
                    this.$store.dispatch('mine_delete_post').then(function () {
                        that.showAct = !that.showAct
                        that.refresh()
                    })
                } else {
                    this.$store.dispatch('mine_cancel_collect', '0').then(function () {
                        that.showAct = !that.showAct
                        that.refresh()
                    })
                }
            },
            showActionView(item) {
                this.selectItem = item
                this.showAct = !this.showAct
            },
            getData(index) {
                let that = this
                if (this.type == 1) {
                    this.$store.dispatch('get_mine_postList',{isLoadmore:index}).then(function (res) {
                        that.hasMore = res
                    })
                } else {
                    this.$store.dispatch('get_mine_collectList',{isLoadmore:index}).then(function (res) {
                        that.hasMore = res
                    })
                }
            },
            loadMore() {
                var that = this
                if (this.type == 1) {
                    var pageN = this.postPage
                    pageN = parseInt(pageN) + 1
                    pageN = pageN + '';
                    this.$store.commit('MINE_POST_PAGE', {data: pageN})
                } else {
                    var pageN = this.collectPage
                    pageN = parseInt(pageN) + 1
                    pageN = pageN + '';
                    this.$store.commit('MINE_COLLECT_PAGE', {data: pageN})
                }
                this.getData(1)
            },
            refresh() {
                var that = this
                if (this.type == 1) {
                    this.$store.commit('MINE_POST_PAGE', {data: 1})
                    this.$store.commit('MINE_POST_LIST', {data: []})
                } else {
                    this.$store.commit('MINE_COLLECT_PAGE', {data: 1})
                    this.$store.commit('MINE_COLLECT_LIST', {data: []})
                }
                this.getData(0)
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_post.less';

    #app {
        height: 100%;
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
