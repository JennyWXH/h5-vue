/**
 * Created by ma on 2017/7/24.
 */
var Home = resolve => {
    require(['components/home/home'], resolve)
}
var Home_detail = resolve => {
    require(['components/home/home_detail'], resolve)
}
var Comment_list = resolve => {
    require(['components/home/comment_list'], resolve)
}
var Comment_detail = resolve => {
    require(['components/home/comment_detail'], resolve)
}

/**
 * 路由信息配置
 */
const home = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {title: '首页',keepAlive: true}//
    },
    {
        path: '/news/news_detail/:id',
        name: 'Home_detail',
        // mode: 'history',
        component: Home_detail
    },
    {
        path: '/home/comment_list/:detailId',
        name: 'Comment_list',
        // mode: 'history',
        component: Comment_list
    },
    {
        path: '/home/comment_detail/:detailId/:replyId/:pid',
        name: 'Comment_detail',
        component: Comment_detail
    }
]

export default home
