<template>
    <div v-title data-title="评论详情" id="app" style="overflow: hidden;">
        <div class="commentClass">
            <div v-if="commentData" style="font-size: 0">
                <img class="head" v-lazy="commentData.user.headerImg" @click.stop="goUserDetail(commentData.user.id)">
                <div class="rightCom">
                    <div class="commentRow1">
                        <span>{{commentData.user.nickname}}</span>
                        <img class="level" :src="'../../../static/community/community_leval/Community_level'+commentData.user.level+'.png'" alt="">
                        <span>{{commentData.createTime}}</span>
                    </div>
                    <div class="commentRow2">
                        <span>{{commentData.content}}</span>
                    </div>
                </div>
                <div class="dividerReply" v-if="!commentList.length"></div>
                <div class="otherComment" style="
margin-left:1.4rem;width: 6rem;background-color: white" v-if="commentList.length">
                    <div v-for="item in commentList">
                        <span class="sss" style="width: 5.9rem"><div class="green"
                                                                     @click.stop="goUserDetail(item.userId)">{{item.user.nickname}}</div>&nbsp;回复&nbsp;<div
                                class="green" @click.stop="goUserDetail(item.pid)">{{item.pidUser?item.pidUser.nickname:''}}</div>:&nbsp;&nbsp;{{item.content}}&nbsp;&nbsp;&nbsp;<div
                                class="gray">{{item.createTime}}</div></span>
                        <div class="dividerReply"></div>
                    </div>
                </div>
            </div>
            <load-more v-if="commentList.length" :customeStyle="{paddingTop:'0',fontSize:'0.3rem'}" :forceLoad="true" :hasmore="hasMore"></load-more>
        </div>
        <div class="bottomInput">
            <div class="inputType" @click="showTextView()">
                <span>我也说几句...</span>
            </div>
            <span class="commentCount">{{commentList.length}}条回复</span>
        </div>
        <my-textView :showEdit="showEdit" @on-textView-hidden="showTextView"
                     @on-textView-submit="sendMessage"></my-textView>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import {XInput, Group} from 'vux'
    import textView from 'common/vue/TextView.vue'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: true,
                showEdit: false,
                currentPage: 1,  //评论页
                replyCount: 0,   //评论数
                isAlertKeyBoard: false,  //键盘弹出判断
                replyId: this.$route.params.replyId,
                detailId: this.$route.params.detailId,
                pid: this.$route.params.pid,
            }
        },
        components: {
            'my-intro': intro,
            XInput,
            Group,
            'my-textView': textView,
            LoadMore
        },
        created () {
            this.refresh()
        },
        mounted () {

        },
        computed: {
            ...mapGetters({
                isLoading: 'home_loading',
                isAlert: 'home_isAlert', //弹窗
                alertTitle: 'home_alertTitle',//弹窗提示

                baseImgUrl: 'baseImg',
                pageHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',

                commentData: 'home_detail_comment_data',
                commentList: 'home_detail_comment',
            })
        },
        watch: {},
        methods: {
            goUserDetail(uId) {
                this.$router.push('/mine/user_info/' + uId)
            },
            showTextView() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.showEdit = !that.showEdit
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            goCommentList() {

            },
            sendMessage(content) {
                if (content == null || content == '') {
                    this.$store.dispatch('showAlert', '输入不可为空')
                } else {
                    let that = this
                    this.$store.dispatch('reply_news', {
                        "content": content,
                        "newsId": that.detailId,
                        "markId": that.replyId,
                        "userPage": 1,
                        "replyPid": that.replyId,
                        "userSize": 1,
                        "userId": window.localStorage.userId,
                        "pid": that.pid,
                    }).then(function () {
                        that.showEdit = !that.showEdit
                        that.refresh();
                    })
                }
            },
            onBlur (val) {
                this.isAlertKeyBoard = false
                setTimeout(function () {
                    document.getElementById("bottomInputId").style.bottom = 0
                }, 10)

            },
            onFocus (val) {
                this.isAlertKeyBoard = true
                document.getElementById("bottomInputId").style.bottom = '1rem'
            },
            getCommentDetail(index) {
                if (index) {
                    this.isLoading = true
                }
                let that = this
                this.$store.dispatch('getCommentDetail', {
                    "newsId": that.detailId,
                    "markId": that.replyId,
                    "content": null,
                    "pid": 0,
                    "userPage": that.currentPage,
                    "userSize": 10,
                    "isLoadMore": index
                }).then(function (res) {
                    that.hasMore = res
                })
            },
            loadMore () {
                this.currentPage = this.currentPage + 1
                this.getCommentDetail(1)
            },
            refresh () {
                this.currentPage = 1
                this.$store.commit('HOME_DETAIL_COMMENT', {data: []})
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
