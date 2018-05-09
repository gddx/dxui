<template>
  <div class="statistics" :style="{height: `${height}px`}">
    <div class="stat-header">
      <span>{{data.title}}</span>
      <div class="sum-stat">
        {{itemSum}}
      </div>
    </div>
    <section v-for="(item, index) in data.list" :key="index">
      <p>{{item.label}}</p>
      <p>{{item.value}}</p>
    </section>
  </div>
</template>

<script>
/**
 * @name 统计组件
 * @author 温泽荣
 * @description 数据统计组件
 */
export default {
  name: 'statistics',
  props: {
    data: Object, // 数据
    isShowSum: { // 是否展示合计
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 250
    }
  },
  watch: {
    data: function (val, oldVal) {
      // console.log(111)
    }
  },
  computed: {
    itemSum () {
      let sum = 0
      this.data.list.forEach((item) => {
        sum += item.value
      })
      return sum
    }
  }
}
</script>

<style lang="sass" scoped>
  .statistics
    background-color: rgba(16,207,189,1)
    color: #fff
    font-size: 14px
    padding: 20px
    font-family: pop
    .stat-header
      line-height: 50px
      padding-bottom: 20px
      span
        font-weight: 700
      .sum-stat
        font-size: 40px
        font-weight: 200
        float: right
    section
      display: flex
      justify-content: space-between
      p,span
        font-weight: 300

</style>
