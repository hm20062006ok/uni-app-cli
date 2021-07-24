import request from '@/utils/request'

export function getUserInfo() {
    return request.get('/userinfo', {}, {login: true})
}