import {RouterMount, createRouter} from 'uni-simple-router';
// import home from '@/router/modules/home'
// import user from '@/router/modules/user'
// import shop from '@/router/modules/shop'

import modules from './modules/index.js'
import store from '@/store'
import {getUserInfo} from "@/api/user";

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...modules],
    APP:{
        holdTabbar:true
    },
});

const whiteList = [
    '/pages/home/index',
    '/pages/shop/GoodsClass/index',
    '/pages/user/Login/index',
]

function hasPermission(roles, path){
    if(!roles && roles.length <= 0){
        return false
    }
    return roles.indexOf(role) >= 0
}
function nextOrLogin(roles, toPath,next){
    if(hasPermission(roles, toPath)){
        next()
    }else{
        showToast()
        //await three seconds
        next('/pages/user/Login/index')
    }
}
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if(store.getters.isLogin){
        // next()
        //已登录， 检查权限
        // if(store.getters.roles.length === 0){
        //     //权限拉取未完成
        //     getUserInfo({
        //         token: store.getters.token
        //     }).then((userInfo) => {
        //         nextOrLogin(userInfo.roles, to.path, next)
        //     })
        // }else{
        //     //store中有权限
        //     nextOrLogin(store.getters.roles, to.path, next)
        // }
    }else if(whiteList.indexOf(to.path) !== -1){
        //未登录， 但当前页在白名单
        // next()
    }else{
        //重定向到登录页
        // next('/pages/user/Login/index')
    }
    next()
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}
