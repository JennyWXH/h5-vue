<template>
    <div v-if="showEdit">
        <div class="comment-edit-block">
            <div class="title" v-show="showEdit">
                <span class="left" @click="showEditBlock()">取消</span>
                <span class="right" @click="submitMsg()">发送</span>
            </div>
            <textarea id="commentInput" type="text" maxlength="200" v-model="msg" name=""
                      placeholder="写评论..."></textarea>
            <!--<div class="fr" style="margin-right:1.16rem;"><a class="icon-msg" @click="goComment($event)" id="btnGoComment">-->
            <!--<span v-if="dataCommentCount!=0">{{dataCommentCount}}</span></a>-->
            <!--<a class="icon-love" @click="myFavoriteArticle()" :class="{active:dataDetail.isFavorite}"></a>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: ''
            }
        },
        props: {
            showEdit: {
                type: Boolean,
                default: false
            },
            content: {
                type: String,
                default: ''
            }
        },
        methods: {
            showEditBlock() {
                this.msg = ''
                this.$emit('on-textView-hidden')
            },
            submitMsg() {
                this.$emit('on-textView-submit', this.msg)
                this.msg = ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .comment-edit-block {
        z-index: 10001;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*background: rgba(0, 0, 0, 0.5);*/
        background-color: rgb(244, 245, 244);
        font-size: 0;

    /*background-color: white;*/
    .title {
        position: relative;
        float: left;
        height: 0.5rem;
        margin-top: 0.5rem;
        width: 100%;
        background-color: transparent;

    .left, .right {
        font-size: 0.35rem;
        line-height: 0.3rem;
        color: rgba(61, 202, 153, 1);
        text-align: center;
    }

    .left {
        margin-left: 0.5rem;
        float: left;
    }

    .right {
        margin-right: 0.5rem;
        float: right;
    }

    }
    textarea {
        outline: none;
        display: block;
        float: left;
        border-radius: 0.3rem;
        border: 0;
        padding: 0.1rem;
        font-size: 0.35rem;
        margin-top: 0.3rem;
        margin-left: 0.5rem;
        width: 6.3rem;
        height: 4rem;
        background-color: white;
    }

    }
</style>
