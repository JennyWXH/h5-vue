/**
 * Created by ma on 2017/7/25.
 */
export const getters = {
    mine_title: state => {
        return state.mine_title
    },
    mine_first_loading: state => {
        return state.mine_first_loading
    },
    mine_loading: state => {
        return state.mine_loading
    },
    mine_isAlert: state => {
        return state.mine_isAlert
    },
    mine_alertTitle: state => {
        return state.mine_alertTitle
    },
    mine_home_src: state => {
        return state.mine_home_src
    },
    mine_home_nickname: state => {
        return state.mine_home_nickname
    },
    mine_userData: state => {
        return state.mine_userData
    },
    mine_change_name: state => {
        return state.mine_change_name
    },
    mine_change_head: state => {
        return state.mine_change_head
    },
    mine_relation_list: state => {
        return state.mine_relation_list
    },
    mine_relation_type: state => {
        return state.mine_relation_type
    },
    mine_relation_page: state => {
        return state.mine_relation_page
    },
    mine_circle_list: state => {
        return state.mine_circle_list
    },
    mine_circle_page: state => {
        return state.mine_circle_page
    },
    mine_post_type: state => {
        return state.mine_post_type
    },
    mine_post_list: state => {
        return state.mine_post_list
    },
    mine_post_page: state => {
        return state.mine_post_page
    },
    mine_collect_list: state => {
        return state.mine_collect_list
    },
    mine_collect_page: state => {
        return state.mine_collect_page
    },
    //用户信息
    user_data: state => {
        return state.user_data
    },
    user_id: state => {
        return state.user_id
    },
    user_post_page: state => {
        return state.user_post_page
    },
    user_post_list: state => {
        return state.user_post_list
    },
    mine_post_id: state => {
        return state.mine_post_id
    },
    //
    mine_address_list: state => {
        return state.mine_address_list
    },
    mine_address_data: state => {
        return state.mine_address_data
    },
    mine_address_select: state => {
        return state.mine_address_select
    },
    //
    mine_order_list: state => {
        return state.mine_order_list
    },
    mine_order_page: state => {
        return state.mine_order_page
    },
    mine_order_detail: state => {
        return state.mine_order_detail
    },
    //消息
    mine_news_praise: state => {
      return state.mine_news_praise
    },//赞
    mine_news_comment: state => {
      return state.mine_news_comment
    },//评论
    mine_news_attention: state => {
      return state.mine_news_attention
    },//关注
    mine_news_system: state => {
      return state.mine_news_system
    },
    //呱币
    mine_coin_count: state => {
        return state.mine_coin_count
    },
}
