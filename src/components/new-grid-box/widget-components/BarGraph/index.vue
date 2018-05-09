<template>
  <div class="chartBox" ref="chartBox"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
export default {
  props: {
    relationType: {
      type: String,
      default: null
    },
    resoure: {
      type: String,
      default: null
    }
  },
  mounted () {
    if (this.relationType !== null) {
      this.$get({
        url: 'relation',
        params: {
          relationList: this.relationType
        }
      }).then(data => {
        this.relation = data
        this.$get({
          url: this.resoure,
          params: {
            startTime: (this.$moment().subtract(3, 'months').format('X')).padEnd(13, 0),
            endTime: Date.parse(new Date())
          }
        }).then(data => {
          const series = data.series.map((item) => {
            return {
              ...item,
              type: 'bar',
              name: this.relation['bizTypes'].find(j => j.value === item.id).label
            }
          })
          const lable = series.map(item => item.name)
          const xAxis = data.xAxis.map(x => this.$moment(x, 'x').format('YYYY-MM'))
          console.log(xAxis)
          this.initEchart(lable, series, xAxis)
        })
      })
    }
    let myChart = echarts.init(this.$refs.chartBox)
    window.addEventListener('resize', () => {
      myChart.resize()
    }, false)
  },
  methods: {
    initEchart (lable, itemdata, xAxis) {
      let myChart = echarts.init(this.$refs.chartBox)
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (params, ticket, callback) => {
            const result = params.map(({marker, seriesName, data}, index) => {
              return `${marker} ${seriesName} ${data} `
            }).join('<br>')
            return `${result}`
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: lable,
          align: 'left',
          itemGap: 20
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: itemdata
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.chartBox
  width: 100%
  height: 100%
  padding: 20px 0
</style>
