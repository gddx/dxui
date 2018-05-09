<template>
<div>
  <el-popover
    ref="popover1"
    placement="bottom-start"
    width="160"
    trigger="hover">
    <span>{{tips}} <br> {{tipsNow}}<br>{{tipsNeed}}</span>
  </el-popover>
    <div class="ringBox" :style="{width: size + 'px', height: size + 'px'}">
    <div class="ring" ref="ringBox"></div>
    <div class="ringContentBox" v-popover:popover1>
      <ul class="ringContent">
        <li v-for="(val, index) in data" :style="val.style" :key="index">{{val.label}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
/**
 * @name Ring 环形图组件
 * @author 杜俊炎
 * @description echarts环形图
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
export default {
  props: {
    alwaysData: Object,
    data: Array, // 设置环形中心的文字跟样式
    // value: { // 环形各区块所占百分比
    //   type: Number,
    //   default: 0
    // },
    value: Number | String,
    size: {
      type: Number,
      default: 135
    }
  },
  mounted () {
    this.setCharts()
    this.tips = `${this.alwaysData.label[0]} / ${this.alwaysData.label[1]}`
    this.tipsNow = `${this.alwaysData.label[0]} : ${this.alwaysData.readingNum}`
    this.tipsNeed = `${this.alwaysData.label[1]} : ${this.alwaysData.needReadingNum}`
  },
  data () {
    return {
      tips: '',
      tipsTitle: '',
      tipsNow: 'tips',
      tipsNeed: 'tips',
      nowIndex: 0
    }
  },
  methods: {
    setCharts () {
      let myChart = echarts.init(this.$refs.ringBox)
      myChart.setOption({
        series: [
          {
            type: 'pie',
            radius: ['85%', '100%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            silent: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.value,
                itemStyle: {
                  normal: {
                    color: '#33afff'
                  }
                }
              },
              {
                value: 100 - this.value,
                itemStyle: {
                  normal: {
                    color: '#d7dee4'
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.ringBox
  position: relative
  width: 100%
  height: 100%
  .ring
    width: 100%
    height: 100%
  .ringContentBox
    position: absolute
    width: 100%
    max-height: 100%
    top: 50%
    left: 0
    border-radius: 100%
    padding: 12%
    transform: translate(0, -50%)
    animation: ring 3s
  .ringContent
    width: 100%
    height: 100%
    overflow: hidden
@keyframes ring
  0%
    opacity: 0
  100%
    opacity: 1
</style>
