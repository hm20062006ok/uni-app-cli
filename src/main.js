import Vue from 'vue'
import App from './App'
import {VUE_APP_API_URL} from "@/config";

import uView from "uview-ui";
Vue.use(uView);

import store from "@/store";

import schema from "async-validator";

Vue.prototype.$validator = function (rule) {
    return new schema(rule);
};

import {router, RouterMount} from '@/router'

Vue.use(router)
// Vue.component('base-checkbox', {
//     model: {prop: 'checked', event: 'change'},
//     props: {checked: Boolean},
//     template: ` <input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)"> `
// })
// global components
// import './components/index'

// global filters
import * as filters from './filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


Vue.prototype.$VUE_APP_API_URL = VUE_APP_API_URL
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== "production";
Vue.prototype.$platform = uni.getSystemInfoSync().platform

App.mpType = 'app'

Vue.prototype.$urlKey = 'url'


// #ifdef APP-PLUS
Vue.prototype.$deviceType = 'app'
Vue.prototype.$urlKey = 'uniapp_url'
store.dispatch('updateDeviceType', 'app')
// #endif

// #ifdef MP-WEIXIN
Vue.prototype.$deviceType = 'routine'
Vue.prototype.$urlKey = 'wxapp_url'
store.dispatch('updateDeviceType', 'routine')
// #endif

Vue.mixin({
    onLoad() {
        uni.showLoading({
            title: '加载中'
        });
    },
    onReady() {
        // setTimeout(function () {
        uni.hideLoading();
        // }, 2000);
    }
})

const app = new Vue({
    ...App,
    store
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount()
// #endif
