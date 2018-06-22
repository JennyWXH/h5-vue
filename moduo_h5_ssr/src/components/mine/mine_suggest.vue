<template>
    <div v-title data-title="意见反馈" id="app">
        <my-header title="意见反馈" title-color="black" :showDevider=true :showBack=true>
            <div slot="right">
                <span @click="submit" style="font-size: 0.35rem">提交</span>
            </div>
        </my-header>
        <div class="content">
            <textarea id="commentInput" type="text" maxlength="200" v-model="msg" name=""
                      placeholder="您的宝贵意见,是我们进步的源泉"></textarea>
            <input v-model="address" class="submit" placeholder="请留下联系方式:QQ或Email">
        </div>
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
                msg: '',
                selectIndex: 0,
                address: ''
            }
        },
        components: {},
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

                detailId: 'community_detailId'
            })
        },
        methods: {
            submit() {
                if (this.msg == '') {
                    this.$store.dispatch('showAlert', '请输入您的宝贵意见')
                    return
                }
                if (this.address == '') {
                    this.$store.dispatch('showAlert', '请输入您的正确的QQ或Email')
                    return
                }
                if (!api.isEmail(this.address) && !api.isQQ(this.address)) {
                    this.$store.dispatch('showAlert', 'QQ或Email格式有误')
                    return
                }
                let that = this
                console.log(that.$route.query.userPostTime)
                this.$store.dispatch('mine_suggest', {
                    'type': 3,
                    'content': that.msg,
                    'address': that.address
                }).then(function () {
                    setTimeout(function () {
                        that.$router.go(-1)
                    }, 2000)
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>

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

    .content {
        width: 100%;
        height: 5rem;
    }

    textarea {
        outline: none;
        display: block;
        resize: none;
        float: left;
        border-radius: 0.1rem;
        border: 0;
        font-size: 0.31rem;
        padding: 0.2rem;
        width: 7.1rem;
        height: 4rem;
        background-color: white;
    }

    .submit {
        color: gray;
        width: 7.1rem;
        padding: 0.2rem;
        border: 0;
        display: inline-block;
        height: 0.4rem;
        line-height: 0.41rem;
        font-size: 0.29rem;
        margin-top: 0.2rem;
        background-color: white;
    }
</style>