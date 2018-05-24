/**
 * Created by ma on 2017/7/25.
 */
import PATH from '../../../config/api/api-path'
import baseConfig from '../../../config/global-config'
import API from '../../../config/api/API'
import urlLink from '../../../config/api/urlLinkCtrl'
var api = new API();
var Link = new urlLink();
export const actions = {
    //--------------------------------------------------
    //----------------------社区首页----------------------
    //--------------------------------------------------
    //获取社区首页
    getCommunityData({commit, dispatch}) {
        return new Promise(function (resolve, reject) {
            commit('COMMUNITY_HOME_LOADING', {loading: true})
            api.getModuoData(PATH.COMMUNITY_GET_INDEX, {"size": "10", "page": '1'}).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    var innerData = getData.data
                    console.log(innerData)
                    commit('COMMUNITY_BANNER_DATA', {bannerList: innerData.banners})
                    commit('COMMUNITY_CATE_DATA', {cateData: innerData.normals})
                    commit('COMMUNITY_CATE_ARTIST', {data: innerData.artists})
                    var tieList = innerData.pages.pageList
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)
                        if (tieList[i].shareType == 4) {//优酷视频
                            var id = Link.getYoukuId(tieList[i].shareUrl)
                            tieList[i].videoIframe = "<iframe width=92% height='200' src='http://player.youku.com/embed/" + id + "' frameborder=0 allowfullscreen></iframe>"
                        }else if (tieList[i].shareType == 5) {//腾讯视频
                            var vid = Link.getSpecilUrlQueryString(tieList[i].shareUrl,'vid')
                            tieList[i].videoIframe = "<iframe <iframe width=92% height='200'  class='iframe' frameborder=\"0\" src=\"https://v.qq.com/iframe/player.html?vid=" + vid + "&tiny=0&auto=0\" allowfullscreen></iframe>"
                        }
                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                    }
                    commit('COMMUNITY_HOME_LIST', {dataList: tieList})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(() => {
                    commit('COMMUNITY_HOME_LOADING', {loading: false})
                }, 10)
            })
        })
    },
    //社区首页获取更多数据
    getMoreData({commit, dispatch, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.COMMUNITY_GET_MOREDATA, {
                "size": "10",
                "page": state.community_page
            }).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    var innerData = getData.data
                    var tieList = innerData.pageList
                    var dataList = state.community_List
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)

                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        dataList.push(tieList[i])
                    }
                    commit('COMMUNITY_HOME_LIST', {dataList: dataList})
                    setTimeout(() => {
                        commit('COMMUNITY_HOME_LOADING', {loading: false})
                    }, 10)
                    resolve(tieList.length<10?false:true)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //发表帖子
    postCommunity({commit,dispatch},params) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.COMMUNITY_POST_FORUM, {
                'circled': params.circled,
                'title': params.title,
                'content': params.content,
                'images': params.images,
                'userId': window.localStorage.userId
            }).then(function (res) {
                console.log(res.data)
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    resolve(getData.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(() => {
                    commit('COMMUNITY_HOME_LOADING', {loading: false})
                }, 10)
            })
        })
    },
    //--------------------------------------------------
    //----------------------社区详情----------------------
    //--------------------------------------------------
    //获取社区详情数据
    getCommunityDetail({commit, dispatch, state}) {
        return new Promise(function (resolve, reject) {
            commit('COMMUNITY_HOME_LOADING', {loading: true})
            api.getModuoData(PATH.COMMUNITY_GET_DETAILDATA, {
                'size': '10',
                'id': state.community_detailId,
                'userPage': '1',
                'userId': window.localStorage.userId,
                'userSize': '2',
                'page': '1'
            },{did:state.community_detailId}).then(function (res) {
                var getData = res.data
                console.log('detail is',getData)
                if (parseInt(getData.status) == 1) {
                    getData.data.postTime = api.changeTime(getData.data.createTime)
                    var commentList = getData.data.postReplys
                    for (var key in commentList) {
                        commentList[key].createTime = api.changeTime(commentList[key].createTime)
                        if (commentList[key].headerImg.indexOf("http") == 0) {
                        } else {
                            commentList[key].headerImg = baseConfig.BASE_IMAGE_URL + commentList[key].headerImg
                        }
                        var replys = commentList[key].replyIds
                        for (var key2 in replys) {
                            replys[key2].createTime = api.changeTime(replys[key2].createTime)
                        }
                        commentList[key].images = commentList[key].images.split(",")
                    }
                    resolve()
                    commit('COMMUNITY_DETAILDATA', {detailData: getData.data})
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(() => {
                    commit('COMMUNITY_HOME_LOADING', {loading: false})
                }, 10)
            })
        })
    },
    //收藏帖子
    community_collect_post({dispatch, commit, state}, status) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_CANCEL_COLLECT, {
                'id': state.community_detailId,
                "status": status,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log('data', getData)
                if (parseInt(getData.status) == 1) {
                    if (status == 0) {
                        dispatch('showAlert', '取消收藏成功')
                    } else {
                        dispatch('showAlert', '收藏成功')
                    }
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //举报
    community_report_post({dispatch, commit, state}, params) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.COMMUNITY_REPORT_POST, {
                'userId': params.userId,
                'content': params.content ? params.content : '',
                'relationId': params.relationId,
                'informer': window.localStorage.userId,
                'informType': params.type,
                'relationype': params.relationype,
                'userPostTime': params.userPostTime,
            }).then(function (res) {
                var getData = res.data
                console.log('data', getData)
                if (parseInt(getData.status) == 1) {
                    dispatch('showAlert', '举报成功')
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //删除帖子
    community_delete_post({dispatch, commit, state}) {
        return new Promise(function (resolve, reject) {
            api.getModuoData(PATH.MINE_DELETE_POST, {
                'id': state.community_detailId,
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
    //点赞
    community_favorClick({commit, state, dispatch},params) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.COMMUNITY_TO_PRAISE,  {
                'id': state.community_detailId,
                'userId': window.localStorage.userId
            }).then(function (res) {
                console.log(res)
                var getData = res.data
                if (parseInt(getData.status) == 1) {

                    if (state.community_detailData) {
                        commit('CHANGE_PRAISE_STATUS', {detailData: state.community_detailData})
                        if (state.community_detailData.isPraise) {
                            dispatch('showAlert', '已点赞')
                        } else {
                            dispatch('showAlert', '已取消')
                        }
                    }
                    resolve(getData.data)
                    if (params) {
                        if (!params.isList) {
                            dispatch('getCommunityDetail')
                        }
                    }else {
                        dispatch('getCommunityDetail')
                    }
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //--------------------------------------------------
    //----------------------评论详情----------------------
    //--------------------------------------------------
    //社区评论
    send_commentDetail_Messge({commit, state, dispatch},params) {
        return new Promise(function (resolve,reject) {
            api.getModuoData(PATH.COMMUNITY_COMMENT, {
                "id": state.community_detailId,
                "content": params.msg,
                "pid": 0,
                "userId": window.localStorage.userId,
                "replyPid": params.replyId,
                "markId": params.replyId,
                "userPage": 1,
                "userSize": 1
            },{did:state.community_detailId}).then(function (res) {
                if (res.data.status == 1) {
                    resolve(res.data.data)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    get_community_commentDetail({commit, state, dispatch},params) {
        return new Promise(function (resolve, reject) {
            if (!params.isLoadMore) {
                commit('COMMUNITY_HOME_LOADING', {loading: true})
            }
            api.getModuoData(PATH.COMMUNITY_COMMENT_DETAIL, {
                "id": state.community_detailId,
                "markId": params.replyId,
                "content": null,
                "pid": 0,
                "userId": 0,
                "userPage": state.community_comment_page,
                "userSize": 10,
                "replyPid": 0
            }).then(function (res) {
                var getData = res.data
                console.log(getData)
                if (parseInt(getData.status) == 1) {
                    getData.data.createTime = api.changeTime(getData.data.createTime)
                    if (getData.data.headerImg.indexOf("http") == 0) {
                    } else {
                        getData.data.headerImg = baseConfig.BASE_IMAGE_URL + getData.data.headerImg
                    }
                    var tempComment = state.community_detail_commentList
                    for (var key in getData.data.replyIds) {
                        getData.data.replyIds[key].createTime = api.changeTime(getData.data.replyIds[key].createTime)
                        tempComment.push(getData.data.replyIds[key])
                    }
                    commit('COMMUNITY_COMMENTLIST', {commentList: tempComment})
                    commit('COMMUNITY_COMMENTDATA', {commentData: getData.data})
                    resolve(getData.data.replyIds?getData.data.replyIds.length>10:false)
                } else {
                    dispatch('showAlert', getData.info)
                }
                setTimeout(() => {
                    commit('COMMUNITY_HOME_LOADING', {loading: false})
                }, 10)
            })
        })
    },
    //--------------------------------------------------
    //----------------------圈子信息----------------------
    //--------------------------------------------------
    //关注
    per_community_attentionClick({commit, state, dispatch}) {
        commit('COMMUNITY_HOME_LOADING', {loading: true})
        api.getModuoData(PATH.COMMUNITY_CIRCLE_ATTENTION, {
            "size": "10",
            "circleId": state.community_per_circleId,
            'userId': window.localStorage.userId
        }).then(function (res) {
            commit('COMMUNITY_HOME_LOADING', {loading: false})
            var getData = res.data
            // console.log(getData)
            if (parseInt(getData.status) == 1) {
                commit('CHANGE_ATTENTION_STATUS', {data: state.community_per_cateData})
                if (state.community_per_cateData.attention) {
                    dispatch('showAlert', '加入成功')
                } else {
                    dispatch('showAlert', '已取消')
                }
            } else {
                dispatch('showAlert', getData.info)
            }
        })
    },
    //获取帖子列表
    per_community_getCommunityData({commit, state, dispatch}) {
        return new Promise(function (resolve) {
            commit('COMMUNITY_HOME_LOADING', {loading: true})
            commit('COMMUNITY_PER_SELECTCODE', {code: 0})
            api.getModuoData(PATH.COMMUNITY_POST_LIST, {
                "size": "10",
                "circleId": state.community_per_circleId,
                'userId': window.localStorage.userId
            }).then(function (res) {
                var getData = res.data
                console.log(getData.data)
                if (parseInt(getData.status) == 1) {
                    var innerData = getData.data
                    commit('COMMUNITY_PER_CATEDATA', {data: innerData.circleInfo})
                    var tieList = innerData.pages.pageList
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)

                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                    }
                    commit('COMMUNITY_PER_DATALIST', {list: tieList})
                    commit('COMMUNITY_HOME_LOADING', {loading: false})
                    commit('COMMUNITY_FIRST_LOADING', {loading: false})
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }


            })
        })
    },
    //加载更多帖子
    per_community_getMoreData({commit, state, dispatch}) {
        return new Promise(function (resolve) {
            api.getModuoData(PATH.COMMUNITY_MORE_POST, {
                "size": "5",
                "page": state.community_per_page,
                "condition": {"circleId": state.community_per_circleId}
            }).then(function (res) {
                var getData = res.data
                if (parseInt(getData.status) == 1) {
                    var innerData = getData.data
                    var tieList = innerData.pageList
                    var tempList = state.community_per_dataList
                    for (var i = 0; i < tieList.length; i++) {
                        tieList[i].time = api.changeTime(tieList[i].time)

                        if (tieList[i].headerImg.indexOf("http") == 0) {

                        } else {
                            tieList[i].headerImg = baseConfig.BASE_IMAGE_URL + tieList[i].headerImg
                        }
                        tempList.push(tieList[i])
                    }
                    commit('COMMUNITY_PER_DATALIST', {list: tempList})
                    resolve(tieList.length <10 ? false : true)
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })
    },
    //子圈列表
    per_community_getChildCircleData({commit, state, dispatch}) {
        api.getModuoData(PATH.COMMUNITY_CHILD_CIRCLE, {"circleId": state.community_per_circleId}).then(function (res) {
            var getData = res.data
            if (parseInt(getData.status) == 1) {
                commit('COMMUNITY_PER_CHILDCIRCLELIST', {list: getData.data})
                console.log(getData)
            } else {
                dispatch('showAlert', getData.info)
            }

        })
    },
    //--------------------------------------------------
    //----------------------更多圈子----------------------
    //--------------------------------------------------
    community_more_getMoreCommunity({commit, state, dispatch}) {
        return new Promise(function (resolve) {
            commit('COMMUNITY_HOME_LOADING', {loading: true})
            api.getModuoData(PATH.COMMUNITY_CIRCLE_MORE).then(function (res) {
                var getData = res.data
                console.log(getData.data)
                if (parseInt(getData.status) == 1) {
                    commit('COMMUNITY_MORE_DATALIST', {list: getData.data.circleInfo})
                    setTimeout(() => {
                        commit('COMMUNITY_HOME_LOADING', {loading: false})
                    }, 100)
                    resolve()
                } else {
                    dispatch('showAlert', getData.info)
                }
            })
        })

    },

    showAlert({commit}, title) {
        commit('COMMUNITY_ALERT', {alert: true})
        commit('COMMUNITY_ALERT_TITLE', {alertTitle: title})
        setTimeout(function () {
            commit('COMMUNITY_ALERT', {alert: false})
        }, 2000)
    }
}
