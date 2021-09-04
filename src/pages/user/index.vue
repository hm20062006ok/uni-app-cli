<template>
  <view>
    <u-navbar :is-back="false" title="我的" :border-bottom="false">
<!--      <view class="u-flex u-row-center" style="width: 100%;">-->
<!--        <view class=" u-flex u-row-center">-->
<!--          我的-->
<!--&lt;!&ndash;          <u-icon name="camera-fill" color="#000000" size="48"></u-icon>&ndash;&gt;-->
<!--        </view>-->
<!--      </view>-->
    </u-navbar>
    <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <u-avatar :src="pic" size="140"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">15080666393</view>
        <view class="u-font-14 u-tips-color">账号:15080666393</view>
      </view>
<!--      <view class="u-m-l-10 u-p-10">-->
<!--        <u-icon name="scan" color="#969799" size="28"></u-icon>-->
<!--      </view>-->
      <view class="u-m-l-10 u-p-10">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item title="我的订单" value="全部订单">
        </u-cell-item>
        <u-cell-item  :arrow="false">

        </u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="我的推广"></u-cell-item>
        <u-cell-item icon="photo" title="地址管理"></u-cell-item>
        <u-cell-item icon="coupon" title="收藏商品"></u-cell-item>
        <u-cell-item icon="heart" title="我的足迹"></u-cell-item>
        <u-cell-item icon="heart" title="联系客服"></u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="setting" title="设置"></u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pic:'https://uviewui.com/common/logo.png',
      show:true
    }
  },
  onLoad() {

  },
  methods: {

  }
}
</script>

<style lang="scss">
page{
  background-color: #ededed;
}

.camera{
  width: 54px;
  height: 44px;

  &:active{
    background-color: #ededed;
  }
}
.user-box{
  background-color: #fff;
}
</style>
