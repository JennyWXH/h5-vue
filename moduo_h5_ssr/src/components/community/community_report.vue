<template>
    <div v-title data-title="举报">
        <!--<my-header title="举报" title-color="black" :showDevider=true :showBack=true></my-header>-->
        <div class="content">
            <span @click="selectType(index)" class="select" v-for="(item,index) in arr"
                  :class="item.select?'selectClass':'unselectClass'">{{item.name}}</span>
            <textarea id="commentInput" type="text" maxlength="200" v-model="msg" name=""
                      :placeholder="textable?'':'请输入举报信息...'" :disabled="textable"></textarea>
            <span @click="submit()" class="submit">提交</span>
        </div>
        <my-toast :show="isAlert" :content="alertTitle"></my-toast>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                arr: [{name: '广告', select: false},
                    {name: '色情', select: false},
                    {name: '反动', select: false},
                    {name: '其他原因', select: false},],
                supportType: 0,
                msg: '',
                textable: true,
                selectIndex: 0
            }
        },
        components: {},
        created () {
            let that = this
            this.$store.dispatch('checkLogin').then(function () {
                that.$store.commit('COMMUNITY_DETAILID', {detailId: this.$route.params.detailId})
            },function () {
                that.$router.push('/')
            })
        },
        computed: {
            ...mapGetters({
                isLoading: 'mine_loading',
                isAlert: 'mine_isAlert', //弹窗
                alertTitle: 'mine_alertTitle',//弹窗提示
                heading: 'mine_home_src',
                nickname: 'mine_home_nickname',
                detailId: 'community_detailId'
            })
        },
        methods: {
            selectType(index) {
                this.selectIndex = index
                if (index == 3) {
                    this.textable = false
                } else {
                    this.textable = true
                }
                for (var i = 0; i < this.arr.length; i++) {
                    var item = this.arr[i]
                    if (index != i) {
                        item.select = false
                    } else {
                        item.select = true
                    }
                }
            },
            submit() {
                if (this.selectIndex == 3 && this.msg == '') {
                    this.$store.dispatch('showAlert', '请输入内容')
                    return
                }
                let that = this
                console.log(that.$route.query.userPostTime)
                this.$store.dispatch('community_report_post', {
                    'type': this.selectIndex + 1,
                    'content': that.msg,
                    'relationype': that.$route.query.relationype,
                    'userId': that.$route.query.userId,
                    'relationId': that.detailId,
                    'userPostTime': that.$route.query.userPostTime
                }).then(function () {
                    setTimeout(function () {
                        that.$router.go(-1)
                    }, 2000)
                })
            }
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../css/mine/mine_suggest.less';

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

    .content {
        margin-left: 0.8rem;
        width: 5.9rem;
        height: 5rem;
    }

    .select {
        text-indent: 0.43rem;
        display: inline-block;
        font-size: 0.3rem;
        float: left;
        margin-top: 0.4rem;
        margin-right: 0.8rem;
        /*background: url("../../../static/community/community_report_unselected.png") no-repeat;*/
        background-size: 0.4rem 0.4rem;
        background-position: center left;
    }

    .selectClass {
        background: url("../../../static/community/community_report_selected.png") no-repeat;
        background-size: 0.4rem 0.4rem;
        background-position: center left;
    }

    .unselectClass {
        background: url("../../../static/community/community_report_unselected.png") no-repeat;
        background-size: 0.4rem 0.4rem;
        background-position: center left;
    }

    textarea {
        outline: none;
        display: block;
        resize: none;
        float: left;
        border-radius: 0.1rem;
        border: 0;
        font-size: 0.35rem;
        margin-top: 0.5rem;
        padding: 0.1rem;
        width: 5.7rem;
        height: 3rem;
        background-color: rgb(245, 245, 245);
    }

    .submit {
        color: white;
        width: 100%;
        border-radius: 0.1rem;
        display: inline-block;
        height: 0.6rem;
        line-height: 0.63rem;
        font-size: 0.35rem;
        margin-top: 0.3rem;
        background-color: rgba(61, 202, 153, 1);
    }
</style>