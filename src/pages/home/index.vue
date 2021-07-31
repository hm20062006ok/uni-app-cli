<template>
	<view class="content">
    <xjyp-custom-navbar :backgroundColor="navBarBgColor" :textColor="navBarTextColor"></xjyp-custom-navbar>
	</view>
</template>

<script>
  // import CustomNavbar from "@/components/CustomNavbar";
	export default {
	  components: {
      // CustomNavbar
    },
		data() {
			return {
        navBarBgColor: 'transparent',
        navBarTextColor: 'white',
			}
		},
    onLoad() {
      // console.log('this.$customBarHeight',this.$customBarHeight)
      // console.log('this.$customStatusBarHeight',this.$customStatusBarHeight)
		},
    onReady(){
      console.log('onReady')
    },
		methods: {

		},
    onPullDownRefresh(){
		  setTimeout(function (){
        uni.stopPullDownRefresh()
      },2000)
    },
    onReachBottom(){
      console.log('onReachBottom')
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.content {
    //margin-top: 88px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
