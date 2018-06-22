// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"
import Lazyload from "vue-lazyload"  // vue图片懒加载
import axios from "axios"
// import {vuePicturePreview} from "vue-picture-preview"
import { emoji } from "../src/common/js/emoji/emoji-mine"
import { sync } from "vuex-router-sync"
require ("babel-polyfill")


Vue.prototype.emoji = emoji

// Vue.use(vuePicturePreview)

//全局组件
import header from 'common/vue/Header.vue'
import loading from 'common/vue/Loading.vue'
import toast from 'common/vue/toast.vue'
Vue.component('my-header',header)
Vue.component('my-loading',loading)
Vue.component('my-toast',toast)

Vue.use(Lazyload, {
	preLoad: 1.3,
	attempt: 1,
	error: "../../static/pic_load_error_square.png",
	loading: "../../static/default_load.png"
})

Vue.config.productionTip = false

// Vue.directive('title', {
// 	inserted: function (el, binding) {
// 		document.title = el.dataset.title
// 	}
// })

router.afterEach(route => {
	// 从路由的元信息中获取 title 属性
	if (route.meta.title) {
		if(typeof document!=="undefined") {
			document.title = route.meta.title;
			// 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
			if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				const hackIframe = document.createElement('iframe');
				hackIframe.style.display = 'none';
				// hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
				document.body.appendChild(hackIframe);
				setTimeout(_ => {
					document.body.removeChild(hackIframe)
				}, 300)
			}
		}
	}
})
sync(store, router)
/* eslint-disable no-new */

const app = new Vue({
	router,
	store,
	render: h => h(App)
})

export { app, router, store }
