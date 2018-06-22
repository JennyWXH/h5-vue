/**
 * Created by ma on 2017/7/25.
 */
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

const state = {
    //通用
    community_first_loading: true,
    community_loading: true,
    community_isAlert: false,   //弹窗
    community_alertTitle: null, //弹窗提示
    //社区首页
    community_title: '社区',
    community_page: '1',
    community_banner:[],        //banner图
    community_List: [],         //帖子列表
    community_cate: [],         //栏目列表
    community_artist: [],         //艺人列表
    community_detailId: null,   //社区详情id
    //社区详情
    community_detailData: null,         //社区详情
    community_detail_commentList: [],   //社区详情评论
    //社区评论详情
    community_commentData: null,       //社区评论详情
    community_commentList: [],         //社区回复评论列表
    community_comment_page: '1',
    community_comment_replyCount: '0',

    //圈子信息
    community_per_circleId: 0,              //圈子类型
    community_per_cateStandard: false,      //是否显示目录
    community_per_alpha: 0,                 //导航条透明度
    community_per_selectCode: 0,            //当前选择目录
    community_per_dataList: [],             //帖子列表
    community_per_cateData: {headerImg:''}, //栏目信息
    community_per_childCircleList: null,    //子圈列表
    community_per_page: '1',                //当前页

    //更多圈子
    community_more_dataList: [],  //更多圈子列表
    community_more_page: '1'      //更多圈子分页
}

export default {
    state,
    getters,
    mutations,
    actions
}