<template lang="pug">
  multiselect(
    track-by="value"
    label="label"
    :options="optionsResult"
    :searchable="live"
    :multiple="multiple"
    :close-on-select="!multiple"
    :show-labels="false"
    :custom-label="customLabel"
    :placeholder="placeholder"
    v-model="currentValue")
    span(slot="noResult") 没有选项
    template(
      v-if="subtext"
      slot-scope="props"
      slot="option")
      slot(name="option")
        span(class="multiselect-label") {{ props.option.label }}
        span(class="multiselect-subtext") {{ props.option[subtext] }}
    template(
      v-if="isClear"
      slot="clear",
      slot-scope="props")
      .multiselect__clear(
        @mousedown.prevent.stop="clearAll()"
      )
        i.iconfont.icon-close
</template>

<script>
/**
 * update
 * multiselect增加對多選的支持……
 */
import { filter } from 'lodash'
import Multiselect from 'vue-multiselect'

export default {
  name: 'SmartSelect',
  components: {
    Multiselect
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String | Number
    },
    options: {
      type: Array,
      default: () => []
    },
    optionFilter: {
      type: Object | Function
    },
    subtext: {
      type: String
    },
    isClear: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentValue: {
      get () {
        if (this.multiple) {
          const value = this.value || []
          console.info(value)
          return this.options.filter(item => value.indexOf(item.value) >= 0)
          // if (this.value !== []) {
          //   let returnArray = []
          //   this.options.forEach(element => {
          //     if (value.indexOf(element.parentId) >= 0) {
          //       returnArray.push(element)
          //     }
          //   })
          //   // console.log(returnArray)
          //   return returnArray
          //   // console.log(this.options.filter(item => value.indexOf(item.value) >= 0))
          // } else {
          //   return this.options.filter(item => value.indexOf(item.value) >= 0)
          // }
        } else {
          return this.options.find(item => item.value === this.value)
        }
      },
      set (val) {
        if (this.multiple) {
          this.$emit('input', val.map(v => v.value))
        } else {
          this.$emit('input', val ? val.value : val)
        }
      }
    },
    optionsResult () {
      const filterList = filter(this.options, this.optionFilter)
      return filterList
    }
  },
  methods: {
    // 检查了multiselect源码，发现multiselect的过滤只能过滤custom的内容
    customLabel (option, label) {
      let searchList = [option.label]
      if (this.subtext) {
        searchList.push(option[this.subtext])
      }
      return searchList.join(' - ')
    },
    clearAll () {
      if (this.multiple) {
        this.$emit('input', [])
      } else {
        this.$emit('input', '')
      }
    }
  }
}
</script>
