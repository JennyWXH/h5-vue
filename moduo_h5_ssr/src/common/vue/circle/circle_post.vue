<template>
    <!--帖子列表内容-->
    <div class="circleContent" @click="goCommunityDetail(item.postId)">
        <div class="commonHeadClass">
            <img @click.stop="goUserDetail(item.userId)" class="head" v-lazy="item.headerImg" alt="">
            <span class="name">{{item.name}}</span>
            <img class="level" :src="'../../../../static/community/community_leval/Community_level'+item.level+'.png'" alt="">
            <span class="date">{{item.time}}</span>
            <span class="title">{{item.title}}</span>
            <span class="content2" v-html="emoji(item.content)"></span>
        </div>
        <!--添加外链视图-->
        <div class="urlLink" v-if="item.shareType != 0">
            <div v-if="item.shareType==4 || item.shareType == 5">
                <div v-html="item.videoIframe"></div>
            </div>
            <div v-else>
                <div class="urlView" @click.stop="goNextView(item.shareUrl)">
                    <img v-if="item.shareType==1" src="../../../../static/community/community_send_url.png" alt="">
                    <img v-if="item.shareType==2" src="../../../../static/community/community_url_music.jpg" alt="">
                    <img v-if="item.shareType==3" src="../../../../static/community/community_url_article.jpg" alt="">
                    <span>{{item.shareTitle?item.shareTitle:item.shareUrl}}</span>
                </div>
            </div>
        </div>
        <div v-if="item.postImgs?item.postImgs.length==1:false" class="singlePic">
            <div class="backDiv commonDiv" :style="{backgroundImage: 'url('+baseImgUrl+item.postImgs[0]+')'}" alt=""></div>
        </div>
        <div v-if="(item.postImgs?item.postImgs.length==2:false)" class="doublePic">
            <img v-for="pic in item.postImgs" class="backDiv commonDiv" :style="{backgroundImage: 'url('+baseImgUrl+pic+')'}" alt="">
        </div>
        <div v-if="(item.postImgs?item.postImgs.length>3:false)" class="thirdPic">
            <img v-for="(pic,index) in item.postImgs" :style="{backgroundImage: 'url('+baseImgUrl+pic+')'}" class="backDiv commonDiv" v-if="index<3">
        </div>
        <!--<div v-if="item.postImgs?item.postImgs.length==5:false" class="fifthPic">-->
            <!--<img v-for="pic in item.postImgs" v-lazy="baseImgUrl+pic" alt="">-->
        <!--</div>-->
        <div class="commonFootClass">
            <span class="cate">{{item.circleName}}</span>
            <div class="community">
                <span class="pageView">{{item.pv}}</span>
                <span class="approve" @click.stop="praiseAction()" :style="{'backgroundImage': 'url(' + (item.isPraise?'../../../../static/community/community_praise_high.png':'../../../../static/community/community_praise_noraml.png') + ')'}">{{item.praiseCount}}</span>
            </div>
        </div>
        <div class="divider" style="margin-top: 0.2rem"></div>
        <div v-if="type!=0" class="down" @click.stop="showAction()"><img src="../../../assets/down.png"></div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters({
                baseImgUrl: 'baseImg'
            })
        },
        props: {
            item: null,
            type: {
                type: Number,
                default: 0  //0-不显示操作  1-我的帖子  2-我的收藏
            },

        },
        methods: {
            goNextView(url) {
                window.location.href = url
            },
            praiseAction() {
                let that = this

                this.$store.commit('COMMUNITY_DETAILID', {detailId: this.item.postId})
                this.$store.dispatch('checkLogin').then(function () {
                    that.$store.dispatch('community_favorClick',{'isList':true}).then(function (data) {
                        if(parseInt(data.isAward) == 1) {
                            that.showPublish = true
                            that.title = '点赞成功'
                            that.exp = data.exp
                            that.coin = data.gungCoin
                        }
                        that.item.isPraise = !that.item.isPraise
                        that.item.praiseCount = data.praiseVos[0].praiseCount
                        setTimeout(function () {
                            that.showPublish = false
                        },2000)
                    })
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            goUserDetail(uId) {
                this.$router.push('/mine/user_info/' + uId)
            },
            goCommunityDetail(detailId) {
                this.$router.push('/community/detail/' + detailId+'?isWeb=1')
            },
            showAction() {
                this.$emit('showActionView')
            }
        }
    }
</script>
<style lang="less" scoped>
    .circleContent {
        display: inline-block;
        position: relative;

    .commonHeadClass {
        width: 7.5rem;

        img.head {
            display: inline-block;
            float: left;
            width: 0.63rem;
            height: 0.63rem;
            border-radius: 0.5rem;
            margin: 0.2rem;
            margin-left: 0.3rem;
        }

        span {
            display: inline-block;
            float: left;
            text-align: left;
        }

        .name {
            line-height: 0.4rem;
            max-width: 4.8rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 0.5rem;
            font-size: 0.32rem;
            margin-top: 0.31rem;
        }

        .level {
            margin-top: 0.32rem;
            width: 0.72rem;
            margin-left: 0.14rem;
            display: inline-block;
            float: left;
        }


        .date {
            max-width: 1.5rem;
            margin-top: 0.32rem;
            margin-right: 0.3rem;
            font-size: 0.25rem;
            height: 0.4rem;
            float: right;
            line-height: 0.4rem;

        }

        .title {
            line-height: 0.35rem;
            width: 6.9rem;
            height: 0.4rem;
            font-size: 0.33rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 0.25rem;
            margin-left: 0.3rem;
            font-weight: 500;
        }

        .content2 {
            line-height: 0.35rem;
            width: 6.9rem;
            white-space: normal;
            font-size: 0.28rem;
            margin: 0.1rem 0.3rem 0.2rem 0.3rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
    .urlLink {
        margin-top: 0.1rem;
        .urlView {
            display: inline-block;
            width: 6.9rem;
            height: 1.5rem;
            background-color: rgba(240, 239, 239, 0.24);
            img {
                width: 1.1rem;
                height: 1.1rem;
                display: inline-block;
                float: left;
                margin-top: 0.2rem;
                margin-left: 0.2rem;
            }
            span {
                display: inline-block;
                float: left;
                width: 5.4rem;
                margin-left: 0.14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 1.1rem;
                font-size: 0.3rem;
                margin-top: 0.2rem;
            }
        }
    }
    .commonDiv {
        display: inline-block;
        float: left;
        background-position: center;
        background-size: cover;
    }
    .singlePic {
        .backDiv {
            width: 6.9rem;
            height: 6.9*0.6rem;
            margin-left: 0.3rem;
            margin-bottom: 0.2rem;
        }
    }
    .doublePic {

        .backDiv {
            width: 3.4rem;
            height: 3.4*0.6rem;
            margin-left: 0.1rem;
            margin-bottom: 0.2rem;
        }
        .backDiv:first-of-type {
            margin-left: 0.3rem;
        }

    }
    .thirdPic {
        .backDiv {
            width: 2.25rem;
            height: 2.25rem;
            margin-left: 0.075rem;
            margin-bottom: 0.2rem;
        }
        .backDiv:first-of-type {
            margin-left: 0.3rem;
        }

    }
    .fifthPic {

        img {
            width: 2.4rem;
            height: 2.4rem;
            margin-left: 0.075rem;
            margin-bottom: 0.2rem;
            display: inline-block;
            float: left
        }

        img:nth-of-type(4) {
            width: 3.6rem;
            height: 3.6rem;
            margin-left: 0.1rem;
            margin-bottom: 0.2rem;
            display: inline-block;
            float: left
        }

        img:nth-of-type(5) {
            width: 3.6rem;
            height: 3.6rem;
            margin-left: 0.1rem;
            margin-bottom: 0.2rem;
            display: inline-block;
            float: left
        }

    }
    .commonFootClass {
        width: 100%;
        height: 0.4rem;
        display: inline-block;
        float: left;

        span {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            float: left;
            text-align: left;
        }

        .cate {
            max-width: 2rem;
            margin-left: 0.3rem;
            font-size: 0.25rem;
            height: 0.4rem;
            line-height: 0.4rem;
            color: rgba(182,135,251,1);
        }

        .community {
            float: right;
            max-width: 3.5rem;
            margin-right: 0.3rem;
            font-size: 0;

            .approve {
                height: 0.3rem;
                float: right;
                background: url("../../../../static/community/community_praise_noraml.png");
                background-repeat: no-repeat;
                background-position: 0 0;
                background-size: 0.3rem 0.3rem;
                text-indent: 0.35rem;
                line-height: 0.3rem;
                font-size: 0.25rem;
                margin-right: 0.3rem;
            }

            .pageView {
                height: 0.3rem;
                float: right;
                background: url("../../../assets/Home/community_thumbs.png") no-repeat 0 0;
                background-size: 0.35rem 0.28rem;
                text-indent: 0.4rem;
                line-height: 0.3rem;
                font-size: 0.25rem;
            }

        }
    }
    .divider {
        display: block;
        float: left;
        width: 7.5rem;
        margin-left: -0.1rem;
        height: 0.07rem;
        background-color: #eeeeee;
    }

    .down {
        position: absolute;
        width: 1rem;
        height: 0.6rem;
        right: 0.2rem;
        top: 0.3rem;

        img {
            width: 0.34rem;
            height: 0.2rem;
        }

        }
    }
</style>