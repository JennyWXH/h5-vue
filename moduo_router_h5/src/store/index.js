/**
 * Created by ma on 2017/7/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import common from './common/index'
import Home from './home/index'
import community from './community/index'
import reward from './reward/index'
import buyTip from './buyTip/index'
import mine from './mine/index'
// import {mapState,mapGetters} from 'vuex'
// Vue.use(mapState)
// Vue.use(mapGetters)

export default new Vuex.Store({
    modules: {
        common,
        Home,
        community,
        reward,
        buyTip,
        mine
    }
})