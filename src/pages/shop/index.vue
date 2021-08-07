<template>
  <view class="container">
    <view>
      总价： {{ total }}
    </view>
    <view class="store-list">
      <view class="store-item" v-for="(shop, index) in carList" :key="index">
      <view class="store-item-head">
        <xjyp-checkbox v-model="shop.selected"></xjyp-checkbox>
        <view>Icon</view>
        <text> {{ shop.title}}</text>
      </view>
      <view class="store-item-product-list">
        <view class="product-item" v-for="(good, shopIndex) in shop.glist" :key="shopIndex">
          <xjyp-checkbox v-model="good.selected"></xjyp-checkbox>
          <view class="product-pic">
          </view>
          <view class="product-item-right">
            <view> {{good.name}}</view>
            <view>  {{good.spec_key_name}}</view>
            <view class="product-item-right-bottom">
              <view class="flex-start">￥ {{good.price * good.number}}</view>
              <view class="flex-end">
                <xjyp-number-input v-model="good.number" :max="99" :min="1"></xjyp-number-input>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      itemCounts: 5,
      checked: false,
      maskTitle: '',
      carList: [
        {
          shopId: 1,
          title: "天猫超市",
          total: 2,
          goodsAmount: 6051,
          selected: true,
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
              selected: true,
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
              selected: true,
            }
          ]
        },
        {
          shopId: 2,
          title: "京东超市",
          total: 11,
          selected: true,
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
              selected: true,
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
              selected: true,
            }
          ]
        }
      ]
    }
  },
  computed:{
    total(){
      return this.carList.reduce((sum, shop) => {
        if (shop.selected) {
          let shopAmount = shop.glist.reduce((shopSum, product) => {
            if (product.selected){
              return shopSum + product.price * product.number
            }
            return shopSum
          }, 0)
          return sum + shopAmount
        }
        return sum
      },0)
    }
  },
  methods: {
    change() {
      this.checked = !this.checked
      // debugger
      // console.log('checkboxChange')
      // console.log(event)
      // this.checked = event
    },
    confirm: function () {//确定按钮
      console.log('您点击了确定按钮');
    }
    ,
    cancel: function () {//取消按钮
      console.log('您点击了取消按钮');
    }
    ,
    selGoods: function (carList) {
      var that = this;
      that.carList = carList;
    }
    ,
    selShop: function (carList) {
      var that = this;
      that.carList = carList;
    }
    ,
    allSelBtn: function (carList) {
      var that = this;
      that.carList = carList;
    }
    ,
    jsbtn: function (ids) {//结算按钮
      var that = this;
      console.log(ids);
      var that = this;
      /*
       跳转结算页面

      */
    }
    ,
    delbtn: function (ids, list) {//删除按钮
      var that = this;
      /*
       请求接口数据

      */
      for (let i = 0; i < list.length; i++) {
        for (let k = 0; k < list[i].glist.length; k++) {
          if (list[i].glist[k].selected == true) {
            list[i].glist.splice(k, 1);
            k--
          }
        }
        if (list[i].glist.length == 0) {//若当前店铺商品删除完，删除当前店铺
          list.splice(i, 1);
          i--
        }
      }
      that.carList = list;

      that.$refs.mycar.getAllMount(list);//计算价格展示
    }
    ,
    changeNum: function (total, carList, shopIndex, gIndex, number, id, type) {
      var that = this;
      /*
       请求接口数据

      */
      carList[shopIndex].glist[gIndex].number = number;
      if (type == 0) {
        carList[shopIndex].total = total - 1;
      } else {
        carList[shopIndex].total = total + 1;
      }
      that.carList = carList;
      that.$refs.mycar.getAllMount(carList);//计算价格展示
    }
  },
  onReachBottom() {

  }
  ,
  onShareAppMessage() {

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
    padding: 20rpx 15rpx;
    background-color: white;
    margin-bottom: 20rpx;

    .store-item-head {
      display: flex;
    }

    .store-item-product-list {
      display: flex;
      flex-direction: column;

      .product-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 30rpx;
        height: 400rpx;
        background-color: #e3e3e3;
        border-bottom: 1px solid #FFFFFF;

        .product-pic {
          width: 150rpx;
          height: 150rpx;
          background-color: red;
        }
        .product-item-right {
          display: flex;
          flex-direction: column;
        }
        .product-item-right-bottom{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
