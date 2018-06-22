/**
 * Created by jemmy_wxh on 2017/12/5.
 */
import * as types from './types'
export const mutations = {
    [types.REWARD_TITLE] (state, {data}) {
        state.reward_title = data
    },
    [types.REWARD_FIRST_LOADING] (state, {data}) {
        state.reward_first_loading = data
    },
    [types.REWARD_HOME_LOADING] (state, {data}) {
        state.reward_loading = data
    },
    [types.REWARD_ALERT] (state, {data}) {
        state.reward_isAlert = data
    },
    [types.REWARD_ALERT_TITLE] (state, {data}) {
        state.reward_alertTitle = data
    },


    [types.REWARD_LIST_DATA] (state,{data}) {
        state.reward_list_data = data
    },
    [types.REWARD_INDEX_PAGE] (state,{data}) {
        state.reward_index_page = data
    },
    [types.REWARD_INDEX_LUCKY_DATA] (state,{data}) {
        state.reward_index_lucky_data = data
    },


    [types.REWARD_DETAIL_DATA] (state,{data}) {
        state.reward_detail_data = data
    },
    [types.REWARD_DETAIL_LUCKY_DATA] (state,{data}) {
        state.reward_detail_lucky_data = data
    },
}