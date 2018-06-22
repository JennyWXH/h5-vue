/**
 * Created by ma on 2017/8/1.
 */
export const actions = {
    checkLogin({}) {
        return new Promise(function (resolve,reject) {
            if (window.localStorage.userId == null) {
                reject()
            }else {
                resolve()
            }
        })
    },
    logoutLogin({}) {
        return new Promise(function (resolve) {
            window.localStorage.removeItem('userId')
            resolve()
        })
    }
}