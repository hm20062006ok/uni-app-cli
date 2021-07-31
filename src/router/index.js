import {RouterMount, createRouter} from 'uni-simple-router';
import home from './home'
console.log('platform', process.env.VUE_APP_PLATFORM)
const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [home]
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