<template>
  <view>
    <ProductSwiper :imgUrls="storeInfo.sliderImageArr"></ProductSwiper>
    <view style="background-color: white;">
      
    </view>
  </view>
</template>
<script>

import ProductSwiper from "./components/ProductSwiper";

export default {
  name: 'GoodDetails',
  components: {ProductSwiper},
  data() {
    return {
      storeInfo: {
        sliderImageArr: [
          "https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/20210829/d40386dcd02c449f912f2e942f40aaed.jpg",
          "https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/20210829/0094a4901855484c9bc8b071d9e33e98.png",
          "https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/20210829/c50d0669c37b4f92bd1b272209961a25.jpg",
          "https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/20210829/3f9676f984734734b5ca423eef201bbb.jpg",
        ]
      }
    }
  }

}
</script>
<style lang="scss">

</style>
