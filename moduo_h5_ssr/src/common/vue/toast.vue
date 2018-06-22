<template>
    <div v-show="show" class="loading">
        <span class="load-box" v-html="content">
            <!--{{content}}-->
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: true
            },
            content: {
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
        /*background: rgba(0, 0, 0, 0.5);*/
        background-color: transparent;
        color: #fff;

    .load-box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
        border-radius: 0.1rem;
        padding: 0.1rem 0.2rem 0.1rem 0.2rem;
        font-size: 0.3rem;
        width: auto;
        height: auto;
        background-color: #333333;
    }

    }
</style>
