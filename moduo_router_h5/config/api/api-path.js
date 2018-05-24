/**
 * Created by ma on 2017/8/10.
 */
export default {
	//--------------------------------------------------
    //-----------------------首页------------------------
    //--------------------------------------------------
	//获取首页栏目和banner
	HOME_GET_BANNERANDCOLUMN: 'news/main/getBannerAndColumn',
	//获取首页信息
	HOME_GET_NEWS: 'news/getNews',
    //获取新闻详情
    HOME_GET_NEWSDETAIL: 'news/getAppNewsDetails',
	//获取首页评论
	HOME_GET_COMMENT: 'news/comment',
	//新闻评论
	HOME_NEWS_REPLY: 'news/reply',
	//新闻评论详情
	HOME_NEWS_DETAIL_COMMENT: 'news/replyById',
    //评论新闻
    HOME_NEWS_COMMENT: 'news/v1.0.1/comment',

	//--------------------------------------------------
    //-----------------------社区------------------------
    //--------------------------------------------------
    //获取社区首页
    COMMUNITY_GET_INDEX: 'circle/v1.0.1/index',
    //社区更多数据
    COMMUNITY_GET_MOREDATA: 'circle/pagePost',
    //社区详情
    COMMUNITY_GET_DETAILDATA: 'circle/post/lookPosts',
    //社区发帖
    COMMUNITY_POST_FORUM: 'circle/post/savePost',
    //社区点赞
    COMMUNITY_TO_PRAISE: 'circle/post/toPraise',
    //回复评论
    COMMUNITY_COMMENT: 'circle/post/postReply',
    //评论详情
    COMMUNITY_COMMENT_DETAIL: 'circle/post/lookMoreInReplys',
    //关注圈子
    COMMUNITY_CIRCLE_ATTENTION: 'circle/detail/doAttention',
    //帖子列表
    COMMUNITY_POST_LIST: 'circle/detail/index',
    //更多帖子
    COMMUNITY_MORE_POST: 'circle/detail/pagePost',
    //子圈列表
    COMMUNITY_CHILD_CIRCLE: 'circle/detail/subcircle',
    //更多圈子
    COMMUNITY_CIRCLE_MORE: 'circle/more',
    //举报
    COMMUNITY_REPORT_POST: 'user/inform',
    //上传图片
    COMMUNITY_UPLOAD_IMG: 'papers/upload/images',


    //--------------------------------------------------
    //----------------------扭蛋机------------------------
    //--------------------------------------------------
    //扭蛋机列表
    REWARD_DATA_LIST: 'market/gashapon/index',
    //中奖列表
    REWARD_DATA_LUCKY_LIST: 'market/gashapon/luckList',
    //扭蛋详情
    REWARD_DATA_DETAIL: 'market/gashapon/detail',
    //抽奖
    REWARD_GET: 'market/gashapon/draw',
    //修改收货地址
    REWARD_CHANGE_ADDRESS: 'market/gashapon/addressEdit',


    //--------------------------------------------------
    //-----------------------购票------------------------
    //--------------------------------------------------
    // 演唱会列表
    TIP_DATA_LIST: 'booking/show/list',
    // 演唱会详情
    TIP_DATA_DETAIL: 'booking/show/detail',
    // 演出详细
    TIP_DATA_INTRODUCE: 'booking/show/introduce',
    // 演出摘要
    TIP_DATA_NOTICE: 'booking/show/notice',
    //购票价格
    TIP_PURCHASE_PRICE: 'booking/order/price',
    //确认订单
    TIP_CONFIRM_ORDER: 'booking/order/confirm',
    //区域
    TIP_AREA_API: 'booking/order/area',
    //区域选座
    TIP_AREA_SEAT_API: 'booking/order/seat',
    //我的订单
    TIP_MINE_ORDER: 'booking/user/order/list',
    //我的订单详情
    TIP_MINE_ORDER_DETAIL: 'booking/user/order/detail',
    //订单提交
    TIP_ORDER_SUBMIT: 'booking/order/submit',
    //订单取消
    TIP_ORDER_CANCEL: 'booking/order/cancel',
    //--------------------------------------------------
    //-----------------------我的------------------------
    //--------------------------------------------------
    //登录获取token
    MINE_USER_LOGIN: 'user/appLogin',
    //获取个人信息
    MINE_GET_INFODATA: 'user/memberPersonage',
    //修改个人信息
    MINE_CHANGE_INFODATA: 'user/updateMember',
    //关系列表
    MINE_GET_RELATION: 'user/getMemberAbout',
    //我的圈子
    MINE_CIRCLE: 'circle/user/circle/list',
    //我的帖子
    MINE_POST: 'circle/user/post/list',
    //我的收藏
    MINE_COLLECT: 'circle/user/collect/list',
    //获取用户信息
    MINE_GET_USER_DATA: 'user/memberGuset',
    //获取用户帖子
    MINE_GET_USER_POST: 'circle/post/postsByUserId',
    //关注
    MINE_ATTEND_USER: 'user/toAttention',
    //取消收藏
    MINE_CANCEL_COLLECT: 'circle/post/toCollect',
    //删帖
    MINE_DELETE_POST: 'circle/post/deteleByPostId',
    //意见反馈
    MINE_SUGGEST: 'user/getAdvise',
    //收货地址
    MINE_ADDRESS: 'user/address/get',
    //添加收货地址
    MINE_ADD_ADDRESS: 'user/address/addOrEdit',
    //获取地址
    MINE_GET_AREA: 'user/location/get',
    //删除地址
    MINE_DELETE_ADDRESS: 'user/address/delete',
    //点赞消息
    MINE_PRAISE_NEWS: 'user/getPraiseMsg',
    //评论消息
    MINE_COMMENT_NEWS: 'user/getReplyMsg',
    //关注信息
    MINE_ATTENTION_NEWS: 'user/getAttentionMsg',
    //系统消息
    MINE_SYSTEM_NEWS: 'user/getSysMsg',
}
