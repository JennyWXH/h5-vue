/**
 * Created by ma on 2017/7/25.
 */
import * as types from './types'
export const mutations = {
    [types.MINE_TITLE] (state, {data}) {
        state.mine_title = data
    },
    [types.MINE_FIRST_LOADING] (state, {data}) {
        state.mine_first_loading = data
    },
    [types.MINE_HOME_LOADING] (state, {data}) {
        state.mine_loading = data
    },
    [types.MINE_ALERT] (state, {data}) {
        state.mine_isAlert = data
    },
    [types.MINE_ALERT_TITLE] (state, {data}) {
        state.mine_alertTitle = data
    },
    [types.MINE_HOME_HEAD] (state, {data}) {
        state.mine_home_src = data
    },
    [types.MINE_HOME_NICKNAME] (state,{data}) {
        state.mine_home_nickname = data
    },
    [types.MINE_HOME_USERDATA] (state,{data}) {
        state.mine_userData = data
    },
    [types.MINE_CHANGE_NAME] (state,{data}) {
        state.mine_change_name = data
    },
    [types.MINE_CHANGE_HEAD] (state,{data}) {
        state.mine_change_head = data
    },
    //----------关系列表
    [types.MINE_RELATION_LIST] (state,{data}) {
        state.mine_relation_list = data
    },
    [types.MINE_RELATION_TYPE] (state,{data}) {
        state.mine_relation_type = data
    },
    [types.MINE_RELATION_PAGE] (state,{data}) {
        state.mine_relation_page = data
    },
    //----------我的圈子
    [types.MINE_CIRCLE_LIST] (state,{data}) {
        state.mine_circle_list = data
    },
    [types.MINE_CIRCLE_PAGE] (state,{data}) {
        state.mine_circle_page = data
    },
    //----------我的帖子与收藏
    [types.MINE_POST_TYPE] (state,{data}) {
        state.mine_post_type= data
    },
    [types.MINE_POST_LIST] (state,{data}) {
        state.mine_post_list = data
    },
    [types.MINE_POST_PAGE] (state,{data}) {
        state.mine_post_page = data
    },
    [types.MINE_COLLECT_LIST] (state,{data}) {
        state.mine_collect_list = data
    },
    [types.MINE_COLLECT_PAGE] (state,{data}) {
        state.mine_collect_page = data
    },
    //-----------用户信息
    [types.USER_DATA] (state,{data}) {
        state.user_data = data
    },
    [types.USER_ID] (state,{data}) {
        state.user_id = data
    },
    [types.USER_POST_LIST] (state,{data}) {
        state.user_post_list = data
    },
    [types.USER_POST_PAGE] (state,{data}) {
        state.user_post_page = data
    },
    [types.MINE_POST_ID] (state,{data}) {
        state.mine_post_id = data
    },
    //
    [types.MINE_ADDRESS_LIST] (state, {data}) {
        state.mine_address_list = data
    },
    [types.MINE_ADDRESS_DATA] (state, {data}) {
        state.mine_address_data = data
    },
    [types.MINE_ADDRESS_SELECT] (state, {data}) {
        state.mine_address_select = data
    },
    //
    [types.MINE_ORDER_LIST] (state, {data}) {
        state.mine_order_list = data
    },
    [types.MINE_ORDER_PAGE] (state, {data}) {
        state.mine_order_page = data
    },
    [types.MINE_ORDER_DETAIL] (state, {data}) {
        state.mine_order_detail = data
    },
    [types.MINE_NEWS_PRAISE] (state, {data}) {
      state.mine_news_praise = data
    },
    [types.MINE_NEWS_COMMENT] (state, {data}) {
      state.mine_news_comment = data
    },
    [types.MINE_NEWS_ATTENTION] (state, {data}) {
      state.mine_news_attention = data
    },
    [types.MINE_NEWS_SYSTEM] (state, {data}) {
      state.mine_news_system = data
    },
    [types.MINE_COIN_COUNT] (state, {data}) {
        state.mine_coin_count = data
    },
}
