<script>
  import Vue from 'vue'
  import { getUserInfo } from "@/api/user"
  import { updateApplication } from "@/api/public";
  import  { compareVersion }from '@/utils/index'

	export default {
		onLaunch: function() {
      console.log('onLaunch')
      //#ifdef APP-PLUS
      this.checkUpdateApplication()
      //#endif

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

      checkUpdateApplication() {
        plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
          let req = {
            "appid": plus.runtime.appid,
            "versionName":  widgetInfo.version,
            "versionCode": plus.runtime.versionCode,
            "type": plus.os.name === "iOS" ? 1102 : 1101,
          };
          // console.log('req',req);
          const thatWidgetInfo =  widgetInfo
          //TODO app整包更新
          updateApplication(req).then(res => {
            // console.log('更新接口返回', res)
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

		  // TODO： 获取不同平台状态栏，导航栏，高度
		  setAppInfo(){
        let that = this;
        return new Promise((resolve, reject) => {
          uni.getSystemInfo({
            success: function(e) {
              Vue.prototype.StatusBar = e.statusBarHeight;
              // #ifdef H5
              Vue.prototype.CustomBar = e.statusBarHeight + 45;
              // #endif

              // #ifdef APP-PLUS
              if (e.platform == "android") {
                Vue.prototype.CustomBar = e.statusBarHeight + 50;
                Vue.prototype.$customStatusBarHeight = e.statusBarHeight;
                Vue.prototype.$customBarHeight = e.statusBarHeight + 10;
              } else {
                Vue.prototype.CustomBar = e.statusBarHeight + 45;
                Vue.prototype.$customStatusBarHeight = e.statusBarHeight;
                Vue.prototype.$customBarHeight = e.statusBarHeight + 10;
              }
              // #endif

              // #ifdef MP-WEIXIN
              let custom = wx.getMenuButtonBoundingClientRect();
              Vue.prototype.Custom = custom;
              Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
              Vue.prototype.$customStatusBarHeight = e.statusBarHeight;
              Vue.prototype.$customBarHeight = (custom.top - e.statusBarHeight) * 2 + custom.height;
              // #endif
            },
          });
        });
      }
    }
  }
</script>

<style lang="less">
	/*每个页面公共css */
  @import "./assets/iconfont/iconfont.css";
  // todo 清理base.less 中无用资源
  @import "./assets/css/base.less";
  @import "./assets/css/reset.less";
  @import "./assets/css/style.less";
</style>
