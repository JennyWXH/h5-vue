var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PrerenderSPAPlugin = require('prerender-spa-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  devtool: '#source-map',
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'es6-promise/auto',
      'firebase/app',
      'firebase/database',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'node_modules': path.resolve(__dirname, '../node_modules'),
      'common': path.resolve(__dirname, '../src/common'),
      'vue': 'vue/dist/vue.js',
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('config'),resolve('node_modules/vux'),resolve('node_modules/axios')],
        query: {
          presets: ['env'] //按照最新的ES6语法规则去转换
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'vue-module'
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // loader .css .scss style
      // {
      //   test: /\.less$/,
      //   loader: 'style-loader!css-loader!less-loader'
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.join(__dirname, '../dist'),
    //   // Required - Routes to render.
    //   routes: [ '/', '/mine', '/news/news_detail', '/community', '/community/detail',  '/buyTip', '/buyTip/detail', '/reward', '/reward/detail'],
    // })
  ],
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios'
  }
}

const vuxLoader = require('vux-loader')
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
