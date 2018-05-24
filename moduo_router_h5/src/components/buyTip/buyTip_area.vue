<template>
    <div v-title data-title="请选择区域" id="app">
        <!--<my-header title="请选择区域" title-color="black" :showBack=true></my-header>-->
        <div class="content">
            <div class="tipGray" v-for="item in data?data.tickets:[]">
                <div class="colorBlock" :style="{backgroundColor:item.color}"></div>
                <span>{{item.price}}元</span>
            </div>
        </div>
        <div v-html="data?data.spaceAreaHtml:''"></div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import API from '../../../config/api/API'

    var api = new API();

    var imgWidth = 0;
    var imgHeight = 0;
    var netWorkImg = new Image();
    function getSpaceAreaId() {
        console.log('222')
    }
    export default {
        data() {
            return {
                detailId: this.$route.params.id
            }
        },
        components: {},
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getData()
            },function () {
                that.$router.push('/')
            })
            window.getSpaceAreaId = function (index) {
                if (index) {
                    that.$router.push('/buyTip/seat?showId='+that.detailId+'&areaId='+index)
                }
            }
        },
        mounted() {
            var that = this
            setTimeout(function () {
                that.firstIng()
            }, 100)
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示

                data: 'tip_area_data'
            })
        },
        methods: {
//            getSpaceAreaId: function () {
//                console.log('222')
//            },
            getData() {
                this.$store.dispatch('get_area_data', {
                    'showId': this.detailId
                }).then(function () {

                })
            },
            firstIng() {
                var img = document.getElementById("img");
                var that = this
                this.imgLoad(img.src, function (width, height) {
                    imgWidth = width;
                    imgHeight = height;
                    that.changeMap();
                });
            },
            onresize() {
                if (netWorkImg.complete) {
                    this.changeMap();
                }
            },
            imgLoad(url, callback) {
                netWorkImg.src = url;
                if (netWorkImg.complete) {
                    callback(netWorkImg.width, netWorkImg.height);
                } else {
                    netWorkImg.onload = function () {
                        callback(netWorkImg.width, netWorkImg.height);
                        netWorkImg.onload = null;
                    };
                }
                ;
            },
            changeMap() {
                var arr = [];
                var map = document.getElementById("map");
                var ele = map.getElementsByTagName('area');
                for (var i = 0; i < ele.length; i++) {
                    arr.push(ele[i].coords)
                }
                for (var i = 0; i < ele.length; i++) {
                    var oldCoords = arr[i];
                    var newcoords = this.adjustAreaCoords(oldCoords);
                    ele[i].setAttribute("coords", newcoords);
                }
                var test = ele;
            },
            adjustAreaCoords(position) {
                var pageWidth = document.body.clientWidth;
                var each = position.split(",");
                for (var i = 0; i < each.length; i++) {
                    each[i] = Math.round(parseInt(each[i]) * pageWidth / imgWidth).toString();
                    i++;
                    each[i] = Math.round(parseInt(each[i]) * pageWidth / imgWidth).toString();
                }
                var newPosition = "";
                for (var i = 0; i < each.length; i++) {
                    newPosition += each[i];
                    if (i < each.length - 1) {
                        newPosition += ",";
                    }
                }
                return newPosition;
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/buyTip/buyTip_area.less';

    #app {
        height: 100%;
        background-color: rgb(240, 239, 245);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>