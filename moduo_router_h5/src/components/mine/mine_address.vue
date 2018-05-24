<template>
    <div v-title data-title="收货地址" id="app">
        <my-header title="收货地址" title-color="black" :showDevider=true :showBack=true>
            <div slot="right">
                <img @click="addAddress" class="rightImg" src="../../assets/mine/mine_address_add.png" alt="">
            </div>
        </my-header>
        <div style="margin-top: 0.1rem">
            <div class="address" v-for="item in dataList" @click="goDetail(item)">
                <div style="position: relative;display: inline-block">
                    <span>收件人:{{item.consignee}}</span>
                    <span>联系方式:{{item.phoneNumber}}</span>
                    <span>收货地址:{{item.fullAddress+item.address}}</span>
                    <img class="right" src="../../assets/more.png" alt="">
                </div>
                <div class="default" v-if="item.addressType">
                    <span class="defaultText">默认地址</span>
                </div>
            </div>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import cell from './cell.vue'

    export default {
        data() {
            return {}
        },
        components: {
            'my-cell': cell
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示

                dataList: 'mine_address_list',//地址列表
            })
        },
        methods: {
            goDetail(item) {
                this.$store.commit('MINE_ADDRESS_DATA', {data: item})
                if (this.$route.query.select) {
                    this.$store.commit('MINE_ADDRESS_SELECT', {data: true})
                    this.$router.go(-1)
                } else {
                    this.$router.push('/mine/mine_address_add/2')
                }
                var select = this.$route.query
            },
            addAddress() {
                this.$router.push('/mine/mine_address_add/1')
            },
            getData() {
                this.$store.dispatch('mine_get_address')
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_address.less';

    #app {
        height: 100%;
        background-color: rgb(240, 239, 245);
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