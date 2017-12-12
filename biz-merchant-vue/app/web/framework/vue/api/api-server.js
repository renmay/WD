import axios from 'axios'
import config from './config-server'

export default {
    post(url, data, cookie) {
        return axios({
            method: 'post',
            url: config.api + url,
            data: data,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        }).then(res => {
            return res
        })
    },
    get(url, params, cookie) {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie
            }
        }).then(res => {
            return res
        })
    }
}
