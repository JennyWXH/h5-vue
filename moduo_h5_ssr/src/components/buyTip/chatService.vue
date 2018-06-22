<template>
  <div id="app">
    <div class="content" id="contentId">
      <div v-for="item in receive">
        <div v-if="item.type==1" class="left">
          <img :src="item.img" alt="">
          <span>{{item.content}}</span>
        </div>
        <div v-else class="right">
          <img :src="item.img" alt="">
          <span>{{item.content}}</span>
        </div>
      </div>
    </div>
    <div class="bottomInput">
      <!--<div class="inputType" @click="showTextView()">-->
        <input v-model="inputText" class="inputType" type="text" placeholder="我也说几句...">
      <!--</div>-->
      <button @click="sendBtn()">发送</button>
    </div>
  </div>
</template>
<script>
  import API from '../../../config/api/API'
  import {mapGetters} from 'vuex'
  var api = new API();
  let connection
  let timer
  export default {
    data() {
      return {
        userInfo: null,
        serviceInfo: null,
        text: '',
        inputText: '',
        hasMore: true,
        receive: [],
        status: 0, //0--未连接 1--已连接
        reConnectTime: 0
      }
    },
    created() {
      document.body.addEventListener('touchmove', this.scrollFn, false)
      document.addEventListener('scroll', this.scrollFn, false)
      this.vistorLogin()
    },
    destroyed () {
      document.body.removeEventListener('touchmove', this.scrollFn)
      document.removeEventListener('scroll', this.scrollFn)
    },
    computed: {
      ...mapGetters({
        baseRem: 'baseRem'
      })
    },
    methods: {
      getHistoryList(first) {
        let that = this
        var time = 0;
        if (this.receive.length > 0) {
          let item = this.receive[0]
          time = item.time
        }
        api.getModuoData('chat/msg/chatList',{
          'userId': this.userInfo.userId,
          'chatUserId': this.serviceInfo.userId,
          'time': time,
          'size': 10
        }).then(function (res) {
          if (res.data.status == 1) {
            console.log('res is', res.data.data)
            var arr = res.data.data
            if (arr.length < 10) {
              that.hasMore = false
            }
            that.receive = arr.concat(that.receive)
            if (first) {
              setTimeout(function () {
                window.scrollTo(0,document.body.scrollHeight)
              },10);
            }
          }
        })
      },
      vistorLogin() {
        let that = this
        api.getModuoData('chat/visitorLogin',{
          'code': "3322222222223",
        }).then(function (res) {
          if (res.data.status == 1) {
            console.log('-------------------------------')
            that.userInfo = res.data.data.userInfo
            that.serviceInfo = res.data.data.serviceInfo
            that.getHistoryList(true)
            that.createConnection()
          }
        })
      },
      createConnection() {
        if(window.WebSocket != undefined) {
          // WebSocket代码
          connection = new WebSocket('ws://192.168.1.128:9800/moduo/chat/websocket/'+this.userInfo.userId)
          connection.onopen = this.wsOpen
          connection.onclose = this.wsClose
          connection.onmessage = this.wsMessage
          connection.onerror = this.wsError
        }
      },
      wsOpen(event) {
//        console.log('event is', event)
        console.log('连接成功')
        this.status = 1
        this.reConnectTime = 0
        this.sendHeartBeat()
      },
      wsClose() {
        console.log('Closed')
        this.status = 0
      },
      wsMessage(event) {
        console.log(event.data)
        var eventObj = JSON.parse(event.data)
        if(eventObj.type == 'res-1002') {
          var obj = {
            'content': this.inputText,
            'type': 2,
            'img': this.serviceInfo.headImg,
            'name': this.userInfo.name,
            'userId': this.userInfo.userId
          }
          this.receive.push(obj)
        }else if(eventObj.type == 'req-1002') {
          if (eventObj.data.sendId == this.serviceInfo.userId) {
            var obj = {
              'content': eventObj.data.content,
              'type': 1,
              'img': this.serviceInfo.headImg,
              'name': this.serviceInfo.name,
              'userId': this.serviceInfo.userId
            }
            this.receive.push(obj)
          }
        }
        window.scrollTo(0,document.body.scrollHeight)
      },
      wsError(event) {
        console.log('Error: ' + event.data)
        if (this.reConnectTime > 64) {
          return;
        }
        this.connect()
        //重连时间2的指数级增长
        if (this.reConnectTime == 0) {
          this.reConnectTime = 2;
        }else{
          this.reConnectTime *= 2;
        }
      },
      connect() {
        this.createConnection()
      },
      close() {
        window.clearInterval(timer)
        timer = null
        this.receive = []
        if (connection) {
          connection.onclose()
          connection = null;
        }
      },
      sendBtn() {
        if (this.status == 0) {
          alert('正在重连中')
          this.connect()
        }else {

          var sendContent = {
            'type':'req-1002',
            'data':{
              'sendId':this.userInfo.userId,
              'receiveId':this.serviceInfo.userId,
              'content':this.inputText
            }
          }
          connection.send(JSON.stringify(sendContent))
        }
      },

      scrollFn () {
        const $body = document.body
        const dt = Date.now()
        if (dt < this.time + 500) {
          return
        }
        this.time = dt
        if ($body.scrollTop <= 0 && this.hasMore) {
          this.getHistoryList()
        }
      },

      //发送心跳包
      sendHeartBeat() {
        window.clearInterval(timer)
        timer = null
        let that = this
        timer = setInterval(function () {
          var sendContent = {
            'type':'req-1000',
            'data':{
            }
          }
          connection.send(JSON.stringify(sendContent))
        },3*1000*60)//3*60*1000
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../css/buyTip/chatService.less';
  #app {
    min-height: 100%;
    background-color: rgba(237, 234, 232,1);
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
