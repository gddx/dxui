<template lang='pug'>
  div.app
    h4 Components Demos
    ul
      li(v-for="(item, index) in routeLink" :key="index")
        router-link(:to="item.to" :class="statusType[item.status].class") {{item.label}} （{{statusType[item.status].label}}）
</template>

<script>
/** */
export default {
  name: '',
  data () {
    // @status：当前组件开发状态: 0-未开发， 1-已开发 ， 2-进行中
    return {
      statusType: {
        0: {
          label: '未开发',
          class: 'undone'
        },
        1: {
          label: '进行中',
          class: 'inProgress'
        },
        2: {
          label: '已开发',
          class: 'done'
        }
      },
      routeLink: [{
        to: '/buttonList',
        label: '按钮组ButtonList',
        status: 2
      }, {
        to: '/smartDialog',
        label: '模态框SmartDialog',
        status: 2
      }, {
        to: '/infoPage',
        label: '信息内容 ImportantInfo',
        status: 2
      }, {
        to: '/newGridBox',
        label: '小器件 NewGridBox',
        status: 2
      }, {
        to: '/smartFormPage',
        label: '表单Smartform',
        status: 2
      }, {
        to: '/dataTable',
        label: '表格DataTable',
        status: 0
      }, {
        to: '/tab',
        label: '标签页 Tab',
        status: 0
      }, {
        to: '/filterBox',
        label: '过滤器 FilterBox',
        status: 2
      }, {
        to: '/step',
        label: '步骤条 steps',
        status: 0
      }, {
        to: '/loadingPage',
        label: '加载 loading',
        status: 1
      }, {
        to: '/map',
        label: '地图 map',
        status: 0
      }]
    }
  }
}
</script>

<style lang='sass' scoped>
.done
  color: #58a5f9
.undone
  color: #b2dabb
.inProgress
  color: #28a745
</style>
