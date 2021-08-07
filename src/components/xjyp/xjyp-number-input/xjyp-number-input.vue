<template>
  <view class="container1">
    <view class="btn-opt" @click="decrease">-</view>
    <input class="uni-input" type="number"  @input="replaceInput" v-bind:value="forInputValue" />
    <view class="btn-opt" @click="increase">+</view>
  </view>
</template>
<script>
import { minimalToast } from '@/utils/toast'
export default {
  name: 'xjyp-number-input',
  props: {
    value: Number,
    min: {
      type: Number,
      default: 1
    },
    max: Number,
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },
  computed: {
    forInputValue: {
      get() {
        return this.value
      },
      set(v) {
      }
    }
  },

  methods: {
    replaceInput(event) {
      const valueLocal = Number.parseInt(event.target.value);
      if (Number.isInteger(valueLocal)) {
        if (valueLocal < this.min) {
          // TODO i18n
          this.$emit('update:value', this.min)
          minimalToast(`最少购买${this.min}件`)
          return
        }
        if (valueLocal > this.max) {
          // TODO i18n
          this.$emit('update:value', this.max)
          minimalToast(`最多购买${this.max}件`)
          return
        }
        this.$emit('update:value', valueLocal)
      }else {
        minimalToast(`只能输入数字`)
      }
    },
    increase(){
      let value = this.forInputValue + 1
      if (value > this.max) {
        minimalToast(`最多购买${this.max}件`)
        return
      }
      this.$emit('update:value', value)
    },
    decrease(){
      let value = this.forInputValue - 1
      if (value < this.min) {
        minimalToast(`最少购买${this.min}件`)
        return
      }
      this.$emit('update:value', this.forInputValue - 1)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}



.btn-opt {
  display: inline-flex;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  background-color: #FFFFFF;
}

.btn-opt:active{
  color:rgba(0,0,0,0.6);
  background-color: #dedede;
  opacity: 0.5;
}
.uni-input {
  display: inline-block;
  width: 44rpx;
  height: 44rpx;
  line-height: 44rpx;
  font-size: 30rpx;
  text-align: center;
  padding: 0;
  background-color: #FFFFFF;
}
</style>
