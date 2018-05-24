/**
 * Created by ma on 2017/7/25.
 */
import * as types from './types'

export const mutations = {
    [types.HOME_TITLE] (state,{data}) {
        state.home_title = data
    },
    [types.HOME_FIRST_LOADING] (state,{data}) {
        state.home_first_loading = data
    },
    [types.HOME_LOADING] (state,{data}) {
        state.home_loading = data
    },
    [types.HOME_LOADING_TEXT] (state,{data}) {
        state.home_loading_text = data
    },
    [types.HOME_ALERT] (state,{data}) {
        state.home_isAlert = data
    },
    [types.HOME_ALERT_TITLE] (state,{data}) {
        state.home_alertTitle = data
    },


    [types.HOME_DATA_LIST] (state,{data}) {
        state.home_dataList = data
    },
    [types.HOME_PIC_DATA] (state,{data}) {
        state.home_data_banner = data
    },
    [types.HOME_CATE_DATA] (state,{data}) {
        state.home_cate_data = data
    },
    [types.HOME_FEATURE_DATA] (state,{data}) {
        state.home_data_feature = data
    },
    [types.HOME_CATESTANDARD] (state,{data}) {
    state.home_cateStandard = data
    },
    [types.HOME_ALPHA] (state,{data}) {
        state.home_alpha = data
    },
    [types.HOME_SELECTCODE] (state,{data}) {
        state.home_selectCode = data
    },
    [types.HOME_POSITION] (state,{data}) {
        state.home_position = data
    },

    [types.HOME_ALL_COMMENT] (state,{data}) {
        state.home_all_comment = data
    },
    [types.HOME_COMMENT_LIST] (state,{data}) {
        state.home_comment_list = data
    },
    [types.HOME_DETAIL_DATA] (state,{data}) {
        state.home_detail_data = data
    },


    [types.HOME_DETAIL_COMMENT] (state,{data}) {
        state.home_detail_comment = data
    },
    [types.HOME_DETAIL_COMMENT_DATA] (state,{data}) {
        state.home_detail_comment_data = data
    },
}