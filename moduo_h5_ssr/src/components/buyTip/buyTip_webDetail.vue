<template>
    <div v-title :data-title="mode?'项目详情':'购买须知'" id="app">
        <div class="htmlContent" v-html="introData"></div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                mode: this.$route.query.mode, //1--项目详情 2--购买须知
            }
        },
        components: {},
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getDetailData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'tip_loading',
                isAlert: 'tip_isAlert', //弹窗
                alertTitle: 'tip_alertTitle',//弹窗提示

                introData: 'tip_detail_intro'
            })
        },
        methods: {
            getDetailData() {
                var that = this
                if (this.mode == 1) {
                    this.$store.dispatch('get_detail_introduce');
                }else {
                    this.$store.dispatch('get_detail_notice');
                }
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/buyTip/buyTip_webDetail.less';
    #app {
        height: 100%;
        background-color: white;
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