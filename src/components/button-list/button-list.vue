<template>
  <div class="button-wrap">
    <ButtonItem
      v-for="(button) in buttonList"
      v-bind="button"
      :key="button.name"></ButtonItem>
  </div>
</template>

<script>
import ButtonItem from './button-item.vue'
export default {
  name: 'Buttonlist',
  components: {
    ButtonItem
  },
  props: {
    buttonList: {
      type: Array,
      default: () => []
    } // 按钮组参数配置
  }
}
</script>
<style lang="sass" scoped>
@import 'bootstrap/dist/css/bootstrap.min.css'
.button-wrap
  .btn
    &:not(:last-child)
      margin-right: 8px
</style>
