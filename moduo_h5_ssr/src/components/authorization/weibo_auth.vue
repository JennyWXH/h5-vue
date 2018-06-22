<template>
    <div id="app">
        <button class="absolute absolute1" @click="connect">连接</button>
        <button class="absolute absolute2" @click="close">断开</button>
        <input class="cusInput" v-model="inputText" type="text" placeholder="请输入发送指令">
    </div>
</template>
<script>
    import API from '../../../config/api/API'
    var api = new API();
    import baseConfig from '../../../config/global-config'
    export default {
        data() {
            return {
                inputText: '',
            }
        },
        created() {
            var that = this
            api.getList('/weibo/oauth2/access_token?client_id=2082558072&client_secret=f33ef031588297b9707f47a6fb7e2f5c&grant_type=authorization_code&redirect_uri='+baseConfig.WEIBO_REDIRECT+'&code='+api.getQueryString2('code')).then(function (res) {
                window.sessionStorage.setItem('access_token',res.data.access_token)
                window.sessionStorage.setItem('login_type','3')
                //获取用户信息
                api.getData('/weibo/2/users/show.json',{
                    'access_token':res.data.access_token,
                    'uid':res.data.uid,
                }).then(function (response) {
                    console.log('userInfo is',response)
                    var userInfo = response.data
                    //得到用户信息进行登录
                    that.$store.dispatch('mine_login',{
                        'openid':res.data.uid,
                        'nickname':userInfo.name,
                        'unionId':res.data.uid,
                        'loginType':'3',
                        'headImg':''
                    }).then(function (res) {
                        //登录成功
                        that.$router.push('/mine')
                    });
                })
//                console.log('token is',res)
            }).catch(function (error) {
                that.$router.push('/mine')
//                console.log('error is',error.response.data);
            });
//            api.getList('/getWeiboToken',{
//                'client_secret': 'f33ef031588297b9707f47a6fb7e2f5c',
//                'client_id':'2082558072',
//                'grant_type':'authorization_code',
//                'code':api.getQueryString2('code'),
//                'redirect_uri':'http://192.168.1.147:1320/auth/weibo'
//            }).then(function (res) {
//                alert('success')
//                console.log('token is',res)
//                window.sessionStorage.setItem('access_token',res.data.access_token)
//            }).catch(function (error) {
//                console.log('error is',error.response.data);
//            });
        },
        methods: {

        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
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

    .absolute {
        width: 1.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: white;
        background-color: #00AAAA;

        display: block;
        position: fixed;
        top: 0.6rem;
    }
    .absolute1 {
        left: 1.6rem;
    }
    .absolute2 {
        left: 4.6rem;
    }
    .absolute:focus{outline:none;}
    .cusInput {
        margin-top: 2rem;
        font-size: 0.3rem;
        width: 5rem;
        height: 0.55rem;
        line-height: 0.55rem;
    }
</style>