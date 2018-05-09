<template lang="pug">
  textarea.form-control(
    v-model="currentValue"
    :id="'form-'+name"
    :rows="rows"
    :placeholder="placeholder")
</template>

<script>
export default {
  name: 'SmartTextarea',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 4
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

<style lang="sass" scoped>
textarea.form-control
  resize: none
</style>
