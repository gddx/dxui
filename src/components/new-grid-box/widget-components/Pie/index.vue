<template>
  <div class="chartBox" ref="chartBox"></div>
</template>

<script>
/**
 * @name 饼状图
 * @author 温泽荣
 * @description 饼状图组件
 */

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  name: 'pie-Echarts',
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
          url: this.resoure
        }).then(data => {
          const lable = data.data.map(item => {
            return this.relation['bizTypes'].find(j => j.value === item.id).label
          })
          const itemData = data.data.map(item => {
            return {
              name: this.relation['bizTypes'].find(j => j.value === item.id).label,
              value: item.value
            }
          })
          this.initEchart(lable, itemData)
        })
      })
    }
    let myChart = echarts.init(this.$refs.chartBox)
    window.addEventListener('resize', () => {
      myChart.resize()
    }, false)
  },
  data () {
    return {
      relation: [],
      colorArray: ['#9e2833', '#f0deb0', '#789262', '#4a4166', '#a98360', '#dab514', '#5a95b7', '#454a51', '#0018ff', '#a6655a', '#a4e1c6', '#e56434', '#b91572', '#f4cce1', '#8b2fe1', '#04d722', '#00d4ff', '#ff0119', '#d9ff42', '#d3d3d3']
    }
  },
  methods: {
    initEchart (lable, itemdata) {
      let myChart = echarts.init(this.$refs.chartBox)
      myChart.setOption({
        legend: {
          x: 'center',
          y: 'top',
          // orient: 'vertical',
          data: lable
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)'
        },
        series: [
          {
            name: '本月业务受理情况',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            data: itemdata,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .chartBox
    position: relative
    /*width: 100%*/
    height: 100%
    padding: 20px 0
</style>
