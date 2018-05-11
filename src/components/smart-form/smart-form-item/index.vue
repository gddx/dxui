<template lang="pug">
  div(:class="inline|columnGird(column.form.columnSize)")
    .form-group(:class="[{'row':!inline},{'has-error':errorState.$error}]")
      label.col-form-label.text-sm-right(
        v-if="columnsLabelShow"
        :for="'form-'+columnName"
        :class="!inline?(column.form.labelSize||labelSize):null|labelGird(column.form.size)")
        span.text-danger(v-if="labelRequired") *
        | {{column.label}}
      .col-form-item(:class="!inline?(column.form.labelSize||labelSize):null|antiLabelGird|labelGird")
        .input-group(
          :class="'input-group-'+column.form.size"
          :style="groupStyle")
          SmartFormAddon(v-if="column.form.prefix",v-bind="column.form.prefix")
          SmartText(
            v-if="readOnly || column.form.type === 'text'"
            v-bind="column.form"
            v-model="currentValue"
            :columns="columns"
            :column="column"
            :smartStyle="smartStyle"
            :options="column.options")
          SmartInput.form-control(
            v-else-if="column.form.type === 'input'"
            v-bind="column.form"
            v-model="currentValue")
          SmartTextarea(
            v-else-if="column.form.type === 'textarea'"
            v-bind="column.form"
            v-model="currentValue")
          SmartPassword.form-control(
            v-else-if="column.form.type === 'password'"
            v-bind="column.form"
            v-model="currentValue")
          SmartSelect(
            v-else-if="column.form.type === 'select'"
            v-bind="column.form"
            v-model="currentValue"
            :options="column.options"
            :optionFilter="optionFilter")
          SmartTree(
            v-else-if="column.form.type === 'tree'"
            v-bind="column.form"
            v-model="currentValue"
            :options="column.options"
            :optionFilter="optionFilter")
          SmartCascader(
            v-else-if="column.form.type === 'cascader'"
            v-bind="column.form"
            v-model="currentValue"
            :options="column.options"
            :optionFilter="optionFilter")
          SmartDate(
            v-else-if="column.form.type === 'date'"
            v-bind="column.form"
            v-model="currentValue")
          SmartDateRange(
            v-else-if="column.form.type === 'daterange'"
            v-bind="column.form"
            v-model="currentValue")
          SmartTime(
            v-else-if="column.form.type === 'time'"
            v-bind="column.form"
            v-model="currentValue")
          //- SmartButton(
          //-   v-else-if="column.form.type === 'button'"
          //-   v-bind="column.form"
          //-   v-model="currentValue")
          SmartNumber(
            v-else-if="column.form.type === 'number'"
            v-bind="column.form"
            v-model="currentValue")
          SmartNumRange(
            v-else-if="column.form.type === 'numrange'"
            v-bind="column.form"
            v-model="currentValue")
          SmartUpload(
            v-else-if="column.form.type === 'upload'"
            v-bind="column.form"
            v-model="currentValue")
          SmartCheckboxGroup(
            v-else-if="column.form.type === 'checkboxGroup'"
            v-bind="column.form"
            v-model="currentValue"
            :options="column.options"
            :optionFilter="optionFilter")
          SmartFormAddon(v-if="column.form.suffix",v-bind="column.form.suffix")
        .error {{errorMassage}}
</template>

<script>
import SmartText from './smart-text.vue'
import SmartTextarea from './smart-textarea.vue'
import SmartInput from './smart-input.vue'
import SmartPassword from './smart-password.vue'
import SmartSelect from './smart-select.vue'
import SmartTree from './smart-tree.vue'
import SmartDate from './smart-date.vue'
import SmartDateRange from './smart-date-range.vue'
// import SmartButton from '@/components/button-list/button-item'
// import SmartSwitch from './SmartSwitch'
import SmartNumber from './smart-number.vue'
import SmartNumRange from './smart-num-range.vue'
import SmartCascader from './smart-cascader.vue'
// import SmartCheckbox from './SmartCheckbox'
// import SmartDate from './SmartDate'
// import SmartMultiselect from './SmartMultiselect'
import SmartFormAddon from './smart-form-addon.vue'
import SmartUpload from './smart-upload.vue'
import SmartTime from './smart-time.vue'
import SmartCheckboxGroup from './smart-checkbox-group.vue'

export default {
  name: 'SmartFormItem',
  props: {
    columnName: String, // 字段名
    columns: Object,
    column: Object, // 字段配置信息
    inline: Boolean, // 表单布局形式，是否行内布局
    readOnly: {
      type: Boolean,
      default: false
    }, // 只读
    columnsLabelShow: {
      type: Boolean,
      default: true
    },
    smartStyle: {
      type: Object,
      default: () => ({})
    },
    labelSize: {
      type: Number,
      default: 3
    }, // 字段标签长度
    value: String | Number | Object | Array | Set, // 表单控件的值
    optionFilter: Object | Function, // 字段对应的选项集的过滤器
    errorState: {
      type: Object,
      default: () => ({})
    } // 表单控件的值是否出错，出错的状态
  },
  components: {
    SmartText,
    SmartInput,
    SmartTextarea,
    SmartSelect,
    SmartPassword,
    SmartTree,
    SmartDate,
    SmartFormAddon,
    SmartCascader,
    SmartTime,
    SmartDateRange,
    // SmartButton,
    SmartUpload,
    SmartNumber,
    SmartNumRange,
    SmartCheckboxGroup
  },
  data () {
    const { rules } = this.column.form
    return {
      groupStyle: {
        width: this.column.form.width + 'px'
      }, // 表单控件的长度
      errorMassage: '', // 表单错误提示文字，会根据错误状态改变
      labelRequired: rules ? rules.filter(rule => rule.type === 'required').length : false // 此字段是否必填
    }
  },
  watch: {
    errorState: {
      deep: true,
      handler (errorState) {
        if (!errorState.$error) {
          this.errorMassage = ''
        } else {
          this.column.form.rules.map(rule => {
            if (!errorState[rule.type]) {
              this.errorMassage = rule.message
            }
          })
        }
      }
    } // 监听字段填写出错的状态，改变表单的错误提示文字
  },
  filters: {
    labelGird (labelSize, size) {
      const labelClass = labelSize ? 'col-sm-' + labelSize : null
      const sizeClass = size ? 'col-form-label-' + size : null
      return [labelClass, sizeClass]
    }, // 计算label长度
    antiLabelGird (labelSize) {
      return labelSize ? 12 - labelSize : null
    }, // 计算表单组件长度
    columnGird (inline, columnSize = [{type: 'md', size: '12'}]) {
      return !inline ? columnSize.map(size => {
        return `col-${size.type}-${size.size}`
      }) : ['']
    } // 计算表单项长度
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      }, // 表单数据绑定
      set (val) {
        this.$emit('input', val)
        this.$emit('changeFormValue', {name: this.columnName, value: val})
      } // 表单数据绑定，并广播字段操作信息
    }
  }
}
</script>
<style lang="sass" scoped>
.input-group
  .form-control
    z-index: auto
.form-group
  margin-bottom: 10px
  .col-form-label
    padding: 8px
    .text-danger
      font-size: 20px
      line-height: 20px
      padding-right: 4px
      vertical-align: text-top
.form-inline
  .col-form-label, .col-form-item
    padding: 0 8px 0 0
</style>
