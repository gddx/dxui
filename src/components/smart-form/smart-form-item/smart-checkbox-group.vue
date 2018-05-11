<template lang="pug">
  el-checkbox-group(v-model="currentCheckList")
    el-checkbox(
      v-for="(option, index) in options"
      :key="index"
      :label="option.label"
      :disabled="option.disabled")
</template>

<script>
import { keyBy } from 'lodash'
export default {
  name: 'SmartCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentCheckList: {
      get () {
        const optionsObj = keyBy(this.options, 'value')
        return this.value.map(item => {
          return optionsObj[item].label
        })
      },
      set (val) {
        const optionsObj = keyBy(this.options, 'label')
        const checkList = val.map(item => {
          return optionsObj[item].value
        })
        this.$emit('input', checkList)
      }
    }
  }
}
</script>
