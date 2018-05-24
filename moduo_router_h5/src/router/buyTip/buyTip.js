/**
 * Created by ma on 2017/7/24.
 */
var BuyTip = resolve => {
    require(['components/buyTip/buyTip'], resolve)
}
var BuyTipDetail = resolve => {
    require(['components/buyTip/buyTipDetail'], resolve)
}
var ChatService = resolve => {
  require(['components/buyTip/chatService'], resolve)
}
var BuyTip_purchase = resolve => {
    require(['components/buyTip/buyTip_purchase'], resolve)
}
var BuyTip_affirm_order = resolve => {
    require(['components/buyTip/buyTip_affirm_order'], resolve)
}
var BuyTip_area = resolve => {
    require(['components/buyTip/buyTip_area'], resolve)
}
var BuyTip_selectSeat = resolve => {
    require(['components/buyTip/buyTip_selectSeat'], resolve)
}
var BuyTip_webDetail = resolve => {
    require(['components/buyTip/buyTip_webDetail'], resolve)
}

/**
 * 路由信息配置
 */
const buyTip = [
    {
        path: '/buyTip',
        name: 'BuyTip',
        component: BuyTip
    },
    {
        path: '/buyTip/detail/:id',
        name: 'BuyTipDetail',
        component: BuyTipDetail
    },
    {
        path: '/chat/service/:id',
        name: 'ChatService',
        component: ChatService
    },
    {
        path: '/buyTip/buyTip_purchase/:id',
        name: 'BuyTip_purchase',
        component: BuyTip_purchase
    },
    {
        path: '/buyTip/buyTip_affirm_order/:id',
        name: 'BuyTip_affirm_order',
        component: BuyTip_affirm_order
    },
    {
        path: '/buyTip/buyTip_area/:id',
        name: 'BuyTip_area',
        component: BuyTip_area
    },
    {
        path: '/buyTip/seat',
        name: 'BuyTip_selectSeat',
        component: BuyTip_selectSeat
    },
    {
        path: '/buyTip/webDetail/:id',
        name: 'BuyTip_webDetail',
        component: BuyTip_webDetail
    }
]

export default buyTip
