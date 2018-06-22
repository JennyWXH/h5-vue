/**
 * Created by ma on 2017/7/25.
 */
import PATH from '../../../config/api/api-path'
import baseConfig from '../../../config/global-config'
import API from '../../../config/api/API'
var api = new API();
export const actions = {
    //M站登录
    mine_login({commit, state},param) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_USER_LOGIN, param).then(function (res) {
                var getData = res.data
                if (getData.data) {
                    if (parseInt(getData.status) == 1){
                        window.localStorage.setItem('userId',getData.data.userId)
                        resolve()
                    }
                }
            })
        })
    },
    //--------------------------------------------------
    //----------------------我的首页----------------------
    //--------------------------------------------------
    //获取个人信息
    get_mine_userData({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_GET_INFODATA, {
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                if (getData.data) {
                    if (parseInt(getData.status) == 1 && getData.data) {
                        if (getData.data.headerImg.indexOf("http") == 0) {

                        } else {
                            getData.data.headerImg = baseConfig.BASE_IMAGE_URL + getData.data.headerImg
                        }
                        commit('MINE_COIN_COUNT',{data: getData.data.gungCoin})
                        commit('MINE_HOME_USERDATA', {data: getData.data})
                        resolve()
                    } else {
                        dispatch('showAlert', getData.info)
                    }
                }
            })
        })
    },
    //修改头像
    change_mine_head({dispatch, commit, state}, head) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_CHANGE_INFODATA, {
                'userId': window.localStorage.userId,
                'headerImg': head
            }).then(function (res) {
                var getData = res.data
                console.log('data', getData.data)
                if (parseInt(getData.status) == 1) {
                    var data = state.mine_userData
                    data.headerImg = head
                    commit('MINE_HOME_USERDATA', {data: data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //修改昵称
    change_mine_info({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            var newParams = {'userId': window.localStorage.userId}
            if (params.hasOwnProperty('msg')) {
                newParams.name = params.msg
            }
            if (params.hasOwnProperty('headerImg')) {
                newParams.headerImg = params.headerImg
            }
            api.getModuoData(PATH.MINE_CHANGE_INFODATA, newParams).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    var data = state.mine_userData
                    data.name = params.msg
                    commit('MINE_HOME_USERDATA', {data: data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //--------------------------------------------------
    //----------------------用户信息页----------------------
    //--------------------------------------------------
    //获取用户信息
    get_user_data({dispatch, commit, state},params) {
        return new Promise(function (resolve, reject) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_GET_USER_DATA, {
                'userId': window.localStorage.userId,
                'uid': params.uId
            }).then(function (res) {
                var getData = res.data
                // console.log('sssss', getData)
                if (parseInt(getData.status) == 1) {
                    if (getData.data.headerImg.indexOf("http") == 0) {

                    } else {
                        getData.data.headerImg = baseConfig.BASE_IMAGE_URL + getData.data.headerImg
                    }
                    commit('USER_DATA', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //获取用户帖子
    get_user_postList({dispatch, commit, state},params) {
        return new Promise(function (resolve, reject) {
            if (params.isLoadmore) {

            }else {
                commit('MINE_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.MINE_GET_USER_POST, {
                'size': 10, 'userId': params.uId, 'page': state.user_post_page
            }).then(function (res) {
                var getData = res.data
                // console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data.pageList
                    var dataList = state.user_post_list
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)
                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('USER_POST_LIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //用户关注
    mine_user_attend({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_ATTEND_USER, {
                'uid': state.user_id,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var data = state.user_data
                    data.isAttention = getData.data.type
                    if (state.user_data.isAttention) {
                        dispatch('showAlert', '已关注')
                    } else {
                        dispatch('showAlert', '已取消')
                    }
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //--------------------------------------------------
    //----------------------我的消息----------------------
    //--------------------------------------------------
    //点赞消息
    get_mine_praise_news({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_PRAISE_NEWS, {
                'userId': window.localStorage.userId,
                'size': 10,
                'page': 1,
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data
                    var dataList = state.mine_news_praise
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.getCurrentTime(tieList[i].time)
                        var array = tieList[i].content.split('#')
                        if (array[0].indexOf("{}") > 0) {
                            array[0] = array[0].replace("{}","")
                        }
                        if (array.length == 2) {
                            tieList[i].content = array[0] + array[1]
                        }
                        if (tieList[i].userVo.headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].userVo.headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].userVo.headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_NEWS_PRAISE', {data: dataList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //评论消息
    get_mine_comment_news({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_COMMENT_NEWS, {
                'userId': window.localStorage.userId,
                'size': 10,
                'page': 1,
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data
                    var dataList = state.mine_news_comment
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.getCurrentTime(tieList[i].time)
                        var array = tieList[i].content.split('#')
                        if (array[0].indexOf("{}") > 0) {
                            array[0] = array[0].replace("{}","")
                        }
                        if (array.length == 2) {
                            tieList[i].content = array[0] + array[1]
                        }
                        if (tieList[i].userVo.headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].userVo.headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].userVo.headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_NEWS_COMMENT', {data: dataList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //关注消息
    get_mine_attention_news({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_ATTENTION_NEWS, {
                'userId': window.localStorage.userId,
                'size': 10,
                'page': 1,
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data
                    var dataList = state.mine_news_attention
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.getCurrentTime(tieList[i].time)
                        if (tieList[i].userVo.headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].userVo.headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].userVo.headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_NEWS_ATTENTION', {data: dataList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //系统消息
    get_mine_system_news({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_SYSTEM_NEWS, {
                'userId': window.localStorage.userId,
                'size': 10,
                'page': 1,
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data
                    var dataList = state.mine_news_system
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.getMonthTime(tieList[i].time)
                        if (tieList[i].content.indexOf('#') > 0) {
                            var array = tieList[i].content.split('#')
                            var values = array[1].split(',')
                            for (var key in values) {
                                if (array[0].indexOf("{}") > 0) {
                                    array[0] = array[0].replace("{}",values[key])
                                }
                            }
                        }
                        tieList[i].content = array[0]
                        dataList.push(tieList[i])
                    }
                    commit('MINE_NEWS_SYSTEM', {data: dataList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },

    //--------------------------------------------------
    //----------------------关系列表----------------------
    //--------------------------------------------------
    get_mine_relationList({dispatch, commit, state},params) {
        return new Promise(function (resolve, reject) {
            if (params.isLoadmore) {
      
            }else {
                commit('MINE_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.MINE_GET_RELATION, {
                'size': 10, 'type': state.mine_relation_type, 'userId': window.localStorage.userId, 'page': state.mine_relation_page
            }).then(function (res) {
                var getData = res.data
                var dataList = state.mine_relation_list
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data
                    for (var i = 0; i < tieList.length; i++) {
                        if (tieList[i].headerImg.indexOf("http") == 0) {
                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_RELATION_LIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //--------------------------------------------------
    //----------------------我的圈子----------------------
    //--------------------------------------------------
    get_mine_circleList({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            commit('MINE_HOME_LOADING', {data: true})
            api.getModuoData(PATH.MINE_CIRCLE, {
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    commit('MINE_CIRCLE_LIST', {data: getData.data.circleInfo})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //--------------------------------------------------
    //----------------------帖子与收藏----------------------
    //--------------------------------------------------
    get_mine_postList({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            if (params.isLoadmore) {
      
            }else {
                commit('MINE_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.MINE_POST, {
                'condition': {
                    'userId': window.localStorage.userId
                },
                'size': 10,
                'page': state.mine_post_page
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data.pageList
                    var dataList = state.mine_post_list
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)
                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_POST_LIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    get_mine_collectList({dispatch, commit, state},params) {
        return new Promise(function (resolve) {
            if (params.isLoadmore) {
      
            }else {
                commit('MINE_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.MINE_COLLECT, {
                'condition': {
                    'userId': window.localStorage.userId
                },
                'size': 10,
                'page': state.mine_collect_page
            }).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data.pageList
                    var dataList = state.mine_collect_list
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)
                        if (tieList[i].headerImg.indexOf("http") == 0) {
          
                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_COLLECT_LIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //取消收藏
    mine_cancel_collect({dispatch, commit, state}, status) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_CANCEL_COLLECT, {
                'id': state.mine_post_id,
                "status": status,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log('data', getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '取消收藏成功')
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //删除帖子
    mine_delete_post({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_DELETE_POST, {
                'id': state.mine_post_id,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '删除帖子成功')
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //
    //--------------------------------------------------
    //----------------------我的订单----------------------
    //--------------------------------------------------
    mine_order({dispatch, commit, state},params) {
        return new Promise(function (resolve, reject) {
            if (params.isLoadmore) {
      
            }else {
                commit('MINE_HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.TIP_MINE_ORDER, {
                "condition": {
                    "userId": window.localStorage.userId
                },
                "size": 10,
                "page": state.mine_order_page
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var tieList = getData.data.pageList
                    var dataList = state.mine_order_list
                    for (var i = 0; i < tieList.length; i++) {
                        if (tieList[i].orderStatus == 2) {
                            tieList[i].orderStatusName = '待发货'
                        } else if (tieList[i].orderStatus == 3) {
                            tieList[i].orderStatusName = '已发货'
                        }
                        tieList[i].createTime = api.getMinuteTime(tieList[i].createTime)
                        tieList[i].endTime = api.getCurrentTime(tieList[i].endTime)
                        tieList[i].startTime = api.getCurrentTime(tieList[i].startTime)
                        if (tieList[i].img.indexOf("http") == 0) {
                        } else {
                            tieList[i].img = baseConfig.BASE_IMAGE_URL + tieList[i].img
                        }
                        dataList.push(tieList[i])
                    }
                    commit('MINE_ORDER_LIST', {data: dataList})
                    resolve(tieList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //订单详情
    mine_order_detail({dispatch, commit, state}, params) {
        commit('MINE_HOME_LOADING', {data: true})
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.TIP_MINE_ORDER_DETAIL, {
                "condition": {
                    "userId": window.localStorage.userId
                },
                "orderId": params.id
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    getData.data.showInfo.img = baseConfig.BASE_IMAGE_URL + getData.data.showInfo.img

                    getData.data.showInfo.endTime = api.getCurrentTime(getData.data.showInfo.endTime)
                    getData.data.showInfo.startTime = api.getCurrentTime(getData.data.showInfo.startTime)
                    var useCount = 0
                    for (var key in getData.data.qrCodeIds) {
                        getData.data.qrCodeIds[key].useTime = api.getMinuteTime(getData.data.qrCodeIds[key].useTime)
                        if (getData.data.qrCodeIds[key].isUsed) {
                            useCount++
                        }
                    }
                    getData.data.useCount = useCount
                    commit('MINE_ORDER_DETAIL', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('MINE_HOME_LOADING', {data: false})
            })
        })
    },
    //--------------------------------------------------
    //----------------------意见反馈----------------------
    //--------------------------------------------------
    //意见反馈
    mine_suggest({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_SUGGEST, {
                'content': params.content,
                'type': params.type,
                'userId': window.localStorage.userId,
                'address': params.address
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '提交成功')
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    //收货地址
    mine_get_address({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_ADDRESS, {
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    commit('MINE_ADDRESS_LIST', {data: getData.data})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //获取区域
    mine_get_area({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_GET_AREA).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {

                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //新增收货地址
    mine_add_address({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            params.userId = window.localStorage.userId
            api.getModuoData(PATH.MINE_ADD_ADDRESS, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '保存成功')
                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //删除收货地址
    mine_edit_address({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            params.userId = window.localStorage.userId
            api.getModuoData(PATH.MINE_DELETE_ADDRESS, params).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '删除成功')
                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },


    showAlert({commit}, title) {
        commit('MINE_ALERT', {data: true})
        commit('MINE_ALERT_TITLE', {data: title})
        setTimeout(function () {
            commit('MINE_ALERT', {data: false})
        }, 2000)
    }
}
