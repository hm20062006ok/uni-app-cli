<template>
  <view>
    <view class="root1" v-if="content.type === 'large'">
      <image src="@/static/images/bg_discout.png" style="width: 100%;height:186rpx" @load="imageLoaded"></image>
      <view class="tab-container1" :style={height:tabHeight}>
        <view style="display: flex;flex-direction: row;align-items: center">
          <template v-for="(item, index) in content.items">
            <view @click="jump(item.url)">{{ item.title }}</view>
            <view class="separator1" v-if="content.items.length - index > 1"></view>
          </template>
        </view>
        <!--            <image class="right-arrow" src="/static/images/icon_arrow_right.png"></image>-->
      </view>
    </view>

    <view class="root" v-if="content.type === 'default'">
      <view class="container" :style="{ backgroundColor:content.bgColor }">
        <image class="left-doll" :src="content.iconUrl"></image>
        <view class="tabs">
          <template v-for="(item, index) in content.items">
            <view @click="jump(item.url)">{{ item.title }}</view>
            <view class="separator" v-if="content.items.length - index > 1"></view>
          </template>
        </view>
        <!--      <image class="right-arrow" src="/static/images/icon_arrow_right.png"></image>-->
      </view>
    </view>

  </view>

</template>

<script>
export default {
  name: "CategoryTabsComponent",
  props: {
    content: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      heightMine: '',
      heightNumber: 0
    }
  },
  computed: {
    tabHeight() {
      return (this.heightNumber * 0.4) + 'px'
    }
  },
  methods: {
    jump(path) {
      this.$Router.push({
        path
      });
    },
    imageLoaded(event) {
      this.heightNumber = ((event.detail.height / (event.detail.width / this.$windowWidth)).toFixed(2))
      this.heightMine = this.heightNumber + "px"
    }
  }
}
</script>

<style scoped>
.root1 {
  position: relative;
}

.tab-container1 {
  position: absolute;
  bottom: 30rpx;
  right: 16rpx;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  width: 71%;
  color: #E4C371;
  padding: 20rpx 0 4rpx 0;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
}

.separator1 {
  width: 4rpx;
  height: 20rpx;
  background-color: #E4C371;
  margin-right: 20rpx;
  margin-left: 20rpx
}


.root {
  height: 96rpx;
  width: 100%;
  padding-top: 16rpx;
}

.container {
  box-sizing: border-box;
  height: 80rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10rpx;
  padding-left: 27rpx;
  /*background-color: #E08F96;*/
  border-bottom-right-radius: 20rpx;
}

.left-doll {
  width: 81rpx;
  height: 96rpx;
  align-self: flex-end;
}

.right-arrow {
  width: 34rpx;
  height: 34rpx;
  display: block;
}

.tabs {
  padding: 0 50rpx;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-size: 28rpx;
}

.separator {
  width: 2rpx;
  height: 20rpx;
  background-color: white;
  margin-right: 35rpx;
  margin-left: 35rpx
}
</style>