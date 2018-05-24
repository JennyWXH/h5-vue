/**
 * Created by jemmy_wxh on 2017/12/5.
 */
import PATH from '../../../config/api/api-path'
import baseConfig from '../../../config/global-config'
import API from '../../../config/api/API'
var api = new API();
export const actions = {
    //M站登录
    reward_get_rewardResult({dispatch, commit, state}) {
        api.getModuoData(PATH.MINE_USER_LOGIN, {
            "openid": "o8Cxj1TVXY8HW7v5av1Rury_i5XM",
            "nickname": "x!^o娴�",
            "headerImg": "",
            "loginType": 2,
            "unionId": "o6MxfxHaHuUel0hgNab9HmFAuhnk"
        }).then(function (res) {
        })
    },
    getLuckyListData({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.REWARD_DATA_LUCKY_LIST,{'id':0}).then(function (res) {
                var getData = res.data;
                console.log(getData);
                if (parseInt(getData.status) == 1) {
                    commit("REWARD_INDEX_LUCKY_DATA", {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    getRewardListData({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            if (params) {
                if (!params.isLoadmore) {
                    commit('REWARD_HOME_LOADING', {data: true})
                }
            }
            var newParam = {
                'page': state.reward_index_page,
                'size': 10
            }
            api.getModuoData(PATH.REWARD_DATA_LIST,newParam).then(function (res) {
                var getData = res.data;
                if (parseInt(getData.status) == 1) {
                    var newData = getData.data
                    var myDate = parseInt(Date.parse(new Date()).toString().substring(0, 10))
                    var rewardData = state.reward_list_data
                    //设置一个type 0--未开始 1--无结束的进行中 2--有结束的进行中 3--已结束
                    for (var i = 0; i < newData.length; i++) {

                        //判断扭蛋机状态
                        if (newData[i].startTime > myDate) {//未开始
                            newData[i].type = 0
                        }else {//开始
                            if (newData[i].startTime == -1 && newData[i].endTime == -1) {//没有设置时间
                                newData[i].type = 1
                            } else if (newData[i].endTime == -1) {//判断开始时间或结束时间未设置的情况
                                newData[i].type = 1
                            } else {
                                if (newData[i].endTime < myDate) {//已经结束
                                    newData[i].type = 3
                                }else {
                                    newData[i].type = 2
                                }
                            }
                        }





                        //判断开始和结束时间是否同一天和同一年
                        if (api.getFormatTime(newData[i].startTime, 'Y') == api.getFormatTime(newData[i].endTime, 'Y')) {
                            newData[i].endMonthTime = api.getFormatTime(newData[i].endTime, 'M.D')
                        } else {
                            newData[i].endMonthTime = api.getFormatTime(newData[i].endTime, 'Y.M.D')
                        }
                        newData[i].startMonthTime = api.getFormatTime(newData[i].startTime, 'y.M.d')
                        newData[i].saleTime = api.getFormatTime(newData[i].timingSaleTime, 'M月d日 h:m')

                        if (api.getFormatTime(newData[i].startTime, 'YMD') == api.getFormatTime(newData[i].endTime, 'YMD')) {
                            newData[i].isCommonDay = true
                        } else {
                            newData[i].isCommonDay = false
                        }
                        if (newData[i].img.indexOf("http") == 0) {
                        } else {
                            newData[i].img = baseConfig.BASE_IMAGE_URL + newData[i].img
                        }
                        rewardData.push(newData[i])
                    }
                    commit("REWARD_LIST_DATA", {data: rewardData})
                    resolve(newData.length<10?false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('REWARD_HOME_LOADING', {data: false})
            })
        })
    },
    getDetailData({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.REWARD_DATA_DETAIL,{
                'id': params.id,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data;
                if (parseInt(getData.status) == 1) {
                    var newData = getData.data
                    //判断扭蛋机状态
                    var myDate = parseInt(Date.parse(new Date()).toString().substring(0, 10))
                    if (newData.startTime > myDate) {//未开始
                        newData.type = 0
                    }else {//开始
                        if (newData.startTime == -1 && newData.endTime == -1) {//没有设置时间
                            newData.type = 1
                        } else if (newData.endTime == -1) {//判断开始时间或结束时间未设置的情况
                            newData.type = 1
                        } else {
                            if (newData.endTime < myDate) {//已经结束
                                newData.type = 3
                            } else {
                                newData.type = 2
                            }
                        }
                    }

                    for (var i=0; i<newData.gifts.length; i++) {
                        var gift = newData.gifts[i]
                        gift.img = baseConfig.BASE_IMAGE_URL + gift.img
                        if (gift.remainCount == 0) {//抽完
                            gift.isRed = false
                            gift.remainStr = "抽完啦"
                        } else if (gift.remainCount < 10) {
                            gift.isRed = true
                            gift.remainStr = "仅剩" + gift.remainCount
                        } else if (gift.remainCount > 10 && gift.remainCount <= 99) {
                            gift.isRed = false
                            gift.remainStr = "剩余" + gift.remainCount
                        } else {
                            gift.isRed = false
                            gift.remainStr = "剩余99+"
                        }
                    }
                    newData.introduce = '<p>' + newData.introduce + '</p>'
                    commit("REWARD_DETAIL_DATA", {data: newData})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    getLuckyDetailData({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.REWARD_DATA_LUCKY_LIST,{
                'id':params.id
            }).then(function (res) {
                var getData = res.data;
                if (parseInt(getData.status) == 1) {
                    commit("REWARD_DETAIL_LUCKY_DATA", {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    getRewardData({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.REWARD_GET,{
                'id':params.id,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data;
                if (parseInt(getData.status) == 1) {
                    getData.data.giftImg = baseConfig.BASE_IMAGE_URL + getData.data.giftImg
                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    changeAddressData({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.REWARD_CHANGE_ADDRESS,{
                'consignee':params.consignee,
                'phone':params.phone,
                'address':params.address,
                'id': params.orderId
            }).then(function (res) {
                var getData = res.data;
                console.log(getData)
                if (parseInt(getData.status) == 1) {

                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    showAlert({commit}, title) {
    commit('REWARD_ALERT', {data: true})
    commit('REWARD_ALERT_TITLE', {data: title?title:"请求有误"})
    setTimeout(function () {
        commit('REWARD_ALERT', {data: false})
    }, 2000)
}
}