<template>
    <div class="download" v-if="!isHide" v-show="!hiding">
        <div v-if="back">
            <img @click="download()" class="back" src="../../assets/guildDown_back.jpg" alt="">
        </div>
        <div v-else>
            <img class="head" src="../../assets/downHead.png" alt="">
            <h1>麽多</h1>
            <h2>麽多二次元  你的二次元</h2>
            <a @click="download()">下 载</a>
        </div>
        <!--<img @click="hideSelf()" class="close" src="../../assets/activity/close.png" alt="">-->
    </div>
</template>
<style lang="less" scoped>
    .download {
        position: fixed;
        width: 7.5rem;
        background-color: rgba(89,89,89,0.7);
        height: 1.2rem;
        top: 0;
        z-index: 2;
    .back {
        background: rgba(0,0,0,0.5);
        display: inline-block;
        opacity: 1;
        width: 100%;
        height: 1.2rem;
    }
    .head {
        display: inline-block;
        margin: 0.15rem 0.2rem 0.15rem 0.2rem;
        float: left;
        width: 0.9rem;
        line-height: 0.9rem;
    }
    .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.4rem;
        height: 0.4rem;
    }
    h1 {
        color: rgba(255,255,255,0.9);
        display: inline-block;
        margin-top: 0.15rem;
        width: 4rem;
        float: left;
        height: 0.5rem;
        text-align: left;
    }
    h2 {
        color: rgba(255,255,255,0.9);
        display: inline-block;
        height: 0.4rem;
        width: 4rem;
        float: left;
        font-size: 0.3rem;
        text-align: left;
    }
    a {
        position: absolute;
        text-decoration: none;
        top: 0.35rem;
        right: 0.2rem;
        color: rgba(255,255,255,0.9);
        width: 1.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        border: 0;
        outline: none;
        background-color: rgba(56,152,104,1);
    }
    }
</style>
<script>
    import API from '../../../config/api/API'
    var api = new API()
    export default {
        data() {
            return {
                hiding:false
            }
        },
        props: {
            back: false,
            isHide:false
        },
        methods: {
            download($event) {
// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
                // 否则打开a标签的href链接
                var uid = api.getQueryString('suid')
                var type = api.getQueryString('dt')
                api.getModuoData('booking/appDownload',null, {
                    'did':this.$route.params.id
                }).then(function (res) {

                })
                var isInstalled;
                var ifrSrc,downloadPage = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
                if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    //var gz = '{"comName":"${com.short_name}","comID":"${com.id}","comPhoneNum":"${com.phone_num}","type":"0"}';
                    //var jsongz =JSON.parse(gz);
                    //下面是IOS调用的地址，自己根据情况去修改
                    ifrSrc = 'cartooncomicsshowtwo://'
                    downloadPage = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
                }else if (navigator.userAgent.match(/android/i)) {
                    ifrSrc = 'cartooncomicsshowtwo://'
                    downloadPage = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
                }
                window.location.href = downloadPage



//                var ifr = document.createElement('iframe')
//                ifr.src = ifrSrc
//                ifr.style.display = 'none'
////                attachEvent兼容ie
//                if (ifr.attachEvent){
//                    ifr.attachEvent("onload", function(){
//                        isInstalled = true;
//                    });
//                    ifr.onreadystatechange=function(){
//                        if(this.readyState=="complete"){
//
//                        }
//                    };
//                }else {
//                    ifr.onload = function() {
//                        isInstalled = true;
//                    };
//                }
//                document.body.appendChild(ifr);
//                setTimeout(function() {
//                    console.log(isInstalled)
//                    if (!isInstalled) {
//                        window.location.href = downloadPage
//                    }
//                },10);
//                setTimeout(function() {
//                    document.body.removeChild(ifr);
//                },1000);

            },
            hideSelf() {
                this.hiding = true
            }
        }
    }
</script>
