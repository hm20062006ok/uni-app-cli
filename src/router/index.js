import {RouterMount, createRouter} from 'uni-simple-router';
import home from './home'
import user from './user'
import shop from './shop'

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [home, user,shop]
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