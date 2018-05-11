<template lang="pug">
  input.form-control(
    type="text"
    v-model="currentValue"
    :id="'form-'+name"
    :placeholder="placeholder")
</template>

<script>
export default {
  name: 'SmartInput',
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
    value: {
      type: String | Number
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
