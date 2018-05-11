<template lang="pug">
</template>

<script>
import ButtonItem from '@/components/ButtonList/ButtonItem'
export default {
  name: 'SmartButton',
  components: {
    ButtonItem
  },
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>
