webpackJsonp([38],{1101:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(886),r=n.n(i),a=n(343);n.n(a);t.default={data:function(){return{arr:[{name:"广告",select:!1},{name:"色情",select:!1},{name:"反动",select:!1},{name:"其他原因",select:!1}],supportType:0,msg:"",textable:!0,selectIndex:0}},components:{},created:function(){var e=this;this.$store.dispatch("checkLogin").then(function(){e.$store.commit("COMMUNITY_DETAILID",{detailId:this.$route.params.detailId})},function(){e.$router.push("/")})},computed:r()({},n.i(a.mapGetters)({isLoading:"mine_loading",isAlert:"mine_isAlert",alertTitle:"mine_alertTitle",heading:"mine_home_src",nickname:"mine_home_nickname",detailId:"community_detailId"})),methods:{selectType:function(e){this.selectIndex=e,this.textable=3!=e;for(var t=0;t<this.arr.length;t++){var n=this.arr[t];n.select=e==t}},submit:function(){if(3==this.selectIndex&&""==this.msg)return void this.$store.dispatch("showAlert","请输入内容");var e=this;console.log(e.$route.query.userPostTime),this.$store.dispatch("community_report_post",{type:this.selectIndex+1,content:e.msg,relationype:e.$route.query.relationype,userId:e.$route.query.userId,relationId:e.detailId,userPostTime:e.$route.query.userPostTime}).then(function(){setTimeout(function(){e.$router.go(-1)},2e3)})}}}},1216:function(e,t,n){t=e.exports=n(837)(!1),t.push([e.i,"*{padding:0;margin:0}html{background-color:#fff!important;width:100%;font-size:.4rem}body,html{height:100%}body{display:block;margin:0 auto;width:7.5rem;max-width:750px;position:relative}body *{font-size:.4rem}body::-webkit-scrollbar{width:0}.commonDivider{display:inline-block;float:left;width:7.5rem;height:.02rem;background-color:#f5f5f5}.black30{color:#000}.black30,.gray30{font-size:.3rem;display:inline-block;line-height:.3rem}.gray30{color:gray}.black28{color:#000}.black28,.gray28{font-size:.28rem;display:inline-block;line-height:.29rem}.gray28{color:gray}.black26{color:#000}.black26,.gray26{font-size:.26rem;display:inline-block;line-height:.27rem}.gray24,.gray26{color:gray}.gray24{font-size:.24rem;display:inline-block;line-height:.27rem}.purple{color:#894eef}.titleView{width:100%;height:.8rem}.titleView .purpleLine{width:100%;height:.2rem;background-color:#894eef}.titleView span{display:inline-block;float:left;margin-left:.15rem;line-height:.8rem;font-size:.33rem}.titleView .titleLine{border-radius:.075rem;width:.15rem;margin-left:.2rem;height:.35rem;margin-top:.22rem;background-color:#894eef}.htmlContent{text-align:left;display:inline-block;width:7.1rem}.htmlContent img{width:auto;max-width:100%;display:block;margin:5px auto;-ms-flex-line-pack:center;align-content:center}.htmlContent p{font-size:16px;word-wrap:break-word}.htmlContent span{font-size:16px}.htmlContent embed,.htmlContent iframe{width:100%}",""])},1217:function(e,t,n){t=e.exports=n(837)(!1),t.push([e.i,"#app[data-v-a57a77de]{height:100%;background-color:#f5f5f5;position:absolute;top:0;left:0;width:100%;font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:0}.content[data-v-a57a77de]{margin-left:.8rem;width:5.9rem;height:5rem}.select[data-v-a57a77de]{text-indent:.43rem;display:inline-block;font-size:.3rem;float:left;margin-top:.4rem;margin-right:.8rem;background-size:.4rem .4rem;background-position:0}.selectClass[data-v-a57a77de]{background:url("+n(1386)+") no-repeat;background-size:.4rem .4rem;background-position:0}.unselectClass[data-v-a57a77de]{background:url("+n(1387)+") no-repeat;background-size:.4rem .4rem;background-position:0}textarea[data-v-a57a77de]{outline:none;display:block;resize:none;float:left;border-radius:.1rem;border:0;font-size:.35rem;margin-top:.5rem;padding:.1rem;width:5.7rem;height:3rem;background-color:#f5f5f5}.submit[data-v-a57a77de]{color:#fff;width:100%;border-radius:.1rem;display:inline-block;height:.6rem;line-height:.63rem;font-size:.35rem;margin-top:.3rem;background-color:#3dca99}",""])},1317:function(e,t,n){var i=n(1216);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(838)("606141d7",i,!0)},1318:function(e,t,n){var i=n(1217);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(838)("6dccf19f",i,!0)},1386:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABrNJREFUaAXtWntsFEUY/769u15vjwqaAOIfYEIhYnwApVDbVBAEsdCCGqISojFosSCPkPhAE2lDtIiENEJIJGIgghqrGF5F8BEIgqWlLQJSgRYtviAV5NF79K674zd39uDK3ezsPUpjbv+5vflev983O9/OzgxA6kplIJWBVAZSGUhloMdkAJOJhBVmqZ7z7BHG9AkM8S4KlskY642IGcCgnSFrA4bnqf0UIDsGVqhSDzQcJjlLFq6EE2aTJjldl1qfQGCPASCRZQ4z4BHwT0DYDgpsVSdP242lpboZeyPdhBFmM2ZY3GebZwNjZUTydqPAUnLEo9TZS5yHjlRJ6UsoJYSwa3TWFAb6CiJ7t0TMGFRwn2JRXlWr6w7FYBxmEhfhQK+2NFVQj74U5jUJfwiozgDf6FXbsDwe9zETZg9n9XZf0T5jDCbFA8C0LeLHTrX3bNy712valgxiIuzJyblT09ur6BEeFkvQeG2osNUysBb1qq09Z9aXYtaA5eVlENmdN4ssx8uAZSN0bGPjxqWbxW+KMI1VdPvcm5JXnOThc9Iu9+X18hZBTVOE3TkjyyhQkdkgSdNnbGbbmOFLzPiXHsOe0SPzdabvoymQtI0ZILHqEhgdLZZc2VeWdA/rjC3vaWR5kgiTomv6O7IJkyLsyhlRRI9yrqzT7tdjY11jhhfIxDUkzEpLFaazt2Wc3UwdqqflHKsRBsPxGJg2Mm2HkaOeIEcLFjirG3aJsBhmBFCbJnKQdJmqgq1kHljyxxqH0sEQq5Awf+9SDZxqHCk5GjhgADjWb4S0554H67TpxkEYFAYwCzSFhD252dlUrAYI7JMmUu4fDo4Nm0AZnAn6H7+D713jQkxY73DnjRglAiUkzDRdqvKJAsQis04thPS16wBvvQ30386Cdw59Zp+XnDZ3KFNEMa0iIU0h7xHKEy1EBNv8hZA269mAZ72lBbwlLwD7u1U+kgFmIWF6qQ+VjxSnJhUn+7JysOY/GCT7yxnwzi0GduGCKcdGmIWEaWGtP5/KJPvixSl91XuB8cpj6c3N4JlXDHDxovnQHLPgEo5h+u7MENgmRHR9ceIO9dOnwEOPcUxkyd4Is5Aw2adxELKXbdYzYK9YAzhwkJSJdWpRqDhxA+3kSfDQYwyX/pGyj6IkxCwkTO+0q1GcRmy2Pvk0WHPzwLFxM1gmTIyoE2jkxWnBIrC/WQZoswWatMYT4OWP8eXL0e0kJEaYhYRpQdxUdP+GD4N8nE5IL18BaYtfBrB0KRO8OK2sCFVibqCdOE5k5wBcuSJBSaxihFlImOpVs9h9uLTji0rwra4INdqemgnp69YD9gvWkc6ZU2cl5orasaNEtgSgrS1kF88NYW4S2XdJf7gqMtZIDsaHt4r/+T/aCGBPh7TiFwOKlnvvA8cnlaDVHwZL1ijAXtfqoPbjEfAunAfgdoudmpAS5p9F6sIeRovyncg4msz/wfvg++/x5jqYkQHWsQ+Fk22oB++CuQklG4iFyrfRcPF2IWFHX/yKxoRH5CCazL92Nfg/3RxRrNUdDvasJybXEX3yRo7V0R93R1UggZAwbq9z08Tja5EDkcy3aiX4t3wepqLVHALvovkA3pjW0cN83fiH7Q5gvlEQahES5lq0vfFlSDuGG9/yt8C/fVvAsqP6B/AuXgDQngyyclgNVzz4wrvL72oi5v1i4BsywcwhwM5Q0dcTuvt5zT/iObVP30zcs8cVaoxwY9jDeODAVZonlEWwNdXEmk4njWwACOJSI7Jcz5AwV1IdfejjlHbpe+qFeEIdOFhqF0KKMO3UdSiKYmqFvztzg6C8gpWVmkxMKcLckVpdv4XKfnDuKOO5m3QI0xpnTd1O2XDShLlDdVBmCY3n72WdJ1uPsOwhTIvMxDGs0l2dsfwRfd3tUEtfJXLfgF0dJOo/YqPzFuUB/KbO1AeOqR7mWHF/Q6tVwUfpUWpJFHbTfqhIWRR7gVmyPI5pwtzIXl3fqNoh+2Y83rSisc1pU3Mc1dW/cixmr5gI8yC8p9VBQyZ0VyGjscdQwWVqTf10PjcwS7RT3/QY7jS8/pc2yh/Xdb2cZmNDr29P1D316kEF8TVHTf3+eH0mhDAHQectrG7PpWI61bM03mloiBTCT9Srr9MGWXAyHhLEfpMwwp0QAnNvnyd49BBhIlVzR6dM5pd68y9Q2A5glq1qQeGuHnv0MBKZwOHSVjaZtmzG0+HSYZTdwZSA4OFSAB/tBV29drgUj9OCQ5XjYG0t1QVaaEldqQykMpDKQCoDqQz87zPwL6BbK8eYYxlwAAAAAElFTkSuQmCC"},1387:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABkdJREFUaAXtmktMHVUYx3mH3goYTa26MEZJA2KgCW9UFInFthYtTVw0Lkyb+EhM6sZaqklDolKti8aadONrYVxorCkFLK1KCuUNCxQqITXRmGgbN8gtyPPi7yMMuaH3fnNm7oxgcie5mZnzvf7/7zvnzDkHEhLiVzwD8QzEMxDPQDwDGyYDiX4iGRwcDMzNzdWkpKRULy0t5fDLTkpKygqFQhncZ7nf4H4dDOOJiYk/odtaUVExyPOSX7g8Jzw8PLx5ZmZmH+T2AroG8JucgEf/DxJxLjk5+WxRUVEb7yEn9na6nhGGYDIVPQjYBoLeaRfYRI7PH9GrLysrazXRN9HxhDBEdy8sLLxHNR4wCepUB7+X6PqvU/E+p7Zr9WMiLFXt7e09CZhX1jr2+n2la79RUlJyPBbfrglT1Syq+iVAdsQCwIXtF9PT0werqqpmXNgmuCLc09NzL0Rb+eW6CRqrDXEH8FFLta859ZXk1GBsbCyDgC3rRVbwMpSKuTW1t7enO8XviDCBEicnJz+HrC+TkxPwQjoQCHzsxEZ0HRHu6+trIFCt0yA+6u9n0qx34t94DA8NDT2yuLh4SarsJIDfuvS2EF+JCtNPlnGFIXt8o5GVZIIpicXOu6aJNSI8MDBQi+MKU6f/tR7YHqVr7zKJa0t4JYPvmDhbZ51GwWqHwVaBsbsTJ3l2jtZbzljOZzFUY4fDljCrqaftnPgpp2pBxuibEDpnF4d5xharSphgicyAT9kF8ktO/F/ZJlaUl5e/DeGP7OKAdY9g1vRUwiwhi3Fwl+bALxlxL3MgUFJcXDzCpHkf76fsYqFzd3d3d5GmpxImq0YznxbAjQzgn2VkZFRXVlb+BYHsle//PSa+qPJuTS9FE9KdHiS4puKpjASH+B2hqifEcWdn5zaOh9qlcqaBBLOmqxLGcJtm7KUMUkEquZ8zrWbxy3DKpVo/0O709ETFrBJmdtxKxr3kFdEXpGRy2sNRzogo9Pf35xH7ex63RjRQGgWzIrbdPGRoxl7IILs6OYk/Vkz53NpJtApcia1iVictnKYpjm8SAf4EQGWhMn6TMEIDup9ak5OIqex22qQbb4mgbtqkYlYJM4ZumEYRvdnZ2VOcQpzPysqST8NX0WwhFYLUa+geyMvLmxM9VnSFK9349mh2Ju1gDmp6KmEATGjGa2VsyI9KW05OTrC0tPRZiB3iNx+uB9GgrN4Yr+9b7V1dXcVMWN+he5vV5vYO5r81W5Uwhr9oxmtlBHuJ2XV1q0YFP2AyqoTI76IL2eWVkzUTSxuVLUtNTb2I7FZ5j/Ui1lXNh0qY7jGmGUeSYXOYsdhgyQoLC3unpqbyIfQM39TtsnKyZCTnofn5+QvIsqy2WO8QVjGr3xwA1UHgazcgCFxPhaOeIcsJCmTl5PMWN/6j2TA06uhB30STqxWmq50n+/9EM9basWvkE3Mokg6JfAxg33pNVrCmpaW1RYpptamEOSeapsIXLWWndwid5ODvxXA7uns147oFcJvD2z16bhPMmi+V8Iph1O6hObZkkD4NyeflnQ36Dia2ZsgGLLmXd2LZYlXHsICRg/eJiYmrOLsjFnCQlL8E5uEnORY/iu219PT07IKCgilFx3ZpufxNxcHqrKs502QQzfeRbAJD75gdWcFnW2FRojopdMtRHtWdiOiuxwW+Kyx0JKGLdvFNxnACjhYYe45O+O0Ceynn+37YhKzENCIsipwrnSGTn8jzRrooxIfMzC2mmIwJi0N2Ni9D+rKpc7/1wHKBNfmrTuI4Iiw7G646Av3mJIgfumD4ma4sGxTbcRse3xFhMZSDNYLtXE/SxL7CbxddWd0ZhRO1no1maUs5/N7R0bGFZdwZMvxweLvfz8RryszMfE62oG5iuSYswUZHR9OCweBpQBxwE9yJDTGWmKDe4vNzTJ6d2IbrxkTYcrSyq2rk3ZfvNAS7WX8fYavZacV0e/eEsARnTKWwUXiBR6lATMvQMDKjrKCOsoduCmuL6dEzwhYKWXvzfyD7eN9LF3wC8pssmckd/T+xa2YGPktFZQu5Mf/1MBIZdkcBNvlP0h0fh0QuOvdTseV/LuVZDu+CvF/nPs7+eIRe0soCZwCSrscovuJXPAPxDMQzEM9APAP/lwz8C+7HgmdovUXiAAAAAElFTkSuQmCC"},1435:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"举报"}},[n("div",{staticClass:"content"},[e._l(e.arr,function(t,i){return n("span",{staticClass:"select",class:t.select?"selectClass":"unselectClass",on:{click:function(t){e.selectType(i)}}},[e._v(e._s(t.name))])}),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],attrs:{id:"commentInput",type:"text",maxlength:"200",name:"",placeholder:e.textable?"":"请输入举报信息...",disabled:e.textable},domProps:{value:e.msg},on:{input:function(t){t.target.composing||(e.msg=t.target.value)}}}),e._v(" "),n("span",{staticClass:"submit",on:{click:function(t){e.submit()}}},[e._v("提交")])],2),e._v(" "),n("my-toast",{attrs:{show:e.isAlert,content:e.alertTitle}})],1)},staticRenderFns:[]}},855:function(e,t,n){function i(e){n(1317),n(1318)}var r=n(66)(n(1101),n(1435),i,"data-v-a57a77de",null);e.exports=r.exports},886:function(e,t,n){"use strict";t.__esModule=!0;var i=n(887),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=r.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}},887:function(e,t,n){e.exports={default:n(888),__esModule:!0}},888:function(e,t,n){n(890),e.exports=n(28).Object.assign},889:function(e,t,n){"use strict";var i=n(79),r=n(204),a=n(99),o=n(344),s=n(345),l=Object.assign;e.exports=!l||n(98)(function(){var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=i})?function(e,t){for(var n=o(e),l=arguments.length,c=1,d=r.f,m=a.f;l>c;)for(var u,g=s(arguments[c++]),f=d?i(g).concat(d(g)):i(g),h=f.length,p=0;h>p;)m.call(g,u=f[p++])&&(n[u]=g[u]);return n}:l},890:function(e,t,n){var i=n(78);i(i.S+i.F,"Object",{assign:n(889)})}});