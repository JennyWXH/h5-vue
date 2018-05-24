/**
 * Created by hao on 2017/6/26.
 */
const progess = require('../config')
var base_url,img_url,weibo_redirect,qq_redirect
if(product=='production') {
  base_url = JSON.parse(progess.build.env.API_ROOT)
  img_url = JSON.parse(progess.build.env.API_IMAGE_ROOT)
  weibo_redirect = JSON.parse(progess.build.env.WEIBO_REDIRECT_URL)
  qq_redirect = JSON.parse(progess.build.env.QQ_REDIRECT_URL)
}else {
  base_url = JSON.parse(progess.dev.env.API_ROOT)
  img_url = JSON.parse(progess.dev.env.API_IMAGE_ROOT)
  weibo_redirect = JSON.parse(progess.dev.env.WEIBO_REDIRECT_URL)
  qq_redirect = JSON.parse(progess.dev.env.QQ_REDIRECT_URL)
}
var baseconfig = {
  // BASE_IMAGE_URL: 'http://images.imoduo.com/',
  // BASE_URL: 'http://t.imoduo.com:9000/moduo/',

  BASE_IMAGE_URL: img_url,
  BASE_URL: base_url,
  WEIBO_REDIRECT: weibo_redirect,
  QQ_REDIRECT: qq_redirect,
  PAGE_HEIGHT: document.documentElement.clientHeight/((document.documentElement.clientWidth>750?750:document.documentElement.clientWidth) / 750*100),
  PULLINGSTATUS: {                                //上拉与下拉状态
    pullupStatus: 'default',
    pulldownStatus: 'default'
  },
  pullDownConfig: {
    content: '下拉刷新',
    height: 60,
    color: 'blue',
    autoRefresh: false,
    downContent: '下拉刷新',
    upContent: '释放刷新',
    loadingContent: '正在加载...'
  },
  pullUpConfig: {
    content: '',
    height: 60,
    autoRefresh: false,
    downContent: '释放加载更多',
    upContent: '',
    loadingContent: '正在加载...'
  }

}

export default baseconfig;
