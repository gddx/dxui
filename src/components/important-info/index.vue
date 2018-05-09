<template lang="pug">
  .important-wrap
    .important-info
      .row
        div(
          v-for="columnName in infoList"
          :key="columnName"
          :class="columns[columnName].columnSize | columnGird")
          info-render(
            v-if="formValues"
            :data="formValues[columnName]"
            :column="columns[columnName]"
            :minLength="columns[columnName].minLength"
            :isWarp="true")
            template(slot-scope="props")
              span.important-label {{columns[columnName].label}}：
              | {{ props.content }}
        slot
</template>

<script>
/**
 * @name importantInfo 组件
 * @editeAuthor 黄丰瑞 <huangfr@gddit.com>
 * @description 通过字段数组, 字段配置， 字段值 形成重要信息
 */
import InfoRender from '@/components/important-info/info-render.vue'
export default {
  name: 'importantInfo',
  components: {
    InfoRender
  },
  props: {
    infoList: Array, // 字段数组
    formValues: Object, // 字段值
    columns: Object // 字段配置
  },
  filters: {
    columnGird (columnSize = [
      { type: 'md', size: '6' },
      { type: 'sm', size: '12' }
      // { type: 'lg', size: '12' }
    ]) {
      return columnSize.map(size => {
        return `col-${size.type}-${size.size}`
      })
    } // 计算信息项长度
  }
}
</script>
<style scoped lang="sass">
.important-wrap
  font-size: 14px
  padding: 12px 15px
  line-height: 2.4
  border: 1px solid #ddd
  .important-info
    margin: 0 auto
    .important-label
      font-weight: bold
</style>
