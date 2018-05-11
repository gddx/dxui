<template lang="pug">
  el-tree(
    class="smart-tree"
    show-checkbox
    node-key="value"
    :accordion="true"
    :data="treeData"
    :default-checked-keys="Array.from(currentValue)"
    @check="treeChangeValue")
</template>

<script>
import { treeFormat } from '@/utils/common'

export default {
  name: 'SmartTree',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      treeData: treeFormat(this.options, 'value'),
      currentValue: new Set(this.value)
    }
  },
  methods: {
    treeChangeValue (data, currentValue) {
      const { checkedNodes } = currentValue
      const checkedValues = checkedNodes.reduce((checkedList, item) => {
        if (!item.children) {
          checkedList.push(item.value)
        }
        return checkedList
      }, [])
      this.$emit('input', checkedValues)
    }
  }
}
</script>

<style scoped lang="sass">
.smart-tree
  border: 1px solid rgba(0, 0, 0, 0.07)
  width: 100%
  height: 182px
  overflow: auto
</style>
