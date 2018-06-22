<template>
  <div id="app">
    <lg-preview></lg-preview>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="slide-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import Hello from './Hello.vue'
var sha1 = require('../config/api/sha1')
import API from '../config/api/API'
var api = new API();


export default {
  name: 'app',
  components: {
    Hello
  },
  created () {
    this.getWXToken()
  },
  mounted () {
    if(typeof window!=="undefined") {

      window.wxShare = require('../config/api/wxShare')
    }
  },
  methods: {
    getWXToken() {
      let that= this
      if(typeof window!=="undefined") {
        if (window.sessionStorage.access_token == null || window.sessionStorage.access_token == 'undefined') {
          api.getData('/weixin/cgi-bin/token', {
            'grant_type': 'client_credential',
            'appid': 'wxcc5d2d1b88dea674',
            'secret': 'f82f0c8df71f121b8e770edbf5e46bc8'
          }).then(function (res) {
            console.log('token is', res)
            window.sessionStorage.setItem('access_token', res.data.access_token)

            that.registerWxShare()
          })
        } else {
          this.registerWxShare()
        }
      }

    },
    registerWxShare() {
      let that= this
      if(typeof window!=="undefined"){
        if (window.sessionStorage.access_token != null && (window.sessionStorage.ticket == null || window.sessionStorage.ticket == 'undefined')) {
          api.getData('/weixin/cgi-bin/ticket/getticket', {
            'access_token': window.sessionStorage.access_token,
            'type': 'jsapi'
          }).then(function (res) {
            console.log('ticket is', res)
            window.sessionStorage.setItem('token_data', JSON.stringify(res.data))
            if (res.data.errcode == 42001) {
              window.sessionStorage.removeItem('access_token')
            } else {
              window.sessionStorage.setItem('ticket', res.data.ticket)
              var ticket = window.sessionStorage.ticket
              var url = location.href.split('#')[0];
              var str = 'jsapi_ticket=' + ticket + '&noncestr=1018194717&timestamp=1512121540&url=' + url
//            alert(str)
              str = sha1(str)
              window.sessionStorage.setItem('sha1', str)

              window.wxShare.weixinShare('麽多', '麽多下载')
            }
          })
        }
      }

    }
  }
}
</script>

<style>
#app {
  font-size: 0.35rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
