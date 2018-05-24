<template>
    <div v-title data-title="个人中心" id="app">
        <div class="scroll">
            <div class="top">
                <div class="levelView" v-if="isLogin&&userData">
                    <img class="level" :src="'../../../static/mine/mine_home_leval/Coin_level'+userData.level+'.png'" alt="">
                    <div class="progress">
                        <div class="actualPro" :style="{width: userData.exp/userData.levelExp*1.28 + 'rem'}"></div>
                    </div>
                    <span>{{userData.exp+'/'+userData.levelExp}}</span>
                </div>
                <img class="head" @click="goLoginPage()"
                     v-lazy="isLogin?(userData?userData.headerImg:''):'../../../static/mine/appLogo.png'" alt="">
                <span class="nickname" @click="goLoginPage()">{{isLogin?(userData?userData.name:'点击登录'):nickname}}</span>
                <div class="bottom">
                    <div class="left" @click="relationClick(2)">
                        <span class="rightT">{{userData?userData.attentions:0}}</span><span class="leftT">关注</span>
                    </div>
                    <div class="right" @click="relationClick(1)">
                        <span class="leftT">粉丝</span><span class="rightT">{{userData?userData.fans:0}}</span>
                    </div>
                </div>
            </div>
            <my-cell :tipCount="item.tipCount" :cellType="item.cellType" :style="{'marginTop':item.marginTop}"
                     :showTopDevider="item.topDev" v-for="(item,index) in mineArr" :key="index" :name="item.name"
                     :src="item.src" @SELECT_CELL="cellClick(index)">
            </my-cell>
            <span class="mineBottom">麽多交流群: QQ 536618512<br>欢迎进来提意见,调戏NPC</span>
        </div>
        <my-footer :selectnum="'4'"></my-footer>
    </div>
</template>
<script>
    import footer from "common/vue/footer.vue"
    import cell from './cell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                isLogin: window.localStorage.userId?true:false,
                mineArr: [
                    {
                        name: '我的呱币',
                        src: '../../../static/mine/mine_coin.png',
                        marginTop: '0.2rem',
                        topDev: true,
                        cellType: 2,
                        tipCount: '',
                        pushRoute: '/mine/mine_coin'
                    },
                    {
                        name: '消息',
                        src: '../../../static/mine/mine_msg.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 0,
                        pushRoute: '/mine/mine_news'
                    },
                    {
                        name: '我的订单',
                        src: '../../../static/mine/mine_order.png',
                        marginTop: '0.2rem',
                        topDev: true,
                        cellType: 0,
                        pushRoute: '/mine/mine_order'
                    },
                    {
                        name: '我的帖子',
                        src: '../../../static/mine/mine_tiezi.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 2,
                        tipCount: '',
                        pushRoute: '/mine/mine_post/1'
                    },
                    {
                        name: '我的圈子',
                        src: '../../../static/mine/mine_circle.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 2,
                        tipCount: '',
                        pushRoute: '/mine/mine_circle'
                    },
                    {
                        name: '我的收藏',
                        src: '../../../static/mine/mine_collect.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 2,
                        tipCount: '',
                        pushRoute: '/mine/mine_post/2'
                    },
                    {
                        name: '意见反馈',
                        src: '../../../static/mine/mine_suggest.png',
                        marginTop: '0.2rem',
                        topDev: true,
                        cellType: 0,
                        pushRoute: '/mine/mine_suggest'
                    },
                    {
                        name: '设置',
                        src: '../../../static/mine/mine_setting.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 0,
                        pushRoute: '/mine/mine_setting'
                    }]
            }
        },
        components: {
            'my-footer': footer,
            'my-cell': cell
        },
        created () {
            this.getUserData()
        },
        computed: {
            ...mapGetters({
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                heading: 'mine_home_src',
                nickname: 'mine_home_nickname',
                userData: 'mine_userData'
            })
        },
        methods: {
            getUserData() {
                let that = this
                this.$store.dispatch('get_mine_userData').then(function () {
                    //赋值
                    that.mineArr[0].cellType = that.userData.msg > 0 ? 1 : 0
                    that.mineArr[1].tipCount = that.userData.gungCoin > 0 ? that.userData.gungCoin + '' : ''
                    that.mineArr[2].tipCount = that.userData.circleCount > 0 ? that.userData.circleCount + '' : ''
                    that.mineArr[3].tipCount = that.userData.postCount > 0 ? that.userData.postCount + '' : ''
                    that.mineArr[4].tipCount = that.userData.postCollectCount > 0 ? that.userData.postCollectCount + '' : ''
                })
            },
            cellClick(index) {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    var item = that.mineArr[index]
                    if (index == 1) {
                        that.$router.push(item.pushRoute + '?coin=' + that.userData.gungCoin)
                    }else {
                        that.$router.push(item.pushRoute)
                    }
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
                goLoginPage() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$router.push('/mine/mine_info')
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            relationClick(index) {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$router.push('/mine/mine_relation/' + index)
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine.less';

    #app {
        height: 100%;
        background-color: rgb(245, 245, 245);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #app::-webkit-scrollbar {
        width: 0px
    }

    .scroll {
        width: 100%;
        background-color: rgb(240, 239, 245);
        display: inline-block;
        margin-bottom: 0.88rem;
        overflow: scroll;
        overflow-x: hidden;
    }

</style>
