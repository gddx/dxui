<template lang='pug'>
.step-wrap
  el-steps.step-guide(
    ref="stepGuide"
    v-model="stepContent"
    :space="space"
    :active="active"
    :center="true"
    :align-center="true"
    :finish-status="finishStatus"
    :process-status="processStatus"
    :simple="isSimple")
    el-step(
      v-for="(item, index) in stepList"
      :key="index"
      :title="item.label"
      :description="item.desc"
      :icon="item.icon")
  //- .step-button-wrap
  //-   ButtonList(:buttonList="buttonList")
  .step-content(:style="stepWrapStyle")
    slot(:name="actStepName")
</template>

<script>
/**
* @name 分step页面
* @author ManieLam
*/
import { mapGetters } from 'vuex'
import ButtonList from '@/components/ButtonList'
export default {
  name: 'StepPage',
  components: {
    ButtonList
  },
  data () {
    return {
      active: 0, // 设置当前激活步骤
      actStepName: this.stepList[0].name,
      stepLen: this.stepList.length,
      stepContent: this.$route.query.state || this.stepList[this.customActive].name,
      buttonList: [{
        label: '上一步',
        type: 'complete',
        isShow: () => {
          return this.hasPreStep || this.customActive !== 0
        },
        func: ({funcProps}) => {
          // this.$emit('back')
        }
      }, {
        label: '下一步',
        type: 'complete',
        isShow: () => {
          return this.hasNextStep || this.customActive !== this.stepList.length
        },
        func: ({funcProps}) => {}
      }]
    }
  },
  watch: {
    // customActive (value) {
    //   this.active = value
    //   this.actStepName = this.stepList[value].name
    // }
    stepContent (to) {
      this.$router.push({
        path: this.path || this.$router.path,
        query: { state: to }
      })
    },
    $route (to) {
      this.stepContent = to.query.state || this.tabList[this.customActive].name
    }
  },
  computed: {
    ...mapGetters([
      'clientHeight'
    ]),
    stepWrapStyle () {
      let StyleObj = {}
      this.$nextTick(() => {
        const stepGuideHeight = this.$refs.stepGuide.$el.clientHeight
        StyleObj = { height: this.clientHeight - stepGuideHeight + 'px' }
      })
      return StyleObj
    }
  },
  methods: {
    next () {
      if (this.active >= this.stepLen) return
      this.active += 1
    },
    preBack () {
      if (this.active === 0) return
      this.active -= 1
    }
  },
  props: {
    stepList: {
      // @param: label
      // @param: name
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'vertical'
    }, // 显示方向: vertical/horizontal
    space: {
      type: String,
      default: ''
    }, // 每个 step 的间距，不填写将自适应间距。支持百分比。
    finishStatus: {
      type: String,
      default: 'success'
    }, // 设置结束步骤的状态 wait / process / finish / error / success
    processStatus: {
      type: String,
      default: 'finish'
    }, // 设置当前步骤的状态 wait / process / finish / error / success
    customActive: {
      type: Number,
      default: 0
    }, // 自定义设置当前活动步骤
    isSimple: {
      type: Boolean,
      default: false
    }, // 是否使用简洁风格
    hasPreStep: {
      type: Boolean,
      default: false
    },
    hasNextStep: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='sass' scoped>
.step-wrap
  width: 100%
  // padding: 20px
  // overflow-y: scroll
.step-guide
  padding: 20px 0
  background-color: #f6f8fd
  overflow: hidden
  .el-step
    line-height: 0
    vertical-align: middle
.step-content
  height: calc(100% - 120px)
  // height: 100%
.step-button-wrap
  /deep/ .button-wrap
    display: flex
    justify-content: space-between
    padding: 10px 20px
</style>
