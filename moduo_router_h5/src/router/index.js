/**
 * Created by ma on 2017/7/24.
 */
import Vue from 'vue'
import Router from 'vue-router'

import home from './home/home'

import community from './community/community'

import reward from './reward/reward'

import buyTip from './buyTip/buyTip'

import mine from './mine/mine'

import auth from './authorization/auth'

Vue.use(Router)
/**
 * 路由信息配置
 */
var newRoutes = addArray(home,community,reward,buyTip,mine,auth)
export default new Router({
    routes: newRoutes,
    hashbang: false,
    canReuse: false,
    history: true,
    // mode:'history'
})

function addArray() {
    var views = []
    if(arguments.length > 0) {
        views = arguments[0]
        for (var key in arguments) {
            if (key != 0) {
                var array = arguments[key]
                for (var key in array) {
                    views.push(array[key])
                }
            }

        }
    }

    return views
}

