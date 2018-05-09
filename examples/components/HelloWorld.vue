<template lang='pug'>
  div.app
    h4 Components Demos
    ul
      li(v-for="(item, index) in routeLink" :key="index")
        router-link(:to="item.to") {{item.label}}
</template>

<script>
/** */
export default {
  name: '',
  data () {
    return {
      routeLink: [{
        to: '/buttonList',
        label: '按钮组ButtonList'
      }, {
        to: '/smartDialog',
        label: '模态框SmartDialog'
      }, {
        to: '/infoPage',
        label: '信息内容 ImportantInfo'
      }, {
        to: '/newGridBox',
        label: '小器件 NewGridBox'
      }, {
        to: '/dataTable',
        label: '表格DataTable'
      }, {
        to: '/smartForm',
        label: '表单Smartform'
      }, {
        to: '/tab',
        label: '标签页 Tab'
      }, {
        to: '/filterBox',
        label: '过滤器 FilterBox'
      }, {
        to: '/step',
        label: '步骤条 steps'
      }, {
        to: '/loadingPage',
        label: '加载 loading'
      }]
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
