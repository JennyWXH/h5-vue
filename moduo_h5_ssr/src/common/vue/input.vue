<template>
    <!--:style="{'bottom':isAlertKeyBoard?'4rem':'0'}"-->
    <div class="bottomInput" id="bottomInputId">
        <textarea type="text" :maxlength="maxlength" v-model="msgWord" name="" :placeholder="placeHol" cols="30"
                  rows="2" @blur="onBlur" @focus="onFocus" @keyup.enter="sendMessge() "
                  :style="{'width':isAlertKeyBoard?'6rem':'7.1rem'}"></textarea>
        <button v-show="isAlertKeyBoard" @click="sendMessge()">{{buttonTitle}}</button>
    </div>
</template>
<style lang="less" scoped>
    .bottomInput {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1rem;
        background-color: white;
        border-top: 0.005rem solid #e2e2e2;

    textarea {
        text-indent: 0.1rem;
        line-height: 0.59rem;
        float: left;
        margin-left: 0.2rem;
        margin-top: 0.2rem;
        border: 0;
        display: block;
        height: 0.59rem;
        font-size: 0.35rem;
        outline: none;
        border: 0.01rem solid gray;
        border-radius: 0.2rem;

    textarea:focus {
        text-indent: 0.55rem;
        background: url("../../assets/Home/placeImg.png") no-repeat 0.05rem 0.1rem;
        background-size: 0.42rem 0.4rem;
    }

    }
    button {
        display: block;
        float: right;
        margin-top: 0.21rem;
        margin-right: 0.1rem;
        background: limegreen;
        border-radius: 0.2rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: white;
        width: 1.1rem;
        height: 0.6rem;
        border: 0;
        outline: none;
    }

    }
</style>
<script>
    export default {
        data() {
            return {
                isAlertKeyBoard: false
            }
        },
        props: {
            msgWord: {
                type: String,
                default: null
            },
            placeHol: {
                type: String,
                default: '写评论...'
            },
            maxlength: {
                type: Number,
                default: 200
            },
            buttonTitle: {
                type: String,
                default: '发送'
            }
        },
        methods: {
            onBlur (val) {
                setTimeout(function () {
                    this.isAlertKeyBoard = false
                    document.getElementById("bottomInputId").style.bottom = 0
                }, 100)
            },
            onFocus (val) {
                this.isAlertKeyBoard = true
                document.getElementById("bottomInputId").style.bottom = '1rem'
            },
        }
    }
</script>