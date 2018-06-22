<template>
    <div v-title data-title="个人社区" id="app" style="overflow: hidden;">

        <scroller lock-y ref="scrollerCol" :bounce="false" class="category cateStand"
                  v-if="cateStandard&cateData.type==2">
            <div class="inner" style="background-color: white">
                <a v-for="(n,index) in ['看帖','子圈']" href="javascript:void(0);" @click="cateClick(index)"
                   :class="{active:selectCode==index}">{{n}}</a>
            </div>
            <div class="divider"></div>
        </scroller>
        <img class="moreImg" src="../../assets/community/refresh.png" alt="" style="width: 0.5rem;height: 0.5rem" @click="refresh()">
        <img class="publishImg" src="../../assets/community/community_post.png" alt="" @click="publish()">
        <div style="display: inline-block;">
            <!--栏目列表内容-->
            <div class="topClass">
                <img class="backImg" v-lazy="baseImgUrl+cateData.headerImg" alt="">
                <div class="backDiv"></div>
                <div class="nomal">
                    <img class="headImg" v-lazy="baseImgUrl+cateData.headerImg">
                    <span class="title">{{cateData.name}}</span>
                    <span class="desc">{{cateData.desc}}</span>
                    <div>
                        <span class="faver">人气 <span>{{cateData.popularity}}</span></span>
                        <span class="post">帖子  <span>{{cateData.post}}</span></span>
                    </div>

                    <span class="join"
                          :style="{'background-position-x': cateData.attention?'0.1rem':'0.25rem'}"
                          @click="attentionClick()">{{cateData.attention?'已加入':'加入'}}</span>
                </div>

            </div>
            <div v-if="cateData.type==2">
                <scroller lock-y ref="scrollerCol" :bounce="false" class="category">
                    <div class="inner">
                        <a v-for="(n,index) in ['看帖','子圈']" href="javascript:void(0);"
                           @click="cateClick(index)" :class="{active:selectCode==index}">{{n}}</a>
                    </div>
                    <div class="divider"></div>
                </scroller>
            </div>
            <div v-if="cateData.type==1">
                <div class="content" v-for="(item,index) in dataList" :key="item.id">
                    <my-circle :item="item"></my-circle>
                </div>

                <load-more v-if="selectCode==0" @OVERSCROLL="judgeScroll" :hasmore="hasMore"></load-more>
            </div>
            <!--帖子列表内容-->
            <div v-else class="gallery-con">
                <div class="swiper-wrapper">
                    <!--判断是否是综合圈-->
                    <div v-for="n in 2" class="swiper-slide">
                        <!--看帖-->
                        <div v-if="n==1">
                            <div class="content" v-for="(item,index) in dataList" :key="item.id">
                                <my-circle :item="item"></my-circle>
                            </div>
                            <load-more @OVERSCROLL="judgeScroll" :hasmore="hasMore"></load-more>
                        </div>
                        <!--子圈-->
                        <div v-if="n==2" style="display: inline-block">
                            <div class="circleCateList" v-for="item in childCircleList" :key="item.id" @pushFinish="destroySwiper()">
                                <my-child :item="item"></my-child>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import {Scroller} from 'vux'
    import circle from 'common/vue/circle/circle_post.vue'
    import child_circle from 'common/vue/circle/child_circle.vue'

    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import {mapGetters} from 'vuex'

    import NewSwi from '../../../static/swiper-3.4.2.min'

    let mySwiper
    export default {
        data() {
            return {
                hasMore: true
            }
        },
        components: {
            'my-circle': circle,
            'my-child': child_circle,
            Scroller,
            LoadMore
        },
        created () {
            this.$store.commit('COMMUNITY_PER_CIRCLEID', {id: this.$route.params.circleId})
            this.$store.commit('COMMUNITY_PER_CATEDATA', {data: {headerImg: ''}})
            this.refresh()

            this.$store.commit('COMMUNITY_PER_SELECTCODE', {code: 0})
            this.$router.afterEach(route => {
                this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: false})
                if (mySwiper) {
                    mySwiper.destroy(false)
                    mySwiper = null
                }
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'community_loading',
                isAlert: 'community_isAlert', //弹窗
                alertTitle: 'community_alertTitle',//弹窗提示

                first_loading: 'community_first_loading',                //当前页
                cateStandard: 'community_per_cateStandard',
                alpha: 'community_per_alpha',
                selectCode: 'community_per_selectCode',  //栏目列表
                dataList: 'community_per_dataList',
                cateData: 'community_per_cateData',
                childCircleList: 'community_per_childCircleList',  //栏目列表
                pageNow: 'community_per_page',

                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork'
            })
        },
        watch: {
            '$route': ['getCommunityData']
        },
        methods: {
            judgeScroll(judge) {

                const $body = document.body
                var fourRem = (6 - 1) * this.baseRem
                if (($body.scrollTop==0?document.documentElement.scrollTop:$body.scrollTop) < fourRem) {
                    this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: false})
                } else {
                    this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: true})
                }
            },
            goCommunityDetail(detailId) {
                this.$router.push('/community/detail/' + detailId+'?isWeb=1')
            },
            //栏目点击
            cateClick(index) {
                if (this.selectCode != index) {
                    this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: false})
                }
                if (index == 1) {
                    if (this.childCircleList == null) {
                        this.getChildCircleData()
                    }
                }
                var that = this
                if (mySwiper != null) {
                    setTimeout(function () {
                        mySwiper.onResize()
                    },100)
                    if (mySwiper.activeIndex != index + 1) {
                        mySwiper.slideTo(index + 1, 100, false)
                    }
                }
                this.$store.commit('COMMUNITY_PER_SELECTCODE', {code: index})

            },
            destroySwiper() {
                if (mySwiper != null) {
                    mySwiper.destroy(false)
                    mySwiper = null
                }
            },
            //关注
            attentionClick() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$store.dispatch('per_community_attentionClick')
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            //获取帖子列表
            getCommunityData(index) {
                this.$store.commit('COMMUNITY_PER_CIRCLEID', {id: this.$route.params.circleId})
                let that = this
                this.$store.dispatch('per_community_getCommunityData',{'isLoadmore':index}).then(function () {
                    setTimeout(() => {
                        if (mySwiper != null) {
                            mySwiper.onResize()
                        }
                    }, 100)
                    that.$nextTick(() => {
                        if (mySwiper == null && that.cateData.type == 2) {
                            mySwiper = new NewSwi('.gallery-con', {
                                direction: 'horizontal',
                                pagination: null,
                                autoHeight: true,
                                loop: true,
                                pagination: '.swiper-pagination',
                                paginationClickable: true,
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
//                autoplay : 1000,
                                onSlideChangeEnd: function (swiper) {
                                    that.cateClick(swiper.activeIndex - 1)
                                }
                            })

                        }
                    })
                })
            },
            //加载更多帖子
            getMoreData() {
                let that = this
                this.$store.dispatch('per_community_getMoreData').then(function (res) {
                    that.hasMore = res
                    setTimeout(() => {
                        if (mySwiper != null) {
                            mySwiper.onResize()
                        }
                    }, 10)
                })
            },
            //子圈列表
            getChildCircleData() {
                this.$store.dispatch('per_community_getChildCircleData')
            },
            loadMore() {
                var that = this
                this.$store.commit('CHANGE_MORE_PAGE', {tempP: this.pageNow})
                this.getMoreData()
                if (mySwiper != null) {
                    mySwiper.onResize()
                }
            },
            refresh() {
                var that = this
                this.$store.commit('COMMUNITY_MORE_PAGE', {page: 1})
                this.getCommunityData(1)
            },
            publish() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$router.push('/community/community_post/' + that.$route.params.circleId)
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            }
        },
        destroyed () {

        },
        mounted () {

        },
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/community/perCommunity.less';
    @import '../../css/community/moreCommunity.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }

    .cateStand {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>
