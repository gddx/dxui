<template lang="pug">
  el-cascader.cascader(
    v-model="currentValue"
    :expand-trigger="expandTrigger"
    :options="optionsResult"
    :show-all-levels="false"
    :change-on-select="!onlySelectLeaf"
    :clearable="true"
    :placeholder="placeholder"
    :disabled="disabled")
</template>

<script>
import { filter } from 'lodash'
import { treeFormat } from '@/utils/common'

function treeValue (result, cid, options) {
  if (cid !== undefined && cid !== '') {
    const pid = options.find(option => option.value === cid).parentId
    if (pid) {
      return treeValue([cid, ...result], pid, options)
    } else {
      return [cid, ...result]
    }
  } else {
    return result
  }
}

export default {
  name: 'SmartCascader',
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
      type: String | Number
    },
    onlySelectLeaf: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    optionFilter: {
      type: Object
    },
    expandTrigger: {
      type: String,
      default: 'click'
    }
  },
  data () {
    return {}
  },
  computed: {
    currentValue: {
      get () {
        return treeValue([], this.value, this.options)
      },
      set (val) {
        this.$emit('input', val[val.length - 1])
      }
    },
    optionsResult () {
      return treeFormat(filter(this.options, this.optionFilter), 'value', 'parentId')
    }
  }
}
</script>
<style lang="sass">
.cascader
  width: 100%
  .el-input__inner
    border: 1px solid rgba(0, 0, 0, 0.07) !important
    border-radius: 4px
  .el-input__icon.el-icon-caret-bottom
    font-size: 10px
    color: #999
</style>
