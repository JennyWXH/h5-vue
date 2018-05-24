/**
 * Created by jemmy_wxh on 2017/12/1.
 */

import wx from 'weixin-js-sdk'

function weixinShare(title, desc, imgUrl, shareLink) {
    let link = null
    if (shareLink) {
        link = shareLink
    } else {
        link = window.location.href
    }
    let newImgUrl = imgUrl?imgUrl:'http://m.imoduo.com/appLogo.png'
    wx.config({
        debug: false,                                                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxcc5d2d1b88dea674',                                            // 必填，公众号的唯一标识
        timestamp: '1512121540',                                    // 必填，生成签名的时间戳
        nonceStr: '1018194717',                                      // 必填，生成签名的随机串
        signature: window.sessionStorage.sha1,                                    // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('res is',res)
    });
    wx.ready(() => {
        // 分享朋友圈
        wx.onMenuShareTimeline({
            title: title,                                               // 分享标题
            link: link,                                 // 分享链接
            imgUrl: newImgUrl,                                             // 分享图标
            desc: desc,                                                 // 分享描述
            success () {
                // alert('分享成功')
                // 用户确认分享后执行的回调函数
            },
            cancel () {
                // alert('分享成功')
                // 用户取消分享后执行的回调函数
            }
        })
        // 分享朋友
        wx.onMenuShareAppMessage({
            title: title,                                              // 分享标题
            desc: desc,                                                // 分享描述
            link: link,                                // 分享链接
            imgUrl: newImgUrl,                                            // 分享图标
            type: '',                                                  // 分享类型,music、video或link，不填默认为link
            dataUrl: '',                                               // 如果type是music或video，则要提供数据链接，默认为空
            success () {
                // alert('分享成功')
                // 用户确认分享后执行的回调函数
            },
            cancel () {
                // alert('分享失败')
                // 用户取消分享后执行的回调函数
            }
        })
        // 分享朋友圈
        wx.onMenuShareQQ({
            title: title,                                               // 分享标题
            link: link,                                 // 分享链接
            imgUrl: newImgUrl,                                             // 分享图标
            desc: desc,                                                 // 分享描述
            success () {
                // alert('分享成功')
                // 用户确认分享后执行的回调函数
            },
            cancel () {
                // alert('分享成功')
                // 用户取消分享后执行的回调函数
            }
        })
        // 分享朋友圈
        wx.onMenuShareWeibo({
            title: title,                                               // 分享标题
            link: link,                                 // 分享链接
            imgUrl: newImgUrl,                                             // 分享图标
            desc: desc,                                                 // 分享描述
            success () {
                // alert('分享成功')
                // 用户确认分享后执行的回调函数
            },
            cancel () {
                // alert('分享成功')
                // 用户取消分享后执行的回调函数
            }
        })
    })
}

module.exports = {weixinShare}