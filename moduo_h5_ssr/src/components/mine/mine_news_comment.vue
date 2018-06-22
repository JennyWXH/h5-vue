<template>
    <div v-title :data-title="type==1?'赞':'评论'" id="app">
        <div>
            <div style="display: inline-block">
                <div class="commentClass" v-if="type==1?praiseList:commentList"
                     v-for="item in type==1?praiseList:commentList">

                    <img v-lazy="item.userVo.headerImg">
                    <div class="rightCom">
                        <div class="commentRow1">
                            <span>{{item.userVo.name}}</span>
                            <span>{{item.time}}</span>
                        </div>
                        <div class="commentRow2">
                            <span>{{item.reply}}</span>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="tripple">
                    </div>
                    <div class="newsReply">
                        <span>{{item.content}}</span>
                    </div>
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
    import child_circle from 'common/vue/circle/child_circle.vue'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: false,
                type: this.$route.params.type
            }
        },
        components: {
            LoadMore,
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

                commentList: 'mine_news_comment',
                praiseList: 'mine_news_praise',
            })
        },
        methods: {
            goPerCommunity(circleId) {
                this.$router.push('/community/perCommunity/' + circleId)
            },
            getMoreCommunity() {
                let that = this
                if (this.type == 1) {//赞
                    this.$store.dispatch('get_mine_praise_news').then(function () {
                    })
                } else {
                    this.$store.dispatch('get_mine_comment_news').then(function () {
                    })
                }
            },
            refresh() {
                var that = this
                this.$store.commit('MINE_NEWS_PRAISE', {data: []})
                this.$store.commit('MINE_NEWS_COMMENT', {data: []})
                this.getMoreCommunity()
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/home/comment_list.less';
    @import '../../css/mine/mine_news_comment.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
