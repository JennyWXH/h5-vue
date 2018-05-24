<template>
    <div v-if="showing" class="loading">
        <div class="alert">
            <img class="back" src="../../assets/community/post_success_back.png" alt="">
            <span class="title">{{title}}</span>
            <div class="bottom">
                <div class="exp">
                    <span class="expText">经验+{{exp}}</span>
                    <img src="../../assets/mine/mine_coin_exp.png" alt="">
                </div>
                <div class="coin">
                    <img src="../../assets/mine/mine_coin_icon.png" alt="">
                    <span class="coinText">呱币+{{coin}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showing: false,
            }
        },
        props: {
            title: {
                type: String,
                default: '发布成功'
            },
            show: {
                type: Boolean,
                default: true
            },
            exp: {
                type: Number,
                default: 1
            },
            coin: {
                type: Number,
                default: 60
            }
        },
        watch: {
            show: function () {
                this.showing = !this.showing
            }
        },
        methods: {
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
        border-radius: 0.1rem;
        top: 35%;
        width: 4.8rem;
        transform: translateX(-50%);
        height: 3.2rem;
        background-color: white;
        overflow: hidden;
        img.back {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }

    .title {
        position: absolute;
        left: 0;
        top: 0.8rem;
        width: 100%;
        color: rgba(57, 57, 70,0.8);
        font-size: 0.5rem;
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
        bottom: 0.5rem;
        width: 100%;
        height: 0.8rem;
    }

    .exp, .coin {
        display: inline-block;
        color: blue;
        line-height: 0.8rem;
        font-size: 0.29rem;
        width: 2.3rem;
        float: left;
        height: 0.8rem;
        img {
            width: 0.5rem;
        }
        span {
            display: inline-block;
            color: rgba(57, 57, 70,0.7);
            font-size: 0.3rem;
            line-height: 0.55rem;
        }
    }
    .exp {
        img {
            float: right;
        }
        span {
            float: right;
            margin-left: 0.1rem;
        }
    }

    .coin {
        margin-left: 0.1rem;
        img {
            float: left;
        }
        span {
            float: left;
            margin-left: 0.1rem;
        }
    }

    }
</style>
