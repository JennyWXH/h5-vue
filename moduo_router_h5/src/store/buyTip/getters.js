/**
 * Created by ma on 2017/7/25.
 */
export const getters = {
    tip_title: state => {
        return state.tip_title
    },
    tip_first_loading: state => {
        return state.tip_first_loading
    },
    tip_loading: state => {
        return state.tip_loading
    },
    tip_isAlert: state => {
        return state.tip_isAlert
    },
    tip_alertTitle: state => {
        return state.tip_alertTitle
    },
    //首页
    tip_home_dataList: state => {
        return state.tip_home_dataList
    },
    tip_home_page: state => {
        return state.tip_home_page
    },
    tip_detail_data: state => {
        return state.tip_detail_data
    },
    tip_detail_intro: state => {
        return state.tip_detail_intro
    },
    tip_detail_id: state => {
        return state.tip_detail_id
    },
    tip_detail_price: state => {
        return state.tip_detail_price
    },
    //
    tip_affirm_order: state => {
        return state.tip_affirm_order
    },
    tip_area_data: state => {
        return state.tip_area_data
    },
    tip_area_seat_data: state => {
        return state.tip_area_seat_data
    }
}