<template>
    <div v-title data-title="分享" id="app">
        <div class="back">
            <div class="download">
                <img @click="download()" class="back" src="../../assets/reward/reward_guildDown.png" alt="">
            </div>
            <div class="content">
                <span class="title">我在麽多抽中了:</span>
                <span class="rewardName">{{title}}</span>
                <img class="rewardIcon" :src="imgUrl" alt="">
            </div>
            <div class="bottom">
                <img src="../../assets/reward/reward_share_bottom.png" alt="">
            </div>
        </div>
        <my-confirm @on-confirm="sure" title="跳转至下载页" v-model="showConfirm" theme="ios"><slot name="default">下载后，你的欧气会满满滴哟 (๑• ₃•๑)</slot></my-confirm>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {Confirm} from 'vux'
    import API from '../../../config/api/API'
    var api = new API();
    export default{
        data() {
            return {
                title: this.$route.query.title,
                imgUrl: this.subStr(this.$route.query.imgUrl),
                showConfirm: false
            }
        },
        components: {
            'my-confirm': Confirm
        },
        created() {
            let that = this
            setTimeout(function () {
                window.wxShare.weixinShare('抽抽抽', '我在麽多抽中了:'+that.title, that.imgUrl)
            },2000)
        },
        computed: {
            ...mapGetters({
                baseImgUrl: 'baseImg',
            })
        },
        methods: {
            alertView() {
                let that = this
                this.showConfirm = true;
                setTimeout(function () {
                    that.showConfirm = false;
                },2000)
            },
            sure() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
            },
            subStr(str) {
                var index = str.lastIndexOf(".");
                var newStr = str.substring(0,index) + '_m' + str.substring(index)
                return str
            },
            download() {
                api.download({},this.alertView)
            },
        }

    }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>

    @import '../../css/reward/rewardShare.less';
    #app {
        min-height: 100%;
        background-color: rgb(245, 245, 245);
        background: url("../../assets/reward/reward_share_back.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 7.5rem;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }

    #app::-webkit-scrollbar {
        width: 0px
    }

    .scroll {
        width: 100%;
        background-color: rgb(240, 239, 245);
        display: inline-block;
        margin-bottom: 1.9rem;
        overflow: scroll;
        overflow-x: hidden;
    }

</style>
