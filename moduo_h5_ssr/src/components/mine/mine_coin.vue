<template>
    <div v-title :data-title="'我的呱币:'+(coin!=0?coin:deliverCoin)" id="app">
        <img class="levelRule" src="../../assets/mine/mine_coin_back.png" alt="">

        <img class="topImg" src="../../assets/mine/mine_coin_top.png" alt="">
        <span>{{coin!=0?coin:deliverCoin}}</span>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                src: '../../../static/mine/mine_coin_button.png',
                deliverCoin: this.$route.query.coin
            }
        },
        components: {
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

                coin: 'mine_coin_count'
            })
        },
        methods: {
            getCoin() {
                this.$router.push('/mine/mine_coin_introl')
            },
            changePic(index) {
                if (index == 1){
                    this.src = '../../../static/mine/mine_coin_button_down.png'
                }else {
                    this.src = '../../../static/mine/mine_coin_button.png'
                }
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_coin.less';

    #app {
        height: 100%;
        /*background-color: rgb(240, 239, 245);*/
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

    .rightImg {
        position: absolute;
        right: 0.1rem;
        width: 1.3rem;
        top: 0.1rem;
        height: 0.4rem;
    }
</style>