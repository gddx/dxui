<template lang="pug">
  div(@keyup.enter="formEnter")
    form.form(
      ref="form"
      :class="[{'form-inline': inline}, {'row': !inline}]"
      v-model="formValues")
      SmartFormItem(
        v-for="(columnName,index) in formResultList"
        v-model="formValues[columnName]"
        v-if="columns[columnName].form.type !== 'hidden'"
        :inline="inline"
        :labelSize="labelSize"
        :key="columnName"
        :columns="columns"
        :column="columns[columnName]"
        :columnName="columnName"
        :columnsLabelShow="columnsLabelShow"
        :optionFilter="optionFilter[columnName]"
        :values="formValues"
        :smartStyle="smartStyle"
        :errorState="$v.formValues[columnName]"
        @input="$v.formValues[columnName]?$v.formValues[columnName].$touch():null"
        @changeFormValue="changeFormValue")
      slot(name="customFormItem")
      div(:class="{'col-xl-12':!inline && formButtonList.length}")
        .form-group(:class="{'row':!inline}")
          label(:class="!inline?labelSize:null|labelGird")
          ButtonList(
            :class="!inline?labelSize:null|antiLabelGird|labelGird"
            :buttonList="formButtonList")
</template>

<script>
// import { cloneDeep } from 'lodash'
import { validationMixin } from 'vuelidate'
import { validations } from './validations'
import SmartFormItem from './SmartFormItem'
import ButtonList from '@/components/ButtonList'

export default {
  mixins: [validationMixin],
  name: 'SmartForm',
  components: {
    SmartFormItem,
    ButtonList
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    }, // 表单元素是否行内布局
    labelSize: {
      type: Number,
      default: 3
    }, // 表单元素是否行内布局
    formList: {
      type: Array,
      default: () => []
    }, // 表单元素列表
    columns: {
      type: Object,
      default: () => {}
    },
    columnsLabelShow: {
      type: Boolean,
      default: true
    }, // 表单标签是否显示
    values: {
      type: Object,
      default: () => ({})
    },
    formSubmitIndex: {
      type: Number,
      default: 0
    },
    smartStyle: {
      type: Object,
      default: () => ({})
    },
    buttonList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    let optionFilter = {}
    this.formList.map(formItem => {
      this.columns[formItem].form.name = formItem
      if (this.columns[formItem].optionFilter) {
        optionFilter[formItem] = this.columns[formItem].optionFilter
      }
    })
    return {
      formResultList: this.formList,
      optionFilter: optionFilter,
      formValues: this.values,
      formButtonList: this.buttonList.map(button => {
        return {
          ...button,
          funcProps: {
            ...button.funcProps,
            form: this
          },
          func: ({funcProps}) => {
            if (button.validate) {
              funcProps.form.$v.formValues.$touch()
              if (!funcProps.form.$v.formValues.$error) {
                button.func({funcProps})
              } else {
                return false
              }
            } else {
              button.func({funcProps})
            }
          }
        }
      })
    }
  },
  filters: {
    labelGird (labelSize, size) {
      const labelClass = labelSize ? 'col-sm-' + labelSize : null
      const sizeClass = size ? 'col-form-label-' + size : null
      return [labelClass, sizeClass]
    }, // 计算label长度
    antiLabelGird (labelSize) {
      return labelSize ? 12 - labelSize : null
    } // 计算表单组件长度
  },
  methods: {
    formEnter () {
      if (this.formSubmitIndex < this.formButtonList.length) {
        const button = this.formButtonList[this.formSubmitIndex]
        const { func, funcProps } = button
        func({
          funcProps: {
            button,
            ...funcProps
          }
        })
      }
    },
    changeFormValue ({name, value}) {
      this.formValues[name] = value
      this.$emit('changeFormValue', this.formValues)
      const chains = this.columns[name].form.chains
      if (chains) {
        chains.map(chain => {
          const { type, target } = chain
          if (type === 'value') {
            this.formValues[target] = value
          }
          if (type === 'clear') {
            this.formValues[target] = null
            delete this.formValues[target]
          }
          if (type === 'optionFilter') {
            if (!this.optionFilter[target]) {
              this.$set(this.optionFilter, target, {})
            }
            this.$set(this.optionFilter[target], chain.key || 'parentId', value)
          }
          if (type === 'optionClear') {
            if (this.optionFilter[target]) {
              this.$delete(this.optionFilter[target], chain.key || 'parentId')
            }
          }
          if (type === 'visiable') {
            if (value) {
              this.$set(this, 'formResultList', target.show)
            } else {
              this.$set(this, 'formResultList', target.hide)
            }
          }
          if (type === 'function') {
            chain.func({
              funcProps: chain.funcProps,
              name,
              value,
              target,
              optionFilter: this.optionFilter,
              formValues: this.formValues,
              formResultList: this.formResultList,
              columns: this.columns
            })
          }
        })
      }
    },
    resetFormValue () {
      this.formValues = {}
    }
  },
  validations () {
    return validations({
      formList: this.formResultList,
      columns: this.columns
    })
  }
}
</script>
<style scoped lang="sass">
.form
  .button-wrap
    .btn
      margin-bottom: 8px
  .form-group
    margin-bottom: 10px
.form-inline
  .col-form-label
    padding: 0 8px
  .button-wrap
    margin-left: 8px
    .btn
      margin-bottom: 0
</style>
