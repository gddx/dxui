<template lang='pug'>
  button-list(:buttonList="buttonList")
</template>

<script>
/** */
// import { ButtonList } from 'dxui'
export default {
  name: 'ButtonPage',
  components: {
    // ButtonList
  },
  data () {
    // console.log('dxui1:', ButtonList)
    return {
      buttonList: [{
        label: '新增',
        type: 'success',
        func: () => {
          console.log('dxButtonlist is add')
        }
      }, {
        label: '编辑',
        type: 'primary',
        size: 'md',
        func: () => {
          console.log('dxButtonlist of update')
        }
      },  {
        label: '删除',
        type: 'primary',
        func: () => {
          console.log('dxButtonlist of delete')
        }
      }]
    }
  }
}
</script>
