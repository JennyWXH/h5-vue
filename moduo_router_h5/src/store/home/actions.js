/**
 * Created by ma on 2017/7/25.
 */
import PATH from '../../../config/api/api-path'
import baseConfig from '../../../config/global-config'
import API from '../../../config/api/API'
var api = new API();
export const actions = {
    //--------------------------------------------------
    //----------------------首页-------------------------
    //--------------------------------------------------
    //获取首页目录
    getCateData({dispatch, commit, state}) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.HOME_GET_BANNERANDCOLUMN).then(function (res) {
                var getData = res.data;
                console.log(getData);
                if (parseInt(getData.status) == 1) {
                    commit("HOME_PIC_DATA", {data: getData.data.appBannerData})
                    commit("HOME_FEATURE_DATA", {data: getData.data.featuredBanner})
                    var column = getData.data.appColumnData
                    var homeList = state.home_dataList
                    for (var key in column) {
                        column[key].pageNow = 1;
                        homeList.push([]);
                    }
                    commit("HOME_CATE_DATA", {data: column})
                    commit("HOME_DATA_LIST", {data: homeList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //获取列表
    getHomeData({dispatch, commit, state}, params) {
        return new Promise(function (resolve) {
            if (params.isLoadmore) {

            }else {
                commit('HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.HOME_GET_NEWS, params).then(function (res) {
                var getData = res.data;
                if (parseInt(getData.status) == 1) {
                    var itemData = getData.data.content
                    var homeList = state.home_dataList
                    var item = homeList[state.home_selectCode]
                    // console.log('homelist is', item)
                    for (var key in itemData) {
                        itemData[key].createTime = api.changeTime(itemData[key].createTime)
                    }
                    for (var key in itemData) {
                        item.push(itemData[key])
                    }
                    item.isLoadmore = itemData.length<10?false:true
                    commit("HOME_DATA_LIST", {data: homeList})
                    if (itemData.length == 0) {
                        commit('HOME_LOADING', {data: false})
                    }
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(function () {
                    commit('HOME_LOADING', {data: false})
                }, 500)
            })
        })
    },
    //获取资讯详情
    getHomeDetail({dispatch, commit, state}, params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.HOME_GET_NEWSDETAIL, params,{did:params.newsId}).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    getData.data.createTime = api.getFormatTime(getData.data.createTime,'yyyy.M.d hh:mm')
                    for (var key in getData.data.recommends) {
                        getData.data.recommends[key].createTime = api.changeTime(getData.data.recommends[key].createTime)
                    }
                    // getData
                    commit("HOME_DETAIL_DATA", {data: getData.data})

                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('HOME_LOADING', {data: false})
            })
        })
    },
    //--------------------------------------------------
    //----------------------评论列表-------------------------
    //--------------------------------------------------
    getCommentData({dispatch, commit, state}, params) {
        return new Promise(function (resolve) {
            if (!params.isLoadmore) {
                commit('HOME_LOADING', {data: true})
            }
            var newParams = {
                'size': params.size?params.size:3,
                'userSize': 5
            }
            newParams.page = params.page
            newParams.id = params.id
            api.getModuoData(PATH.HOME_NEWS_REPLY, newParams,{did:params.id}).then(function (res) {
                var getData = res.data;
                // console.log(getData)
                if (parseInt(getData.status) == 1) {
                    var data = getData.data
                    for (var key in data) {
                        data[key].createTime = api.changeTime(data[key].createTime)
                        if (data[key].user.headerImg.indexOf("http") == 0) {
                        } else {
                            data[key].user.headerImg = baseConfig.BASE_IMAGE_URL + data[key].user.headerImg
                        }
                        var replys = data[key].replyIds
                        for (var key2 in replys) {
                            replys[key2].createTime = api.changeTime(replys[key2].createTime)
                        }
                    }
                    var commentList
                    if (params.type == 2) {
                        commentList = state.home_all_comment

                        for (var key in data) {
                            commentList.push(data[key])
                        }
                        commit('HOME_ALL_COMMENT', {data: commentList})
                    }else {
                        commit('HOME_COMMENT_LIST', {data: data})
                    }
                    resolve(data.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                commit('HOME_LOADING', {data: false})
            })
        })
    },
    getCommentDetail ({dispatch, commit, state}, params) {
        return new Promise(function (resolve) {
            if (!params.isLoadMore) {
                commit('HOME_LOADING', {data: true})
            }
            api.getModuoData(PATH.HOME_NEWS_DETAIL_COMMENT, {
                    "newsId": params.newsId,
                    "markId": params.markId,
                    "content": params.content,
                    "pid": params.pid,
                    "userPage": params.userPage,
                    "userSize": 10,
                    "userId": window.localStorage.userId
            }).then(function (res) {
                var getData = res.data;
                console.log(getData)
                if (getData.status == 1) {
                    if (getData.data) {
                        var commentData = getData.data[0]
                        commentData.createTime = api.changeTime(commentData.createTime)
                        if (commentData.user.headerImg.indexOf("http") == 0) {
                        } else {
                            commentData.user.headerImg = baseConfig.BASE_IMAGE_URL + commentData.user.headerImg
                        }
                        var commentList = state.home_detail_comment
                        for (var key in commentData.replyIds) {
                            commentData.replyIds[key].createTime = api.changeTime(commentData.replyIds[key].createTime)
                            commentList.push(commentData.replyIds[key])
                        }
                        console.log(commentList)
                        commit('HOME_DETAIL_COMMENT_DATA', {data: commentData})
                        commit('HOME_DETAIL_COMMENT', {data: commentList})
                    }
                    resolve(commentList.length < 10 ? false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(() => {
                    commit('HOME_LOADING', {data: false})
                }, 1000)
            })
        })
    },
    reply_news({dispatch, commit, state}, params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.HOME_NEWS_COMMENT, params).then(function (res) {
                if (res.data.status == 1) {
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },

    showAlert({commit}, title) {
        commit('HOME_ALERT', {data: true})
        commit('HOME_ALERT_TITLE', {data: title})
        setTimeout(function () {
            commit('HOME_ALERT', {data: false})
        }, 2000)
    }

}
