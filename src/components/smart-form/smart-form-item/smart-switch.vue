<template lang="pug">

</template>

<script>
/* 丰瑞啊，猛猛来做 */
export default {
  name: 'SmartSwitch',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    dataType: {
      type: String,
      default: 'number'
    },
    currentValue: {
      type: Boolean
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: this.currentValue
    }
  },
  filters: {
    color (style) {
      if (style === 'success') {
        return '#58d68d'
      }
      if (style === 'primary') {
        return '#03a9f4'
      }
      if (style === 'info') {
        return '#03a9f4'
      }
      if (style === 'warning') {
        return '#ffcd14'
      }
      if (style === 'danger') {
        return '#fe6553'
      }
    }
  },
  methods: {
    changeValue (value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>
