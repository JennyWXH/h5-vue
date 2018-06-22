<template>
    <div v-title data-title="帖子详情" id="app" style="overflow: hidden;position: relative">
        <img class="moreImg" @click="showActionView()" src="../../assets/more_green.png" alt="" v-if="isWeb">
        <div>
            <div style="display: inline-block;margin-bottom: 0.9rem" :style="{marginTop:isWeb?'0':'1.2rem'}">
                <div v-if="detailData">
                    <!--栏目类型-->
                    <div class="cateInfo" @click="goPerCommunity(detailData.circleId)">
                        <span class="left">{{detailData.circleName}}</span>
                        <span class="right">&gt;&gt;</span>
                    </div>
                    <div class="detail_content">
                        <img class="headImg" v-lazy="baseImgUrl+detailData.headerImg" alt="" @click.stop="goUserDetail(detailData.userId)">
                        <div class="right">
                            <span class="name">{{detailData.name}}</span>
                            <span class="tip">楼主</span>
                            <img class="level" :src="'../../../static/community/community_leval/Community_level'+detailData.level+'.png'" alt="">
                            <span class="abstract">1楼&nbsp;&nbsp;{{detailData.postTime}}</span>
                        </div>
                        <div class="content_text">
                            <span class="title">{{detailData.title}}</span>
                            <span class="content" v-html="emoji(detailData.content)"></span>
                        </div>
                        <!--添加外链视图-->
                        <div class="urlLink" v-if="detailData.shareType != 0">
                            <div v-if="detailData.shareType==4 || detailData.shareType == 5">
                                <div v-html="videoIframe"></div>
                            </div>
                            <div v-else>
                                <div class="urlView" @click="goNextView(detailData.shareUrl)">
                                    <img v-if="detailData.shareType==1" src="../../../static/community/community_send_url.png" alt="">
                                    <img v-if="detailData.shareType==2" src="../../../static/community/community_url_music.jpg" alt="">
                                    <img v-if="detailData.shareType==3" src="../../../static/community/community_url_article.jpg" alt="">
                                    <span>{{detailData.shareTitle?detailData.shareTitle:detailData.shareUrl}}123123萨拉丁静安寺李稻葵撒娇达拉斯</span>
                                </div>
                            </div>
                        </div>

                        <div class="detail_image">
                            <img v-for="item in detailData.postImgs" v-lazy="baseImgUrl+item" v-preview="baseImgUrl+item" preview-title-enable="true" regionspreview-nav-enable="true">
                        </div>
                        <div class="favor" v-if="detailData.praiseCount">
                                <span class="outside">
                                    <!--<div class="fav1"-->
                                         <!--v-if="detailData.praiseCount>=1">{{detailData.praises[0].name}}、</div>-->
                                    <!--<div class="fav2"-->
                                         <!--v-if="detailData.praiseCount>1">{{detailData.praises[1].name}}</div>-->
                                    <div class="count" v-if="detailData.praiseCount>=1"><!--{{detailData.praiseCount>2?'等':''}}-->{{detailData.praiseCount+'人赞过'}}</div>
                                </span>
                        </div>
                    </div>
                    <img class="commentTip" src="../../assets/Home/comment_top.png" alt="">
                    <!--评论列表-->
                    <my-intro v-if="detailData.commentCount > 0">
                        <div slot="right">
                            <div v-if="detailData.postReplys">
                                <div v-for="(item,index) in detailData.postReplys" :key="item.postId"
                                     class="commentClass" @click="goCommentDetail(index)" v-if="(index<3 && !isWeb) || isWeb">
                                    <img @click.stop="goUserDetail(item.userId)" class="head" v-lazy="item.headerImg" :style="{marginTop:index==0?'0':'0.2rem'}">
                                    <div class="rightCom">
                                        <div class="commentRow1">
                                            <span :style="{marginTop:index==0?'0':'0.2rem'}">{{item.name}}</span>
                                            <img :style="{marginTop:index==0?'0':'0.2rem'}" class="level" :src="'../../../static/community/community_leval/Community_level'+item.level+'.png'" alt="">
                                            <span>{{index+2}}楼&nbsp;&nbsp;{{item.createTime}}</span>
                                        </div>`
                                        <div class="commentRow2">
                                            <span v-html="emoji(item.content)"></span>
                                        </div>
                                        <div class="commentImg">
                                            <img v-for="img in item.images" :src="baseImgUrl+img" alt="" v-if="item.images.length>0 && img.length>0">
                                        </div>
                                    </div>

                                    <div class="dividerReply" v-if="item.replyIds"></div>
                                    <div class="otherComment" v-if="item.replyIds">
                                        <div>
                                            <div v-for="(it,n) in item.replyIds">
                                                <div class="sss">
                                                    <div class="purple" @click.stop="goUserDetail(it.userId)">{{it.name}}</div><span v-if="it.pidUser">&nbsp;回复&nbsp;</span>
                                                    <div class="purple" @click.stop="goUserDetail(it.pid)">
                                                        {{it.pidUser?it.pidUser.name:''}}
                                                    </div>:&nbsp;&nbsp;<span v-html="emoji(it.content)"></span>&nbsp;&nbsp;&nbsp;
                                                    <div class="gray">{{it.createTime}}</div>
                                                </div>
                                                <!--<div class="dividerReply" v-if="item.replyIds.length!=n+1"></div>-->
                                            </div>
                                        </div>
                                        <span class="moreReply" v-if="item.count>2" @click="goCommentDetail(item)">更多{{item.count-2}}条评论&gt;&gt;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                    <div class="dividerCom"></div>
                                </div>
                            </div>
                        </div>
                    </my-intro>
                    <div v-else>
                        <img class="commentTip2" src="../../assets/Home/noComment_tip.png" alt="">
                    </div>
                    <div class="moreComment" v-if="detailData.commentCount>=3 && !isWeb" @click="goPerCommunity()">
                        <img src="../../assets/community/community_more_reply.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomInput">
            <button :style="{backgroundColor:(detailData?detailData.isPraise:false)?'rgba(61,202,153,1)':'white',backgroundImage:(detailData?detailData.isPraise:false)?'url(../../../static/community/favor_high.png)':'url(../../../static/community/favor.png)'}"
                    @click="favorClick()"></button>
            <div class="inputType" @click="showTextView()">
                <span>我也说几句...</span>
            </div>
            <span class="commentCount">已有{{detailData?detailData.commentCount:'0'}}条回帖</span>
        </div>
        <my-download :back="true" :isHide="isWeb"></my-download>
        <my-textView :showEdit="showEdit" @on-textView-hidden="showTextView"
                     @on-textView-submit="sendMessage"></my-textView>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <action :actionArr="detailData?detailData.userId==userId?(detailData.isCollect?['取消收藏','删帖']:['收藏','删帖']):(detailData.isCollect?['取消收藏','举报']:['收藏','举报']):['收藏','举报']"
                :isShow="showAct" @functionWay="postCtrl"></action>
        <my-publish :show="showPublish" :title="title" :exp="exp" :coin="coin"></my-publish>
        <my-confirm @on-confirm="sure" title="跳转至下载页" v-model="showConfirm"><slot name="default">下载后，你的欧气会满满滴哟 (๑• ₃•๑)</slot></my-confirm>
    </div>
</template>

<script>
    import action from 'common/vue/circle/actionView.vue'
    import intro from 'common/vue/intro.vue'
    import textView from 'common/vue/TextView.vue'
    import downloader from 'common/vue/GuildDownload.vue'
    import publish from 'common/vue/publishSuccess.vue'
    import { Confirm } from 'vux'
    import {mapGetters} from 'vuex'

    import API from '../../../config/api/API'
    import LINKCTRL from '../../../config/api/urlLinkCtrl'
    var api = new API();
    var Link = new LINKCTRL();

    export default {
        data() {
            return {
                exp: 0,
                coin: 0,
                title: '点赞成功',
                showPublish: false, //发帖弹窗

                userId:typeof window!=="undefined"?window.localStorage.userId:'',
                showEdit: false,
                showAct: true,
                isWeb: this.$route.query.isWeb,
                showConfirm: false
            }
        },
        components: {
            'my-download': downloader,
            'my-intro': intro,
            'my-textView': textView,
            'action': action,
            'my-confirm': Confirm,
            'my-publish': publish,
            'videoIframe': ''
        },
        created () {
            let that = this;
            this.$store.commit('COMMUNITY_DETAILID', {detailId: this.$route.params.id})
            this.getCommunityData()
        },
        computed: {
            ...mapGetters({
                isLoading: 'community_loading',
                isAlert: 'community_isAlert', //弹窗
                alertTitle: 'community_alertTitle',//弹窗提示
                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',

                detailData: 'community_detailData',
                detailId: 'community_detailId'
            })
        },
        methods: {
            goNextView(url) {
                if(typeof window!=="undefined") {
                    window.location.href = url
                }
            },
            goUserDetail(uId) {
                if (this.isWeb) {
                    this.$router.push('/mine/user_info/' + uId)
                }else {
                    this.downLoad();
                }
            },
            downLoad() {
                api.download({'did':this.$route.params.id},this.alertView)
            },
            alertView() {
                let that = this
                this.showConfirm = true;
                setTimeout(function () {
                    that.showConfirm = false;
                },2000)
            },
            sure() {
                if(typeof window!=="undefined") {
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
                }
            },
            showActionView() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.showAct = !that.showAct
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            postCtrl(index) {
                if (index == 0) {//收藏
                    let that = this
                    this.$store.dispatch('community_collect_post', this.detailData.isCollect ? 0 : 1).then(function () {
                        that.showAct = !that.showAct
                        that.getCommunityData()
                    })
                } else {//举报
                    if(typeof window!=="undefined") {
                        if (this.detailData.userId == window.localStorage.userId) {
                            var that = this
                            this.$store.dispatch('community_delete_post').then(function () {
                                that.showAct = !that.showAct
                                setTimeout(function () {
                                    that.$router.go(-1)
                                }, 2000)
                            })
                        } else {
                            this.$router.push('/community/community_report/' + this.detailId + '?userId=' + this.detailData.userId + '&relationype=' + '2' + '&userPostTime=' + this.detailData.createTime)
                        }
                    }
                }
            },
            sendMessage(content) {
                if (content == null || content == '') {
                    this.$store.dispatch('showAlert', '输入不可为空')
                    return
                }
                let that = this
                this.$store.dispatch('send_commentDetail_Messge',{'msg':content,'replyId':0}).then(function (data) {

                    if(parseInt(data.isAward) == 1) {
                        that.showPublish = true
                        that.title = '评论成功'
                        that.exp = data.exp
                        that.coin = data.gungCoin
                    }
                    setTimeout(function () {
                        that.showPublish = false
                    },2000)
                    that.showEdit = !that.showEdit
                    that.getCommunityData();
                })
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
                    this.downLoad();
                }
            },
            //点赞
            favorClick() {
                if (this.isWeb) {
                    let that = this
                    this.$store.dispatch('checkLogin').then(function () {
                        that.$store.dispatch('community_favorClick').then(function (data) {
                            if(parseInt(data.isAward) == 1) {
                                that.showPublish = true
                                that.title = '点赞成功'
                                that.exp = data.exp
                                that.coin = data.gungCoin
                            }
                            setTimeout(function () {
                                that.showPublish = false
                            },2000)
                        })
                    },function () {
                        that.$router.push('/mine/mine_login')
                    })

                }else {
                    this.downLoad();
                }
            },
            //社区详情
            getCommunityData() {
                let that = this
                this.$store.dispatch('getCommunityDetail').then(function () {
                    setTimeout(function () {
                        if(typeof window!=="undefined") {
                            window.wxShare.weixinShare(that.detailData.title, that.detailData.title, that.detailData.postImgs.length>0?that.baseImgUrl+that.detailData.postImgs[0]:null)
                        }
                    },2000)

                    if (that.detailData.shareType == 4) {//优酷视频
                        var id = Link.getYoukuId(that.detailData.shareUrl)
                        that.videoIframe = "<iframe width=92% height='200' src='http://player.youku.com/embed/" + id + "' frameborder=0 allowfullscreen></iframe>"
                    }else if (that.detailData.shareType == 5) {//腾讯视频
                        var vid = Link.getSpecilUrlQueryString(that.detailData.shareUrl,'vid')
                        that.videoIframe = "<iframe <iframe width=92% height='200'  class='iframe' frameborder=\"0\" src=\"https://v.qq.com/iframe/player.html?vid=" + vid + "&tiny=0&auto=0\" allowfullscreen></iframe>"
                    }

                })
            },
            goCommentDetail(index) {
                if (this.isWeb) {
                    var item = this.detailData.postReplys[index]
                    this.$router.push('/community/community_comment_detail/' + this.detailId + '/' + item.replyId)
                }else {
                    this.downLoad();
                }
            },
            goPerCommunity(circleId) {
                if (this.isWeb) {
                    this.$router.push('/community/perCommunity/' + circleId)
                }else {
                    this.downLoad();
                }
            }
        },
        destroyed () {

        },
        mounted () {

        },
        watch: {}
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import "../../css/home/comment_list.less";
    @import '../../css/community/communityDetail.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
    }
</style>
