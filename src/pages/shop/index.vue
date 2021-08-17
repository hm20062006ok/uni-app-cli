<template>
  <view class="container">
    <view style="padding: 0 10rpx">
      总价： {{ total }}
      总数： {{ count }}
      <xjyp-checkbox v-model="allShopSelected" @onChange="onAllShopSelected($event)">全选</xjyp-checkbox>
    </view>
    <view class="store-list">
      <view class="store-item" v-for="(shop, index) in carList" :key="index">
        <view class="store-item-head">
          <xjyp-checkbox  v-model="shop.selected" @onChange="shopChange($event, shop)"></xjyp-checkbox>
          <view>Icon</view>
          <text> {{ shop.title }}</text>
        </view>
        <view class="store-item-product-list">
          <view class="product-item" v-for="(good, shopIndex) in shop.glist" :key="shopIndex">
            <del_slide-left :item="good"  :data_transit="{index:shopIndex,item:good}"  @delItem="delItem(index, shopIndex)" style="width: 100%">
              <view class="carrier">
                <view >
                  <xjyp-checkbox v-model="good.selected" @onChange="itemChange($event, shop)"></xjyp-checkbox>
                </view>
<!--                <view class="product-pic">-->
<!--                  <image :src="good.img" style="width: 100%;height: 100%"/>-->
<!--                </view>-->
<!--                <view class="product-item-right">-->
<!--                  <view> {{ good.name }}</view>-->
<!--                  <view> {{ good.spec_key_name }}</view>-->
<!--                  <view class="product-item-right-bottom">-->
<!--                    <view class="flex-start">￥ {{ good.price }}</view>-->
<!--                    <view class="flex-end">-->
<!--                      <xjyp-number-input v-model="good.number" :max="99" :min="1" @onIncrease="increase($event)" @onDecrease="decrease($event)"></xjyp-number-input>-->
<!--                    </view>-->
<!--                  </view>-->
<!--                </view>-->
              </view>
            </del_slide-left>

          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Del_slideLeft from "@/components/ay-operate/del_slideLeft";
export default {
  name: "index",
  components: {Del_slideLeft},
  data() {
    return {
      carList: [],
    }
  },
  mounted() {
    let that = this
    setTimeout(function (){
      that.carList = [
        {
          shopId: 1,
          title: "天猫超市",
          total: 2,
          goodsAmount: 6051,
          selected: false,
          glist: [
            {
              id: 236,
              gid: 47,
              name: "毛巾（厚）",
              img: "https://xthotel.palmbly.com/uploads/images/20201020/fb54b8d699c646908fde0af12def5a5b.png",
              gsId: 72,
              spec_key_name: "尺寸:M 颜色:黑色",
              spec: [{name: "尺寸", value: "M"}, {name: "颜色", value: "黑色"}],
              price: 19,
              number: 1,
              stock: 193,
              selected: false,
            },
            {
              id: 237,
              gid: 45,
              name: "盆栽",
              img: "https://xthotel.palmbly.com/uploads/images/20201020/741ff4736f32e9bde91b30f04aff86e5.png",
              gsId: 65,
              spec_key_name: "件装:1件居家必备:枕头",
              spec: [{name: "件装", value: "1件"}, {name: "居家必备", value: "枕头"}],
              price: 6001,
              number: 1,
              stock: 77,
              selected: false,
            }
          ]
        },
        {
          shopId: 2,
          title: "京东超市",
          total: 11,
          selected: false,
          goodsAmount: 6051,
          glist: [
            {
              id: 188,
              gid: 31,
              name: "橘子",
              img: "https://xthotel.palmbly.com/uploads/images/20201020/af19843b3416a2d81455a91aa99f2a1d.jpg",
              gsId: 50,
              spec_key_name: "件装:2件",
              spec: [{name: "件装", value: "2件"}],
              price: 3,
              number: 10,
              stock: 78,
              selected: false,
            },
            {
              id: 235,
              gid: 35,
              name: "积分购买测试",
              img: "https://xthotel.palmbly.com/uploads/images/20201020/4dab5e724b06cbdbd5333585f5473c52.png",
              gsId: 56,
              spec_key_name: "尺寸:M 颜色:黑色",
              spec: [{name: "尺寸", value: "M"}, {name: "颜色", value: "黑色"}],
              price: 1,
              number: 1,
              stock: 97,
              selected: false,
            }
          ]
        }
      ]
    }, 0)
  },
  computed: {
    count(){
      return this.carList.reduce((sum, shop) => {
        return sum + shop.glist.reduce((shopCount, item) => {
          if (item.selected) {
            return shopCount + item.number
          }
          return shopCount
        }, 0)
      }, 0)
    },
    total() {
      return this.carList.reduce((sum, shop) => {
        // if (shop.selected) {
          let shopAmount = shop.glist.reduce((shopSum, product) => {
            if (product.selected) {
              return shopSum + product.price * product.number
            }
            return shopSum
          }, 0)
          return sum + shopAmount
        // }
        return sum
      }, 0)
    },
    allShopSelected:{
      get(){
        if(this.carList.length <= 0){
          return false
        }
        return this.carList.every(shop => {
          return shop.glist.every(item => {
            return item.selected
          })
        })
      },
      set(value){

      }
    }
  },
  methods: {
    onAllShopSelected(value){
      console.log('allShopSelected',value)
      this.carList.map(shop =>{
        shop.selected = value
        shop.glist.map(item => {
          item.selected = value
        })
      })
    },
    delItem(index, shopIndex){
      //删除当前项
      this.carList[index].glist.splice(shopIndex, 1)
      //改变当前店铺选中状态
      this.carList[index].selected = this.carList[index].glist.some(product => {
        return product.selected
      })
      //当前店铺商品被删空时删除当前店铺
      if(this.carList[index].glist.length <= 0){
        this.carList.splice(index,1)
      }
      console.log('delItem')
    },
    decrease(count){
      console.log('decrease',count)
    },
    increase(count){
      console.log('increase',count)
    },
    shopChange(allSelected, shop) {
      shop.glist.map(item => {
        item.selected = allSelected
      })
    },
    itemChange(itemSelected, shop) {
      shop.selected = shop.glist.every(item => {
        return item.selected
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.store-list {
  display: flex;
  flex-direction: column;

  .store-item {
    display: flex;
    flex-direction: column;
    padding: 20rpx calc(2%);;
    background-color: white;


    .store-item-head {
      display: flex;
    }

    .store-item-product-list {
      display: flex;
      flex-direction: column;

      .product-item {
        //width: calc(96%);
        width: 100%;
        height: calc(22vw + 40rpx);
        margin: 5rpx 0;
        border-radius: 15rpx;
        box-shadow: 0rpx 5rpx 20rpx rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        z-index: 4;
        border: 0;

        .carrier {

          //background-color: #fff;
          //position: absolute;
          width: 100%;
          //padding: 0 0;
          height: calc(22vw + 40rpx);
          //z-index: 3;
          //display: flex;
          //align-items: center;

          //.checkbox-box {
          //  padding-left: 20upx;
          //  flex-shrink: 0;
          //  height: 22vw;
          //  margin-right: 20upx;
          //}

          //.goods-info {
          //  width: 100%;
          //  display: flex;
          //  padding-right: 20upx;
          //
          //  .img {
          //    width: 22vw;
          //    height: 22vw;
          //    border-radius: 10upx;
          //    overflow: hidden;
          //    flex-shrink: 0;
          //    margin-right: 10upx;
          //
          //    image {
          //      width: 22vw;
          //      height: 22vw;
          //    }
          //  }
          //
          //  .info {
          //    width: 100%;
          //    height: 22vw;
          //    overflow: hidden;
          //    display: flex;
          //    flex-wrap: wrap;
          //    position: relative;
          //
          //    .title {
          //      width: 100%;
          //      font-size: $font-base;
          //      line-height: 40upx;
          //      height: 80upx;
          //    }
          //
          //    .price-number {
          //      position: absolute;
          //      width: 100%;
          //      bottom: 0upx;
          //      display: flex;
          //      justify-content: space-between;
          //      align-items: flex-end;
          //      font-size: 28upx;
          //      height: 60upx;
          //
          //      .remark {
          //        font-size: $font-sm;
          //        color: $font-color-disabled;
          //      }
          //      .number {
          //        display: flex;
          //        justify-content: center;
          //        align-items: flex-end;
          //
          //        .input {
          //          width: 60upx;
          //          height: 60upx;
          //          margin: 0 10upx;
          //          background-color: #f3f3f3;
          //
          //          input {
          //            width: 60upx;
          //            height: 60upx;
          //            display: flex;
          //            justify-content: center;
          //            align-items: center;
          //            text-align: center;
          //            font-size: 26upx;
          //          }
          //        }
          //
          //        .sub,
          //        .add {
          //          width: 45upx;
          //          height: 45upx;
          //          background-color: #f3f3f3;
          //          border-radius: 5upx;
          //
          //          .icon {
          //            font-size: 22upx;
          //            width: 45upx;
          //            height: 45upx;
          //            display: flex;
          //            justify-content: center;
          //            align-items: center;
          //          }
          //        }
          //      }
          //    }
          //  }
          //
          //  .state-wrapper {
          //    width: 100%;
          //    display: flex;
          //    justify-content: space-between;
          //
          //    .state {
          //      margin: 5upx 20upx;
          //      height: 45upx;
          //      background-color: $font-color-light;
          //      color: $color-white;
          //      padding: 5upx 20upx;
          //      font-size: $font-sm;
          //      border-radius: 6upx;
          //    }
          //
          //    .spec {
          //      font-size: $font-sm;
          //      background-color: #f3f3f3;
          //      color: #a7a7a7;
          //      padding: 5upx 15upx;
          //      border-radius: 20upx;
          //      margin-bottom: 20vw;
          //    }
          //  }
          //}
        }

      }
    }
  }
}

//.product-pic {
//  width: 150rpx;
//  height: 150rpx;
//  background-color: red;
//}
//
//.product-item-right {
//  display: flex;
//  flex-direction: column;
//}
//
//.product-item-right-bottom {
//  display: flex;
//  flex-direction: row;
//  justify-content: space-between;
//}
</style>
