<template lang="pug">
  .modal.modal-backdrop.fade.slide-up.show(:style="modalStyle",@click.self="handleWrapperClick")
    .modal-dialog(:class="sizeClass")
      .modal-content-wrapper(@click.self="handleWrapperClick")
        .modal-content
          .modal-header.clearfix.text-left
            button.close(
              v-if="showClose"
              type="button"
              @click="handleClose")
              i.iconfont.icon-close.fs-14
            slot(name="title")
              h5 {{title}}
                span.semi-bold {{subtitle}}
          .modal-body
            slot
          .modal-footer.clearfix.text-right(v-if="$slots.footer")
            slot(name="footer")
</template>

<script>
export default {
  name: 'SmartDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'md'
    },
    customClass: {
      type: String,
      default: ''
    },
    beforeClose: Function
  },
  data () {
    return {
      rendered: false
    }
  },
  computed: {
    modalStyle () {
      return {
        display: this.value ? 'block' : 'none'
      }
    },
    sizeClass () {
      return `modal-${this.size}`
    },
    style () {
      return this.size === 'full' || this.size === 'xl' ? {} : { 'top': this.top }
    }
  },
  methods: {
    handleWrapperClick () {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.close)
      } else {
        this.close()
      }
    },
    close (cancel) {
      this.$emit('input', false)
    },
    open () {
      this.$emit('input', true)
    }
  }
}
</script>

<style scoped lang="sass">
.modal
  overflow: auto
.close
  cursor: pointer
.modal-full, .modal-xl
  position: fixed
  top: 0
  left: 10px
  max-width: calc(100% - 20px)
  width: calc(100% - 20px)
.modal-xl
  .modal-content
    height: calc(100% - 20px)
.modal-content
  box-shadow: 0 0 100 #ddd
.modal-header
  h5
    margin-top: -8px
    margin-bottom: 16px
  border-bottom: 1px solid #ededed
  margin-bottom: 0
.modal .modal-body
  padding: 0
</style>

