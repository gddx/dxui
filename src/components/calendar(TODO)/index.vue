<template lang="pug">
  .calendar
    .calendar-weekdays
      .calendar-weekday(
        v-for="(weekday,i) in weekdays"
        :key="`weekday-${i}`") 星期{{weekday}}
    .calendar-week(
      v-for="(week,i) in dates"
      :key="i")
      CalendarDay.calendar-day(
        v-for="(day,j) in week"
        v-on="$listeners"
        v-bind="day"
        v-model="day.tasks"
        :key="j")
</template>
<script>
/**
 * @name Calendar 日历组件
 * @author 陈可嘉 <chenkj@gddxit.com>
 * @description 通过年月显示当月日历
 */
import CalendarDay from './CalendarDay'
export default {
  name: 'Calendar',
  components: {
    CalendarDay
  },
  props: {
    /**
     * 选择年月的时间戳
     */
    currentMonth: {
      type: String,
      required: true
    },
    /**
     * 选择年月的任务列表
     */
    dateList: {
      type: Object,
      default: () => ({})
    },
    currentClick: {
      type: String,
      default: ''
    }
  },
  data () {
    // console.info('currentClick:', this.currentClick)
    return {
      weekdays: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    /**
     * 日历数组，每周每天显示哪些任务
     */
    dates () {
      // 获取当前月的时间[DateTime]
      const now = this.$moment(this.currentMonth, 'x')
      // 当前选择的月份[Number]
      const month = Number(now.format('M'))
      // 当前选择的月份上个月的最后一天，周日在最前减1，再上一天再减1
      let startDay = now.startOf('month').startOf('week').subtract(2, 'd')
      const dates = [0, 1, 2, 3, 4, 5].reduce((weeks, week) => {
        return [...weeks, [0, 1, 2, 3, 4, 5, 6].reduce((days, day) => {
          // 每次执行startDay加1
          const date = startDay.add(1, 'd')
          const dateTasks = this.dateList[date.format('x')]
          return [...days, {
            day: date.format('D'), // 当天的日期
            date: date.format('x'), // 当天的时间戳
            isCurrentMonth: date.month() + 1 === month, // 是否在当月
            person: dateTasks ? dateTasks.person : 0, // 当天的人数
            tasks: dateTasks ? dateTasks.tasks : [] // 当天的任务
          }]
        }, [])]
      }, [])
      return dates
    }
  }
}
</script>

<style lang="sass" scoped>
.calendar
  display: flex
  flex-direction: column
  justify-content: space-between
  color: #1e2430
  padding: 0 20px
  box-sizing: border-box
  user-select: none
  .calendar-weekdays
    display: flex
    color: #222
    font-size: 16px
    background: #fff
    border: 1px solid #f0f0f0
    >div
      flex: 1
      border-right: 1px solid #f0f0f0
      background: #fff
      height: 40px
      line-height: 40px
      padding-left: 30px
      box-sizing: border-box
      font-weight: 400
      &:nth-last-of-type(1)
        margin-right: 0
        border-right: 0
.calendar-weekday
  flex: 1
  background: #f6f9fe
.calendar-week
  display: flex
  flex: auto
  text-align: center
  align-items: stretch
  border-right: 1px solid #f0f0f0
.calendar-day
  flex: 1
  color: #ccc
  align-self: stretch
</style>
