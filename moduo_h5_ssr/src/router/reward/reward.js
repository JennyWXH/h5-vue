var Reward = resolve => {
    require(['components/reward/reward'], resolve)
}
var RewardDetail = resolve => {
    require(['components/reward/rewardDetail'], resolve)
}
var RewardGet = resolve => {
    require(['components/reward/rewardGet'], resolve)
}
var RewardShare = resolve => {
    require(['components/reward/rewardShare.vue'], resolve)
}

const reward = [
    {
        path:'/reward',
        name:'Reward',
        component: Reward
    },
    {
        path:'/reward/get/:id',
        name:'RewardGet',
        component: RewardGet,
        meta: {title: '扭一扭',keepAlive: true}//
    },
    {
        path:'/reward/detail/:id',
        name:'RewardDetail',
        component: RewardDetail
    },
    {
        path:'/reward/rewardShare',
        name:'RewardShare',
        component: RewardShare
    },
]

export default reward