<template>
    <div v-title data-title="社区" id="app" style="overflow: hidden;">
        <div>
            <div style="display: inline-block;">
                <!--banner图-->
                <div>
                    <mt-swipe height="4rem" auto loop style="margin-top:0rem;overflow: hidden">
                        <mt-swipe-item v-for="item in bannerList" :key="item.id">
                            <!--要加跳转-->
                            <div class="swipe-contenter" @click="goCommunityDetail(item.relationId)">
                                <a style="display: block"><img style="width: 100%;height: 4rem;display: inline-block" :src="item.imgUrl==null?'../../assets/lazy.gif':(baseImgUrl+item.imgUrl)"></a>
                                <div class="swiper-pagination-title">
                                    <!--<h3>{{item.title}}</h3>-->
                                </div>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <!--栏目列表内容-->
                <div>
                    <!--------------------------社区圈子--------------------------->
                    <div class="titleView" v-if="dataList.length > 0">
                        <span class="titleLine"></span>
                        <span>社区圈子</span>
                    </div>
                    <div class="artistClass">
                        <ul :style="{width:(artistData.length>9?10*1.85:artistData.length*1.85)+0.3+'rem'}">
                            <li v-for="(item,index) in artistData" class="artistItem" @click="goPerCommunity(item.id)" v-if="index<9">
                                <img class="back" src="../../assets/community/community_artist_head.png" alt="">
                                <img class="content" :src="item.headerImg==null?'../../assets/lazy.gif':baseImgUrl+item.headerImg" alt="">

                                <span>{{item.name}}</span>
                            </li>
                            <router-link to="/community/moreCommunity">
                                <li v-if="artistData.length>9" class="artistItem" @click="goPerCommunity(item.id)">

                                    <img class="back" src="../../assets/community/community_artist_head.png" alt="">
                                    <img class="content" src="../../assets/community/activity_more.png" alt="">
                                    <span>更多</span>
                                </li>
                            </router-link>
                        </ul>
                    </div>

                    <div class="cateClass" v-for="(item,index) in cateList" :key="item.postId" v-if="index<=8"
                         @click="goPerCommunity(item.id)">
                        <img v-lazy="baseImgUrl+item.headerImg" alt="">
                        <span class="cateSpan">{{item.name}}</span>
                    </div>
                    <router-link to="/community/moreCommunity">
                        <div v-if="cateList?cateList.length>=9:false" class="cateClass">
                            <img src="../../assets/community/activity_more.png" alt="">
                            <span class="cateSpan">更多</span>
                        </div>
                    </router-link>
                </div>
                <!--帖子列表内容-->
                <div>
                    <div class="content" v-for="(item,index) in dataList" :key="item.postId">

                        <div v-if="index==0" class="divider" style="margin-top: 0.1rem"></div>
                        <my-circle :item="item"></my-circle>
                    </div>
                </div>
            </div>
            <load-more @OVERSCROLL="judgeScroll" :hasmore="hasMore"></load-more>
        </div>
        <my-footer :selectnum="'1'" v-if="scrollOver"></my-footer>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import footer from "common/vue/footer.vue"
    import circle from "common/vue/circle/circle_post.vue"
    import LoadMore from 'common/vue/load_more/LoadMore.vue'

    import {Swiper, SwiperItem} from 'vux'

    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                hasMore: true,
                scrollOver: true
            }
        },
        components: {
            'my-footer': footer,
            'mt-swipe': Swiper,
            'mt-swipe-item': SwiperItem,
            'my-circle': circle,
            LoadMore
        },
        created () {
            this.refresh()
        },
        mounted () {
        },
        computed: {
            ...mapGetters({
                isLoading: 'community_loading',
                isAlert: 'community_isAlert', //弹窗
                alertTitle: 'community_alertTitle',//弹窗提示
                pageNow: 'community_page',
                dataList: 'community_List',
                cateList: 'community_cate',  //栏目列表
                artistData: 'community_artist',  //栏目列表
                bannerList: 'community_banner',
                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork'
            })
        },
        methods: {
            selectionClick(index) {

            },
            judgeScroll(judge) {
                this.scrollOver = !judge;
            },
            getCommunityData(index) {
                let that = this
                this.$store.dispatch('getCommunityData').then(function () {

                });
            },
            goCommunityDetail(id) {
                this.$router.push('/community/detail/'+id+'?isWeb=1')
            },
            getMoreData(res) {
                let that = this
                this.$store.dispatch('getMoreData').then(function (res) {
                  that.hasMore = res
                });
            },
            goPerCommunity(circleId) {
                this.$router.push('/community/perCommunity/' + circleId)
            },
            loadMore() {
                var that = this
                var pageN = this.pageNow
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('COMMUNITY_HOME_PAGE', {page: pageN})
                this.getMoreData(1)
            },
            refresh() {
                var that = this
                this.$store.commit('COMMUNITY_HOME_PAGE', {page: 1})
                this.$store.commit('COMMUNITY_COMMENTLIST', {commentList: []})
                this.getCommunityData(0)
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/community/community.less';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
