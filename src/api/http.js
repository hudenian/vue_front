import Axios from 'axios'

let axiosIns = Axios.create({
    timeout: 30 * 1000
})
axiosIns.defaults.baseURL = 'http://localhost:4321/api/';
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.responseType = 'json'
axiosIns.defaults.validateStatus = function () {
    return true
}
//config 就是请求对象
axiosIns.interceptors.request.use(config => {
    console.log(config);
    config.headers.authorization = window.sessionStorage.getItem('token');
    return config;
})

export default {
    axiosIns
}

/**post请求方法
 * @param options
 * @return {Promise}
 */
export function post(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**get请求方法
 * @param options
 * @return {Promise}
 */
export function get(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**patch请求方法
 * @param options
 * @return {Promise}
 */
export function patch(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**put请求方法
 * @param options
 * @return {Promise}
 */
export function put(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**delete请求方法
 * @param options
 * @return {Promise}
 */
export function deleted(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
