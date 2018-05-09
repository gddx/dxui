<template lang="html">
  <div class="widget-clock">
    <div class="widget-clock-date">
      <p>{{timeObject.format('YYYY-MM-DD')}}</p>
      <p>农历{{lunar.IMonthCn}}{{lunar.IDayCn}}</p>
    </div>
    <div class="widget-clock-time">
      <div class="widget-clock-time-wrapper">
        <p>{{lunar.ncWeek}}</p>
        <p>{{timeObject.format('hh:mm:ss')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { solar2lunar } from '@/utils/calendar.js'
export default {
  name: 'WidgetClock',
  data () {
    const now = moment()
    return {
      time: Number(now.format('x')),
      timeObject: now,
      lunar: solar2lunar(now.format('YYYY'), now.format('M'), now.format('D'))
    }
  },
  mounted () {
    this.timeInterval = setInterval(this.timeRender, 1000)
  },
  destroyed () {
    clearInterval(this.timeInterval)
    this.timeInterval = null
  },
  watch: {
    time () {
      this.timeObject = moment(this.time)
    }
  },
  methods: {
    timeRender () {
      this.time += 1000
    }
  }
}
</script>

<style lang="sass" scoped>
.widget-clock
  background-color: #4e91ef
  color: #fff
  text-align: center
  min-height: 160px
  margin-bottom: 20px
.widget-clock-date
  width: 50%
  float: left
  line-height: 1.8
  padding: 50px 0
.widget-clock-time
  width: 50%
  float: right
  line-height: 1.8
.widget-clock-time-wrapper
  margin: 30px auto
  width: 100px
  height: 60px
  border-radius: 75px
  border: 1px solid #fff
  background-color: #5ea0fd
  padding: 20px 0
  p
    line-height: 2
</style>
