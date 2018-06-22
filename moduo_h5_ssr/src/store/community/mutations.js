/**
 * Created by ma on 2017/7/25.
 */
import * as types from './types'
export const mutations = {
    [types.COMMUNITY_TITLE] (state,{title}) {
        state.community_title = title
    },
    [types.COMMUNITY_FIRST_LOADING] (state,{loading}) {
        state.community_first_loading = loading
    },
    [types.COMMUNITY_HOME_LOADING] (state,{loading}) {
        state.community_loading = loading
    },
    [types.COMMUNITY_ALERT] (state,{alert}) {
        state.community_isAlert = alert
    },
    [types.COMMUNITY_ALERT_TITLE] (state,{alertTitle}) {
        state.community_alertTitle = alertTitle
    },
    //-------------
    [types.COMMUNITY_HOME_PAGE] (state,{page}) {
        state.community_page = page
    },
    [types.COMMUNITY_BANNER_DATA] (state,{bannerList}) {
        state.community_banner = bannerList
    },
    [types.COMMUNITY_HOME_LIST] (state,{dataList}) {
        state.community_List = dataList
    },
    [types.COMMUNITY_CATE_DATA] (state,{cateData}) {
        state.community_cate = cateData
    },
    [types.COMMUNITY_CATE_ARTIST] (state,{data}) {
        state.community_artist = data
    },
    //------------
    [types.COMMUNITY_DETAILID] (state,{detailId}) {
        state.community_detailId = detailId
    },
    [types.COMMUNITY_DETAILDATA] (state,{detailData}) {
        state.community_detailData = detailData
    },
    [types.COMMUNITY_DETAIL_COMMENT] (state,{commentList}) {
        state.community_detail_commentList = commentList
    },
    //--------------
    [types.COMMUNITY_COMMENTDATA] (state,{commentData}) {
        state.community_commentData = commentData
    },
    [types.COMMUNITY_COMMENTLIST] (state,{commentList}) {
        state.community_detail_commentList = commentList
    },
    [types.COMMUNITY_COMMENT_PAGE] (state,{page}) {
        state.community_comment_page = page
    },
    [types.COMMUNITY_COMMENT_REPLYCOUNT] (state,{count}) {
        state.community_comment_replyCount = count
    },
    //--------------
    [types.COMMUNITY_PER_CIRCLEID] (state,{id}) {
        state.community_per_circleId = id
    },
    [types.COMMUNITY_PER_CATESTANDARD] (state,{stand}) {
        state.community_per_cateStandard = stand
    },
    [types.COMMUNITY_PER_ALPHA] (state,{alpha}) {
        state.community_per_alpha = alpha
    },
    [types.COMMUNITY_PER_SELECTCODE] (state,{code}) {
        state.community_per_selectCode = code
    },
    [types.COMMUNITY_PER_DATALIST] (state,{list}) {
        state.community_per_dataList = list
    },
    [types.COMMUNITY_PER_CATEDATA] (state,{data}) {
        state.community_per_cateData = data
    },
    [types.COMMUNITY_PER_CHILDCIRCLELIST] (state,{list}) {
        state.community_per_childCircleList = list
    },
    [types.COMMUNITY_PER_PAGE] (state,{page}) {
        state.community_per_page = page
    },
    //-----------------
    [types.COMMUNITY_MORE_DATALIST] (state,{list}) {
        state.community_more_dataList = list
    },
    [types.COMMUNITY_MORE_PAGE] (state,{page}) {
        state.community_more_page = page
    },
    //表达式修改状态
    [types.CHANGE_PRAISE_STATUS] (state,{detailData}) {
        detailData.isPraise = !detailData.isPraise
        state.community_detailData = detailData
    },
    [types.CHANGE_SHOWEDIT_STATUS] (state,{showEdit}) {
        showEdit = !showEdit
        state.community_showEdit = showEdit
    },
    [types.CHANGE_ATTENTION_STATUS] (state,{data}) {
        data.attention = !data.attention
        state.community_per_cateData = data
    },
    [types.CHANGE_MORE_PAGE] (state,{tempP}) {
        tempP = parseInt(tempP)+1
        tempP = tempP + '';
        state.community_per_page = tempP
    }
}
