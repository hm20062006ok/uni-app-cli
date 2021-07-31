import Vue from 'vue'
import App from './App'

import store from "./store";
import schema from "async-validator";
import {router,RouterMount} from '@/router'  //路径换成自己的
Vue.use(router)

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== "production";
App.mpType = 'app'

Vue.prototype.$validator = function(rule) {
  return new schema(rule);
};
const app = new Vue({
  ...App,
  store
})

// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount()
// #endif
