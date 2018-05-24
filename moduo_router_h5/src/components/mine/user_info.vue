<template>
    <div v-title :data-title="userData?userData.name:'个人信息'" id="app">
        <!--<div class="header" style="z-index: 102">-->
            <!--<my-header :title="userData?userData.name:'麽多'" :titleColor="'rgba(255,255,255,'+alpha+')'" :backAlpha=0-->
                       <!--:headerBg="alpha==1?'rgba(61,202,153,1)':'rgba(0,0,0,0)'" :showBack=true :backWhite=true>-->
                <!--<div slot="right"><img-->
                        <!--src="../../assets/community/refresh.png" alt="" style="width: 0.5rem;height: 0.5rem"-->
                        <!--@click="refresh()"></div>-->
            <!--</my-header>-->
        <!--</div>-->
        <div>
            <div class="topClass" v-if="userData">
                <img class="backImg" v-lazy="userData.headerImg" alt="">
                <div class="backDiv"></div>
                <div class="nomal">
                    <img class="headImg" v-lazy="userData.headerImg">
                    <div class="right">
                        <span class="title">{{userData.name}}</span>
                        <div class="info">
                            <span class="faver">关注 <span>{{userData.attentions}}</span></span>
                            <span class="post">粉丝  <span>{{userData.fans}}</span></span>
                        </div>
                        <div style="width: 100%;display: inline-block">
                            <span class="join" :style="{'width': userData.isAttention?'1.5rem':'1.2rem'}" @click="attentionClick()">{{userData.isAttention?'已关注':'关注'}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="postCount">
                <img src="../../assets/mine/user_info_post_icon.png" alt="">
                <span>帖子</span>
                <span class="gray">({{userData?userData.postCount:0}})</span>
            </div>
            <div class="commonDivider" style="height: 0.12rem"></div>
            <div style="display: inline-block">
                <div class="circleCateList" v-for="item in dataList" :key="item.id">
                    <my-circle @showActionView="showActionView(item)" :item="item"></my-circle>
                </div>
            </div>
            <load-more :hasmore="hasMore"></load-more>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <action :isShow="showAct" @functionWay="postCtrl"></action>
    </div>
</template>
<script>
    import action from 'common/vue/circle/actionView.vue'
    import circle from 'common/vue/circle/circle_post.vue'
    import LoadMore from 'common/vue/load_more/LoadMore.vue'
    import cell from './cell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                hasMore: true,
                showAct: true,
                userId: this.$route.params.uId,
            }
        },
        components: {
            'my-circle': circle,
            'my-cell': cell,
            'action': action,
            LoadMore
        },
        created () {
            this.refresh()
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                baseImgUrl: 'baseImg',
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',

                userData: 'user_data',
                dataList: 'user_post_list',
                page: 'user_post_page'
            })
        },
        methods: {
            postCtrl(content) {
                console.log(content)
            },
            attentionClick() {
                this.$store.dispatch('mine_user_attend')
            },
            showActionView(item) {
                this.showAct = !this.showAct
            },
            getData(index) {
                let that = this
                this.$store.dispatch('get_user_data',{uId:this.userId}).then(function () {

                })
                this.$store.dispatch('get_user_postList',{uId:this.userId,'isLoadmore':index}).then(function (res) {
                    if (index) {
                        that.hasMore = res
                    }
                })
            },
            indexScroll(pos) {
                var fourRem = (3 - 1) * this.baseRem
                if (pos.top < fourRem) {
                    this.$store.commit('COMMUNITY_PER_ALPHA', {alpha: pos.top / fourRem})
                    this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: false})
                } else {
                    this.$store.commit('COMMUNITY_PER_ALPHA', {alpha: 1})
                    this.$store.commit('COMMUNITY_PER_CATESTANDARD', {stand: true})
                }
            },
            loadMore() {
                var that = this
                var pageN = this.page
                pageN = parseInt(pageN) + 1
                pageN = pageN + '';
                this.$store.commit('USER_POST_PAGE', {data: pageN})
                this.getData(1)
            },
            refresh() {
                var that = this

                this.$store.commit('USER_POST_PAGE', {data: 1})
                this.$store.commit('USER_POST_LIST', {data: []})

                this.getData(0)
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/user_info.less';

    #app {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>