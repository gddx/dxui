<template lang="pug">
  el-checkbox(
    :disabled="disabled"
    v-model="currentValue")
</template>
<script>

export default {
  name: 'SmartCheckbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    dataType: {
      type: String,
      default: 'boolean'
    },
    value: {
      type: Boolean
    }
  },
  computed: {
    currentValue: {
      get () {
        return Boolean(this.value)
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
