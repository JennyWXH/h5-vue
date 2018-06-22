<template>
    <div v-if="data && activity" class="footer">
        <ul class="footer-ul">
            <li v-for="(key, val) in data['MA-SYX-25'].items" @click="gotopage(key)">
                <img :src="val.imgUrl" v-if="key != selectnum">
                <img :src="data['MA-SYX-24'].items[selectnum].imgUrl" v-else>
            </li>
        </ul>
    </div>
    <div v-else class="footer">
        <ul class="footer-ul">
            <li @click="gotopage(0)">
                <div>
                    <img src="../../assets/tabbar/tabbar_home_high.png" v-if="0 == selectnum">
                    <img src="../../assets/tabbar/tabbar_home.png" v-else>
                    <!--<span :style="{'color':0 == selectnum?'green':'black'}">麽多</span>-->
                </div>
            </li>
            <li @click="gotopage(1)">
                <div>
                    <img src="../../assets/tabbar/tabbar_community_high.png" v-if="1 == selectnum">
                    <img src="../../assets/tabbar/tabbar_community.png" v-else>
                    <!--<span :style="{'color':1 == selectnum?'green':'black'}">社区</span>-->
                </div>
            </li>
            <li @click="gotopage(2)">
                <div>
                    <img src="../../assets/tabbar/tabbar_reward_high.png" v-if="2 == selectnum">
                    <img src="../../assets/tabbar/tabbar_reward_default.png" v-else>
                    <!--<span :style="{'color':1 == selectnum?'green':'black'}">社区</span>-->
                </div>
            </li>
            <li @click="gotopage(3)">
                <div>
                    <img src="../../assets/tabbar/tabbar_tip_high.png" v-if="3 == selectnum">
                    <img src="../../assets/tabbar/tabbar_tip.png" v-else>
                    <!--<span :style="{'color':2 == selectnum?'green':'black'}">购票</span>-->
                </div>
            </li>
            <li @click="gotopage(4)">
                <div>
                    <img src="../../assets/tabbar/tabbar_mine_high.png" v-if="4 == selectnum">
                    <img src="../../assets/tabbar/tabbar_mine.png" v-else>
                    <!--<span :style="{'color':3 == selectnum?'green':'black'}">我的</span>-->
                </div>
            </li>
        </ul>
    </div>
</template>
<!--<template>-->
<!--<div>-->
<!--<tabbar class="tabbar" style="">-->
<!--<tabbar-item>-->
<!--<img slot="icon" src="../../assets/icon_nav_button.png">-->
<!--<span slot="label">首页</span>-->
<!--</tabbar-item>-->
<!--<tabbar-item show-dot>-->
<!--<img slot="icon" src="../../assets/icon_nav_msg.png">-->
<!--<span slot="label">消息</span>-->
<!--</tabbar-item>-->
<!--<tabbar-item selected link="/component/demo">-->
<!--<img slot="icon" src="../../assets/icon_nav_article.png">-->
<!--<span slot="label">目录</span>-->
<!--</tabbar-item>-->
<!--<tabbar-item badge="2">-->
<!--<img slot="icon" src="../../assets/icon_nav_cell.png">-->
<!--<span slot="label">消息</span>-->
<!--</tabbar-item>-->
<!--</tabbar>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--import { Tabbar, TabbarItem } from 'vux'-->
<!--export default {-->
<!--components: {-->
<!--Tabbar,-->
<!--TabbarItem-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style lang="less" rel="stylesheet/less" scoped>-->


<!--</style>-->
<!--
  selectnum: 底部菜单栏位置
  import Bottomfooter from 'XXX/common/footer/Footer.vue'
  <bottomfooter :selectnum="'0'"></bottomfooter>
-->
<style lang="less" rel="stylesheet/less" scoped>
    @import "../css/dsCommonForRem.less";

    .footer {
        position: fixed;
        width: 7.6rem;
        height: 0.88rem;
        background-color: #f9f9f9;
        border-top: 1px solid @sc8;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        z-index: 999;
        text-align: center;
        .verticalcenter();
        .footer-ul {
            margin: 0;
            padding: 0;
            width: 100%;
            list-style: none;
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            span {
                width: 100%;
                height: 0.15rem;
                font-size: 0.25rem;
                /*margin-top: 0.05rem;*/
                display: inline-block;
                border-radius: 50%;
            }
            & > li {

                float: left;
                width: 1.52rem;
                // width: 3.075rem;
                height: 0.88rem;

                //        .verticalcenter();
                & > div {
                    width: 1.2rem;
                    font-size: 0;
                    img {
                        display: block;
                        width: 1.52rem;
                        height: 0.88rem;
                        /*margin: 0.05rem auto 0;*/
                    }
                    .footer-text {
                        display: inline-block;
                        width: 1.52rem;
                        text-align: center;
                        line-height: 0.3;
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                hasNew: false,     // 是否有新文章
                activity: false,   // 是否有活动
                data: null         // 请求底部菜单数据
            }
        },
        methods: {
            // 跳转其他页面
            gotopage (key) {
                var that = this
                switch (Number(key)) {
                    case 0:
                        that.$router.push('/')
                        break
                    case 1:
                        that.$router.push('/community')
                        break
                    case 2:
                        that.$router.push('/reward')
                        break
                    case 3:
                        that.$router.push('/buyTip')
                        break
                    case 4:
                        that.$router.push('/mine')
                        break
                    default:
                        break
                }
            },
            intNum (num) {
                return num < 10 ? '0' + num : num
            },
        },
        created () {

        },
        ready () {

        },
        props: ['selectnum']

    }
</script>







