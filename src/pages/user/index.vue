<template>
  <view>
    <u-navbar :is-back="false" title="我的" :border-bottom="false">
    </u-navbar>
    <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <u-avatar :src="pic" size="140"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">15080666393</view>
        <view class="u-font-14 u-tips-color">账号:15080666393</view>
      </view>
      <view class="u-m-l-10 u-p-10">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item title="我的订单" value="全部订单" @click="showToast('全部订单')">
        </u-cell-item>
        <u-cell-item  :arrow="false" hover-class="none">
          <view style="display: flex;flex-direction: row">
            <view style="flex:1"  @click="showToast('待付款')">
              <view style="display: flex;flex-direction: column;align-items: center">
                <u-icon name="rmb-circle-fill" color="orange" size="50" label="待付款" label-pos="bottom" margin-top="18"></u-icon>
              </view>
            </view>
            <view style="flex:1"  @click="showToast('待发货')">
              <view style="display: flex;flex-direction: column;align-items: center">
                <u-icon name="car" color="orange" size="50" label="待发货" label-pos="bottom" margin-top="18"></u-icon>
              </view>
            </view>
            <view style="flex:1"  @click="showToast('待收货')">
              <view style="display: flex;flex-direction: column;align-items: center">
                <u-icon name="order" color="orange" size="50" label="待收货" label-pos="bottom" margin-top="18"></u-icon>
              </view>
            </view>
            <view style="flex:1"  @click="showToast('待评价')">
              <view style="display: flex;flex-direction: column;align-items: center">
                <u-icon name="order" color="orange" size="50" label="待评价" label-pos="bottom" margin-top="18"></u-icon>
              </view>
            </view>
            <view style="flex: 1"  @click="showToast('售后/退款')">
              <view style="display: flex;flex-direction: column;align-items: center">
                <u-icon name="server-man" color="orange" size="50" label="售后/退款" label-pos="bottom" margin-top="18"></u-icon>
              </view>
            </view>
          </view>
        </u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="我的推广" @click="gotoMinePage"></u-cell-item>
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

    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      pic:'https://xjyp.oss-cn-guangzhou.aliyuncs.com/xjyp-wx/20210505/323c38fee25447c5afc77821deda4f6b',
    }
  },
  onLoad() {
  },
  methods: {
    gotoMinePage(){
      this.$Router.push({path: '/pages/user/MyTeam/index'})
    },
    showToast(msg) {
      this.$refs.uToast.show({
        title: msg,
        type: 'success'
      })
      // url: '/pages/user/MyOrder/index'
      this.$Router.push({path: '/pages/user/MyOrder/index'})
    }
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
