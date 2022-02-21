import Vue from "vue"
import Vuex from "vuex"
import cookie from '@/utils/cookie'
import { getUserInfo } from '@/api/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production";
const loginKey = "login_status";

const vuexStore = new Vuex.Store({
    state: {
        isAuthorizationPage: false,
        isAuthorization: false,
        token: cookie.get(loginKey) | null,
        userInfo: cookie.get('userInfo'),
        phone: cookie.get('phone'),
        deviceType: null,
        location: {
            latitude: '',
            longitude: ''
        },
        storeItems: cookie.get("storeItems") || null,
        goName: cookie.get("goName") || "",
        //路由到底部tabs页面时传递的参数
        tabsQuery:''
    },
    getters: {
        isAuthorizationPage: state => state.isAuthorizationPage,
        isAuthorization: state => state.isAuthorization,
        token: state => state.token,
        // !! 转换为布尔值
        isLogin: state => !!state.token,
        userInfo: state => state.userInfo || {},
        location: state => state.location,
        storeItems: state => state.storeItems,
        goName: state => state.goName,
        $deviceType: state => state.$deviceType,
        phone: state => state.phone,
        tabsQuery: state => state.tabsQuery
    },
    mutations: {
        tabsQuery(state,querys){
            state.tabsQuery = querys;
        },
        login(state, token, expires_time) {
            state.token = token;
            cookie.set(loginKey, token, expires_time);
        },
        logout(state) {
            state.token = null;
            state.userInfo = null
            cookie.clearAll()
        },
        backgroundColor(state, color) {
            state.color = color;
        },
        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo;

            if (userInfo) {
                cookie.set('userInfo', userInfo)
            } else {
                cookie.set('userInfo', null)
            }
        },
        updateAuthorizationPage(state, isAuthorizationPage) {
            state.isAuthorizationPage = isAuthorizationPage;
        },
        updateAuthorization(state, isAuthorization) {
            state.isAuthorization = isAuthorization;
        },
        'UPDATE_DEVICE_TYPE': (state, deviceType) => {
            state.deviceType = deviceType;
        },
        setLocation(state, location) {
            state.location = location
        },
        get_store(state, storeItems) {
            state.storeItems = storeItems;
            cookie.set("storeItems", storeItems);
        },
        get_to(state, goName) {
            state.goName = goName;
            cookie.set("goName", goName);
        }
    },
    actions: {
        getLocation({ commit}) {
            uni.getLocation({
                type: 'gcj02',
                success: function (result) {
                    commit('setLocation',{
                        longitude: result.longitude,
                        latitude: result.latitude,
                    })
                }
            })
        },

        userInfo({ state, commit}, force){
            if (stat.phone == null) {
                return Promise.resolve(state.phone)
            }

            if(state.userInfo !== null && !force){
                return Promise.resolve(state.userInfo)
            }

            return new Promise(resolve => {
                getUserInfo().then(res => {
                    commit('updateUserInfo', res.data);
                    resolve(res.data)
                }).catch(() => {
                    uni.showToast({
                        title: '获取用户信息失败',
                        icon: 'none',
                        duration: 2000,
                    })
                })
            })
        },
        updateDeviceType({ commit },  deviceType ) {
            commit('UPDATE_DEVICE_TYPE', deviceType)
        }
    },
    strict: debug
})

export default vuexStore
