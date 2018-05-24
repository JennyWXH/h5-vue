<template>
    <div v-if="showing" class="loading">
        <div :style="{top:showBoard==1?'25%':'35%'}" class="alert">
            <span class="title">{{title}}</span>
            <input v-model="msg" @focus="changeTop(1)" type="text">
            <div class="bottom">
                <a @click="cancel()" class="cancel">取消</a>
                <a @click.stop.prevent="sure()" class="sure">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showBoard: false,
                showing: false,
                msg: ''
            }
        },
        props: {
            title: {
                type: String,
                default: true
            },
            defaultMsg: '',
            show: {
                type: Boolean,
                default: true
            },
            content: {
                type: String,
                default: ''
            }
        },
        watch: {
            show: function () {
                this.showing = !this.showing
            },
            defaultMsg: function (n) {
                this.msg = n
            }
        },
        methods: {
            changeTop(index) {
                this.showBoard = index
            },
            cancel() {
                this.showBoard = 0
                this.showing = false
            },
            sure() {
                this.$emit('SUER', this.msg)
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading {
        z-index: 10001;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 7.5rem;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        /*background-color: transparent;*/
        color: #fff;

    .alert {
        left: 50%;
        position: absolute;
        border-radius: 0.4rem;
        top: 35%;
        width: 4.5rem;
        transform: translateX(-50%);
        height: 2.6rem;
        background-color: white;
        overflow: hidden;
    }

    span {
        margin-top: 0.3rem;
        width: 100%;
        color: black;
        font-size: 0.3rem;
        display: inline-block;
    }

    input {
        font-size: 0.3rem;
        width: 80%;
        display: block;
        margin-left: 10%;
        margin-top: 0.25rem;
        border: 0.01rem solid gainsboro;
        height: 0.4rem;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.8rem;
    }

    .cancel, .sure {
        display: inline-block;
        color: blue;
        line-height: 0.8rem;
        font-size: 0.29rem;
        width: 49.5%;
        float: left;
        height: 0.8rem;
        border-top: 0.005rem solid gainsboro;
    }

    .cancel:active, .sure:active {
        background-color: gainsboro;
        transition: background-color .3s;
        /*background-color: gainsboro;*/
    }

    .cancel {
        border-right: 0.005rem solid gainsboro;
    }

    .sure {
    }

    }
</style>
