<template lang="pug">
  el-tooltip(
    v-if="tooltip"
    effect="dark"
    :content="label"
    :enterable="false"
    :placement="placement")
    button.btn(
      type="button"
      :class="['btn-' + type, 'btn-' + size, {'btn-block': block}, ...buttonClass]"
      :style="buttonStyle"
      :disabled="disabled || loading"
      @click="handleClick")
      span(v-if="loading")
        i.iconfont.icon-loading
      span(v-else-if="icon")
        i(:class="['iconfont', 'icon-' + icon]")
  button.btn(
    v-else
    type="button"
    :class="['btn-' + type, 'btn-' + size, {'btn-block': block}, ...buttonClass]"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick")
    span.btn-icon(v-if="loading")
      i.iconfont.icon-loading
    span.btn-icon(v-else-if="icon")
      i(:class="['iconfont', 'icon-' + icon]")
    | {{label}}
</template>
<script>
/*
*  @name ButtonItem 组件
*  @edit 黄丰瑞
*  @des 添加tooltip配置
*/
export default {
  name: 'ButtonItem',
  props: {
    name: String, // 按钮名称
    icon: String, // 按钮icon
    tooltip: { // 隐藏label，显示tooltip
      type: Boolean,
      default: false
    },
    placement: { // tooltip显示方向，仅在tooltip为true有效
      type: String,
      default: 'top'
    },
    size: {
      type: String,
      default: 'md'
    }, // 按钮大小，有lg/md/sm/xs四种规格
    type: {
      type: String,
      default: 'default'
    }, // 按钮类型，有 default|primary|complete|seccess|danger|warning|info|七种类型
    buttonStyle: {
      type: Object,
      default: () => ({})
    }, // 按钮自定义样式
    buttonClass: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: '提交'
    }, // 按钮显示文字
    block: {
      type: Boolean,
      default: false
    }, // 按钮是否100%宽度
    disabled: {
      type: Boolean,
      default: false
    }, // 按钮是否可点击
    funcProps: {
      type: Object,
      default: () => ({})
    }, // 其他组件传给按钮的参数，供按钮事件执行时调用
    func: Function // 按钮事件，按钮点击或其他方式触发时执行
  },
  data () {
    return {
      loading: false // 按钮Loading状态
    }
  },
  methods: {
    handleClick () {
      this.func({
        funcProps: {
          button: this,
          ...this.funcProps
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.btn-icon
  padding-right: 4px
</style>
