<template>
    <div v-show="showing" class="loading">
        <div class="bottom" :style="{'height':(actionArr.length+1)*0.8+0.1+'rem'}">
            <span @click="functionClick(index)" v-for="(item,index) in actionArr">{{item}}</span>
            <span class="cancel" @click="hide()">取消</span>
        </div>
    </div>
</template>
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
        background: rgba(0, 0, 0, 0.5);
        color: #fff;

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;

    span {
        width: 96%;
        margin: 0 auto;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.3rem;
        text-align: center;
        margin-bottom: 0.1rem;
        border-radius: 0.1rem;
        font-weight: 500;
        display: inline-block;
        background-color: white;
        color: rgb(60, 60, 60);
    }

    .cancel {
        margin-top: 0.1rem;
    }

    }
    }
</style>
<script>
    export default {
        data () {
            return {
                showing: false
            }
        },
        props: {
            actionArr: {
                type: Array,
                default: function () {
                    return ['test']
                }
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            show: function () {
                return this.isShow
            }
        },
        watch: {
            isShow: function () {
                this.showing = !this.showing
            }
        },
        methods: {
            hide() {
                this.showing = false
            },
            functionClick(index) {
                this.$emit('functionWay', index)
            }
        }
    }
</script>
