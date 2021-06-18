import url from './url'
import { post, get} from './http'
// import { reviseParam } from '../util/util'
import qs from 'qs';

export function login(data) {
    return post({
        url: url.USER_LOGIN,
        method: 'post',
        data: data
    })
}

export function getAllMenus(data) {
    return post({
        url: url.GET_ALL_MENUS,
        method: 'get',
        data: data
    })
}

export function getUserList(data) {
    const params = "?"+qs.stringify(data)
    return get({
        url: url.USER_LIST+params,
        method: 'get'
    })
}
