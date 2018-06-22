/**
 * Created by ma on 2017/7/25.
 */
import PATH from '../../../config/api/api-path'
import baseConfig from '../../../config/global-config'
import API from '../../../config/api/API'
var api = new API();
export const actions = {
    //M站登录
    mine_login({commit, state}) {
        api.getModuoData(PATH.MINE_USER_LOGIN, {
            'data': {
                "openid": "o8Cxj1TVXY8HW7v5av1Rury_i5XM",
                "nickname": "x!^o娴�",
                "headerImg": "",
                "loginType": 2,
                "unionId": "o6MxfxHaHuUel0hgNab9HmFAuhnk"
            }
        }).then(function (res) {
            console.log(res.data)
        })
    },
    //--------------------------------------------------
    //----------------------购票首页----------------------
    //--------------------------------------------------
    get_tip_data({dispatch, commit, state},params) {
        return new Promise(function (resolve, reject) {
            if (params.isLoadmore) {

            }else {
                commit('TIP_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.TIP_DATA_LIST, {
                'page': state.tip_home_page
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data.content
                    var dataList = state.tip_home_dataList
                    for (var i = 0; i < tieList.length; i++) {
                        //判断开始和结束时间是否同一天和同一年
                        if (api.getFormatTime(tieList[i].startTime,'yyyy') == api.getFormatTime(tieList[i].endTime,'yyyy')) {
                            tieList[i].endMonthTime = api.getFormatTime(tieList[i].endTime,'M.d')
                        }else {
                            tieList[i].endMonthTime = api.getFormatTime(tieList[i].endTime,'yyyy.M.d')
                        }

                        tieList[i].startMonthTime = api.getFormatTime(tieList[i].startTime,'yyyy.M.d')
                        tieList[i].saleTime = api.getFormatTime(tieList[i].timingSaleTime, 'MM月dd日 hh:mm')
                        tieList[i].currentTime = getData.time
                        if (api.getFormatTime(tieList[i].startTime,'yyyyMd') == api.getFormatTime(tieList[i].endTime,'yyyyMd')) {
                            tieList[i].isCommonDay = true
                        }else {
                            tieList[i].isCommonDay = false
                        }
                        if (tieList[i].img.indexOf("http") == 0) {
                        } else {
                            tieList[i].img = baseConfig.BASE_IMAGE_URL + tieList[i].img
                        }
                        dataList.push(tieList[i])
                    }
                    commit('TIP_HOME_DATALIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //购票详情
    get_detail_data({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_DATA_DETAIL, {
                'showId': state.tip_detail_id
            },{did:state.tip_detail_id}).then(function (res) {
                var getData = res.data
                console.log('data', getData)
                if (parseInt(getData.status) == 1) {
                    var data = getData.data
                    var start = data.startTime
                    var end = data.endTime
                    //判断开始和结束时间是否同一天和同一年
                    if (api.getFormatTime(start,'yyyy') == api.getFormatTime(end,'yyyy')) {
                        data.detailEnd = api.getFormatTime(end,'M.d hh:mm')
                        data.endMonthTime = api.getFormatTime(end,'M.d')
                    }else {
                        data.detailEnd = api.getFormatTime(end,'yyyy.M.d hh:mm')
                        data.endMonthTime = api.getFormatTime(end,'yyyy.M.d')
                    }
                    data.startMonthTime = api.getFormatTime(start,'yyyy.M.d')
                    data.detailStart = api.getFormatTime(start,'yyyy.M.d hh:mm')
                    data.saleTime = api.getFormatTime(data.timingSaleTime, 'MM月dd日 hh:mm')
                    data.currentTime = getData.time
                    if (api.getFormatTime(start,'yyyyMd') == api.getFormatTime(end,'yyyyMd')) {
                        data.isCommonDay = true
                        data.detailEnd = api.getFormatTime(end,'hh:mm')
                    }else {
                        data.isCommonDay = false
                    }
                    if (data.img.indexOf("http") == 0) {
                    } else {
                        data.img = baseConfig.BASE_IMAGE_URL + data.img
                    }
                    if (data.digestImg.indexOf("http") == 0) {
                    } else {
                        data.digestImg = baseConfig.BASE_IMAGE_URL + data.digestImg
                    }
                    //转换换行符
                    data.detail = data.detail.replace(/\n/g,"<br/>")
                    data.specialNotice = data.specialNotice.replace(/\n/g,"<br/>")
                    data.notice = data.notice.replace(/\n/g,"<br/>")

                    commit('TIP_DETAIL_DATA', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //项目详情
    get_detail_introduce({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_DATA_INTRODUCE, {
                'showId': state.tip_detail_id
            }).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    commit('TIP_DETAIL_INTRO', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //演出摘要
    get_detail_notice({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_DATA_NOTICE, {
                'showId': state.tip_detail_id
            }).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    commit('TIP_DETAIL_INTRO', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },

    //购票价格
    get_detail_price({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_PURCHASE_PRICE, {
                'showId': state.tip_detail_id
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    for (var i = 0; i < getData.data.length; i++) {
                        var data = getData.data[i]
                        data.isSelect = false
                    }
                    commit('TIP_DETAIL_PRICE', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //确认订单
    confirm_order_data({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            params.userId = window.localStorage.userId
            api.getModuoData(PATH.TIP_CONFIRM_ORDER, params).then(function (res) {
                var getData = res.data

                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var newData = getData.data

                    var start = newData.showInfo.startTime
                    var end = newData.showInfo.endTime
                    //判断开始和结束时间是否同一天和同一年
                    if (api.getFormatTime(start,'yyyy') == api.getFormatTime(end,'yyyy')) {
                        newData.showInfo.detailEnd = api.getFormatTime(end,'M.d hh:mm')
                        newData.showInfo.endMonthTime = api.getFormatTime(end,'M.d')
                    }else {
                        newData.showInfo.detailEnd = api.getFormatTime(end,'yyyy.M.d hh:mm')
                        newData.showInfo.endMonthTime = api.getFormatTime(end,'yyyy.M.d')
                    }
                    newData.showInfo.startMonthTime = api.getFormatTime(start,'yyyy.M.d')
                    newData.showInfo.detailStart = api.getFormatTime(start,'yyyy.M.d hh:mm')
                    newData.showInfo.saleTime = api.getFormatTime(newData.showInfo.timingSaleTime, 'MM月dd日 hh:mm')
                    newData.showInfo.currentTime = getData.time
                    if (api.getFormatTime(start,'yyyyMd') == api.getFormatTime(end,'yyyyMd')) {
                        newData.showInfo.isCommonDay = true
                        newData.showInfo.detailEnd = api.getFormatTime(end,'hh:mm')
                    }else {
                        newData.showInfo.isCommonDay = false
                    }

                    newData.showInfo.img = baseConfig.BASE_IMAGE_URL + newData.showInfo.img
                    //快递方式总价
                    newData.transportMoney = parseFloat(newData.realPay) + parseFloat(newData.showInfo.expressFee)
                    newData.transportMoney = newData.transportMoney.toFixed(2)
                    //电子票结账总价
                    newData.eleMoney = parseFloat(newData.realPay) - parseFloat(newData.showInfo.discountPrice)
                    newData.eleMoney = newData.eleMoney.toFixed(2)



                    commit('TIP_AFFIRM_ORDER', {data: newData})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //提交订单
    order_submit({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_ORDER_SUBMIT, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    resolve(getData.data.orderId)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    order_cancel({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_ORDER_CANCEL, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //区域数据
    get_area_data({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_AREA_API, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var data = getData.data
                    commit('TIP_AREA_DATA', {data: data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },
    //区域选座
    get_area_seat_data({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            commit('TIP_HOME_LOADING', {data: true})
            api.getModuoData(PATH.TIP_AREA_SEAT_API, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var data = getData.data
                    commit('TIP_AREA_SEAT_DATA', {data: data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('TIP_HOME_LOADING', {data: false})
            })
        })
    },


    showAlert({commit}, title) {
        commit('TIP_ALERT', {data: true})
        commit('TIP_ALERT_TITLE', {data: title})
        setTimeout(function () {
            commit('TIP_ALERT', {data: false})
        }, 2000)
    }

}