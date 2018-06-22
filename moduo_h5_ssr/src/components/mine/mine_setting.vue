<template>
    <div v-title data-title="设置" id="app">

        <my-cell :showImg="false" name="收货地址" @SELECT_CELL="cellClick()"></my-cell>
        <span @click="logout" class="logOut">退出登录</span>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <!--<p>{{result}}</p>-->
        <!--<p v-html="detail"></p>-->
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import cell from './cell.vue'
    import API from '../../../config/api/API'
    import finger from '../../../src/common/js/fingerprint2'
    var api = new API();

    export default {
        data() {
            return {
                detail: '',
                result: '',
            }
        },
        components: {
            'my-cell': cell
        },
        created () {
            var d1 = new Date();
            var fp = new finger();
            var that = this;
            fp.get(function(result, components) {
                var d2 = new Date();
                var timeString = "Time took to calculate the fingerprint: " + (d2 - d1) + "ms";
                var details = "<strong>Detailed information: </strong><br />";
                if(typeof window.console !== "undefined") {
//                    console.log(timeString);
//                    console.log(result);
                    for (var index in components) {
                        var obj = components[index];
                        var value = obj.value;
                        var line = obj.key + " = " + value.toString().substr(0, 100);
//                        console.log(line);
                        details += line + "<br />";
                    }
                }
                that.result = result;
                that.detail = details;
//                alert(result)
//                document.querySelector("#details").innerHTML = details
//                document.querySelector("#fp").textContent = result
//                document.querySelector("#time").textContent = timeString
            });
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
            })
        },
        methods: {
            cellClick() {
                let that = this
                this.$store.dispatch('checkLogin').then(function () {
                    that.$router.push('/mine/mine_address')
                },function () {
                    that.$router.push('/mine/mine_login')
                })
            },
            logout() {
                let that = this
                this.$store.dispatch('logoutLogin').then(function () {
                    if (window.sessionStorage.login_type == 3) {
                        api.getData('/weibo/oauth2/revokeoauth2',{'access_token':window.sessionStorage.access_token}).then(function (res) {
                            console.log('res',res)
                        })
                    }else if (window.sessionStorage.login_type == 2) {
                        QC.Login.signOut()
                    }
                    that.$store.dispatch('showAlert', '登出成功')
                    setTimeout(() => {
                        that.$router.go(-1)
                    }, 1500)
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

    .logOut {
        width: 100%;
        background-color: white;
        display: inline-block;
        margin-top: 0.2rem;
        height: 0.8rem;
        line-height: 0.81rem;
        font-size: 0.32rem;
    }
</style>