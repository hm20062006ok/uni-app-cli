<template>
  <view class="root">
    <view class="first">
      <image :src="detail[0].imageArr[0].imgUrl" @click="jump(detail[0].imageArr[0])"></image>
    </view>
    <view class="second">
      <swiper :autoplay="true" :circular="true">
        <swiper-item v-for="(item, index) in detail[1].imageArr" :key="index" >
          <image :src="item.imgUrl" @click="jump(item)"></image>
        </swiper-item>
      </swiper>
      <image :src="detail[2].imageArr[0].imgUrl" @click="jump(detail[2].imageArr[0])"></image>
    </view>
  </view>
</template>

<script>
export default {
  //命名好难
  name: "DuiHuanZhiBoPinPai",
  props: {
    detail: Array
  },
  data() {
    return {
    }
  },
  onLoad(){

  },
  computed: {

  },
  methods: {
    jump(item) {
      this.$Router.push({
        path: item[this.$urlKey]
      })
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  width: 100%;
  height: 575rpx;
  padding-top: 55rpx;
  background-color: white;
  justify-content: space-between;
}
.first {
  height: 520rpx;
}
.first image{
  width: 378rpx;
  height: 520rpx;
}
.second {
  height: 520rpx;
  width: 344rpx;
  display: flex;
  flex-direction: column;
}
.second image{
  width: 344rpx;
  height: 260rpx;
}
.second swiper{
  width: 344rpx;
  height: 260rpx;
}
.tab-container {
  position: absolute;
  bottom: 30rpx;
  right: 16rpx;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  width: 71%;
  color:#E4C371;
  padding:  20rpx 0 4rpx 0;
  align-items: center;
  justify-content: space-between;
  font-size: 32rpx;
}
.separator {
  width: 4rpx;
  height: 28rpx;
  background-color: #E4C371;
  margin-right: 20rpx;
  margin-left: 20rpx
}
</style>