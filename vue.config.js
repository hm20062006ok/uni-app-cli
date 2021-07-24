const platforms = Object.freeze({
    APP_PLUS: 'app-plus',
    MP_360: 'mp-360',
    MP_ALIPAY: 'mp-alipay',
    MP_BAIDU: 'mp-baidu',
    MP_KUAISHOU: 'mp-kuaishou',
    MP_QQ: 'mp-qq',
    MP_TOUTIAO: 'mp-toutiao',
    MP_WEIXIN: 'mp-weixin',
    QUICKAPP_NATIVE: 'quickapp-native',
    QUICKAPP_WEBVIEW: 'quickapp-webview',
    QUICKAPP_WEBVIEW_HUAWEI: 'quickapp-webview-huawei',
    QUICKAPP_WEBVIEW_UNION: 'quickapp-webview-union'
})
module.exports = {
    pluginOptions: {
        thirdDevToolsConfig: [
            {
                //微信平台配置
                targetBuildPlatform: platforms.MP_WEIXIN,
                //微信小程序开发工具在系统中的绝对路径
                //windows 系统注意将路径改为双斜杠
                // execPath: 'C:\\path to your\\wechatdevtools',
                //MacOS 默认路径
                execPath: '/Applications/wechatwebdevtools.app/Contents/MacOS',
            },
            {
                targetBuildPlatform: platforms.MP_QQ,
                execPath: '/Applications/qqdevtools.app/Contents/MacOS/',
            }
        ]
    }
}