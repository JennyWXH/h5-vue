<template>
    <div v-title data-title="下载" id="app">
        <div>
            <img class="topImg" src="../../assets/mine/download_back.png" alt="">
            <a :href="linkUrl" class="bottomImg"></a>
        </div>
        <!--<my-toast :show="isAlert" :content="alertTitle"></my-toast>-->
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                linkUrl: '',
                userId: this.$route.params.userId,
                shareType: this.$route.params.shareType,
            }
        },
        components: {
        },
        created () {
            var initData = {};
            initData.type = "test";  //表示现在使用线上模式,如果填写"test", 表示测试模式.
            linkedme.init("ad43a1753840385a8c354e476d9ddb32", initData, function(err, response){
                if(err){
                    // 初始化失败，返回错误对象err
                } else {
                    // 初始化成功，可以不做处理
                }
            });
            var data = {};
            data.feature = "麽多登录"; // 自定义深度链接功能，多个用逗号分隔，【可选】
            data.stage = "First"; // 自定义深度链接阶段，多个用逗号分隔，【可选】
            data.channel = this.shareType; // 自定义深度链接渠道，多个用逗号分隔，【可选】
            data.tags = "h5"; // 自定义深度链接标签，多个用逗号分隔，【可选】
//            data.ios_custom_url = ""; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，需填写http或https【可选】
//            data.ios_direct_open = ""; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
//            data.android_custom_url = "";// 自定义安卓平台下App的下载地址，需填写http或https【可选】
//            data.android_direct_open = ""; //设置为true，所有情况下跳转android_custom_url，默认为false【可选】
            // 下面是自定义深度链接参数，用户点击深度链接打开app之后，params的参数会通过LinkedME服务器透传给app，由app根据参数进行相关跳转
            // 例如：详情页面的参数，写入到params中，这样在唤起app并获取参数后app根据参数跳转到详情页面
            data.params = '{"userId":"'+this.userId+'"}'; //注意单引号和双引号的位置
            var that = this;
            linkedme.link(data, function(err, response){
                if(err){
                    // 生成深度链接失败，返回错误对象err
                    console.log('err is', err)
                } else {
                    /*
                     生成深度链接成功，深度链接可以通过data.url得到，
                     将深度链接绑定到<a>标签，这样当用户点击这
                     个深度链接，如果是在pc上，那么跳转到深度链接二维
                     码页面，用户用手机扫描该二维码就会打开app；如果
                     在移动端，深度链接直接会根据手机设备类型打开ios
                     或者安卓app
                     */
                    that.linkUrl = response.url;
//                    window.location.href = that.linkUrl;
                }
            },false);
        },
        computed: {
            ...mapGetters({

            })
        },
        methods: {
            getCoin() {
//                window.location.href = 'moduolinkme://'
//                console.log('link ---- ', this.linkUrl);
                window.location.href = this.linkUrl;
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
    img.topImg {
        position: absolute;
        top: 0;
        left: 0;
        width: 7.5rem;
        height: 100%;
    }
    .bottomImg {
        background: url("../../assets/mine/download_button.png") no-repeat;
        background-size: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 3rem;
        height: 1.45rem;
        top: 77%;
    }
</style>