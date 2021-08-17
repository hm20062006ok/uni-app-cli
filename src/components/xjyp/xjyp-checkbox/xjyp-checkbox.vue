<template>
<!-- TODO 太丑，自己实现选择框 -->
  <checkbox-group @change="checkboxChange">
    <checkbox value="checkboxValue"  :checked="shouldChecked" />
    <slot/>
  </checkbox-group>
</template>
<script>
export default {
  name: 'xjyp-checkbox',
  model: {
    prop: 'checked',
    event: 'update:checked'
  },
  data() {
    return {
      initialValue:this.checked,
    }
  },
  props: {
    checked: Boolean
  },
  computed: {
    shouldChecked:{
      get(){
        return this.checked
      },
      set(){

      }
    }
  },
  methods: {
    checkboxChange(event){
      if(event.detail.value.length > 0){
        this.$emit('update:checked',true)
        this.$emit('onChange', true)
      }else{
        this.shouldChecked = false
        this.$emit('onChange', false)
        this.$emit('update:checked',false)
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
