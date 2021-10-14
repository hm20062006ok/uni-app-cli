<template>
  <view class="u-flex-col u-padding-top-10 u-padding-bottom-10">
    <view class="u-flex">
      <!-- 头像 -->
      <view class="u-flex-col u-margin-right-20">
        <image v-if="rate.avatar" :src="rate.avatar" style="height: 56rpx;width: 56rpx"></image>
        <image v-else src="@/static/images/navbar_title_logo.png" style="height: 56rpx; width: 56rpx"></image>
      </view>
      <view class="u-flex-col ">
        <!-- 昵称 -->
        <text>{{ rate.nickname }}</text>
        <!--评分-->
        <u-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="10" :count=5 v-model="rate.star | starInt"
                :disabled="true" size="18"></u-rate>
      </view>
    </view>
    <!-- 时间， 规格-->
    <view class="u-flex u-margin-top-10"> {{ rate.createTime }}{{ rate.sku }}</view>
    <!-- 评论 -->
    <view class="u-margin-top-10">{{ rate.comment }}</view>
    <!-- 评论图片 -->
    <view class="u-margin-top-20" v-if="rate.picturesArr && rate.picturesArr.length > 0">
      <scroll-view  scroll-x="true" show-scrollbar="false" class="reply-img-container">
        <image class="reply-img-wrapper" v-for="(item, index ) in rate.picturesArr" :key="index" :src="item" @click="preview(item)"></image>
      </scroll-view>
    </view>
    <!-- 商家对评论的回复-->
    <view class="u-margin-top-20 comment" v-if="rate.merchantReplyContent">
      <text style="color: red">店家回复：</text>
      {{rate.merchantReplyContent}}
    </view>
  </view>
</template>
<script>
export default {
  name: 'Rate',
  data() {
    return {}
  },
  props: {
    rate: {
      type: Object,
      default: {
        nickname: '',
        avatar: '',
        comment: '',
        merchantReplyContent:'',
        picturesArr:null
      }
    }
  },
  filters: {
    starInt(star) {
      return parseInt(star)
    }
  },
  methods:{
    preview(currentUrl){
      uni.previewImage({
        urls: this.rate.picturesArr,
        current:currentUrl,
        indicator:'number',
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            //TODO 长按图片的处理
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
  }
}
</script>
<style scoped lang="scss">
.reply-img-container {
  white-space: nowrap;
  width: 100%;
}
.reply-img-wrapper{
  display: inline-block;
  width: 120rpx;
  height: 120rpx;
  margin-right: 20rpx
}
.comment{
  font-size: 26rpx;
  color: #454545;
  background-color: #f7f7f7;
  border-radius: 5rpx;
  padding: 30rpx;
  position: relative;
}
.comment:before {
  content: "";
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-bottom: 20rpx solid #f7f7f7;
  position: absolute;
  top: -20rpx;
  left: 100rpx;
}

</style>
