<template>
    <div id="app">
        <div class="left">
            <button v-for="(item,index) in unselectedArr" @click="addClick(index)">{{item}}</button>
        </div>
        <div class="right">
            <button v-for="(item,index) in selectedArr"  @click="removeClick(index)">{{item}}</button>
        </div>
        <span style="margin-top: 20px" @click="sureBtn">确定</span>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                unselectedArr:['发布时间：文章发布时间'
            ,'稿件标题','作者','编辑','文档ID','总阅读量：', '微信（男）阅读量：', '微信（女）阅读量：', '分享数：', '点赞数：', '传播深度：', '主栏目：', '关联栏目：', '稿件类型：', '客户端地址：', '点击数：', '网页地址：', '点击数：', '头条地址：', '点击数：', '腾讯地址：', '点击数：', '大鱼号地址：', '点击数：', '详细分析报告URL。',],
                selectedArr:[]
            }
        },
        created() {

        },
        methods: {
            addClick:function(index) {
                for(var i=0; i<this.selectedArr.length; i++) {
                    if (this.unselectedArr[index] == this.selectedArr[i]) {
                        return;
                    }
                }
                this.selectedArr.push(this.unselectedArr[index])
            },
            removeClick:function(index) {
                this.selectedArr.splice(index,1);
            },
            sureBtn:function() {
                console.log('提交的数组是',this.selectedArr)
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/css/common.less';
</style>
<style>
    #app {
        min-height: 100%;
        background-color: rgb(245, 245, 245);
        background: url("../../assets/reward/reward_share_back.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 7.5rem;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
    .left {
        width: 45%;
        float: left;
        margin-left: 2%;

    }
    .right {
        width: 45%;
        float: right;
        margin-right: 2%;
    }

    button {
        border: 1px solid wheat;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        display: block;
        width: 100%;
        height: 30px;
    }
    .left button {
        background-color: cornflowerblue;
    }
    .right button {
        background-color: pink;
    }
    span {
        background-color: red;
        float: left;
        margin: 0 auto;
        margin-left: 5%;
        color: white;
        border-radius: 10px;
        line-height: 40px;
        width: 90%;
        font-size: 15px;
        height: 40px;
    }
</style>