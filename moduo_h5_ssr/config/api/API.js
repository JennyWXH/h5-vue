import axios from 'axios'
import config from './config'
import Qs from 'qs'
import jquery from 'jquery'
import md5 from 'js-md5'
const progressConfig = require('../../config')
var base_url
console.log('-------------------',process.env.NODE_ENV)
if(process.env.NODE_ENV=='production') {
    base_url = JSON.parse(progressConfig.build.env.API_ROOT)
}else {
    base_url = JSON.parse(progressConfig.dev.env.API_ROOT)
}
class API {
    getData (url,param) {
        // var newConfig = {
        //     responseType : 'jsonp',
        //     method : 'get'
        // }
        // console.log(newConfig)
        return axios.get(url,{params:param})
    }
	getList (url,param) {
        // config.data.Method="post";
        // config.headers['Content-Type'] = "text/plain"

		return axios.post(url,param,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'*/*'
            }
        });
	}
    getModuoData(url,param,extraUrl) {
        config.url = url;
        config.headers['Content-Type'] = "application/json"
        var newParam;
        if(param) {
            newParam = {}
            newParam.apisign = this.getMd5(JSON.stringify(param));
            newParam['data'] = param
        }
        if (extraUrl) {

            url = url + '?s=2&did=' + (extraUrl.hasOwnProperty('did')?extraUrl.did:0) + '&suid=' + (this.getQueryString('suid')?this.getQueryString('suid'):'0') + '&dt=' + (this.getQueryString('dt')?this.getQueryString('dt'):'0')
        }else {
            url = url + '?s=2&did=0&suid=' + (this.getQueryString('suid')?this.getQueryString('suid'):'0') + '&dt=' + (this.getQueryString('dt')?this.getQueryString('dt'):'0')

        }
        return axios.post(url,newParam,config);
    }
	getCurrency (url,imgs,extParam) {
        let param = new FormData(); //创建form对象
        for (var i=0; i<imgs.length; i++) {
            param.append('file',imgs[i]);//通过append向form对象添加数据
        }
        // console.log('file是什么',param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // config.url = url;
        // config.headers['Content-Type'] = 'multipart/form-data'
        let newConfig = {
            headers:{'Content-Type':'multipart/form-data'}
        };
        var jsonStr = '';
        for (var json in extParam) {
            if (jsonStr.indexOf('=') > 0) {
                jsonStr = jsonStr + '&' + json + '=' + extParam[json]
            }else {
                jsonStr = jsonStr + json + '=' + extParam[json]
            }
        }
        extParam.apisign = this.getMd5(jsonStr);
        //添加请求头
        for (var json in extParam) {
            if (url.indexOf('?') > 0) {
                url = url + '&' + json + '=' + extParam[json]
            }else {
                url = url + '?' + json + '=' + extParam[json]
            }
        }
		return axios.post(base_url+url,param,newConfig);
	}
    getQueryString (name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var url = location.href;

        if (url.indexOf("?") != -1) {
            var index = url.lastIndexOf("?")
            var str = url.substr(index+1)
            // var sepArr = url.split("?");
            // alert(str)
            const r = str.match(reg)
            if (r != null) return r[2];
        }
        return null
    }
    getQueryString2 (name) {
        var url = location.href; //获取url中"?"符后的字串

        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var sepArr = url.split("?");
            // var str = url.substr(1);
            var strs = sepArr[1].split("&");
            console.log(strs)
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest[name]
    }
    getMd5 (params) {
        var secret = 'moduo@2017&sfli%87wirioew3^534rj'
        var sign = md5(secret + params)
        return sign
    }
    changeTime (time) {
        const dt = new Date(parseInt(time+'000'))
        const dtNow = new Date()

        if (dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() && dt.getDate() == dtNow.getDate() && dtNow.getTime() - dt.getTime() > 0) {
            if (parseInt((dtNow.getTime() - dt.getTime()) / (60 * 1000)) == 0) {
                    return '刚刚'
                } else {
                    return dtNow.getTime() > dt.getTime() + 60*60*1000 ?
                    parseInt((dtNow.getTime() - dt.getTime()) / (60 * 60 * 1000)) + '小时前' :
                    parseInt((dtNow.getTime() - dt.getTime()) / (60 * 1000)) + '分钟前'
            }
        } else {
            if (dtNow.getTime() - dt.getTime() < 7 * 24 * 60 * 60 * 1000 && dtNow.getTime() - dt.getTime() > 0) {
                const day = parseInt((dtNow.getTime() - dt.getTime()) / (24 * 60 * 60 * 1000)) + 1
                return day+'天前'
            } else {
                if (dtNow.getYear() == dt.getYear()) {
                    return ((parseInt(dt.getMonth())<9?'0':'') + (parseInt(dt.getMonth())+1)) + '-' + (parseInt(dt.getDate())<10?'0':'') + dt.getDate()
                }else {
                    return dt.getFullYear() + '-' + ((parseInt(dt.getMonth())<10?'0':'') + (parseInt(dt.getMonth())+1)) + '-' + (parseInt(dt.getDate())<10?'0':'') + dt.getDate()
                }
            }
        }
    }
    getMonthTime(time) {
        const dt = new Date(parseInt(time+'000'))
        const dtNow = new Date()
        if (dtNow.getYear() == dt.getYear()) {
            return ((parseInt(dt.getMonth())<9?'0':'') + (parseInt(dt.getMonth())+1)) + '-' + (parseInt(dt.getDate())<10?'0':'') + dt.getDate() + ' ' + (parseInt(dt.getHours())<10?'0':'') + dt.getHours() + ':' + (parseInt(dt.getMinutes())<10?'0':'') + dt.getMinutes()
        }else {
            return dt.getFullYear() + '-' + ((parseInt(dt.getMonth())<10?'0':'') + (parseInt(dt.getMonth())+1)) + '-' + (parseInt(dt.getDate())<10?'0':'') + dt.getDate() + ' ' + (parseInt(dt.getHours())<10?'0':'') + dt.getHours() + ':' + (parseInt(dt.getMinutes())<10?'0':'') + dt.getMinutes()
        }
    }
    getFormatTime(time,format) {
        const dt = new Date(parseInt(time+'000')).format(format)
        return dt
    }
    //验证电话
    isPhone(aPhone) {
        var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
        if (bValidate) {
            return true;
        }
        else
            return false;
    }
    //验证邮箱
    isEmail(aEmail) {
        var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(aEmail);
        if (bValidate) {
            return true;
        }
        else
            return false;
    }
    //验证QQ
    isQQ(aQQ) {
        var bValidate = RegExp(/^[1-9][0-9]{4,9}$/).test(aQQ);
        if (bValidate) {
            return true;
        }
        else
            return false;
    }
    download(params,func) {
// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
        this.getModuoData('booking/appDownload',null, {
            'did':params.hasOwnProperty('did')?params.did:0
        }).then(function (res) {
        })
        var isInstalled = false;
        var ifrSrc,downloadPage = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.softgarden.moduo'
        var str = ''
        for (var key in params) {
            str = str + key + "=" + params[key] + "&"
        }
        str=str.substring(0,str.length-1)

        var aa = "cartooncomicsshowtwo://?" + str
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            //下面是IOS调用的地址，自己根据情况去修改
            ifrSrc = "cartooncomicsshowtwo://?" + str
        }else if (navigator.userAgent.match(/android/i)) {
            ifrSrc = "cartooncomicsshowtwo://?" + str
        }
        var ifr = document.createElement('iframe')
        ifr.src = ifrSrc
        ifr.style.display = 'none'
//                attachEvent兼容ie
        if (ifr.attachEvent){
            ifr.attachEvent("onload", function(){
                isInstalled = true;
            });
            ifr.onreadystatechange=function(){
                if(this.readyState=="complete"){

                }
            };
        }else {
            ifr.onload = function() {
                isInstalled = true;
            };
        }
        document.body.appendChild(ifr);
        setTimeout(function() {
            if (!isInstalled) {
                //
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    window.location.href = downloadPage
                }else if(ua.match(/\sQQ/i) !== null){
                    window.location.href = downloadPage
                } else {
                    func()
                }
                // if (confirm("下载后，你的欧气会满满滴哟 (๑• ₃•๑)")) {
                //     window.location.href = downloadPage
                // }
                // else {
                //
                // }
            }
        },100);
        setTimeout(function() {
            document.body.removeChild(ifr);
        },1000);

    }
    browser_versions() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {     //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }
}
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
export default API;
