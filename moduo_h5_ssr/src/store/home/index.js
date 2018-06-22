/**
 * Created by ma on 2017/7/25.
 */
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
const state = {
    //通用
    home_first_loading: true,
    home_loading: false,
    home_loading_text: '加载中',
    home_isAlert: false,   //弹窗
    home_alertTitle: '', //弹窗提示
    //首页
    home_title: '个人中心',

    //首页数据
    home_cate_data: [],
    home_data_banner: [],
    home_data_feature: [],
    home_dataList: [],
    home_cateStandard: false,      //是否显示目录
    home_alpha: 0,                 //导航条透明度
    home_selectCode: 0,            //当前选择目录
    home_position: null,           //当前位置
    //详情评论
    home_comment_list: [],         //资讯评论
    home_detail_data: null,        //资讯详情
    //评论列表
    home_all_comment: [],          //所有评论列表
    //评论详情
    home_detail_comment: [],
    home_detail_comment_data: null,

}

export default {
    state,
    getters,
    actions,
    mutations
}