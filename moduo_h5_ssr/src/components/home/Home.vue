<template>
    <div v-title data-title="首页">
        <!--<div style="width: 0.5rem;height: 0.5rem;font-size: 0.25rem;position: absolute;z-index: 100;left: 3.5rem;border-radius: 0.5rem;line-height: 0.5rem" class="-mob-share-ui-button -mob-share-open">分享</div>-->
        <!--<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none">-->
            <!--<ul class="-mob-share-list">-->
                <!--<li class="-mob-share-weibo"><p>新浪微博</p></li>-->
                <!--<li class="-mob-share-qzone"><p>QQ空间</p></li>-->
                <!--<li class="-mob-share-qq"><p>QQ好友</p></li>-->
                <!--<li class="-mob-share-douban"><p>豆瓣</p></li>-->
                <!--<li class="-mob-share-facebook"><p>Facebook</p></li>-->
                <!--<li class="-mob-share-twitter"><p>Twitter</p></li>-->
            <!--</ul>-->
            <!--<div class="-mob-share-close">取消</div>-->
        <!--</div>-->
        <!--<div class="-mob-share-ui-bg"></div>-->
        <div style="overflow: hidden;" class="test" ref="scroller">
            <div class="abc">
                <!--------------------------首页banner图---------------------->
                <mt-swipe height="4rem" auto loop style="margin-top:0rem">
                    <mt-swipe-item v-for="item in picData" :key="item.id">
                        <!--要加跳转-->
                        <div class="swipe-content">
                            <a style="display: block" @click="bannerPage(item)"><img
                                    v-lazy="item.imgUrl==null?'assets/lazy.gif':baseImgUrl+item.imgUrl"></a>
                            <div class="swiper-pagination-title">
                                <h3>{{item.title}}</h3>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
                <!--------------------------麽多精选---------------------->
                <div class="titleView" v-if="dataList.length>0">
                    <span class="titleLine"></span>
                    <span>麽多娘特选</span>
                </div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div v-for="(item,index) in featureData" class="swiper-slide">
                            <img :src="item.imgUrl==null?'assets/lazy.gif':baseImgUrl+item.imgUrl" alt="" @click="selectionClick(index)">
                            <h5 class="selectTitle">{{item.title}}</h5>
                        </div>
                    </div>
                </div>
                <!--------------------------首页栏目---------------------->
                <my-scroll lock-y ref="scrollerCol" :bounce="false" class="cateClass">
                    <div class="inner" style="border-bottom: 0.04rem solid rgb(245, 245, 245)">
                        <img class="column" :src="item.logo==null?'assets/lazy.gif':baseImgUrl+item.logo" v-for="(item,index) in cateData" :class="{active:selectCode==index}" @click="cateClick(index)">
                        <img class="triangle" src="../../assets/Home/home_column_triangle.png" :style="{'marginLeft':0.5+1.5*selectCode+'rem'}"/>
                    </div>
                </my-scroll>
            </div>
            <!----------------正文内容---------------->
            <div class="gallery-content">
                <div class="swiper-wrapper">
                    <div v-for="(item,index) in cateData" :key="item.id" class="swiper-slide">
                        <div v-for="(item,index2) in dataList[index]" @click="goHomeDetail(item.id)">
                            <div v-if="index2<10">
                                <div class="singleLargeImg_type" v-if="item.logo?item.logo.length == 1:'false'">
                                    <h4>{{item.title}}</h4>
                                    <img class="largeImg" v-lazy="baseImgUrl+item.logo[0]"/>
                                    <span class="time">{{item.createTime}}</span>
                                    <span class="observe">{{item.readQauntiry}}</span>
                                </div>
                            </div>
                            <div v-else>
                                <div class="singleImg_type" v-if="item.logo?item.logo.length == 1:'false'">
                                    <img class="singImg" v-lazy="baseImgUrl+item.logo[0]"/>
                                    <h4>{{item.title}}</h4>
                                    <span class="time">{{item.createTime}}</span>
                                    <span class="observe">{{item.readQauntiry}}</span>
                                </div>

                                <div class="ThreeImg_type" v-if="item.logo?item.logo.length > 1:'false'">
                                    <div class="hd"><h3>{{item.title}}</h3></div>
                                    <div class="type1">
                                        <div v-if="item.logo.length==2">
                                            <img v-lazy="baseImgUrl+item.logo[0]">
                                            <img v-lazy="baseImgUrl+item.logo[1]">
                                        </div>
                                        <div v-else>
                                            <img v-lazy="baseImgUrl+item.logo[0]">
                                            <img v-lazy="baseImgUrl+item.logo[1]">
                                            <img v-lazy="baseImgUrl+item.logo[2]">
                                        </div>
                                    </div>
                                    <div>
                                        <span>{{item.createTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dividerInside"></div>
                        </div>
                    </div>
                </div>
            </div>
            <load-more @OVERSCROLL="judgeScroll" :hasmore="dataList[selectCode]?dataList[selectCode].isLoadmore:true"></load-more>
        </div>
        <div style="overflow: hidden;z-index: 100;">
            <my-scroll lock-y ref="scrollerCol" :bounce="false" class="cateClass cateStand" v-if="cateStandard">
                <div class="inner">
                    <img class="column" :src="item.logo==null?'assets/lazy.gif':baseImgUrl+item.logo" v-for="(item,index) in cateData" :class="{active:selectCode==index}" @click="cateClick(index)">
                    <img class="triangle" src="../../assets/Home/home_column_triangle.png" :style="{'marginLeft':0.5+1.5*selectCode+'rem'}"/>
                </div>
            </my-scroll>
        </div>
        <my-footer :selectnum="'0'" v-if="scrollOver"></my-footer>
        <my-loading :show="isLoading" :title="loadingText" ref="loading" :type=1></my-loading>
    </div>
</template>

<script>
//    import share from 'common/js/MobShare'
    import footer from 'common/vue/footer.vue'
    import {mapGetters} from 'vuex'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {Scroller, Swiper, SwiperItem, TransferDomDirective as TransferDom} from 'vux'

    import baseConfig from '../../../config/global-config'

    import SwiperNew from '../../../static/swiper-3.4.2.min'


    let mySwiper
    let mySwiperSelect
    export default {
        data() {
            return {
                selectionTitle: '',
                scrollOver: true,
                currentSpecialIndex: 1
            }
        },
        components: {
            'my-footer': footer,
            'mt-swipe': Swiper,
            'mt-swipe-item': SwiperItem,
            'my-scroll':Scroller,
            LoadMore
        },
        computed: {
            ...mapGetters({
                isLoading: 'home_loading',
                isAlert: 'home_isAlert', //弹窗
                alertTitle: 'home_alertTitle',//弹窗提示
                loadingText: 'home_loading_text',

                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',

                dataList: 'home_dataList',
                picData: 'home_data_banner',   //banner列表
                cateData: 'home_cate_data',     //目录列表
                featureData: 'home_data_feature',     //麽多精选

                alpha: 'home_alpha',   //是否显示目录
                recordPos: 'home_position',                 //导航条透明度
                cateStandard: 'home_cateStandard',          //当前选择目录
                selectCode: 'home_selectCode'           //当前位置
            })
        },
        created () {
            if (this.cateData.length == 0) {
                this.getCate()
            } else {
            }
//            this.scrollFn
//            this.$router.afterEach(route => {
//                if (mySwiper) {
//                    mySwiper.destroy(false)
//                    mySwiper = null
//                }
//                if (mySwiperSelect) {
//                    mySwiperSelect.destroy(false)
//                    mySwiperSelect = null
//                }
//            })
        },
        mounted () {
            if (this.cateData.length == 0) {
            } else {
                this.createContentSwiper()
            }
        },
        watch: {
        },
        methods: {
            //麽多娘精选跳转
            selectionClick(index) {
                if (this.currentSpecialIndex == index) {

                    var data = this.featureData[this.currentSpecialIndex]
                    this.$router.push('/community/detail/' + data.relationId+'?isWeb=1')
                }else if(this.currentSpecialIndex != index) {
                    this.currentSpecialIndex = index
                    mySwiperSelect.slideTo(index, 100, false)
                }
            },
            judgeScroll(judge) {
                const $body = document.body
                this.$store.commit('HOME_POSITION', {data: $body.scrollTop==0?document.documentElement.scrollTop:$body.scrollTop})
                var fourRem = (9.6 - 1) * this.baseRem
                if (($body.scrollTop==0?document.documentElement.scrollTop:$body.scrollTop) < fourRem) {
                    this.$store.commit('HOME_CATESTANDARD', {data: false})
                } else {
                    this.$store.commit('HOME_CATESTANDARD', {data: true})
                }

                this.scrollOver = !judge;
            },
            goHomeDetail(id) {
                this.$router.push('/news/news_detail/' + id +'?isWeb=1')
            },
            bannerPage(item) {
                if (item.bannerType == 1) {
                    this.$router.push('/news/news_detail/' + item.relationId +'?isWeb=1')
                }else {
                    window.location.href = item.activityUrl + '?activityId=' + item.relationId + '&appType=3'
                }
            },
            cateClick(index) {

                if (mySwiper != null) {
                    if (this.selectCode != index) {
                        mySwiper.slideTo(index, 100, false)
                        var fourRem = (9.6 - 1) * this.baseRem

                        if (this.recordPos <= fourRem) {

                        } else {
                            document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop = fourRem
                        }
                    }
                }
                this.$store.commit('HOME_SELECTCODE', {data: index})
                if (this.dataList[this.selectCode].length == 0) {
                    this.getHome(1)
                }
            },
            getCate() {
                let that = this
                this.$store.dispatch('getCateData').then(function () {
                    setTimeout(() => {
                        if(that.$refs.scrollerCol) {
                            that.$refs.scrollerCol.reset()
                        }
                    }, 100)
                    that.getHome()
                })
            },
            getHome(index) {
                var columnId;
                var item = this.cateData[this.selectCode];
                columnId = item.id;
                let that = this
                this.$store.dispatch('getHomeData', {
                    "size": "10",
                    "page": item.pageNow,
                    "columnId": columnId,
                    "isLoadmore": index
                }).then(function () {
                    that.createContentSwiper()
                })
            },
            createContentSwiper() {
                var that = this
                //麽多精选
                setTimeout(function () {
                    if (mySwiperSelect == null) {
                        mySwiperSelect = new SwiperNew('.swiper-container', {
                            direction: 'horizontal',
                            effect: 'coverflow',
//                            loop: true,
                            grabCursor: true,
                            centeredSlides: true,
                            slidesPerView: 'auto',
                            coverflow: {
                                rotate: 30,
                                stretch: 30,
                                depth: 600,
                                modifier: 1.1,
                                slideShadows : true
                            },
                            onSlideChangeEnd: function (swiper) {
                                that.currentSpecialIndex = swiper.activeIndex
                                var data = that.featureData[swiper.activeIndex%that.featureData.length]
                                that.selectionTitle = data.title
//                                console.log(swiper.activeIndex)
                            }
                        })

                        mySwiperSelect.slideTo(1, 100, false)
                        var data = that.featureData[1]
                        that.selectionTitle = data.title
                    } else {
                        mySwiperSelect.onResize()
                    }
                }, 10)
                //内容视图
                setTimeout(function () {
                    if (mySwiper == null) {
                        mySwiper = new SwiperNew('.gallery-content', {
                            direction: 'horizontal',
                            loop: false,
                            autoHeight: true,
                            effect: 'coverflow',
                            onSlideChangeEnd: function (swiper) {
                                console.log(swiper.activeIndex)
                                that.cateClick(swiper.activeIndex)
                            }
                        })
//                        console.log(mySwiper)
                    } else {
                        mySwiper.onResize()
                    }
                    mySwiper.slideTo(that.selectCode, 100, false)
                }, 10)
            },
            loadMore () {
                var that = this
                var item = that.cateData[that.selectCode];
                item.pageNow = parseInt(item.pageNow) + 1
                item.pageNow = item.pageNow + '';
                that.getHome(1)
            },
            refresh () {
                var that = this
                var item = that.cateData[that.selectCode];
                item.pageNow = "1"
                that.dataList[that.selectCode] = [];
                that.getHome(0)
            },
            //阻止冒泡事件的兼容性处理
            stopBubble(e) {
                if (e && e.stopPropagation) { //非IE
                    e.stopPropagation();
                } else { //IE
                    window.event.cancelBubble = true;
                }
            }
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
    @import '../../css/home/home.less';

    .xs-plugin-pulldown-container {
        .xs-plugin-pulldown-loading {

        }
        .xs-plugin-pulldown-down {
            text-align: left;
            color: red;
        }
    }
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../../static/swiper-3.4.2.min.css';

    .swiper-container {
        width: 100%;
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 5.0rem;
            height: 3.5rem;
            img {
                width: 100%;
                height: 100%;
                border-radius: 0.14rem;
            }
        }
    }
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
        top: 0rem;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
