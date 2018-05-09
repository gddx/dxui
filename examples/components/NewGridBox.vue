<template lang='pug'>
  div
    NewGridBox(:colxlg="12" :colxl="12" :collg="12" :colmd="12" :rowNum="8"
      :tag="'title'"
      :headerList="mapHeader"
      :clickFull="true")
      h4 This is the big newGridBox content body
      h5 use in projects 
    NewGridBox(:colxlg="6" :colxl="6" :collg="6" :colmd="6" :rowNum="6"
      :tag="'title'"
      :headerList="mapHeader"
      :clickFull="true")
      h4 This is the newGridBox content body - col6
    NewGridBox(:colxlg="6" :colxl="6" :collg="6" :colmd="6" :rowNum="6"
      :tag="'title'"
      :headerList="mapHeader"
      :clickFull="true")
      h4 This is the newGridBox content body - col6
</template>

<script>
/** */
export default {
  name: 'gridPage',
  data () {
    return {
      title: '小器件',
      mapHeader: {
        title: `头部 Title`,
        icon: 'positioning',
        iconColor: '#03a9f4',
        menuList: [{
          type: 'button',
          icon: 'ffullScreen',
          methods: 'full'
        }]
      }
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
