<template>
<!-- TODO 太丑，自己实现选择框 -->
    <checkbox :checked="shouldChecked" @click="checkboxChange"/>
</template>
<script>
/**
 * 双向绑定的checkbox
 */
export default {
  name: 'xjyp-checkbox',
  //<!--    <xjyp-checkbox :checked.sync="checked">-->
// <!--    </xjyp-checkbox>-->
  model: {
    prop: 'checked',
    event: 'update:checked'
  },
  props: {
    checked: Boolean
  },
  computed: {
    shouldChecked(){
      return this.checked
    }
  },
  methods: {
    checkboxChange(){
      this.$emit('update:checked', !this.shouldChecked)
    }
  }
}
</script>
<style scoped>

</style>
