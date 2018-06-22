<template>
    <div v-show="show" class="loading app-content">
        <div class="load-box" :style="{backgroundColor: type==0?'':'#333333'}">
            <div v-if="type==0">
                <div class="default">
                    <img src="../../assets/default.png" alt="">
                </div>
                <!--<span class="fontSizeDef">{{title}}</span>-->
            </div>
            <div v-if="type==1">
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
                <span>{{title}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            replace: true,
            title: {
                type: String,
                default: '正在加载中'
            },
            show: {
                type: Boolean,
                default: true
            },
            type: {
                type: Number,
                default: 0
            },
            imgName: {
                type: String,
                default: ''
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
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        color: #fff;

    .load-box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
        border-radius: 0.1rem;
        width: 2.2rem;
        height: 2.2rem;

    }

    }
    .default {
        font-size: 0;

    img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        position: relative;
        margin: 0.35rem auto;
        animation: imgAniate 1s infinite linear;
    }

    }
    @-webkit-keyframes imgAniate {
        0% {
            -webkit-transform: scale(1.3) rotate(0deg)
        }
        50% {
            -webkit-transform: scale(0.8) rotate(180deg)
        }
        100% {
            -webkit-transform: scale(1.3) rotate(360deg)
        }
    }

    span {
        width: 100%;
        display: inline-block;
        color: #fff8ee;
        font-size: 0.35rem;
    }

    .fontSizeDef {
        font-size: 0.3rem;
    }

    .spinner {
        width: 0.8rem;
        height: 0.8rem;

        position: relative;
        margin: 0.25rem auto;
    }

    .double-bounce1 {
        background-color: #00e079;
    }

    .double-bounce2 {
        background-color: #00e500;
    }

    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: bounce 2.0s infinite ease-in-out;
        animation: bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes bounce {
        0%, 100% {
            -webkit-transform: scale(0.0)
        }
        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
</style>
