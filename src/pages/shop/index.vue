<template>
  <view class="container">
    <xjyp-checkbox v-model="checked"></xjyp-checkbox>
    <xjyp-number-input v-model="itemCounts" :max="99"></xjyp-number-input>
    {{ itemCounts}}
  </view>
</template>
<script>


import XjypNumberInput from "@/components/xjyp/xjyp-number-input/xjyp-number-input";
export default {
  name: "index",
  components: {XjypNumberInput},
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
  onLoad() {

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
  }
  ,
  onReachBottom() {

  }
  ,
  onShareAppMessage() {

  }
}
</script>

<style scoped>
page {
  background: #f5f5f5;
}

view, textarea, input, text, button {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 28 rpx;
  font-family: "微软雅黑";
}

.uni-checkbox-input {
  border-radius: 50% !important;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background: #f5f5f5;
  overflow: hidden;
}

.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 1;
  box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all; /* 英文换行问题 */
}

.line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 2;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all; /* 英文换行问题 */
}

.centerboth {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}

.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}

image {
  padding: 0;
  margin: 0;
}

textarea {
  width: 300 rpx;
  height: 75 rpx;
  display: block;
  position: relative;
  font-size: 28 rpx;
}

button::after {
  border: none;
}

input:-ms-input-placeholder {
  color: #808080;
}

car-list {
  width: 100%;
}
</style>
