<template lang="pug">
  input.form-control(
    type="password"
    v-model="currentValue"
    :id="'form-'+name"
    :disabled="disabled"
    :placeholder="placeholder"
    @keyup="changeValue")
</template>

<script>
export default {
  name: 'SmartPassword',
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  methods: {
    changeValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
