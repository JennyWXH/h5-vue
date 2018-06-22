/**
 * Created by ma on 2017/7/25.
 */
export const getters = {
    home_title: state => {
        return state.home_title
    },
    home_first_loading: state => {
        return state.home_first_loading
    },
    home_loading: state => {
        return state.home_loading
    },
    home_loading_text: state => {
        return state.home_loading_text
    },
    home_isAlert: state => {
        return state.home_isAlert
    },
    home_alertTitle: state => {
        return state.home_alertTitle
    },

    //首页数据
    home_cate_data: state => {
        return state.home_cate_data
    },
    home_data_banner: state => {
        return state.home_data_banner
    },
    home_data_feature: state => {
        return state.home_data_feature
    },
    home_dataList: state => {
        return state.home_dataList
    },
    home_cateStandard: state => {
        return state.home_cateStandard
    },      //是否显示目录
    home_alpha: state => {
        return state.home_alpha
    },              //导航条透明度
    home_selectCode: state => {
        return state.home_selectCode
    },         //当前选择目录
    home_position: state => {
        return state.home_position
    },        //当前位置


    home_all_comment: state => {
        return state.home_all_comment
    },
    home_comment_list: state => {
        return state.home_comment_list
    },
    home_detail_data: state => {
        return state.home_detail_data
    },

    //评论详情
    home_detail_comment: state => {
        return state.home_detail_comment
    },
    home_detail_comment_data: state => {
        return state.home_detail_comment_data
    },
}