<template lang='pug'>
  div.container
    FilterBox(
      :filterList="filterList"
      :filterBy="filterBy"
      :columns="columns"
      @changeFilterBy="changeFilterBy")
    h3 当前filter的内容 {{filterValues}}
</template>

<script>
/** */
export default {
  name: '',
  data () {
    return {
      filterList: ['filter1', 'filter2', 'filter3'],
      filterBy: {
        filter1: 1525965610000,
        filter2: 'apple',
        filter3: 1525965610000
      },
      filterValues: {},
      columns: {
        filter1: {
          label: 'filter1',
          filter: {
            type: 'time'
          }
        },
        filter2: {
          label: 'filter2',
          filter: {
            type: 'select'
          },
          options: [{
            label: '苹果',
            value: 'apple'
          }, {
            label: '西瓜',
            value: 'waterMelen'
          }, {
            label: '香蕉',
            value: 'banana'
          }]
        },
        filter3: {
          label: 'filter3',
          filter: {
            type: 'date'
          }
        }
      }
    }
  },
  methods: {
    changeFilterBy (value) {
      this.filterValues = value
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
