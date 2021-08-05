<template>
  <view>
    <view>

    </view>
    <input @input="replaceInput" type="number" v-bind:value="forInputValue"/>
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
        console.log('isInteger')
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
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
