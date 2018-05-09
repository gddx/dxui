<template lang="pug">
  span.input-group-addon(:class="[type]")
    i(
      v-if="icon"
      :class="['iconfont', 'icon-' + icon]")
    | {{text}}
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    icon: String,
    text: String
  },
  data () {
    return {
    }
  }
}
</script>
