<template>
  <view class="u-flex-col u-padding-top-10 u-padding-bottom-10">
    <view class="u-flex">
      <view class="u-flex-col u-margin-right-20">
        <image v-if="rate.avatar" :src="rate.avatar" style="height: 56rpx;width: 56rpx"></image>
        <image v-else src="@/static/images/navbar_title_logo.png" style="height: 56rpx; width: 56rpx"></image>
      </view>
      <view class="u-flex-col ">
        <text>{{ rate.nickname  }}</text>
        <u-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="10"  :count=5 v-model="rate.star | starInt" :disabled="true" size="18"></u-rate>
      </view>
    </view>
    <view class="u-flex u-margin-top-10"> {{rate.createTime}}{{rate.sku}}</view>
    <view class="u-margin-top-10">{{ rate.comment }}</view>
  </view>
</template>
<script>
export default {
  name: 'Rate',
  data(){
    return {
    }
  },
  props: {

    rate: {
      type: Object,
      default: {
        nickname: '',
        avatar:'',
        comment: ''
      }
    }
  },
  filters: {
    starInt(star) {
      return parseInt(star)
    }
  },
  mounted() {
    console.log(this.rate)
  }
}
</script>
