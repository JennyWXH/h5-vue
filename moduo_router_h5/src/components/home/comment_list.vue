<template>
    <div v-title data-title="评论列表" id="app" style="overflow: hidden;">
        <div slot="right" style="margin-bottom: 0.9rem">
            <div v-if="commentList?commentList.length>0:false">
                <div v-for="(item,index) in commentList" :key="item.id" class="commentClass" @click="goCommentDetail(index)">
                    <img class="head" v-lazy="item.user.headerImg" @click.stop="goUserDetail(item.user.id)">
                    <div class="rightCom">
                        <div class="commentRow1">
                            <span>{{item.user.nickname}}</span>
                            <img class="level" :src="'../../../static/community/community_leval/Community_level'+item.user.level+'.png'" alt="">
                            <span>{{item.createTime}}</span>
                        </div>
                        <div class="commentRow2">
                            <span>{{item.content}}</span>
                        </div>
                    </div>
                    <div class="otherComment" v-if="item.replyIds">
                        <div v-if="n<4" v-for="(it,n) in item.replyIds">
                            <div class="sss">
                                <div class="green" @click.stop="goUserDetail(it.userId)">{{it.user.nickname}}
                                </div>
                                &nbsp;回复&nbsp;
                                <div class="green" @click.stop="goUserDetail(it.pid)">
                                    {{it.pidUser?it.pidUser.nickname:''}}
                                </div>
                                :&nbsp;&nbsp;{{it.content}}&nbsp;&nbsp;&nbsp;
                                <div class="gray">{{it.createTime}}</div>
                            </div>

                            <div class="dividerReply"></div>
                        </div>
                        <span class="moreReply" v-if="item.replyIds.length>4" @click="goCommentDetail(item)">更多{{item.replyIds.length>4?item.count:0}}条评论&gt;&gt;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                    <div class="dividerCom"></div>
                </div>
            </div>
            <div v-else>
                <img class="commentTip2" src="../../assets/Home/noComment_tip.png" alt="">
            </div>
            <load-more :hasmore="hasMore"></load-more>
        </div>
        <div class="bottomInput">
            <div class="inputType" @click="showTextView()">
                <span>我也说几句...</span>
            </div>
            <span class="commentCount">{{(commentList?commentList[0]?commentList[0].relyCount:'0':'0')}}条评论</span>
        </div>

        <my-textView :showEdit="showEdit" @on-textView-hidden="showTextView"
                     @on-textView-submit="sendMessage"></my-textView>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import textView from 'common/vue/TextView.vue'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {XInput, Group} from 'vux'

    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                showEdit: false,
                detailId: this.$route.params.detailId,
                currentPage: 1,  //评论页
                replyCount: 0,   //评论数
                msgWord: null,   //输入框值
                isAlertKeyBoard: false,  //键盘弹出判断
                hasMore: true,
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

                commentList: 'home_all_comment'
            })
        },
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
            goCommentDetail(index) {
                var item = this.commentList[index]
                this.$router.push('/home/comment_detail/' + this.detailId + '/' + item.replyId + '/' + item.user.id)
            },
            sendMessage(content) {
                if (content == null || content == '') {
                    this.$store.dispatch('showAlert', '输入不可为空')
                } else {
                    let that = this
                    this.$store.dispatch('reply_news', {
                        "content": content,
                        "newsId": that.detailId,
                        "markId": 0,
                        "userPage": 0,
                        "replyPid": 0,
                        "userSize": 0,
                        "userId": window.localStorage.userId,
                        "pid": 0,
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
            getCommentData(index) {
                let that = this
                this.$store.dispatch('getCommentData', {
                    "type": 2,
                    "page": that.currentPage,
                    "id": that.detailId,
                    "size": '10',
                    "isLoadmore": index
                }).then(function (res) {
                    that.hasMore = res
                })
            },
            refresh () {
                this.currentPage = 1
                this.$store.commit('HOME_ALL_COMMENT', {data: []})
                this.getCommentData(0)
            },
            loadMore () {
                this.currentPage = this.currentPage + 1
                this.getCommentData(1)
            },
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
