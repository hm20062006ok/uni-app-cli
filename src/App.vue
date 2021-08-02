<script>
  import Vue from 'vue'
  import { getUserInfo } from "@/api/user"
  import { updateApplication } from "@/api/public";
  import  { compareVersion }from '@/utils'

	export default {
		onLaunch: function() {
      console.log('app onLaunch')
      // #ifdef APP-PLUS
      this.checkUpdateApplication()
      // #endif

      //#ifdef MP
      this.checkUpdateMP()
      //#endif

      this.setAppInfo()

		},
    methods:{
		  checkUpdateMP() {
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate( result => {

        })

        updateManager.onUpdateReady(result => {
          //todo 1.custom global modal， tips， toast
          //todo 2. i18n
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好， 是否重启应用？',
            success: res => {
              res.confirm || updateManager.applyUpdate()
            }
          })
        })

        updateManager.onUpdateFailed(result => {
          uni.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~， 请您删除当前小程序，重新搜索打开哟~'
          })
        })
      },

      // wgt 热更新
      checkUpdateApplication() {
        plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
          let req = {
            "appid": plus.runtime.appid,
            "versionName":  widgetInfo.version,
            "versionCode": plus.runtime.versionCode,
            "type": plus.os.name === "iOS" ? 1102 : 1101,
          };
          console.log('req',req);
          const thatWidgetInfo =  widgetInfo
          //TODO app整包更新
          updateApplication(req).then(res => {
            console.log('更新接口返回', res)
            if(res.data.versionName && compareVersion(res.data.versionName, thatWidgetInfo.version) > 0){
              // console.log('需要更新')
              if (res.data.downloadUrl) {
                uni.downloadFile({
                  url: res.data.downloadUrl,
                  success: (downloadResult) => {
                    // console.log('downloadResult' + JSON.stringify(downloadResult));
                    if (downloadResult.statusCode === 200) {
                      //TODO 强制更新才执行安装
                      // if (res.data.forceUpdate == 'true') {
                      // }
                      plus.runtime.install(downloadResult.tempFilePath, {
                        force: false
                      }, function() {
                        // console.log('install success...');
                        plus.runtime.restart();
                      }, function(e) {
                        // console.error('install fail...');
                      });
                    }
                  }
                });
              }
            }else{
              // console.log('不需要更新')
            }
          })
        });
      },

		  setAppInfo(){
        console.log('setAppInfo')
        let that = this;
        return new Promise((resolve, reject) => {
          uni.getSystemInfo({
            success: function(e) {

              Vue.prototype.$windowWidth = e.windowWidth;

              //状态栏高度
              Vue.prototype.$customStatusBarHeight = e.statusBarHeight

              // #ifdef H5
              //导航栏高度
              Vue.prototype.$customBarHeight = 48;
              Vue.prototype.$customStatusBarHeight = 14;
              // 状态栏 + 导航栏高度
              Vue.prototype.$topHeight = Vue.prototype.$customStatusBarHeight + Vue.prototype.$customBarHeight;
              // #endif

              // #ifdef APP-PLUS
              if (e.platform === "android") {
                Vue.prototype.$customBarHeight = 48;
                Vue.prototype.$topHeight = e.statusBarHeight + Vue.prototype.$customBarHeight
              }else if( e.platform === 'ios'){
                Vue.prototype.$customBarHeight = 44;
                Vue.prototype.$topHeight = e.statusBarHeight + Vue.prototype.$customBarHeight
              }
              // #endif

              // #ifdef MP-WEIXIN
              let rect = wx.getMenuButtonBoundingClientRect();
              // 导航栏高度： Android/其他平台
              //                                      胶囊与状态栏间隔           * 2 + 胶囊高度
              Vue.prototype.$customBarHeight = (rect.top - e.statusBarHeight) * 2 + rect.height;
              if(e.platform === 'ios'){
                // iOS平台有误差
                Vue.prototype.$customBarHeight = Vue.prototype.$customBarHeight + 4;
              }
              // #endif

              // #ifdef H5
              // TODO
              // #endif
            },
          });
        });
      }
    }
  }
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "@/style/index.scss";
</style>
