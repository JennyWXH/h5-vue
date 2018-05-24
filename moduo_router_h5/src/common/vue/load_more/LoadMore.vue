<style lang="less" scoped>
  .loading-text {
    text-align:center;
    font-size: 0;
    display: inline-block;
    color: #999;
    /*padding-bottom: .2rem;*/
    span {
      /*padding-top: .1rem;*/
      height: 0.6rem;
      line-height: 0.6rem;
      display: inline-block;
      font-size: 0.32rem;
    }
  }
</style>

<template>
  <div>
  <div v-if="show || forceLoad" class="loading-text">
    <img v-if="isLoading" class="loading-img" :src="loading" style="width:0.5rem;height:0.5rem;">
    <span :style="customeStyle">{{text}}</span>
  </div>

  </div>
</template>
<style>
.loading-img {
  vertical-align: -0.18rem;
  width: 0.5rem;
  margin-right: 0.3rem;
  -webkit-animation: rotateImg 1s infinite linear;
}
@-webkit-keyframes rotateImg {
  0% {-webkit-transform: rotate(0deg);}
  0% {-webkit-transform: rotate(-360deg);}
}
</style>
<script>
  import img1 from './loading.png'
  export default {
    components: {
    },
    data () {
      return {
        show: false,
        loading: img1,
        time: 0,
        text: '正在加载中...',
        isLoading: true,
      }
    },
    props: {
      customeStyle: {
        type: Object,
        default: function () {
          return {}
        }
      },
      forceLoad: {
        type: Boolean,
        default: false
      },
      hasmore: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (window.innerHeight < document.body.scrollHeight) {

      }
    },
    watch: {
      hasmore () {
        if (!this.hasmore) {
          this.isLoading = false
          this.text = '没有更多了...'
        } else {
          this.isLoading = true
          this.text = '正在加载中...'
        }
      }
    },
    methods: {
      scrollFn () {
        const $body = document.body
        const dt = Date.now()
        if (dt < this.time + 500) {
          return
        }
//        const $body = document.body
        if (this.hasmore) {
          if ($body.scrollTop && document.documentElement.scrollTop) {
            if ($body.scrollTop + window.innerHeight + 5 >= $body.scrollHeight) {
              this.show = true
              this.time = dt

              this.$parent.loadMore()
            }
          }else {
            if ($body.scrollTop+document.documentElement.scrollTop + window.innerHeight + 5 >= $body.scrollHeight) {
              this.show = true
              this.time = dt

              this.$parent.loadMore()
            }
          }
        }
        //如果滚动距离大于页面高度的时候

//        alert($body.scrollTop + '&&&&&&&&&&&&&&&' + window.innerHeight)
        this.$emit('OVERSCROLL',($body.scrollTop > window.innerHeight+5)?true:false)
      }
    },
    created () {
      console.log('222')
      let that = this
      setTimeout(function () {
        document.body.addEventListener('touchmove', that.scrollFn, false)
        document.addEventListener('scroll', that.scrollFn, false)
      },1000)
    },
    deactivated () {
      document.body.removeEventListener('touchmove', this.scrollFn)
      document.removeEventListener('scroll', this.scrollFn)
    }
  }
</script>
