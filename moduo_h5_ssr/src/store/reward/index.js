/**
 * Created by jemmy_wxh on 2017/12/5.
 */
import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'

var state = {
    //通用
    reward_first_loading: true,
    reward_loading: true,
    reward_isAlert: false,   //弹窗
    reward_alertTitle: '', //弹窗提示
    //社区首页
    reward_title: '个人中心',

    //首页数据
    reward_list_data: [],
    reward_index_page: 1,
    reward_index_lucky_data: [],
    reward_detail_data: [],
    reward_detail_lucky_data: [],
}

export default {
    state,
    actions,
    getters,
    mutations,
}