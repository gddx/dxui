<template lang="pug">
  .smart-form-text(
    :style="smartStyle")
    InfoRender(
      :data="value"
      :full="columns"
      :column="column")
</template>

<script>
import InfoRender from '@/components/important-info/info-render.vue'
export default {
  name: 'SmartText',
  components: {
    InfoRender
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Object,
      default: () => ({})
    },
    smartStyle: {
      type: Object,
      default: () => ({})
    },
    value: String | Number | Object | Array | Set // 表单控件的值
  // },
  // data () {
  //   return {
  //     value: this.dataType === 'date'
  //     ? moment(this.currentValue).format('YYYY-MM-DD')
  //     : this.dataType === 'select'
  //     ? this.options.find(option => this.currentValue === option.value).label
  //     : this.currentValue
  //   }
  }
}
</script>

<style scoped lang="sass">
.smart-form-text
  padding: 10px
</style>
