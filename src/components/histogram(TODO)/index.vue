<template>
  <div class="chartBox" ref="chartBox"></div>
</template>

<script>
/**
 * @name Ring 柱形图组件
 * @author 杜俊炎
 * @description echarts柱形图
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
export default {
  props: {
    labelData: { // X轴各项名称
      type: Array,
      default: () => []
    },
    lastWaterData: { // 上次水量
      type: Array,
      default: () => []
    },
    nowWaterData: { // 本期水量
      type: Array,
      default: () => []
    }
  },
  watch: {
    nowWaterData (val) {
      this.initChart()
    }
  },
  mounted () {
    this.initChart()
    let myChart = echarts.init(this.$refs.chartBox)
    window.addEventListener('resize', () => {
      myChart.resize()
    }, false)
  },
  methods: {
    initChart () {
      let myChart = echarts.init(this.$refs.chartBox)
      myChart.setOption({
        tooltip: {},
        legend: {
          data: ['上次水量', '本次抄见水量'],
          align: 'left',
          itemGap: 20
        },
        grid: {
          // right: 130
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.labelData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '千吨',
            axisLabel: {
              formatter: function (a) {
                a = +a
                return isFinite(a)
                  ? echarts.format.addCommas(+a / 1000)
                  : ''
              }
            }
          }
        ],
        series: [{
          name: '上次水量',
          type: 'bar',
          barWidth: 20,
          data: this.lastWaterData,
          itemStyle: {
            normal: {
              color: '#ff6565'
            }
          }
        }, {
          name: '本次抄见水量',
          type: 'bar',
          barWidth: 20,
          data: this.nowWaterData,
          itemStyle: {
            normal: {
              color: '#06bbfd'
            }
          }
        }]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.chartBox
  width: 100%
  height: 100%
</style>
