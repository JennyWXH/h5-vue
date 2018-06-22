<template>
    <div v-title data-title="发布主题" id="app">
        <my-header title="发布主题" title-color="black" :showDevider=true :showBack=true>
            <div slot="right">
                <span @click="submit" style="font-size: 0.35rem">发帖</span>
            </div>
        </my-header>

        <div class="content">
            <input v-model="title" class="submit" placeholder="标题">
            <textarea id="commentInput" type="text" maxlength="200" v-model="content" name=""
                      placeholder="我也说两句"></textarea>
        </div>

        <div style="margin-bottom: 20px" class="album">
            <div v-if="images.length >0" class="showImg">
                <ul>
                    <li v-for="(image,key) in images">

                        <img :src="image" @click='delImage(key)'/>
                        <a href="#" style="position: absolute;" @click='delImage(key)'>
                            <span class="glyphicon glyphicon-remove"></span>
                        </a>
                    </li>
                    <img class="addPic" src="../../assets/community/community_post_Add.png"  v-on:click="addPic" alt="">
                </ul>
                <!--<button @click="removeImage">移除全部图片</button>-->
            </div>
            <div v-else>
                <img class="addPic" src="../../assets/community/community_post_Add.png"  v-on:click="addPic" alt="">
            </div>
            <input id="selectPic" type="file" @change="onFileChange" multiple style="display: none;">
        </div>


        <!--<div>-->
            <!--<input type="file" @change="upload();" accept="image/*" multiple/>-->
            <!---->
        <!--</div>-->
        <my-confirm @on-confirm="sure" title="温馨提示" v-model="showConfirm"><slot name="default">少了美美的图片哦,确认继续?</slot></my-confirm>
        <my-publish :show="showPublish" title="发布成功" :exp="exp" :coin="coin"></my-publish>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
        <my-loading :show="isLoading" ref="loading"></my-loading>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import publish from 'common/vue/publishSuccess.vue'
    import { Confirm } from 'vux'
    import API from '../../../config/api/API'
    var api = new API();

    export default {
        data() {
            return {
                exp: 0,
                coin: 0,
                showPublish: false, //发帖弹窗

                content: '',
                selectIndex: 0,
                title: '',
                img: null,
                images: [],
                filesImg: [],
                showConfirm: false
            }
        },
        components: {
            'my-confirm': Confirm,
            'my-publish': publish
        },
        created () {

            let that = this
            this.$store.dispatch('checkLogin').then(function () {
            },function () {
                that.$router.push('/')
            })
            this.$store.commit('COMMUNITY_HOME_LOADING', {loading: false})
        },
        computed: {
            ...mapGetters({
                isLoading: 'community_loading',
                isAlert: 'community_isAlert', //弹窗
                alertTitle: 'community_alertTitle',//弹窗提示

                detailId: 'community_detailId'
            })
        },
        methods: {
            submit() {
                if (this.title == '') {
                    this.$store.dispatch('showAlert', '请添加标题')
                    return
                }
                if (this.content == '') {
                    this.$store.dispatch('showAlert', '请添加内容')
                    return
                }
                if (this.images.length == 0) {

                    let that = this
                    this.showConfirm = true;
//                    setTimeout(function () {
//                        that.showConfirm = false;
//                    },2000)
                    return
                }
                this.uploadImage();
            },
            sure() {
                this.uploadImage();
            },
            addPic(e){
                e.preventDefault();
                window.document.getElementById('selectPic').click()
                return false
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
                for(var i=0;i<leng;i++){
                    var reader = new FileReader()
                    reader.readAsDataURL(file[i])
                    vm.filesImg.push(file[i])
                    reader.onload =function(e){
                        vm.images.push(e.target.result)
                    };
                }
            },
            delImage:function(index){
                this.filesImg.shift(index)
                this.images.shift(index)
            },
            removeImage: function(e) {
                this.filesImg = []
                this.images = []
            },
            uploadImage: function() {
                let that = this
                this.$store.commit('COMMUNITY_HOME_LOADING', {loading: true})
                api.getCurrency('papers/upload/images',this.filesImg,{'time': Date.parse(new Date()),'code':'C2'}).then(function (res) {
                    var arr = res.data.data?res.data.data.files:[];
                    var images = [];
                    for (var i=0;i<arr.length;i++) {
                        images.push(arr[i].fileUri)
                    }
                    console.log(images)
                    that.$store.dispatch('postCommunity',{'circled':that.$route.params.id,'title':that.title,'content':that.content,'images':images}).then(function (data) {
                        if(parseInt(data.isAward) == 1) {
                            that.showPublish = true
                            that.exp = data.exp
                            that.coin = data.gungCoin
                        }else {
                            that.$store.dispatch('showAlert', '发布成功')
                        }
                        setTimeout(function () {
                            that.showPublish = false
                            that.$router.go(-1)
                        },2000)
                    })
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>

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

    .content {
        margin-top: 0rem;
        width: 100%;
        height: 5rem;
    }

    .submit {
        color: gray;
        width: 7.1rem;
        padding: 0.2rem;
        border: 0;
        display: inline-block;
        height: 0.4rem;
        line-height: 0.41rem;
        font-size: 0.29rem;
        background-color: white;
    }
    textarea {
        margin-top: 0.02rem;
        outline: none;
        display: block;
        resize: none;
        float: left;
        border-radius: 0.1rem;
        border: 0;
        font-size: 0.31rem;
        padding: 0.2rem;
        width: 7.1rem;
        height: 10rem;
        background-color: white;
    }
    .album {
        float: left;
        margin-top: 0.1rem;
        width: 100%;
        background-color: white;
        img {
            width: 1.45rem;
            height: 1.45rem;
            display: inline-block;
            float: left;
            margin: 0.2rem 0.2rem 0rem 0.2rem;
        }
        .showImg {
            font-size: 0;
            ul {
                list-style: none outside none;
                margin:0;
                padding: 0;
            }
            li {
                display: inline;
                float: left;
            }
        }
    }
</style>
