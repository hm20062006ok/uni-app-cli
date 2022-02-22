<template>
  <view class="page-container">
    <!-- 轮播 -->
    <ProductSwiper :imgUrls="storeInfo.sliderImageArr"></ProductSwiper>

    <!-- 价格，名称， 规格， 销量-->
    <view class="u-flex-col page-content-with-padding">
      <view class="u-flex u-row-between">
        <view class="u-flex-col">
          <view class="u-flex">
            <text class="text-vip-price">￥{{ storeInfo.vipPrice }}</text>
            <image src="@/static/icons/vipPrice.png" style="width: 55rpx;height: 25rpx"></image>
          </view>
          <text class="text-product-name">{{ storeInfo.storeName }}</text>
        </view>
        <u-icon name="zhuanfa" size="40" style="margin-left: 20rpx"></u-icon>
      </view>
      <view class="u-flex u-row-between text-product-info">
        <text>原价:￥{{ storeInfo.otPrice }}</text>
        <text> 库存:{{ storeInfo.stock }}件</text>
        <text>销量:{{ storeInfo.sales }}件</text>
      </view>
    </view>


    <!-- 规格 -->
    <view class="page-content-with-padding u-flex u-row-between u-margin-top-20" @click="showWindow = true">
      <view class="u-flex">
        <text>{{ attrText }}</text>
        <text class="u-line-1">{{ attrValue }}</text>
      </view>
      <u-icon name="arrow-right"></u-icon>
    </view>

    <!-- 评价 -->
    <view class="page-content-with-padding u-flex-col u-margin-top-20" v-if="replyCount > 0">
      <view class="u-flex u-row-between">
        <view>用户评价（{{ replyCount }}）</view>
        <view>
          <text style="margin-right: 10rpx">{{ replyChance }}%好评</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>

      <!-- 单条评论-->
      <xjyp-rate :rate="reply"></xjyp-rate>

    </view>

    <view class="page-content-with-padding u-margin-top-20 u-margin-bottom-20 u-flex u-row-center">
      <text>产品详情</text>
    </view>

    <!-- 商品详情 -->
    <view v-html="storeInfo.description" class="product-details">
    </view>
    <view class="submit-bar">
      <xjyp-submit-bar :isFavourite.sync="isFavourite" :cartNumber.sync="cartNumber" @onAddToCart="onAddToCart"
                       @onShoppingNow="onShoppingNow"></xjyp-submit-bar>
    </view>

    <BottomWindow v-model="showWindow">
      <template>
        <view class="u-flex-col u-margin-top-20 u-padding-left-20 u-padding-right-20" style="width: 100%">
          <!-- 商品图 选中商品名  价格 库存-->
          <view class="u-flex">
            <image class="product-img" :src="currentSku.image" ></image>
            <view class="u-flex-col u-margin-left-20 u-flex-1 u-line-1">
              <text class="u-font-xl u-line-1">{{ currentSku.sku}}</text>
              <view class="u-flex u-margin-top-40">
                <view class="u-font-xl">¥{{currentSku.vipPrice}}</view>
                <view class="u-font-sm u-tips-color u-margin-left-10">库存：{{currentSku.stock}}</view>
              </view>
            </view>
          </view>

          <!-- sku-->
          <view class="u-flex-col" style="max-height: 30vh;overflow: scroll;">
            <u-tag v-for="(item) in sku"
                   @click="selectSKU(item)"
                   border-color="#000000"
                   class="u-margin-top-16"
                   :key="item.id"
                   :text="item.sku"
                   :bg-color="currentSku.id === item.id ? 'red': 'white'"
                   :color="currentSku.id === item.id ? 'white': 'black'"
                   :mode="currentSku.id === item.id ? 'dark': 'plain'" >
            </u-tag>
          </view>

          <!--  数量选择-->
          <view class="u-flex-col u-margin-top-20">
            <view class="u-font-xl u-tips-color">数量</view>
            <xjyp-number-input class="u-margin-top-20" v-model="quantity" max="9" min="1"></xjyp-number-input>
          </view>

          <!-- 加入购物车 ，立即购买-->
          <view class="btn-group u-row-between ">
            <view class="cart btn u-line-1" @click="onAddToCart()">加入购物车</view>
            <view class="buy btn u-line-1" @click="onShoppingNow()">立即购买</view>
          </view>

        </view>
      </template>
    </BottomWindow>
    <!-- Toast-->
    <view>
      <u-toast ref="uToast"/>
    </view>
  </view>
</template>
<script>
import ProductSwiper from "./components/ProductSwiper";
import BottomWindow from "@/components/xjyp/xjyp-bottom-window/xjyp-bottom-window.vue";
import {getProductDetail} from '@/api/store'
import {mapGetters} from 'vuex'

export default {
  name: 'GoodDetails',
  components: {
    ProductSwiper,
    BottomWindow
  },
  computed: {
    ...mapGetters(['isLogin', 'location', 'userInfo']),
    attrText() {
      return this.attrValue === '' ? '请选择：' : '已选：'
    },
    attrValue(){
      return this.currentSku.sku
    }
  },
  data() {
    return {
      // 多规格id 1266
      quantity:1,
      sku:[],
      currentSku:{},
      count: 1,
      msg: '',
      showWindow: false,
      isFavourite: false,
      cartNumber: 0,
      storeInfo: {
        vipPrice: '',
        storeName: '',
        otPrice: '',
        stock: '',
        sales: '',
      },
      id: '',
      reply: {},
      replyCount: '',
      replyChance: ''
    }
  },

  onLoad(options) {
    this.id = this.$Route.query.id
    console.log('onLoad', this.id)
    this.getProductDetailFromApi()
  },
  mounted() {
    //TODO  去掉隐藏返回箭头
    var a = document.getElementsByClassName('uni-page-head-hd')[0]
    a.style.display = 'none';
  },
  methods: {
    selectSKU(sku){
      this.currentSku = sku
    },
    onAddToCart() {
      console.log('添加到购物车')
      // this.descartes([['a','b','c'],['1','2']])
      let names = ["iPhone X", "iPhone XS"]

      let colors = ["黑色", "白色"]

      let storages = ["64g", "256g"]
      for (let i = 0; i < names.length; i++) {
        let tempArr = []
        let temp = {}
        tempArr.push(

        )
      }
    },

    descartes(list) {
      // parent 上一级索引;count 指针计数
      let point = {}; // 准备移动指针
      let result = []; // 准备返回数据
      let pIndex = null; // 准备父级指针
      let tempCount = 0; // 每层指针坐标
      let temp = []; // 组装当个 sku 结果

      // 一：根据参数列生成指针对象
      for (let index in list) {
        if (typeof list[index] === 'object') {
          point[index] = {parent: pIndex, count: 0};
          pIndex = index;
        }
      }
      console.log('添加到购物车')
      // 单维度数据结构直接返回
      if (pIndex === null) {
        return list;
      }


      // 动态生成笛卡尔积
      while (true) {
        // 二：生成结果
        let index;
        for (index in list) {
          tempCount = point[index].count;
          temp.push(list[index][tempCount]);
        }
        // 压入结果数组
        result.push(temp);
        temp = [];

        // 三：检查指针最大值问题，移动指针
        while (true) {
          if (point[index].count + 1 >= list[index].length) {
            point[index].count = 0;
            pIndex = point[index].parent;
            if (pIndex === null) {
              return result;
            }
            // 赋值 parent 进行再次检查
            index = pIndex;
          } else {
            point[index].count++;
            break;
          }
        }
      }
    },


    onShoppingNow() {
      console.log('立即购买')
    },
    showToast(title, type, url) {
      this.$refs.uToast.show({
        title,
        type,
        url
      })
    },

    getProductDetailFromApi() {
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      let params = {}
      params.latitude = this.location.latitude
      params.longitude = this.location.longitude
      params.from = this.$deviceType
      if (this.isLogin) {
        Object.assign(params, {uid: this.userInfo.uid})
      }
      getProductDetail(this.id, params).then(res => {
        if (res.data) {
          this.storeInfo = res.data.storeInfo
          this.storeInfo.description = this.storeInfo.description.replace(/\<img/gi, '<img style="max-width:100%;height:auto;"')
          // res.data.procuctValue  是一个对象
          let skuArr = []
          Object.keys(res.data.productValue).forEach((key) => {
            skuArr.push(
              res.data.productValue[key]
            )
          })
          this.sku = skuArr
          this.currentSku = this.sku[0]
          // TODO 使用上面的算法生成
          this.reply = res.data.reply
          this.replyCount = res.data.replyCount
          this.replyChance = res.data.replyChance
        } else {
          this.showToast('出错了', 'error', null)
        }
      }).catch((error) => {
        this.showToast(error.data.msg, 'error', null)
      }).finally(() => {
        uni.hideLoading()
      })
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">

.btn-group {
  width: 80%;
  margin:40rpx auto 0 auto;
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
::-webkit-scrollbar {
  display: none;
}
.product-img {
  width: 160rpx;
  height: 160rpx;
}
@supports (bottom: constant(safe-area-inset-bottom)) {
  .page-container {
    padding-bottom: calc(#{$footerHeight} + constant(safe-area-inset-bottom));
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .page-container {
    padding-bottom: calc(#{$footerHeight} + env(safe-area-inset-bottom));
  }
}

.page-container {
  position: relative;
  min-height: 100%;
}

.page-content-with-padding {
  background-color: white;
  padding: 20rpx 16rpx;
}

.text-vip-price {
  color: red;
  font-size: 44rpx;
}

.text-product-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 8rpx;
}

.text-product-info {
  font-size: 24rpx;
  margin-top: 25rpx;
  color: #82848f;
}

.product-details {
  width: 100% !important;
}

.submit-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
