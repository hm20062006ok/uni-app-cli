<template>
  <view class="page-container">
    <!-- 轮播 -->
    <ProductSwiper :imgUrls="storeInfo.sliderImageArr"></ProductSwiper>

    <!-- 价格，名称， 规格， 销量-->
    <view class="u-flex-col page-content-with-padding">
      <view class="u-flex u-row-between">
        <view class="u-flex-col">
          <view class="u-flex">
            <text class="text-vip-price">￥{{ storeInfo.vipPrice }}</text>
            <image src="@/static/icons/vipPrice.png" style="width: 55rpx;height: 25rpx"></image>
          </view>
          <text class="text-product-name">{{ storeInfo.storeName }}</text>
        </view>
        <u-icon name="zhuanfa" size="40" style="margin-left: 20rpx"></u-icon>
      </view>
      <view class="u-flex u-row-between text-product-info">
        <text>原价:￥{{ storeInfo.otPrice }}</text>
        <text> 库存:{{ storeInfo.stock }}件</text>
        <text>销量:{{ storeInfo.sales }}件</text>
      </view>
    </view>


    <!-- 规格 -->
    <view class="page-content-with-padding u-flex u-row-between u-margin-top-20">
      <view>
        <text>{{attrText}}</text>
        <text>{{attrValue}}</text>
      </view>
      <u-icon name="arrow-right"></u-icon>
    </view>

    <!-- 评价 -->
    <view class="page-content-with-padding u-flex-col u-margin-top-20" v-if="replyCount > 0">
      <view class="u-flex u-row-between">
        <view>用户评价（{{ replyCount }}）</view>
        <view>
          <text  style="margin-right: 10rpx">{{replyChance}}%好评</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>

      <!-- 单条评论-->
      <xjyp-rate :rate="reply"></xjyp-rate>

    </view>

    <view class="page-content-with-padding u-margin-top-20 u-margin-bottom-20 u-flex u-row-center">
      <text>产品详情</text>
    </view>

    <!-- 商品详情 -->
    <view v-html="storeInfo.description" class="product-details">
    </view>
    <view class="submit-bar">
      <xjyp-submit-bar></xjyp-submit-bar>
    </view>

    <view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>
<script>
import ProductSwiper from "./components/ProductSwiper";
import {getProductDetail} from '@/api/store'
import {mapGetters} from 'vuex'

export default {
  name: 'GoodDetails',
  components: {ProductSwiper},
  computed: {
    ...mapGetters(['isLogin', 'location', 'userInfo']),
    attrText(){
      return this.attrValue === '' ? '请选择：' : '已选择：'
    }
  },
  data() {
    return {
      storeInfo: {
        vipPrice: '',
        storeName: '',
        otPrice: '',
        stock: '',
        sales: '',
      },
      id: '',
      attrValue:'',
      reply: {
      },
      replyCount: ''
    }
  },
  onLoad(options) {
    this.id = this.$Route.query.id
    console.log('onLoad', this.id)
    this.getProductDetailFromApi()
  },
  methods: {
    showToast(title,type,url) {
      this.$refs.uToast.show({
        title,
        type,
        url
      })
    },
    getProductDetailFromApi() {
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      let params = {}
      params.latitude = this.location.latitude
      params.longitude = this.location.longitude
      params.from = this.$deviceType
      if (this.isLogin) {
        Object.assign(params, {uid: this.userInfo.uid})
      }
      getProductDetail(this.id, params).then(res => {
        if(res.data){
          this.storeInfo = res.data.storeInfo
          this.storeInfo.description = this.storeInfo.description.replace(/\<img/gi, '<img style="max-width:100%;height:auto;"')
          this.reply = res.data.reply
          this.replyCount = res.data.replyCount
        }else{
          this.showToast('出错了','error',null)
        }
      }).catch((error) => {
        this.showToast(error.data.msg,'error',null)
      }).finally(() => {
        uni.hideLoading()
      })
    }
  }
}
</script>
<style lang="scss">

@supports (bottom: constant(safe-area-inset-bottom)) {
  .page-container {
    padding-bottom: calc(#{$footerHeight} + constant(safe-area-inset-bottom));
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .page-container{
    padding-bottom: calc(#{$footerHeight} + env(safe-area-inset-bottom));
  }
}
.page-container {
  position: relative;
  min-height: 100%;
}
.page-content-with-padding {
  background-color: white;
  padding: 20rpx 16rpx;
}
.text-vip-price {
  color: red;
  font-size: 44rpx;
}
.text-product-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 8rpx;
}
.text-product-info {
  font-size: 24rpx;
  margin-top: 25rpx;
  color: #82848f;
}
.product-details {
  width: 100% !important;
}

.submit-bar{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right:0;
}
</style>
