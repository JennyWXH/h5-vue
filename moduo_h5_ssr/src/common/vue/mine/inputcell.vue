<template>
    <div style="font-size: 0">
        <div class="divider top" v-if="showTopDevider"></div>
        <a @click="goDetail()">
            <img v-if="showImg" class="left" :src="src" alt="">
            <span :style="{left:showImg?'0.8rem':'0.2rem'}" class="title">{{name}}</span>
            <slot name="right">
                <input :type="inputType" :placeholder="placeH">
            </slot>
        </a>
        <div class="divider bottom" v-if="showBottomDevider"></div>
    </div>
</template>
<script>
    export default {
        props: {
            inputType: {
                type: String,
                default: 'Number'
            },
            placeH: {
                type: String,
                default: ''
            },
            src: {
                type: String,
                default: ''
            },
            showImg: {
                type: Boolean,
                default: false
            },
            showTopDevider: {
                type: Boolean,
                default: true
            },
            showBottomDevider: {
                type: Boolean,
                default: true
            },
            name: null
        },
        data() {
            return {
//              a:this.testNum
            }
        },
        methods: {
            goDetail() {
                this.$emit('SELECT_CELL')
            }
        }
    }
</script>
<style lang="less" scoped>
    a {
        position: relative;
        width: 100%;
        height: 0.85rem;
        background-color: white;
        display: inline-block;
    }

    .left, .title, input {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .left {
        left: 0.2rem;
        width: 0.45rem;
        height: 0.45rem;
    }

    .title {
        left: 0.8rem;
        width: 1.8rem;
        text-align: left;
        font-size: 0.29rem;
    }

    input {
        right: 0.1rem;
        width: 5.5rem;
        text-align: right;
        font-size: 0.29rem;
        outline: none
    }

    .divider {
        display: block;
        position: relative;
        float: left;
        width: 7.5rem;
        bottom: 0;
        left: 0rem;
        background-color: rgb(240, 239, 245);
    }

    .top {
        height: 0.015rem;
    }

    .bottom {
        height: 0.02rem;
    }
</style>