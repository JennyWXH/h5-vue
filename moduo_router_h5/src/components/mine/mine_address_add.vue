<template>
    <div v-title data-title="新增收货地址" id="app">
        <my-header title="新增收货地址" title-color="black" :showDevider=true :showBack=true>
            <div slot="right">
                <img v-if="isEdit" @click="editClick" style="width: 0.4rem;margin-top: 0.1rem"
                     src="../../assets/mine/mine_address_edit.png" alt="">
            </div>
        </my-header>
        <div @click="hidePicker" v-show="showArea"
             style="background-color:rgba(0,0,0,0.1);position: absolute; bottom: 0;width: 100%;left: 0;height: 100%">
            <picker style="background-color:white;position: absolute; bottom: 0.9rem;width: 100%;" :data='areaData'
                    :fixed-columns="3" :columns=4 v-model='year001' @on-change='change' ref="picker1"></picker>
            <div class="sure">
                <span @click="hidePicker()">确定</span>
            </div>
        </div>
        <div style="margin-top: 0.05rem">
            <my-cell :key="index" v-for="(item,index) in arr" :name="item.name" @SELECT_CELL="cellClick(index)">
                <div slot="right">
                    <input v-if="index==0" v-model="item.content" type="text" :placeholder="item.placeH">
                    <input v-if="index==1" v-model="item.content" type="Number" :placeholder="item.placeH">
                    <input v-if="index==2" v-model="item.content" type="text" :placeholder="item.placeH">
                    <input v-if="index==3" minlength="5" v-model="item.content" type="text" :placeholder="item.placeH">
                </div>
            </my-cell>
            <my-cell name="设置默认地址" style="margin-top: 0.2rem" @SELECT_CELL="setDefault()">
                <div slot="right">
                    <img class="rightImg"
                         :src="isSelect?'../../../static/community/community_report_selected.png':'../../../static/community/community_report_unselected.png'"
                         alt="">
                </div>
            </my-cell>
            <div class="buySeat">
                <span @click="saveAddress()">保存</span>
            </div>
        </div>
        <my-loading :show="isLoading" ref="loading"></my-loading>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import cell from '../../common/vue/mine/inputcell.vue'
    import {Picker} from 'vux'
    import {mapGetters} from 'vuex'

    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                arr: [
                    {name: '收货人姓名', placeH: '请输入收货人姓名', content: ''},
                    {name: '手机号码', placeH: '请输入联系方式', content: ''},
                    {name: '所在地区', placeH: '请输入收货地址', content: ''},
                    {name: '详细地址', placeH: '小区、楼牌号等不小于5个字', content: ''}
                ],
                isEdit: false,//是否是新增
                isSelect: false,//是否默认
                showArea: false,//显示picker区域联动
                firstArea: [],//记录省变化后的首个记录
                firstCity: [],//记录城市变化后的首个记录
                year001: [],//没用的
                areaData: [],//picker的联动数据
                oldValue: [],//保存变化后保存的---有延迟--的值

                pId: 0,
                cId: 0,
                rId: 0
            }
        },
        components: {
            Picker,
            'my-cell': cell
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示

                addressData: 'mine_address_data',//地址列表
            })
        },
        methods: {
            getData() {
                this.isEdit = this.$route.params.type == 2
                console.log(this.addressData)
                if (this.isEdit && this.addressData == null) {
                    this.$router.push('/mine')
                }
                if (this.isEdit) {
                    for (var i = 0; i < this.arr.length; i++) {
                        var item = this.arr[i]
                        switch (i) {
                            case 0:
                                item.content = this.addressData.consignee
                                break
                            case 1:
                                item.content = this.addressData.phoneNumber
                                break
                            case 2:
                                item.content = this.addressData.fullAddress
                                break
                            case 3:
                                item.content = this.addressData.address
                                break
                            default:
                                break
                        }
                    }
                    this.isSelect = this.addressData.addressType
                }
                this.$store.commit('MINE_HOME_LOADING', {data: false})
                if (!localStorage.getItem(('areaData')) || !localStorage.getItem(('firstArea')) || !localStorage.getItem(('firstCity'))) {
                    this.getData()
                } else {
                    var area = localStorage.getItem('areaData')
                    var firstA = localStorage.getItem('firstArea')
                    var firstC = localStorage.getItem('firstCity')
                    this.areaData = JSON.parse(area)
                    this.firstArea = JSON.parse(firstA)
                    this.firstCity = JSON.parse(firstC)
                }
            },
            editClick() {
                var that = this
                this.$store.dispatch('mine_edit_address', {'addressId': this.addressData.addressId}).then(function () {
                    setTimeout(function () {
                        that.$router.go(-1)
                    }, 2000)
                })
            },
            saveAddress() {
                if (!this.arr[0].content || !this.arr[1].content || !this.arr[2].content || !this.arr[3].content) {
                    this.$store.dispatch('showAlert', '部分输入为空')
                    return
                }
                if (!(api.isPhone(this.arr[1].content))) {
                    this.$store.dispatch('showAlert', '请输入正确的手机号码')
                    return
                }
                var params = {
                    "cityId": this.cId,
                    "provinceId": this.pId,
                    "regionId": this.rId,
                    "consignee": this.arr[0].content,
                    "address": this.arr[3].content,
                    "fullAddress": this.arr[2].content,
                    "addressType": this.isSelect,
                    "phoneNumber": this.arr[1].content
                }
                var that = this
                this.$store.dispatch('mine_add_address', params).then(function () {
                    setTimeout(function () {
                        that.$router.go(-1)
                    }, 2000)
                })
            },
            hidePicker() {
                this.showArea = false
            },
            change (value) {
                if (!this.showArea) {
                    return
                }
                var area
                if (this.oldValue[0] != value[0]) {
                    for (var i = 0; i < this.firstArea.length; i++) {
                        var item = this.firstArea[i]
                        if (item.value == value[0]) {
                            area = item.province + item.city + item.region
                            this.pId = item.provinceId
                            this.cId = item.cityId
                            this.rId = item.regionId
                            break
                        }
                    }
                } else if (this.oldValue[1] != value[1]) {
                    for (var i = 0; i < this.firstCity.length; i++) {
                        var item = this.firstCity[i]
                        if (item.value == value[1]) {
                            area = item.province + item.city + item.region
                            this.pId = item.provinceId
                            this.cId = item.cityId
                            this.rId = item.regionId
                            break
                        }
                    }
                } else {
                    this.pId = value[0].replace('province', '')
                    this.cId = value[1] ? value[1].replace('city', '') : 0
                    this.rId = value[2] ? value[2].replace('region', '') : 0
                    area = this.$refs.picker1.getNameValues()
                }
                area = this.Trim(area)
                this.arr[2].content = area
                this.oldValue = value
            },
            cellClick(index) {
                if (index == 2) {//收货地址
                    this.showArea = !this.showArea
                }
            },
            setDefault() {
                this.isSelect = !this.isSelect
            },
            addAddress() {
                this.$router.push('/mine/mine_address_add/')
            },
            getData() {
                var that = this
                this.$store.dispatch('mine_get_area').then(function (data) {
                    that.$store.commit('MINE_HOME_LOADING', {data: true})
                    setTimeout(function () {
                        console.log(data)
                        that.sortData(data)
                    }, 1000)
                })
            },
            sortData(object) {
                var arr = object['provinces']
                for (var i = 0; i < arr.length; i++) {
                    var province = arr[i]

                    //此处记录收个区域信息
                    var city = province.city[0]
                    var reg, regId
                    if (city.region.length == 0) {
                        reg = ''
                        regId = 0
                    } else {
                        reg = city.region[0].name
                        regId = city.region[0].reginId
                    }
                    var item = {
                        'value': 'province' + province.provincId,
                        'province': province.name,
                        'city': city.name,
                        'region': reg,
                        'provinceId': province.provincId,
                        'cityId': city.cicyId,
                        'regionId': regId
                    }
                    this.firstArea.push(item)

                    var item = {'name': province.name, 'value': 'province' + province.provincId, 'parent': 0}
                    this.areaData.push(item)
                    for (var j = 0; j < province.city.length; j++) {
                        var city = province.city[j]
                        var reg, regId
                        //此处记录首个城市信息
                        if (city.region.length == 0) {
                            reg = ''
                            regId = 0
                        } else {
                            reg = city.region[0].name
                            regId = city.region[0].reginId
                        }
                        var item = {
                            'value': 'city' + city.cicyId,
                            'province': province.name,
                            'city': city.name,
                            'region': reg,
                            'provinceId': province.provincId,
                            'cityId': city.cicyId,
                            'regionId': regId
                        }
                        this.firstCity.push(item)
                        //存取picker model
                        var item = {
                            'name': city.name,
                            'value': 'city' + city.cicyId,
                            'parent': 'province' + province.provincId
                        }
                        this.areaData.push(item)
                        if (city.region.length == 0) {
                            var item2 = {'name': '', 'value': '', 'parent': 'city' + city.cicyId}
                            this.areaData.push(item2)
                        } else {
                            for (var z = 0; z < city.region.length; z++) {
                                var region = city.region[z]
                                var item3 = {
                                    'name': region.name,
                                    'value': 'region' + region.reginId,
                                    'parent': 'city' + city.cicyId
                                }
                                this.areaData.push(item3)
                            }
                        }
                    }
                }
                var that = this
                setTimeout(function () {
                    that.$store.commit('MINE_HOME_LOADING', {data: false})
                }, 100)

                localStorage.setItem('areaData', JSON.stringify(this.areaData))
                localStorage.setItem('firstArea', JSON.stringify(this.firstArea))
                localStorage.setItem('firstCity', JSON.stringify(this.firstCity))
            },
            //去除空格
            Trim(str)
            {
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g, "");
                result = result.replace(/\s/g, "");
                return result;
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_address_add.less';

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