/**
 * Created by jemmy_wxh on 2017/12/12.
 */
var weibo_auth = resolve => {
    require(['components/authorization/weibo_auth'], resolve)
}
var qq_auth = resolve => {
    require(['components/authorization/qq_auth'], resolve)
}
var wx_auth = resolve => {
    require(['components/authorization/wx_auth'], resolve)
}

const auth = [
    {
        path: '/auth/weibo',
        name: 'weibo_auth',
        component: weibo_auth,
        mode:'history'
    },
    {
        path: '/auth/qq',
        name: 'qq_auth',
        component: qq_auth,
        mode:'history'
    },
    {
        path: '/auth/wx',
        name: 'wx_auth',
        component: wx_auth,
        mode:'history'
    }
]

export default auth
