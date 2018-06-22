/**
 * Created by ma on 2017/8/1.
 */
import * as types from './CommonTypes'
export const mutations = {
    [types.NETWORK_STATUS] (state,{network}) {
        state.network = network
    }
}