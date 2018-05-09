<template lang="pug">
  .main.container
    h3.header Loading 加载(TODO 调用有问题)
    hr
    div.content-box
      h4 全屏Loading
      button.btn(@click="open") 开启Loading
      code
        | this.$loading.show()
      button.btn(@click="hide") 手动关闭Loading
      summary 通过延迟模拟手动关闭（此处演示3s后异步获取数据效果）
      code
        | this.$loading.hide()
    hr
    div.content-box
      h4 自定义全屏Loading
      .content-item
        label(for="durInput") 自动关闭时间：
        .input-group
          input.content-input.form-control(
            id="durInput"
            type="text"
            v-model="customTime"
            aria-describedby="basic-addon2")
          .input-group-append
            span.input-group-text#basic-addon2 毫秒
          button.btn.ml-5(type="success" @click="duringHide") 设置自动关闭{{customTime}}之后关闭Loading
        code
          | this.$loading.show({
          |  durTime: {{customTime}}
          | })
      .content-item
        label(for="colorInput") 自定义背景颜色:
        input.content-input.form-control.mr-3(
          id="colorInput"
          type="text"
          v-model="customColor")
        button.btn(type="success" @click="openWithColor") 设置背景颜色{{customColor}}的Loading
        code
          | this.$loading.show({
          |  background: {{customColor}}
          | })
      .content-item
        label(for="textInput") 自定义Loading文字:
        input.content-input.form-control.mr-3(
          id="textInput"
          type="text"
          v-model="customLabel")
        button.btn(type="success" @click="openWithCustomLabel") 设置Loading文字为 "{{customLabel}}"
        code
          | this.$loading.show({
          |  text: {{customLabel}}
          | })
    hr
    div.content-box
      h4 *顶部TopBar Loading (TODO)
      .button-list-wrap
        button.btn.mr-3 Process To 30%
        button.btn.mr-3 Process To 50%
        button.btn.mr-3 Process To 100%
        button.btn Error Process
    hr
    div.content-box
      h4 *局部刷新 (TODO)
</template>
<script>
export default {
  name: 'LoadingBasic',
  data () {
    return {
      customTime: 100,
      customColor: null,
      customLabel: ''
    }
  },
  methods: {
    /* 手动开启 */
    open () {
      this.$dxloading.show()
    },
    /* 手动关闭 */
    hide () {
      this.$loading.show({
        background: 'rgba(0,0,0,.5)'
      })
      setTimeout(() => {
        this.$loading.hide()
      }, 3000)
    },
    /* 定时关闭 */
    duringHide () {
      this.$loading.show({
        durTime: this.customTime
      })
    },
    /* 自定义背景颜色 */
    openWithColor () {
      this.$loading.show({
        background: this.customColor,
        color: '#fff',
        text: '加载中'
      })
    },
    /* 自定义文字 */
    openWithCustomLabel () {
      this.$loading.show({
        text: this.customLabel
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.header
  background: #48b0f7
  color: #fff
  text-align: center
.content-box
  h4
    font-weight: 600
  .content-item
    margin-bottom: 10px
    label
      display: block
    .content-input
      width: 20%
      display: inline-block
code
  display: block
  line-height: 35px
</style>