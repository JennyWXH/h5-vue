var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  API_ROOT: '"http://api.imoduo.com:9000/moduo/"',
  API_IMAGE_ROOT: '"http://img.imoduo.com/"',
  // http://m.imoduo.com/#/
  WEIBO_REDIRECT_URL: '"http://m.imoduo.com/#/auth/weibo"',
  QQ_REDIRECT_URL: '"http://m.imoduo.com/#/auth/qq"',
  // API_ROOT: '"http://t.imoduo.com:9000/moduo/"',
  // API_IMAGE_ROOT: '"http://120.77.150.227:8886/"',
  // WEIBO_REDIRECT_URL: 'http://jemmyt.hk1.tunnelfrp.cc/auth/weibo'
})
