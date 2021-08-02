<template>
  <view class="banner-swiper-box">
    <swiper class="banner-carousel" circular @change="swiperChange" :autoplay="true" :style={height:heightMine}>
      <swiper-item v-for="(item, index) in detail" :key="index" class="carousel-item">
        <image class="swiper-image" :src="item.pic" @click="goRoll(item)" :style={height:heightMine} lazy-load @load="imageLoaded">
        </image>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  props: {
    detail: {
      type: Array,
      required: true,
      default: []
    }
  },
  data() {
    return {
      heightMine: '375px',
      isLoaded: false
    }
  },
  methods: {
    swiperChange() {

    },
    goRoll(item) {
      this.$Router.pushTab(item[this.$urlKey])
    },
    imageLoaded(event) {
      //只计算一次
      if (!this.isLoaded) {
        this.isLoaded = !this.isLoaded;
        //图片高度/（屏幕宽度/图片宽度）
        this.heightMine = ((event.detail.height / (event.detail.width / this.$windowWidth)).toFixed(2)) + 'px'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner-swiper-box {
  background-color: #ffffff;
  width: 750rpx;
  position: relative;
  .banner-carousel {
    width: 750rpx;
    position: relative;

    .carousel-item {
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-align: center;
    }

    .swiper-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>