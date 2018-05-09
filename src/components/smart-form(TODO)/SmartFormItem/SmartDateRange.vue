<template lang="pug">
  el-date-picker(
    v-model="currentValue"
    :id="'form-'+name"
    type="daterange"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :align="align"
    :picker-options="{shortcuts:shortcuts}")
</template>

<script>
import moment from 'moment'

export default {
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
    type: {
      type: String,
      default: 'date'
    },
    size: {
      type: String,
      default: 'large'
    },
    align: {
      type: String,
      default: 'center'
    },
    shortcuts: {
      type: Array,
      default () {
        return [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value.map(value => new Date(Number(value)))
      },
      set (val) {
        const values = val.map((value, index) => {
          if (!value) return
          const d = moment(value)
          const m = index ? d.endOf('day') : d.startOf('day')
          return m.format('x')
        })
        this.$emit('input', values)
      }
    }
  }
}
</script>
