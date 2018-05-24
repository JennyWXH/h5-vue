/**
 * Created by jemmy_wxh on 2018/4/19.
 */
class linkCtrl {
    getSpecilUrlQueryString (url,name) {
        //获取url中"?"符后的字串

        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')

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
    getYoukuId (url) {
        var w=url.indexOf("id_");
        var x=url.indexOf(".html");
        return url.substring(w+3,x)
    }
}

export default linkCtrl