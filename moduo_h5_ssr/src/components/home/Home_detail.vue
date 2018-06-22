<template>
    <div v-title data-title="新闻详情" id="app" style="overflow: hidden;">
        <div style="display: inline-block;margin-bottom: 1.1rem" :style="{marginTop:isWeb?'0':'1.2rem'}">
            <div class="detailContent">
                <span class="title">{{detailData?detailData.title:''}}</span>
                <div class="more">
                    <span class="source">{{detailData?detailData.source:''}}</span>
                    <span class="time">{{detailData?detailData.createTime:''}}</span>
                </div>
                <div class="content" v-html="detailData?detailData.content:''" id="iframe"></div>
            </div>
            <img class="commentTip" src="../../assets/Home/comment_top.png" alt="">
            <my-intro v-if="commentList.length > 0" :gray="false" title="">
                <div slot="right">
                    <div v-if="commentList">
                        <div v-for="item in commentList" class="commentClass">
                            <img class="head" v-lazy="item.user.headerImg" @click="goUserDetail(item.user.id)">
                            <div class="rightCom">
                                <div class="commentRow1">
                                    <span>{{item.user.nickname}}</span>
                                    <img class="level" :src="'../../../static/community/community_leval/Community_level'+item.user.level+'.png'" alt="">
                                    <span>{{item.createTime}}</span>
                                </div>
                                <div class="commentRow2">
                                    <span v-html="emoji(item.content)"></span>
                                </div>
                            </div>
                            <div class="dividerReply" v-if="item.replyIds"></div>
                            <div class="otherComment" v-if="item.replyIds">
                                <div v-if="n<4" v-for="(it,n) in item.replyIds">
                                    <div class="sss">
                                        <div class="purple" @click.stop="goUserDetail(it.userId)">{{it.user.nickname}}
                                        </div>
                                        <span v-if="it.pidUser">&nbsp;回复&nbsp;</span>
                                        <div class="purple" @click.stop="goUserDetail(it.pid)">
                                            {{it.pidUser?it.pidUser.nickname:''}}
                                        </div>
                                        :&nbsp;&nbsp;<span v-html="emoji(it.content)"></span>&nbsp;&nbsp;&nbsp;
                                        <div class="gray">{{it.createTime}}</div>
                                    </div>
                                </div>
                                <span class="moreReply" v-if="item.replyIds.length>4" @click="goCommentDetail(item)">更多{{item.replyIds.length>4?item.count:0}}条评论&gt;&gt;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="dividerCom"></div>
                        </div>
                    </div>
                </div>
            </my-intro>
            <div v-else>
                <img class="commentTip2" src="../../assets/Home/noComment_tip.png" alt="">
            </div>
            <div class="moreComment" v-if="commentList.length>=3" @click="goCommentList()">
                <span>查看所有精彩评论&gt;&gt;</span>
            </div>
            <div v-if="detailData">
                <div v-if="detailData.recommends.length>0">
                    <div class="titleView">
                        <div class="purpleLine"></div>
                        <span class="titleLine"></span>
                        <span>相关安利</span>
                    </div>
                    <div v-for="item in detailData.recommends" @click="goHomeDetail(item.id)">
                        <div class="singleImg_type" v-if="item.logo?item.logo.length == 1:'false'">
                            <img class="singImg" v-lazy="baseImgUrl+item.logo[0]"/>
                            <!--:style="{backgroundImage: 'url('+baseImgUrl+item.logo[0]+')'}"-->
                            <h4>{{item.title}}</h4>
                            <span class="time">{{item.createTime}}</span>
                            <span class="observe">{{item.replyQuantity}}</span>
                        </div>
                        <div class="dividerInside"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomInput">
            <div class="inputType" @click="showTextView()">
                <span>我也说几句...</span>
            </div>
            <button :style="{fontSize:commentList.length<99?'0.3rem':'0.2rem'}" @click="goCommentList()">{{commentList.length>99?'99+':commentList.length}}</button>
        </div>
        <my-download :back="true" :isHide="isWeb"></my-download>
        <my-textView :showEdit="showEdit" @on-textView-hidden="showTextView"
                     @on-textView-submit="sendMessage"></my-textView>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-confirm @on-confirm="sure" title="跳转至下载页" v-model="showConfirm" theme="ios"><slot name="default">下载后，你的欧气会满满滴哟 (๑• ₃•๑)</slot></my-confirm>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'
    import textView from 'common/vue/TextView.vue'
    import downloader from 'common/vue/GuildDownload.vue'

    import {Confirm} from 'vux'

    import baseConfig from '../../../config/global-config'

    import {mapGetters} from 'vuex'

    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                showEdit: false,
                detailId: this.$route.params.id,
                currentPage: 1,  //评论页
                msgWord: null,   //输入框值
                isWeb: this.$route.query.isWeb,
                showConfirm: false
            }
        },
        components: {
            'my-intro': intro,
            'my-download': downloader,
            'my-textView': textView,
            'my-confirm': Confirm
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
                pullDownConfig: 'pullDownConfig',
                pullUpConfig: 'pullUpConfig',

                commentList: 'home_comment_list',
                detailData: 'home_detail_data'
            })
        },
        created () {
//            document.title = '资讯详情'
            this.getNewDetail()
            this.getCommentData()
            this.$router.afterEach(route => {
                this.$store.commit("HOME_DETAIL_DATA", {data: null})
                this.$store.commit('HOME_COMMENT_LIST', {data: []})
            })
        },
        mounted () {
            var that = this

        },
        watch: {
//            '$route': function (route) {
//                this.detailId = this.$route.params.id
//                this.currentPage = 1
//                this.getNewDetail()
//                this.getCommentData()
//            },
        },
        methods: {
            alertView() {
                let that = this
                this.showConfirm = true;
                setTimeout(function () {
                    that.showConfirm = false;
                },2000)
            },
            goHomeDetail(id) {
                this.detailId = id
                if (this.isWeb) {
                    this.$router.push('/news/news_detail/' + id +'?isWeb=1'+'&dtd='+id)
                    this.getNewDetail()
                    this.getCommentData()
                }else {
                    this.downLoad()
                }
            },
            sure() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
            },
            downLoad() {
                api.download({'did':this.$route.params.id},this.alertView)
            },
            goCommentDetail(item) {
                if (this.isWeb) {
                    this.$router.push('/home/comment_detail/' + this.detailId + '/' + item.replyId + '/' + item.user.id)
                }else {
                    this.downLoad()
                }
            },
            goUserDetail(uId) {
                if (this.isWeb) {
                    this.$router.push('/mine/user_info/' + uId)
                }else {
                    this.downLoad()
                }
            },
            refreshIframe() {
                var iframe = document.getElementById("iframe")

                var iframes = iframe.getElementsByTagName("iframe")
                for (var key in iframes) {
                    if (typeof iframes[key] === 'object') {
                        iframes[key].setAttribute('width', '100%')
                        iframes[key].setAttribute('style', 'overflow:hidden')
                    }
                }
                var pItems = iframe.getElementsByTagName("p")
                for (var key in pItems) {
                    if (typeof pItems[key] === 'object')
                        pItems[key].setAttribute('style', 'font-size:0.29rem;text-align:left;display:inline-block;width:100%')
                }
                var imgs = iframe.getElementsByTagName("img")
                for (var key in imgs) {
                    if (typeof imgs[key] === 'object')
                        imgs[key].setAttribute('style', 'display:block;width:100%;height:auto')
                }
                var hItems = iframe.getElementsByTagName("h4")
                for (var key in hItems) {
                    if (typeof hItems[key] === 'object')
                        hItems[key].setAttribute('style', 'font-size:0.3rem;text-align:left;')
                }
            },
            //文本视图
            showTextView() {
                if (this.isWeb) {
                    let that = this
                    this.$store.dispatch('checkLogin').then(function () {
                        that.showEdit = !that.showEdit
                    },function () {
                        that.$router.push('/mine/mine_login')
                    })
                }else {
                    this.downLoad()
                }
            },
            goCommentList() {
                if (this.isWeb) {
                    this.$router.push('/home/comment_list/' + this.detailId)
                }else {
                    this.downLoad()
                }
            },
            sendMessage(content) {
                if (content == null || content == '') {
                    console.log('2222222')
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
            getNewDetail() {
                let that = this
                this.$store.dispatch('getHomeDetail', {"newsId": this.detailId}).then(function () {
                    setTimeout(function () {
                        that.refreshIframe()
                    })
                    setTimeout(function () {
                        window.wxShare.weixinShare(that.detailData.title, that.detailData.title, that.detailData.logo.length>0?that.baseImgUrl+that.detailData.logo[0]:null)
                    },2000)
                })
            },
            getCommentData(index) {
                let that = this
                this.$store.dispatch('getCommentData', {
                    "type": 1,
                    "page": that.currentPage,
                    "id": that.detailId,
                    "isLoadmore": index
                }).then(function () {
                    setTimeout(() => {
                        that.$store.commit('HOME_LOADING', {data: false})
                    }, 500)
                })
            },
            loadMore () {
                console.log('I will loadmore')
            },
            refresh () {
                setTimeout(() => {
                    this.currentPage = "1"
                    this.$store.commit('HOME_COMMENT_LIST', {data: []})
                    this.getCommentData(1)
                }, 200)
            },
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
    @import '../../css/home/Home_detail.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
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
