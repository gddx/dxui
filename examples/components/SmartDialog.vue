<template lang='pug'>
  div
    h4 打开模态框
    ButtonList(:buttonList="buttonlist") 
    SmartDialog(
      v-model="mdDialog"
      size="md"
      title="中型模态框"
    )
      label Boostrap模态功能非常强大，我们开始思考如何让事情变得更好。模式被设置为套件页面配色方案和动画，我们并没有停止在这里我们添加更多，阅读更多。
      label 这些模式是用新的动画和风格定制的，现在页面模式支持多达3种不同的版本，每种版本都有小型，中型和大型模式。这有助于您使应用看起来更棒
      label 我们不只是为了看起来和妥协功能，因为它们是自动增益模式，它们响应迅速，可以在所有屏幕上工作。
    SmartDialog(
      v-model="smDialog"
      size="sm"
      title="小型模态框"
    )
      label Boostrap模态功能非常强大，我们开始思考如何让事情变得更好。模式被设置为套件页面配色方案和动画，我们并没有停止在这里我们添加更多，阅读更多。
      label 这些模式是用新的动画和风格定制的，现在页面模式支持多达3种不同的版本，每种版本都有小型，中型和大型模式。这有助于您使应用看起来更棒
      label 我们不只是为了看起来和妥协功能，因为它们是自动增益模式，它们响应迅速，可以在所有屏幕上工作。
    SmartDialog(
      v-model="lgDialog"
      size="lg"
      title="大型模态框"
    )
      label Boostrap模态功能非常强大，我们开始思考如何让事情变得更好。模式被设置为套件页面配色方案和动画，我们并没有停止在这里我们添加更多，阅读更多。
      label 这些模式是用新的动画和风格定制的，现在页面模式支持多达3种不同的版本，每种版本都有小型，中型和大型模式。这有助于您使应用看起来更棒
      label 我们不只是为了看起来和妥协功能，因为它们是自动增益模式，它们响应迅速，可以在所有屏幕上工作。
    SmartDialog(
      v-model="fullDialog"
      size="full"
      title="全屏模态框"
    )
      label Boostrap模态功能非常强大，我们开始思考如何让事情变得更好。模式被设置为套件页面配色方案和动画，我们并没有停止在这里我们添加更多，阅读更多。
      label 这些模式是用新的动画和风格定制的，现在页面模式支持多达3种不同的版本，每种版本都有小型，中型和大型模式。这有助于您使应用看起来更棒
      label 我们不只是为了看起来和妥协功能，因为它们是自动增益模式，它们响应迅速，可以在所有屏幕上工作。
</template>

<script>
/** */
export default {
  name: '',
  data () {
    return {
      mdDialog: false,
      smDialog: false,
      lgDialog: false,
      fullDialog: false,
      buttonlist: [{
        label: '默认sm',
        func: () => {
          this.mdDialog = !this.mdDialog
        }
      }, {
        label: '大lg',
        func: () => {
          this.lgDialog = !this.lgDialog
        }
      }, {
        label: '小sm',
        func: () => {
          this.smDialog = !this.smDialog
        }
      }, {
        label: '全屏full',
        func: () => {
          this.fullDialog = !this.fullDialog
        }
      }]
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
