<template>
  <view class="content">
    <xjyp-custom-navbar :backgroundColor="navBarBgColor" :textColor="navBarTextColor"></xjyp-custom-navbar>
    <view>
      <xjyp-banner :detail="detail"></xjyp-banner>
    </view>
    <view>
      <category-tabs-component :content="content"></category-tabs-component>
    </view>
    <duihuan-pinpai-zhibo  :detail="duihuan"></duihuan-pinpai-zhibo>
    <view>
      <category-tabs-component :content="content1"></category-tabs-component>
    </view>
    <view>
      <category-tabs-component :content="content1"></category-tabs-component>
    </view>
    <view>
      <category-tabs-component :content="content1"></category-tabs-component>
    </view>
  </view>
</template>

<script>
import XjypCustomNavbar from "@/components/xjyp/xjyp-custom-navbar/xjyp-custom-navbar";
import XjypBanner from "@/components/xjyp/xjyp-banner/xjyp-banner";
import CategoryTabsComponent from "@/pages/home/components/CategoryTabsComponent";

export default {
  components: {CategoryTabsComponent, XjypBanner, XjypCustomNavbar},
  data() {
    return {
      navBarBgColor: 'transparent',
      navBarTextColor: 'white',
      duihuan: [

      ],
      content: {
        type: 'large',
        bgColor: '#9C93C0',
        iconUrl: '/static/images/icon_purple.png',
        items: [
          {
            title: '拼团专区',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          },
          {
            title: '社区爆品',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          },
          {
            title: '限时秒杀',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          }
        ]
      },
      content1: {
        type: 'default',
        bgColor: '#9C93C0',
        iconUrl: '/static/images/icon_purple.png',
        items: [
          {
            title: '拼团专区',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          },
          {
            title: '社区爆品',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          },
          {
            title: '限时秒杀',
            uniapp_url: '/pages/shop/GoodsList/index',
            url: '/goods_list',
            wxapp_url: '/pages/shop/GoodsClass/main'
          }
        ]
      },
      detail: [
        {
          pic: '/static/mock/banner1.png',
          url: '/pages/user/index',
          uniapp_url: '/pages/user/index',
          wxapp_url: '/pages/user/index2'
        },
        {
          pic: '/static/mock/banner@2x.png',
          url: '/pages/user/index',
          uniapp_url: '/pages/user/index',
          wxapp_url: '/pages/user/index2'
        }
      ]
    }
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {},
  onPageScroll(e) {
    let h = this.$customBarHeight + this.$customStatusBarHeight;
    if (e.scrollTop > h) {
      this.navBarBgColor = 'white'
      this.navBarTextColor = 'black'
      uni.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    } else {
      this.navBarBgColor = 'transparent'
      this.navBarTextColor = 'white'
      uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
      })
    }
  },
  onPullDownRefresh() {
    // setTimeout(function (){
    //   uni.stopPullDownRefresh()
    // },2000)
  },
  onReachBottom() {
    console.log('onReachBottom')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
