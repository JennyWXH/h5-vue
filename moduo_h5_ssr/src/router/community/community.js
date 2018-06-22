/**
 * Created by ma on 2017/7/24.
 */
var Community = resolve => {
    require(['components/community/community'], resolve)
}
var MoreCommunity = resolve => {
    require(['components/community/moreCommunity'], resolve)
}
var PerCommunity = resolve => {
    require(['components/community/perCommunity'], resolve)
}
var CommunityDetail = resolve => {
    require(['components/community/communityDetail'], resolve)
}
var Community_comment_list = resolve => {
    require(['components/community/community_comment_list'], resolve)
}
var Community_comment_detail = resolve => {
    require(['components/community/community_comment_detail'], resolve)
}
var Community_report = resolve => {
    require(['components/community/community_report'], resolve)
}
var Community_post = resolve => {
    require(['components/community/community_post'], resolve)
}

/**
 * 路由信息配置
 */
const community = [
    {
        path: '/community',
        name: 'Community',
        component: Community,
        meta: {title: '社区',keepAlive: true}
    },
    {
        path: '/community/moreCommunity',
        name: 'MoreCommunity',
        component: MoreCommunity,
        meta: {title: '更多'}
    },
    {
        path: '/community/perCommunity/:circleId',
        name: 'PerCommunity',
        component: PerCommunity,
        meta: {title: '圈子'}
    },
    {
        path: '/community/detail/:id',
        name: 'CommunityDetail',
        component: CommunityDetail,
        meta: {title: '圈子详情'}
    },
    {
        path: '/community/community_report/:detailId',
        name: 'Community_report',
        component: Community_report,
        meta: {title: '举报'}
    },
    {
        path: '/community/community_comment_list/:detailId',
        name: 'Community_comment_list',
        component: Community_comment_list,
        meta: {title: '评论列表'}
    },
    {
        path: '/community/community_comment_detail/:detailId/:replyId',
        name: 'Community_comment_detail',
        component: Community_comment_detail,
        meta: {title: '评论详情'}
    },
    {
        path: '/community/community_post/:id',
        name: 'Community_post',
        component: Community_post,
        meta: {title: '发布主题'}
    }
]

export default community