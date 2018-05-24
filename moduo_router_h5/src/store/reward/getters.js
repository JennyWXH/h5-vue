/**
 * Created by jemmy_wxh on 2017/12/5.
 */
export const getters = {
    reward_title: state => {
        return state.reward_title
    },
    reward_first_loading: state => {
        return state.reward_first_loading
    },
    reward_loading: state => {
        return state.reward_loading
    },
    reward_isAlert: state => {
        return state.reward_isAlert
    },
    reward_alertTitle: state => {
        return state.reward_alertTitle
    },


    reward_list_data: state => {
        return state.reward_list_data
    },
    reward_index_page: state => {
        return state.reward_index_page
    },
    reward_index_lucky_data: state => {
        return state.reward_index_lucky_data
    },

    //评论详情
    reward_detail_data: state => {
        return state.reward_detail_data
    },
    reward_detail_lucky_data: state => {
        return state.reward_detail_lucky_data
    },
}