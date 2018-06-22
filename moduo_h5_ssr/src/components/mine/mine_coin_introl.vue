<template>
    <div v-title data-title="呱币介绍" id="app">
        <div class="top">
            <span @click="changePage(1)" class="level">等级</span>
            <span @click="changePage(2)" class="exp">经验 & 奖励</span>
            <div class="line">

                <img :class="page==2?'imgMove1':'imgMove2'" src="../../assets/mine/mine_coin_downLine.png" alt="">
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                page: 2,
            }
        },
        components: {
        },
        created () {
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
            })
        },
        methods: {
            changePage(index) {
                this.page = index
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_coin_intro.less';

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

    .rightImg {
        position: absolute;
        right: 0.1rem;
        width: 1.3rem;
        top: 0.1rem;
        height: 0.4rem;
    }
</style>