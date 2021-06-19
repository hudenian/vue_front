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

export function addUser(data){
    return post({
        url: url.USER_ADD,
        method:'post',
        data:data
    })
}

export function getUserById(id){
    return get({
        url: url.USER_GET_BY_ID+"/"+id,
        method: 'get'
    })
}

export function modifyUserInfo(data){
    return post({
        url: url.USER_MODIFY,
        method:'post',
        data:data
    })
}

export function deleteUserById(data){
    return post({
        url: url.USER_DELETE,
        method:'post',
        data:data
    })
}
