<template>
    <div v-title data-title="个人资料" id="app">
        <my-cell :tipCount="item.tipCount" :cellType="item.cellType" :style="{'marginTop':item.marginTop}"
                 :showTopDevider="false" v-for="(item,index) in mineArr" :key="index" :name="item.name" :showImg=false
                 @SELECT_CELL="cellClick(index)" :headImg="selectImg?selectImg:item.headImg"></my-cell>
        <div class="box" style="position: absolute; width: 100%;height:1.3rem;">
            <input style="opacity: 0" id="id" type="file" @change="onFileChange"/>
        </div>
        <my-input :defaultMsg="name" @SUER="sureClick" :show="isShow" title="修改昵称"></my-input>
        <input id="selectPic" type="file" @change="onFileChange" style="display: none;">
        <!--<action :isShow="showAct" @functionWay="postCtrl" :actionArr="['拍照','相册']"></action>-->
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import action from 'common/vue/circle/actionView.vue'
    import footer from "common/vue/footer.vue"
    import cell from './cell.vue'
    import alerInput from 'common/vue/mine/alertInput.vue'
    import {mapGetters} from 'vuex'

    import axios from 'axios'
    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
//                actionArr:
                isShow: false,
                isLogin: true,
                mineArr: [{name: '头像', marginTop: '0.05rem', cellType: 3, tipCount: '', headImg: ''},
                    {name: '昵称', marginTop: '0', cellType: 2, tipCount: ''},
                    {name: 'ID', marginTop: '0', cellType: 2, tipCount: ''}],
                showAct: true,
                selectImg: null,
                filesImg: [],
                name: ''
            }
        },
        components: {
            'my-footer': footer,
            'my-cell': cell,
            'my-input': alerInput,
            'action': action
        },
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.getUserData()
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                contentHeight: 'contentHeight',
                baseRem: 'baseRem',
                netWork: 'netWork',
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                userData: 'mine_userData'
            })
        },
        methods: {
            uploadFile(e) {
                if (e.target.files.length > 0) {
                    let file = e.target.files[0];
                    let param = new FormData(); //创建form对象
                    param.append('file', file, file.name);//通过append向form对象添加数据
//                param.append('chunk','0');//添加form表单中其他数据
                    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    };  //添加请求头
                    axios.post('http://t.imoduo.com:9000/moduo/papers/upload/images/', param, config)
                            .then(response=> {
                                console.log(response.data);
                            })
                }
            },

            onFileChange(e) {
              var files = e.target.files || e.dataTransfer.files
              if (!files.length)return
              this.createImage(files)
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器')
                    return false
                }
                var image = new Image()
                var vm = this
                var leng=file.length
                if (leng > 0) {
                    vm.filesImg.push(file[0])
                }
                this.uploadPic();
            },
            uploadPic() {
                let that = this
                api.getCurrency('papers/upload/images',this.filesImg,{'time': Date.parse(new Date()),'code':'M1'}).then(function (res) {
                    if (parseInt(res.data.status) == 1) {
                        var images = res.data.data?res.data.data.files:[];
                        var fileData = images[0]
                        that.$store.dispatch('change_mine_info', {'headerImg':fileData.fileUri}).then(function () {
                            //赋值
                            that.$store.dispatch('showAlert', '上传成功')

                            var reader = new FileReader()
                            reader.readAsDataURL(that.filesImg[0])
                            reader.onload =function(e){
                                that.selectImg = e.target.result
                            };
                        })
                    }else {
                        that.$store.dispatch('showAlert', res.data.info)
                    }
                })

            },
            postCtrl(index) {
                if (index == 0) {//拍照
                    console.log('拍照')
                } else {//相册
                    console.log('相册')
                }
            },
            sureClick(msg) {
                let that = this
                if (msg == that.userData.name || msg == null || msg == '') {
                    that.isShow = !that.isShow
                    return
                }
                this.$store.dispatch('change_mine_info', {'msg':msg}).then(function () {
                    that.isShow = !that.isShow
                    //赋值
                    that.mineArr[1].tipCount = msg
                    that.name = msg
                })
            },
            getUserData() {
                let that = this
                this.$store.dispatch('get_mine_userData').then(function () {
                    //赋值
                    that.mineArr[0].headImg = that.userData.headerImg
                    that.mineArr[1].tipCount = that.userData.name
                    that.mineArr[2].tipCount = that.userData.userId.toString()
                    that.name = that.userData.name
                })
            },
            cellClick(index) {
                if (index == 0) {//图片
//                    this.showAct = !this.showAct
                  window.document.getElementById('selectPic').click()
                } else if (index == 1) {//昵称
                    this.isShow = !this.isShow
                }
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_info.less';

    #app {
        height: 100%;
        background-color: rgb(245, 245, 245);
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
