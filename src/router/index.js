import {RouterMount, createRouter} from 'uni-simple-router';
// import home from '@/router/modules/home'
// import user from '@/router/modules/user'
// import shop from '@/router/modules/shop'

import modules from './modules/index.js'

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...modules]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    // debugger
    console.log('beforeEach')
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}
