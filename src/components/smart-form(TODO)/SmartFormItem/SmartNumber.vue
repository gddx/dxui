<template lang="pug">
  el-input-number.el-input-number(
    v-model="currentValue"
    :disabled="disabled"
    :min="min"
    :max="max"
    :step="step"
    :size="size"
    :controls="controls"
    :controls-position="position")
</template>

<script>
export default {
  name: 'SmartNumber',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    min: Number,
    max: Number,
    step: Number,
    size: {
      type: String,
      default: 'large'
    }, // large/small
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String | Number
    },
    controls: {
      type: Boolean,
      default: true
    },
    position: { // 控制按钮的方向 right
      type: String,
      default: ''
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
