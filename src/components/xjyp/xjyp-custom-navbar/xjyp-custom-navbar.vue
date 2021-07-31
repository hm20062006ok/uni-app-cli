<template>
  <!-- <view class="top" style="background-image:url('https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/mine-bg1.png?versionId=CAEQDBiBgIC9tobj0BciIGM5MjgzNDMxZDE5MTQxZjc5ODA2NmEwN2E3NTVlOWNk');background-size: cover;"> -->
  <view class="top" :style="{'background-color':backgroundColor}">
    <!-- 状态栏占位-->
    <view class="status-bar" :style="{height: customStatusBarHeight + 'px'}"></view>

    <!-- 导航栏-->
    <view class="navigation-bar" :style="{height:customBarHeight + 'px','background-color':backgroundColor}">
      <image src="@/static/images/navbar_title_logo.png" style="width:1.5rem;height: 1.5rem"></image>
      <!--      <image src="@/static/images/title_logo2.png" mode="heightFix" style="height:28px;"></image>-->
      <view style="font-size: 16px;margin-left: 4px;font-weight: bold;letter-spacing: .1rem" :style="{color: textColor}">湘济优品</view>
    </view>
  </view>
</template>
<script>
export default {
  props:{
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    textColor:{
      type:String,
      default: 'white'
    }
  },
  data() {
    return {
      customBarHeight: this.$customBarHeight,
      customStatusBarHeight: this.$customStatusBarHeight
    };
  }
}
</script>
<style>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  /*background-color: white;*/
}

.status-bar {
  /*background-color: #E6E800;*/
  width: 100%;
}

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>›
