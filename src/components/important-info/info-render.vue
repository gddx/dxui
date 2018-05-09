<template>
  <div v-if="content.length > minLength && !isWarp">
    <el-popover
      placement="top-start"
      trigger="hover"
      :width="width">
      <!-- 查看大图 -->
      <span v-if="column.magnifying">
        <img :src="data" :width="column.magnifying.width" :height="column.magnifying.height" />
      </span>
      <span class="text-break" v-else>
        {{content}}
      </span>
      <span slot="reference">
        <slot :content="content">
          {{content}}
        </slot>
      </span>
    </el-popover>
  </div>
  <div class="text-break" v-else>
    <slot :content="content">
      {{content}}
    </slot>
  </div>
</template>

<script>
import { infoRender } from './info-render.js'
export default {
  name: 'info-render',
  props: {
    recordIndex: Array,
    data: String | Number | Object | Array,
    column: Object,
    full: Object,
    isHtml: true,
    minLength: {
      type: Number,
      default: 7
    },
    width: {
      type: Number,
      default: 200
    },
    isWarp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    content () {
      const { data, column, full, recordIndex } = this
      return infoRender({
        data,
        column,
        full,
        index: recordIndex
      })
    }
  }
}
</script>

<style scoped lang="sass">
.text-overflow
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.text-break
  word-break: break-all
  word-wrap: break-word
</style>
