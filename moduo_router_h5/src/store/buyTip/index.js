/**
 * Created by ma on 2017/7/25.
 */
import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'

var state = {
    //通用
    tip_first_loading: true,
    tip_loading: true,
    tip_isAlert: false,   //弹窗
    tip_alertTitle: 'ssss', //弹窗提示
    //购票首页
    tip_title: '个人中心',
    tip_home_dataList: [], //数据
    tip_home_page: 1, //分页
    //购票详情
    tip_detail_data: null,
    //项目详情
    tip_detail_intro: null,
    tip_detail_id: null,
    tip_detail_price: [],
    //确认购票
    tip_affirm_order: null,
    //区域详情
    tip_area_data: null,
    //区域选座
    tip_area_seat_data: null,
}

export default {
    state,
    actions,
    getters,
    mutations,
}