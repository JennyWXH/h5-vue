/**
 * Created by ma on 2017/7/25.
 */
import * as types from './types'
export const mutations = {
    [types.TIP_TITLE] (state, {data}) {
        state.tip_title = data
    },
    [types.TIP_FIRST_LOADING] (state, {data}) {
        state.tip_first_loading = data
    },
    [types.TIP_HOME_LOADING] (state, {data}) {
        state.tip_loading = data
    },
    [types.TIP_ALERT] (state, {data}) {
        state.tip_isAlert = data
    },
    [types.TIP_ALERT_TITLE] (state, {data}) {
        state.tip_alertTitle = data
    },
    //首页
    [types.TIP_HOME_DATALIST] (state, {data}) {
        state.tip_home_dataList = data
    },
    [types.TIP_HOME_PAGE] (state, {data}) {
        state.tip_home_page = data
    },
    [types.TIP_DETAIL_DATA] (state, {data}) {
        state.tip_detail_data = data
    },
    [types.TIP_DETAIL_INTRO] (state, {data}) {
        state.tip_detail_intro = data
    },
    [types.TIP_DETAIL_ID] (state, {data}) {
        state.tip_detail_id = data
    },
    [types.TIP_DETAIL_PRICE] (state, {data}) {
        state.tip_detail_price = data
    },
    [types.TIP_DETAIL_PRICE] (state, {data}) {
        state.tip_detail_price = data
    },
    [types.TIP_AFFIRM_ORDER] (state, {data}) {
        state.tip_affirm_order = data
    },
    [types.TIP_AREA_DATA] (state, {data}) {
        state.tip_area_data = data
    },
    [types.TIP_AREA_SEAT_DATA] (state, {data}) {
        state.tip_area_seat_data = data
    }
}