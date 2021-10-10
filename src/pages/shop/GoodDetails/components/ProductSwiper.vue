<template>
  <u-swiper :list="imgUrls" height="750" mode="number" indicator-pos="bottomRight" :circular="true"
            @click="previewImage"></u-swiper>
</template>

<script>
export default {
  name: "ProductSwiper",
  props: {
    imgUrls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    previewImage(index) {
      uni.previewImage({
        current:index,
        urls:  this.imgUrls,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
