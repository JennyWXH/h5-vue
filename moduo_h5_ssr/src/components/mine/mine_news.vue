<template>
    <div v-title data-title="消息" id="app">
        <my-cell :cellType="item.cellType" :style="{'marginTop':item.marginTop}" :showTopDevider="item.topDev"
                 v-for="(item,index) in mineArr" :key="index" :name="item.name" :src="item.src"
                 @SELECT_CELL="cellClick(index)"></my-cell>
    </div>
</template>
<script>
    import footer from "common/vue/footer.vue"
    import cell from './cell.vue'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                mineArr: [{
                    name: '赞',
                    src: '../../../static/mine/mine_news_favor.png',
                    marginTop: '0.05rem',
                    topDev: true,
                    cellType: 0,
                    pushRoute: '/mine/mine_news'
                },
                    {
                        name: '评论',
                        src: '../../../static/mine/mine_news_comment.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 0,
                        pushRoute: '/mine/mine_circle'
                    },
                    {
                        name: '关注',
                        src: '../../../static/mine/mine_news_attention.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 0,
                        pushRoute: '/mine/mine_post'
                    },
                    {
                        name: '系统消息',
                        src: '../../../static/mine/mine_news_system.png',
                        marginTop: '0rem',
                        topDev: false,
                        cellType: 0,
                        pushRoute: '/mine/mine_post'
                    }]
            }
        },
        components: {
            'my-footer': footer,
            'my-cell': cell
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                heading: 'mine_home_src',
                nickname: 'mine_home_nickname'
            })
        },
        methods: {
            cellClick(index) {
                switch (index) {
                    case 0:
                        this.$router.push('/mine/mine_news_comment/1')
                        break
                    case 1:
                        this.$router.push('/mine/mine_news_comment/2')
                        break
                    case 2:
                        this.$router.push('/mine/mine_news_attention')
                        break
                    case 3:
                        this.$router.push('/mine/mine_news_system')
                        break
                }
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_news.less';

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
        margin-top: 0px;
    }
</style>
