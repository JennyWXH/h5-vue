/**
 * Created by ma on 2017/8/1.
 */
export const getters = {
    baseImg: state => {
        return state.baseImg
    },
    contentHeight: state => {
        return state.contentHeight
    },
    baseRem: state => {
        return state.baseRem
    },
    pullDownConfig: state => {
        return state.pullDownConfig
    },
    pullUpConfig: state => {
        return state.pullUpConfig
    },
    netWork: state => {
        return state.netWork
    },
    status: state => {
        return state.status
    }
}