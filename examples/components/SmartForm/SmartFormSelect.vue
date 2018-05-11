<template lang='pug'>
  div.container
    h4 多选
    SmartSelect(
      :multiple="true"
      placeholder="多选下拉"
      :live="live"
      :options="columns.demo1.options"
      :value="multiValue"
    )
    h4 单选
    SmartSelect(
      placeholder="单选下拉"
      :multiple="false"
      :live="live"
      :options="columns.demo2.options"
      subtext="单选1"
      :value="singleValue"
    )
</template>

<script>
/** */
export default {
  name: 'SmartSelectPage',
  data () {
    return {
      labelSize: 4,
      formList: ['demo1', 'demo2'],
      formLabelWidth: 60,
      live: true,
      columns: {
        demo1: {
          label: 'selectDemo1',
          form: {
            type: 'select',
            live: true
          },
          options: [{
            label: '选项1',
            value: 1
          }, {
            label: '选项2',
            value: 2
          }, {
            label: '选项3',
            value: 3
          }, {
            label: '选项4',
            value: 4
          }]
        },
        demo2: {
          label: 'selectDemo2',
          form: {
            type: 'select',
            live: true
          },
          options: [{
            label: '选项3',
            value: 3
          }, {
            label: '选项4',
            value: 4
          }]
        }
      },
      multiValue: '', // 多选值
      singleValue: '' // 单选值
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
