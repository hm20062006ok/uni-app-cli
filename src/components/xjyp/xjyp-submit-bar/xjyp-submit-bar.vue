<template>
	<view class="navigation">
		<view class="left">
      <view class="item" @click="this.$Router.pushTab('/pages/home/index')">
        <u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">首页</view>
      </view>
			<view class="item" @click="favoriteChange()">
        <u-icon name="heart-fill" :size="40" color="red"  v-if="isFavouriteLocal"></u-icon>
        <u-icon name="heart" :size="40" :color="$u.color['contentColor']"v-else></u-icon>
        <view class="text u-line-1">收藏</view>
			</view>
			<view class="item car" @click="this.$Router.pushTab('/pages/shop/index')">
				<u-badge class="car-num" :count="cartNumber" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="addToCart()">加入购物车</view>
			<view class="buy btn u-line-1" @click="shopingNow()">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
  name:'SubmitBar',
  props:{
    isFavourite: {
      default: true,
      type:Boolean
    },
    cartNumber: {
      default: '2',
      type:String
    }
  },
  data(){
    return {
      isFavouriteLocal: this.isFavourite
    }
  },
  methods: {
    favoriteChange(){

    },
    addToCart(){

    },
    shopingNow(){

    }
  }

};
</script>

<style lang="scss" scoped>
.navigation {
	display: flex;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
  //height: $footerHeight;
  /*height: calc($footerHeight + constant(safe-area-inset-bottom));*/
  //height: calc($footerHeight + env(safe-area-inset-bottom));
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}

@supports (bottom: constant(safe-area-inset-bottom)) {
  .navigation {
    height: calc(#{$footerHeight} + constant(safe-area-inset-bottom));
    padding-bottom: constant(safe-area-inset-bottom);
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .navigation{
    height: calc(#{$footerHeight} + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
  }
}

</style>
