<template>
<view class="root">
  <view class="header-text">
    <view class="recommend">RECOMMEND</view>
    <view class="today">' 今日推荐 '</view>
  </view>
  <view class="scroll-list-container">
    <view class="scroll-view_H" >
      <view class="item-wrapper" v-for="(goods, index) in newsData" :key="index"  @click="routerGo(goods)">
        <view class="item">
          <image class="product-picture" :src="goods.image"></image>
          <view class="product-text">
            <text class="product-title">{{goods.storeName}}</text>
            <view class="product-price">
              <text class="product-price-now">{{goods.vipPrice}}</text>
              <text class="product-price-del">{{goods.price}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
export default {
  name: "TodayRecommend",
  props: {
    newsData: ''
  },
  methods: {
    routerGo(item) {
      this.$Router.push({
        path: '/pages/shop/GoodsCon/index',
        query: {
          id: item.id
        }
      });
    },
  }
}
</script>

<style scoped>

.root {

}
.product-picture {
  height: 240rpx;
  width: 100%;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.product-text{
  overflow: hidden;
  padding:24rpx 18rpx 21rpx 18rpx;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-title {
  align-self: start;
  font-size: 23rpx;
  line-height: 23rpx;
}
.product-price {
  align-items: center;
  display: flex;
  margin-top: 23rpx;
  line-height: 18rpx;
}
.product-price-now {
  font-size: 30rpx;
  line-height: 30rpx;
  color: red;
}

.product-price-now :before{
  content: '￥';
  font-size: 23rpx;
  color:#C65657;
}
.product-price-del {
  font-size: 20rpx;
  line-height: 20rpx;
  margin-left: 26rpx;
  text-decoration: line-through;
}
.item {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.item-wrapper {
  margin-top: 5rpx;
  display: inline-block;
  width: 33.3%;
  padding-left: 5rpx;
  padding-right: 5rpx;
}
.scroll-view_H {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
  width: 100%;
}
.scroll-list-container{
  width: 100%;
}
.header-text {
  position: relative;
  padding: 47rpx 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 166rpx;
}
.recommend {
  display: block;
  font-weight: bold;
  color: #e7cf80;
  font-size: 50rpx;
  letter-spacing: .2rem;
  background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(231, 207, 128, 100)), to(rgba(255, 255, 255, 0)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.today {
  margin-top: -30rpx;
  font-weight: bold;
  color:#000000;
  font-size: 32rpx;
  line-height: 54rpx;
  letter-spacing: .1rem;
}
</style>