/**
 * Created by ma on 2017/7/24.
 */
var Mine = resolve => {
    require(['components/mine/mine.vue'], resolve)
}
var Mine_download = resolve => {
    require(['components/mine/user_download_page.vue'], resolve)
}
var Mine_circle = resolve => {
    require(['components/mine/mine_circle.vue'], resolve)
}
var Mine_info = resolve => {
    require(['components/mine/mine_info.vue'], resolve)
}
var Mine_login = resolve => {
    require(['components/mine/mine_login.vue'], resolve)
}
var Mine_news = resolve => {
    require(['components/mine/mine_news'], resolve)
}
var Mine_news_comment = resolve => {
    require(['components/mine/mine_news_comment'], resolve)
}
var Mine_news_attention = resolve => {
    require(['components/mine/mine_news_attention'], resolve)
}
var Mine_news_system = resolve => {
    require(['components/mine/mine_news_sys'], resolve)
}
var Mine_order = resolve => {
    require(['components/mine/mine_order'], resolve)
}
var Mine_order_detail = resolve => {
    require(['components/mine/mine_order_detail'], resolve)
}
var Mine_post = resolve => {
    require(['components/mine/mine_post'], resolve)
}
var Mine_relation = resolve => {
    require(['components/mine/mine_relation'], resolve)
}
var Mine_setting = resolve => {
    require(['components/mine/mine_setting'], resolve)
}
var Mine_suggest = resolve => {
    require(['components/mine/mine_suggest'], resolve)
}
var User_info = resolve => {
    require(['components/mine/user_info'], resolve)
}
var Mine_address = resolve => {
    require(['components/mine/mine_address'], resolve)
}
var Mine_address_add = resolve => {
    require(['components/mine/mine_address_add'], resolve)
}
var Mine_coin = resolve => {
    require(['components/mine/mine_coin'], resolve)
}
var Mine_coin_introl = resolve => {
    require(['components/mine/mine_coin_introl'], resolve)
}

/**
 * 路由信息配置
 */
const mine = [
    {
        path: '/mine',
        name: 'Mine',
        component: Mine
    },
    {
        path: '/download/:shareType/:userId',
        name: 'Mine_download',
        component: Mine_download
    },
    {
        path: '/mine/mine_circle',
        name: 'Mine_circle',
        component: Mine_circle
    },
    {
        path: '/mine/mine_info',
        name: 'Mine_info',
        component: Mine_info
    },
    {
        path: '/mine/mine_login',
        name: 'Mine_login',
        component: Mine_login
    },
    {
        path: '/mine/mine_news',
        name: 'Mine_news',
        component: Mine_news
    },
    {
        path: '/mine/mine_news_comment/:type',
        name: 'Mine_news_comment',
        component: Mine_news_comment
    },
    {
        path: '/mine/mine_news_attention',
        name: 'Mine_news_attention',
        component: Mine_news_attention
    },
    {
        path: '/mine/mine_news_system',
        name: 'Mine_news_system',
        component: Mine_news_system
    },
    {
        path: '/mine/mine_order',
        name: 'Mine_order',
        component: Mine_order
    },
    {
        path: '/mine/mine_order_detail/:id',
        name: 'Mine_order_detail',
        component: Mine_order_detail
    },
    {
        path: '/mine/mine_post/:type',
        name: 'Mine_post',
        component: Mine_post
    },
    {
        path: '/mine/mine_relation/:type',
        name: 'Mine_relation',
        component: Mine_relation
    },
    {
        path: '/mine/mine_setting',
        name: 'Mine_setting',
        component: Mine_setting
    },
    {
        path: '/mine/mine_suggest',
        name: 'Mine_suggest',
        component: Mine_suggest
    },
    {
        path: '/mine/user_info/:uId',
        name: 'User_info',
        component: User_info
    },
    {
        path: '/mine/mine_address',
        name: 'Mine_address',
        component: Mine_address
    },
    {
        path: '/mine/mine_address_add/:type',
        name: 'Mine_address_add',
        component: Mine_address_add
    },
    {
        path: '/mine/mine_coin',
        name: 'Mine_coin',
        component: Mine_coin
    },
    {
        path: '/mine/mine_coin_introl',
        name: 'Mine_coin_introl',
        component: Mine_coin_introl
    },
]

export default mine
