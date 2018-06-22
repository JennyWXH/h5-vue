<template>
    <div id="app">

    </div>
</template>
<script>


    import API from '../../../config/api/API'
    var api = new API();
    export default {
        data() {
            return {

            }
        },
        created() {
            var that = this
            QC.LogingetMe(function(openId, accessToken){
                console.log('openId is',openId,'--------accessToken is',accessToken)
                window.sessionStorage.setItem('access_token',accessToken)
                window.sessionStorage.setItem('login_type','2')
                //获取用户信息

                //用JS SDK调用OpenAPI
                QC.api("qq/user/get_user_info", {
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

//                api.getData('/getQQUserInfo',{
//                    'access_token':accessToken,
//                    'openid':openId,
//                    'oauth_consumer_key':'101445043'
//                }).then(function (response) {
//                    console.log('userInfo is',response)
//                    var userInfo = response.data
//                    //得到用户信息进行登录
//                    that.$store.dispatch('mine_login',{
//                        'openid':openId,
//                        'nickname':userInfo.nickname,
//                        'unionId':openId,
//                        'loginType':'2',
//                        'headImg':''
//                    }).then(function (res) {
//                        //登录成功
//                        that.$router.push('/mine')
//                    });
//                })

            })
        },
        methods: {

        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style>
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
</style>