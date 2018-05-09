<template lang="pug">
  .num-range-row
    el-input-number(
      v-model="currentValueStart"
      :disabled="disabled"
      :step="step"
      :size="size"
      :min="min",
      :max="max",
      :controls="controls"
      :controls-position="position")
    span --
    el-input-number(
      v-model="currentValueEnd"
      :disabled="disabled"
      :step="step"
      :size="size"
      :min="min",
      :max="max",
      :controls="controls"
      :controls-position="position")
</template>

<script>
export default {
  name: 'SmartNumberRange',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    minNumber: Number,
    maxNumber: Number,
    step: Number,
    size: {
      type: String,
      default: ''
    }, // large/small
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => ({
        start: 0,
        end: 0
      })
    },
    controls: {
      type: Boolean,
      default: true
    },
    position: { // 控制按钮的方向 right
      type: String,
      default: 'right'
    },
    isConstraint: { // 是否限制第二个数不能小于第一个数
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      min: this.minNumber,
      max: this.maxNumber
    }
  },
  computed: {
    currentValueStart: {
      get () {
        return this.value.start
      },
      set (val) {
        this.$emit('input', {
          start: val,
          end: this.currentValueEnd
        })
      }
    },
    currentValueEnd: {
      get () {
        return this.value.end
      },
      set (val) {
        this.$emit('input', {
          start: this.currentValueStart,
          end: val
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
