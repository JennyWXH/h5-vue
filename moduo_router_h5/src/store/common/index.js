/**
 * Created by ma on 2017/8/1.
 */
import {actions} from './actions'
import {getters} from './gettters'
import {mutations} from './mutations'
import baseConfig from '../../../config/global-config'

const state = {
    baseImg: baseConfig.BASE_IMAGE_URL,
    contentHeight: baseConfig.PAGE_HEIGHT,       //页面高度
    baseRem: (document.documentElement.clientWidth>750?750:document.documentElement.clientWidth) / 750*100,
    netWork: false, //是否有网络
    pullDownConfig: baseConfig.pullDownConfig,
    pullUpConfig: baseConfig.pullUpConfig,
    status: {                               //上拉与下拉状态
        pullupStatus: 'default',
        pulldownStatus: 'default'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
