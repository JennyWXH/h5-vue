<template>
    <div v-title data-title="评论详情" id="app" style="overflow: hidden;">
        <div>
            <div class="commentClass" v-if="commentData">
                <img class="head" v-lazy="commentData.headerImg" @click.stop="goUserDetail(commentData.userId)">
                <div class="rightCom">
                    <div class="commentRow1">
                        <span>{{commentData.name}}</span>
                        <img class="level" :src="'../../../static/community/community_leval/Community_level'+commentData.level+'.png'" alt="">
                        <span>{{commentData.createTime}}</span>
                    </div>
                    <div class="commentRow2">
                        <span v-html="emoji(commentData.content)"></span>
                    </div>
                </div>
                <div class="dividerCom" v-if="commentList?commentList.length==0:false"></div>
                <div v-if="commentList">
                    <div class="otherComment" style="background-color: white" v-if="commentList.length>0">
                        <div v-for="item in commentList">
                            <span class="sss"><div class="purple" @click.stop="goUserDetail(item.userId)">{{item.name}}</div>:&nbsp;&nbsp;<span v-html="emoji(item.content)"></span>&nbsp;&nbsp;&nbsp;<div
                                    class="gray">{{item.createTime}}</div></span>
                            <div class="dividerReply"></div>
                        </div>
                    </div>
                </div>
                <load-more v-if="commentList?commentList.length:false" :customeStyle="{paddingTop:'0',fontSize:'0.3rem'}" :forceLoad="forceLoad" :hasmore="hasMore"></load-more>
            </div>
        </div>
        <div class="bottomInput">
            <div class="inputType" @click="showTextView()">
                <span>我也说几句...</span>
            </div>
            <span class="commentCount">{{commentList?commentList.length:0}}条回复</span>
        </div>
        <my-textView :showEdit="showEdit" @on-textView-hidden="showTextView"
                     @on-textView-submit="sendMessage"></my-textView>
        <my-publish :show="showPublish" title="评论成功" :exp="exp" :coin="coin"></my-publish>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import textView from 'common/vue/TextView.vue'
    import publish from 'common/vue/publishSuccess.vue'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                exp: 0,
                coin: 0,
                showPublish: false, //发帖弹窗

                showEdit: false,
                hasMore: true,
                replyId: this.$route.params.replyId,
                forceLoad: true
            }
        },
        components: {
            'my-intro': intro,
            'my-textView': textView,
            LoadMore,
            'my-publish': publish
        },
        created () {
            this.$store.commit('COMMUNITY_DETAILID', {detailId: this.$route.params.detailId})
            this.refresh()
        },
        computed: {
            ...mapGetters({
                isLoading: 'community_loading',
                isAlert: 'community_isAlert', //弹窗
                alertTitle: 'community_alertTitle',//弹窗提示
                baseImgUrl: 'baseImg',
                pageHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                commentData: 'community_commentData',
                commentList: 'community_detail_commentList',
                currentPage: 'community_comment_page',  //评论页
                replyCount: 'community_comment_replyCount',   //评论数
                detailId: 'community_detailId'
            })
        },
        mounted () {

        },
        watch: {},
        methods: {
            goUserDetail(uId) {
                this.$router.push('/mine/user_info/' + uId)
            },
            sendMessage(content) {
                if (content == null || content == '') {
                    this.$store.dispatch('showAlert', '输入不可为空')
                    return
                }
                let that = this
                this.$store.dispatch('send_commentDetail_Messge',{'msg':content,'replyId':this.replyId}).then(function (data) {

                    if(parseInt(data.isAward) == 1) {
                        that.showPublish = true
                        that.exp = data.exp
                        that.coin = data.gungCoin
                    }
                    setTimeout(function () {
                        that.showPublish = false
                    },2000)
                    that.showEdit = !that.showEdit
                    that.refresh();
                })
            },
            showTextView() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.showEdit = !that.showEdit
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            getCommentDetail(index) {
                let that = this
                this.$store.dispatch('get_community_commentDetail',{'replyId':this.replyId,isLoadmore:index}).then(function (res) {
                    if (res) {
                        setTimeout(function () {
                            that.forceLoad = false
                        },500)
                    }else {
                      that.forceLoad = true
                    }
                    that.hasMore = res
                })
            },
            loadMore () {
                let that = this
                var pageN = this.pageNow
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('COMMUNITY_COMMENT_PAGE',{page:pageN})
                this.getCommentDetail(1)
            },
            refresh () {
                var that = this
                this.$store.commit('COMMUNITY_COMMENT_PAGE', {page: 1})
                this.$store.commit('COMMUNITY_COMMENTLIST', {commentList: []})
                this.getCommentDetail(0)
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/home/comment_list.less';

    #app {
        background-color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }

</style>
