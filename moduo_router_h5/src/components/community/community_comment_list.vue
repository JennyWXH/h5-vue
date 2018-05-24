<template>
    <div v-title data-title="评论列表" id="app" style="overflow: hidden;">
        <div>
            <div class="header" style="z-index: 102">
                <my-header title="评论列表" title-color="black" :showDevider=true :showBack=true></my-header>
            </div>
        </div>
        <scroller lock-x use-pullup use-pulldown :height="pageHeight-0.6-1+'rem'" @on-pullup-loading="loadMore"
                  @on-pulldown-loading="refresh" v-model="status" ref="scroller" :pulldown-config="pullDownConfig"
                  :pullup-config="pullUpConfig" class="scrollOwn">
            <my-intro :title="'评价('+replyCount+')'">
                <div slot="right">
                    <div v-if="commentList">
                        <div v-for="(item,index) in commentList" :key="item.id" class="commentClass"
                             @click="goCommentDetail(index)">
                            <img v-lazy="item.headerImg">
                            <div class="rightCom">
                                <div class="commentRow1">
                                    <span>{{item.nickname}}</span>
                                    <span>{{item.createTime}}</span>
                                </div>
                                <div class="commentRow2">
                                    <span>{{item.content}}</span>
                                </div>
                            </div>
                            <!--<div class="dividerCom"></div>-->
                            <div class="otherComment">
                                <my-intro>
                                    <div slot="right">
                                        <div v-if="commentList">
                                            <div v-for="(it,n) in item.replyIds">
                                                <div class="sss">
                                                    <div class="green">{{it.user.nickname}}</div>
                                                    &nbsp;回复&nbsp;
                                                    <div class="green">{{it.pidUser?it.pidUser.nickname:''}}</div>
                                                    :&nbsp;&nbsp;{{it.content}}&nbsp;&nbsp;&nbsp;
                                                    <div class="gray">{{it.createTime}}</div>
                                                </div>
                                                <div class="dividerReply" v-if="item.replyIds.length!=n+1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </my-intro>
                            </div>
                            <div class="dividerCom"></div>
                        </div>
                    </div>
                </div>
            </my-intro>
        </scroller>
        <!--:style="{'bottom':isAlertKeyBoard?'1rem':'0'}"-->
        <div class="bottomInput" id="bottomInputId">
            <textarea type="text" maxlength="200" v-model="msgWord" name="" :placeholder="isAlertKeyBoard?'':'我也来一句...'"
                      cols="30" rows="2" @click.stop.prevent @blur="onBlur" @focus="onFocus" @keyup.enter="sendMessge()"
                      :style="{'width':isAlertKeyBoard?'6rem':'6rem'}"></textarea>
            <button @click.stop.prevent="sendMessge()">发送</button>
        </div>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import intro from 'common/vue/intro.vue'

    import {XInput, Group, Scroller} from 'vux'

    import baseConfig from '../../../config/global-config'
    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                isLoading: true,
                dataList: [],
                pageHeight: baseConfig.PAGE_HEIGHT,
                commentList: [],
                baseImg: baseConfig.BASE_IMAGE_URL,
                detailId: this.$route.params.detailId,
                currentPage: 1,  //评论页
                replyCount: 0,   //评论数
                status: baseConfig.PULLINGSTATUS,
                pullDownConfig: baseConfig.pullDownConfig,
                pullUpConfig: baseConfig.pullUpConfig,
                msgWord: null,   //输入框值
                isAlertKeyBoard: false  //键盘弹出判断
            }
        },
        components: {
            'my-intro': intro,
            XInput,
            Group,
            Scroller
        },
        created () {
            this.getCommentData()
        },
        mounted () {

        },
        watch: {},
        methods: {
            goCommentDetail(index) {
                var item = this.commentList[index]
                this.$router.push('/home/comment_detail/' + this.detailId + '/' + item.replyId + '/' + item.user.id)
            },
            sendMessge() {
                if (this.msgWord == null) {
                    alert('输入不可为空');
                } else {
                    let that = this
                    api.getModuoData("news/comment", {
                        "data": {
                            "newsId": detailId,
                            "content": that.msgWord,
                            "pid": 0,
                            "userId": 6,
                            "markId": 0,
                            "userPage": 0,
                            "userSize": 0
                        }
                    }).then(function (res) {

                        console.log('发送结果是', res.data)
                        if (res.data.status == 1) {
                            that.msgWord = ''
                            that.refresh();
                        } else {

                        }
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
                if (index) {
                    this.isLoading = true
                }
                let that = this
                api.getModuoData("news/reply", {
                    "data": {
                        "size": "10",
                        "page": that.currentPage,
                        "id": that.detailId,
                        "userSize": '5'
                    }
                }).then(function (res) {
                    var getData = res.data.data;
                    for (var key in getData) {
                        getData[key].createTime = api.changeTime(getData[key].createTime)
                        if (getData[key].headerImg.indexOf("http") == 0) {
                        } else {
                            getData[key].headerImg = baseConfig.BASE_IMAGE_URL + getData[key].headerImg
                        }
                        var replys = getData[key].replyIds
                        for (var key2 in replys) {
                            replys[key2].createTime = api.changeTime(replys[key2].createTime)
                        }
                    }
                    for (var key in getData) {
                        that.commentList.push(getData[key])
                    }
                    if (that.commentList.length > 0) {
                        that.replyCount = that.commentList[0].relyCount
                    }
                    setTimeout(() => {
                        that.$refs.scroller.donePullup()
                    }, 10)
                    setTimeout(() => {
                        that.isLoading = false
                    }, 1000)
                    console.log('输出数据是', res.data);
                })
            },
            loadMore () {
                setTimeout(() => {
                    this.currentPage = parseInt(this.currentPage) + 1
                    this.currentPage = this.currentPage + '';
                    this.getCommentData()
                }, 200)
            },
            refresh () {
                setTimeout(() => {
                    this.currentPage = "1"
                    this.commentList = []
                    this.getCommentData()
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.scroller.donePulldown()
                            this.pullupEnabled && this.$refs.scroller.enablePullup()
                        }, 10)
                    })
                }, 200)
            },
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/community/community_comment_list.less';

    #app {
        background-color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }

    .scrollOwn {
        margin-top: 0.9rem;
    }
</style>
