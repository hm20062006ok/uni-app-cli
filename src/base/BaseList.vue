<template>
  <view>Base</view>
</template>
<script>
export default {
  name: "BaseList",
  data() {
    return {
      list: []
    }
  },
  methods: {
    getListData(){}
    // onRefresh() {},
    // onUpLoadData() {},
  },
  onPullDownRefresh(){

  },
  onReachBottom(){

  },
  onLoad(){
    this.list = this.getListData()
  }
}
</script>

<style scoped>

</style>
