<template>
<!-- TODO 太丑，自己实现选择框 -->
  <checkbox-group @change="checkboxChange">
    <checkbox value="1"  :checked="isChecked" style="border-radius: 50%"/>
    <slot/>
  </checkbox-group>
</template>
<script>
export default {
  name: 'xjyp-checkbox',
  data() {
    return {
      isChecked:this.value,
    }
  },
  props: {
    value: Boolean
  },
  methods: {
    checkboxChange(event){
      // 实际应该判断 event.detail.value.includes("1")
      if(event.detail.value.length > 0){
        this.$emit('input',true)
        this.$emit('onChange', true)
      }else{
        this.$emit('input',false)
        this.$emit('onChange', false)
      }
    }
  }
}
</script>
<style scoped>
.uni-checkbox-input{
  border-radius: 50% !important;
}
</style>
