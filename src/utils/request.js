// #ifdef H5
// h5端
import Fly from 'flyio/dist/npm/fly';
// #endif

// #ifdef APP-PLUS
// app端
import Fly from 'flyio/dist/npm/wx';
// #endif

// #ifdef MP-WEIXIN
import Fly from 'flyio/dist/npm/wx';
// #endif

import { VUE_APP_API_URL } from '@/config';
import cookie from '@/utils/cookie'
// import { handleLoginFailure, getCurrentPageUrl } from "@/utils";
import { mergeObjWithoutOverwriting, handleLoginFailure } from '@/utils'


const fly = new Fly();

//fly配置
fly.config.baseURL = VUE_APP_API_URL
// fly.config.headers = {}
fly.config.timeout = 1000 * 30
fly.config.withCredentials = false      // 跨域请求是否发送第三方cookie

const defaultOptions = {
    login: true, //所有接口默认要求登录
};

// 以下页面发出要求登录才能访问的接口时， 不需要登录
const allowedAccessUrls = ['pages/shop/GoodsClass/index', 'pages/shop/GoodsCon/index']

//添加请求拦截器
fly.interceptors.request.use((request) => {
    const token = cookie.get('login_status');
    mergeObjWithoutOverwriting(request, defaultOptions)
    if (request.login === true ) {
        //如果token不存在（未登录）,中断请求
        //并且当前页面不在白名单，中断请求 TODO 去掉这个逻辑
        // if (!token && allowedAccessUrls.indexOf(getCurrentPageUrl())  < 0){
        if (!token ){
            // 跳转到登录或授权页面
            //TODO handleLoginFailure()
            return Promise.reject({msg: '需要登录', toLogin: true})
        }
        request.headers['Authorization'] = "Bearer" + token
    }
    return request;
});

fly.interceptors.response.use(
    response => {
        const [ data, msg, status ] = [response.data, response.data.msg, response.data.status]
        // debugger
        switch (status) {
            case 200:
                return Promise.resolve(data)
            case 401:
            case 403:
                //TODO handleLoginFailure()
                return Promise.reject({msg, res: response, data, toLogin: true})
            case 500:
                return Promise.reject({ msg: "操作失败", data})
            default:
                return Promise.reject({msg, res: response, data})
        }
    },
    err => {
        // 网络连接失败
        // TODO 根据服务器状态码返回不同状态
        if (err.status === 0) {
            uni.showToast({
                title: '网络连接失败',
                icon: "none",
                duration: 2000
            });

        }
        return Promise.reject({msg: '出现错误' })
    }
);


/**
 * request = {post: function(url,data, options){return Promise},{put: function(){return Promise}} }
 */
const request = ['post', 'put', 'patch', 'get', 'delete', 'head'].reduce((request, method) => {
    /**
     *
     * @param url string
     * @param data any
     * @param options
     * @returns Promise
     */

    request[method] = (url, data = {}, options = {}) => {
        return fly.request(url, data, Object.assign({method}, options))
    }
    return request
}, {})

export default request;




