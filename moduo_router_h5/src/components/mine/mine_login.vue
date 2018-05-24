<template>
    <div v-title data-title="登录" id="app">
        <!--<img @click="goBack()" class="back" src="../../assets/back_high.png" alt="">-->
        <div class="login">
            <div class="loginType">
                <img @click="moduoLogin(1)" src="../../assets/mine/mine_login_wx.png" alt="">
                <img @click="moduoLogin(2)" src="../../assets/mine/mine_login_qq.png" alt="">
                <img @click="moduoLogin(3)" src="../../assets/mine/mine_login_wb.png" alt="">
            </div>
        </div>
        <div class="bottom">
            <img @click="goBack" src="../../assets/mine/login_tip.png" alt="">
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <!--<button id="qqLogin"></button>-->
    </div>
</template>
<script>

    import baseConfig from '../../../config/global-config'
    import footer from "common/vue/footer.vue"
    import cell from './cell.vue'
    import {mapGetters} from 'vuex'

    var timer;
    export default {
        components: {
            'my-footer': footer,
            'my-cell': cell
        },
        created () {
            this.qqLoginCheck()
            if(timer) {
                window.clearInterval(timer)
                timer = null
            }
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
            qqLoginCheck() {
                //判断qq是否登录成功
                if (QC.Login.check()) {
                    //验证已登录则停止定时器
                    window.clearInterval(timer)
                    timer = null
                    var that = this
                    QC.Login.getMe(function(openId, accessToken){
                        console.log('openId is',openId,'--------accessToken is',accessToken)
                        window.sessionStorage.setItem('access_token',accessToken)
                        window.sessionStorage.setItem('login_type','2')
                        //获取用户信息
                        //用JS SDK调用OpenAPI
                        QC.api("get_user_info", {
                            'access_token':accessToken,
                            'openid':openId,
                            'oauth_consumer_key':'101445043'
                        }).success(function(response){//指定接口访问成功的接收函数，s为成功返回Response对象
                            //成功回调，通过s.data获取OpenAPI的返回数据
                            var userInfo = response.data
                            //得到用户信息进行登录
                            that.$store.dispatch('mine_login',{
                                'openid':openId,
                                'nickname':userInfo.nickname,
                                'unionId':openId,
                                'loginType':'2',
                                'headImg':''
                            }).then(function (res) {
                                //登录成功
                                that.$router.push('/mine')
                            });
                        }).error(function(f){//指定接口访问失败的接收函数，f为失败返回Response对象
                            //失败回调
                            alert("获取用户信息失败！");
                        }).complete(function(c){//指定接口完成请求后的接收函数，c为完成请求返回Response对象
                            //完成请求回调
//                    alert("获取用户信息完成！");
                        });

                    })
                }
            },
            goBack() {
                this.$router.go(-1)
            },
            moduoLogin(type) {
                if (type == 1) { //微信登录
                    window.localStorage.setItem('userId','10002624')
                    this.$store.dispatch('showAlert', '登录成功')
                    let that = this
                    setTimeout(function () {
                        that.$router.go(-1)
                    },2000)
                } else if (type == 2) { //qq登录
                    let that = this
                    timer = setInterval(function () {
                        that.qqLoginCheck()
                    },1000)
                    QC.Login.showPopup({
                    })
                } else { //微博登录
                    window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id=2082558072&response_type=code&redirect_uri='+baseConfig.WEIBO_REDIRECT
                }
            },
            qqLogin() {
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_login.less';
    #app {
        height: 100%;
        background-color: yellow;
        background: url("../../assets/mine/mine_login_back.png") no-repeat;
        background-size: 100% 100%;
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
