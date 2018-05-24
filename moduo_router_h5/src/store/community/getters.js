/**
 * Created by ma on 2017/7/25.
 */
export const getters = {
    community_title: state => {
        return state.community_title
    },
    community_page: state => {
        return state.community_page
    },
    community_banner: state => {
        return state.community_banner
    },
    community_List: state => {
        return state.community_List
    },
    community_cate: state => {
        return state.community_cate
    },
    community_artist: state => {
        return state.community_artist
    },
    community_loading: state => {
        return state.community_loading
    },
    community_isAlert: state => {
        return state.community_isAlert
    },
    community_alertTitle: state => {
        return state.community_alertTitle
    },
    community_detailId: state => {
        return state.community_detailId
    },
    community_detailData: state => {
        return state.community_detailData
    },
    community_detail_commentList: state => {
        return state.community_detail_commentList
    },
    //--------------
    community_commentData: state => {
        return state.community_commentData
    },
    community_commentList: state => {
        return state.community_commentList
    },
    community_comment_page: state => {
        return state.community_comment_page
    },
    community_comment_replyCount: state => {
        return state.community_comment_replyCount
    },
    community_first_loading: state => {
        return state.community_first_loading
    },
    //-------------
    community_per_circleId: state => {
        return state.community_per_circleId
    },
    community_per_cateStandard: state => {
        return state.community_per_cateStandard
    },
    community_per_alpha: state => {
        return state.community_per_alpha
    },
    community_per_selectCode: state => {
        return state.community_per_selectCode
    },
    community_per_dataList: state => {
        return state.community_per_dataList
    },
    community_per_cateData: state => {
        return state.community_per_cateData
    },
    community_per_childCircleList: state => {
        return state.community_per_childCircleList
    },
    community_per_page: state => {
        return state.community_per_page
    },
    //-------------
    community_more_dataList: state => {
        return state.community_more_dataList
    },
    community_more_page: state => {
        return state.community_more_page
    }
}