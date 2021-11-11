<template>
<view>
  <view class="window" :class="{ on: value }">
    <view class="close-container">
      <u-icon name="close" color="#e3e3e3" size="36" @click="close"></u-icon>
    </view>
    <slot/>
  </view>
  <view class="mask" @touchmove.prevent  @click="close" :class="{ on: value }"></view>
</view>
</template>

<script>
export default {
  name: "xjyp-bottom-window",
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: Boolean
  },
  data(){
    return {
      on: this.value
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>
.close-container {
  padding: 10rpx 12rpx 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.window {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: #fff;
  z-index: 999;
  border-radius: 16rpx 16rpx 0 0;
  padding-bottom: 40rpx;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9)
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.5);
  /*transform: translate3d(0, 100%, 0);*/
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.on {
  transform: translate3d(0, 0, 0);
}

@supports (bottom: constant(safe-area-inset-bottom)) {
  .window {
    padding-bottom: calc(40rpx + constant(safe-area-inset-bottom));
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .window{
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  }
}
</style>
