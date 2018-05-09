<template lang="pug">
  .calendar-day(
    :class="{'calendar-day-current':isCurrentMonth}"
    @click="clickDay")
    .calendar-day-date-box
      .calendar-day-person(v-if="person > 0")
        span.iconfont.icon-personal
        |  {{person}}
      .calendar-day-date {{day}}
    vddl-list.task-list(
      :list="tasks"
      :drop="handleDrop"
      :horizontal="false")
      vddl-placeholder.task-item
        .task-item-box.task-item-box__placeholder 插入
      vddl-draggable.task-item(
        v-for="(item, index) in tasks"
        :key="index"
        :draggable="item"
        :index="index"
        :wrapper="tasks"
        :disable-if="!item.enable"
        effect-allowed="move"
        :selected="selectedEvent"
        v-bind:class="{'selected': selected === item}")
        .task-item-box(
          :class="{'task-item-box__move':item.enable}"
          :style="item | taskStyle"
          @click="clickTask(item)") {{item.label}}
</template>

<script>
/**
 * @name CalendarDay 每日组件
 * @author 陈可嘉 <chenkj@gddxit.com>
 * @description 日历组件里每日的操作和内容
 */
export default {
  name: 'CalendarDay',
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      default: () => []
    },
    person: {
      type: Number,
      default: 0
    },
    day: {
      type: String,
      default: () => []
    },
    isCurrentMonth: Boolean
  },
  data () {
    return {
      selected: null
    }
  },
  filters: {
    taskStyle (child) {
      const borderColor = child.pcolor !== child.color ? 12 : 0
      return {
        background: child.pcolor,
        'border-right': `${borderColor}px solid ${child.color}`
      }
    }
  },
  methods: {
    selectedEvent (item) {
      this.selected = item
    },
    handleDrop (data) {
      this.$emit('changeTask', {
        date: this.date,
        data: data
      })
    },
    clickTask (task) {
      this.$emit('clickTask', {
        task: task,
        tasks: this.tasks,
        date: this.date
      })
    },
    clickDay () {
      this.$emit('clickDay', {
        tasks: this.tasks,
        date: this.date
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.calendar-day
  background: #fff
  border: 1px solid #f0f0f0
  border-top: 0px
  border-right: 0px
  -webkit-box-sizing: border-box
  box-sizing: border-box
  position: relative
  display: flex
  flex-direction: column
  transition: 1s all ease
  .calendar-day-date-box
    padding: 8px 12px 0
    .calendar-day-person
      float: left
      text-align: center
      font-style: normal
      color: #666
      .iconfont
        color: rgb(72, 176, 247)
    .calendar-day-date
      float: right
      text-align: center
      font-style: normal
.calendar-day-current
  .calendar-day-date
    color: #666
.task-list
  margin-top: -6px
  padding: 6px
  color: #fff
  height: 100%
  .task-item
    margin: 6px 6px 0
    border-radius: 5px
    .task-item-box
      line-height: 24px
      color: #fff
      background: #48b0f7
      font-size: 12px
      text-align: center
      border-radius: 5px
    .task-item-box__placeholder
      background: #98e0e6
    .task-item-box__move
      cursor: move
</style>
