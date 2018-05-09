<template lang="pug">
  el-time-picker.el-date-editor(
    v-model="currentValue"
    value-format="timestamp"
    :id="'form-'+name"
    :disabled="disabled"
    :picker-options="pickerOptions"
    :placeholder="placeholder"
    :size="size")
</template>

<script>

export default {
  name: 'smartTime',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'large'
    },
    value: {
      type: String | Number
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataFormat: { // 获取后端的值以及提交给后端的值的格式
      type: String,
      default: 'x'
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value ? Number(this.$moment(this.value, this.dataFormat).format('x')) : ''
      },
      set (val) {
        if (!val) {
          this.$emit('input', val)
        } else {
          const value = this.$moment(val).format(this.dataFormat)
          this.$emit('input', this.dataFormat === 'x' ? Number(value) : value)
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.el-date-editor
  width: 100%
  .el-input__inner
    border: 1px solid rgba(0, 0, 0, 0.07) !important
    border-radius: 4px
  .el-input__icon.el-icon-caret-bottom
    font-size: 10px
    color: #999
</style>
