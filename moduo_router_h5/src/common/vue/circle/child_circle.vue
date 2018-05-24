<template>
    <div class="child_circle" @click="goPerCommunity(item.id)">
        <img v-lazy="baseImgUrl+item.headerImg" alt="">
        <div class="right">
            <span class="name">{{item.name}}</span>
            <span class="content">{{item.desc}}</span>
            <span class="favor">{{item.popularity}}</span>
            <span class="comments">{{item.post}}</span>
        </div>

        <div class="divider" style="margin-top: 0.1rem"></div>
    </div>
</template>
<style lang="less" scoped>
    .child_circle {
        display: inline-block;

    img {
        display: inline-block;
        float: left;
        width: 1rem;
        height: 1rem;
        border-radius: 0.5rem;
        margin: 0.2rem;
    }

    .right {
        float: left;
        width: 6.1rem;

    span {
        display: inline-block;
        float: left;
        text-align: left;
    }

    .name {
        line-height: 0.33rem;
        max-width: 6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 0.4rem;
        font-size: 0.3rem;
        margin-top: 0.2rem;
    }

    .content {
        margin-top: 0.05rem;
        line-height: 0.35rem;
        width: 6.0rem;
        font-size: 0.28rem;
        margin-bottom: 0.1rem;
    }

    .favor {
        height: 0.3rem;
        float: left;
        background: url("../../../assets/community/community_favor.png") no-repeat 0 0;
        background-size: 0.3rem 0.3rem;
        text-indent: 0.35rem;
        line-height: 0.34rem;
        font-size: 0.25rem;
        margin-right: 0.3rem;
    }

    .comments {
        height: 0.3rem;
        float: left;
        background: url("../../../assets/community/community_tiezi.png") no-repeat 0 0;
        background-size: 0.3rem 0.3rem;
        text-indent: 0.35rem;
        line-height: 0.3rem;
        font-size: 0.25rem;
    }

    }
    }
    .divider {
        display: block;
        float: left;
        width: 7.5rem;
        margin-left: -0.1rem;
        height: 0.07rem;
        background-color: #eeeeee;
    }
</style>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {}
        },
        computed: {
            ...mapGetters({
                baseImgUrl: 'baseImg'
            })
        },
        props: {
            item: null,
            type: {
                type: Number,
                default: 0
            }
        },
        methods: {
            goPerCommunity(circleId) {
                this.$router.push({path: '/community/perCommunity/' + circleId})
                this.$emit('pushFinish')
            }
        }
    }
</script>
