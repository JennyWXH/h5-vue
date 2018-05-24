/**
 * Created by ma on 2017/7/25.
 */
import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'

var state = {
    //通用
    mine_first_loading: true,
    mine_loading: true,
    mine_isAlert: false,   //弹窗
    mine_alertTitle: 'ssss', //弹窗提示
    //社区首页
    mine_title: '个人中心',
    mine_home_src: '', //头像
    mine_home_nickname: '点击登录', //登录名
    mine_userData: null,
    //个人中心
    mine_change_name: false,
    mine_change_head: false,
    //关系列表
    mine_relation_list: [],
    mine_relation_type: null,
    mine_relation_page: 1,
    //我的圈子
    mine_circle_list:[],
    mine_circle_page:1,
    //我的帖子与收藏
    mine_post_type: 1,
    mine_post_list: [],
    mine_collect_list: [],
    mine_post_page: 1,
    mine_collect_page: 1,
    //用户信息
    user_data: null,
    user_id: null,
    user_post_list: [],
    user_post_page: 1,
    //帖子操作
    mine_post_id: '',
    //用户地址
    mine_address_list: [],
    mine_address_data: null,
    mine_address_select: false,
    //用户订单
    mine_order_list: [],
    mine_order_page: 1,
    mine_order_detail: null, //订单详情
    //消息
    mine_news_praise: [],//赞
    mine_news_comment: [],//评论
    mine_news_attention: [],//关注
    mine_news_system: [],//系统
    //呱币
    mine_coin_count: 0,
}

export default {
    state,
    actions,
    getters,
    mutations,
}
