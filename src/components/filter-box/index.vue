<template lang="pug">
  .filter-box
    SmartForm(
      inline=true
      :formList="filterList"
      :columns="filterColumns"
      :values="filterValues"
      :buttonList="buttonList")
</template>
<script>
import { cloneDeep } from 'lodash'
import SmartForm from '@/components/smart-form'

export default {
  name: 'FilterBox',
  components: {
    SmartForm
  },
  props: {
    columns: Object,
    filterList: {
      type: Array,
      default: () => []
    },
    filterBy: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    let filterColumns = {}
    Object.keys(this.columns).map(key => {
      filterColumns[key] = {
        ...this.columns[key],
        form: {
          ...this.columns[key].filter,
          size: 'md'
        }
      }
    })
    return {
      filterValues: cloneDeep(this.filterBy),
      filterColumns: filterColumns,
      buttonList: [{
        name: 'search',
        label: '搜索',
        validate: true,
        func: ({funcProps}) => {
          const { formValues } = funcProps.form
          // console.log(cloneDeep(formValues))
          this.$emit('changeFilterBy', cloneDeep(formValues))
        }
      }, {
        name: 'reset',
        label: '重置',
        func: ({funcProps}) => {
          const { formValues } = funcProps.form
          Object.keys(formValues).map(key => {
            formValues[key] = null
            delete formValues[key]
          })
          // console.log(cloneDeep(formValues))
          this.$emit('changeFilterBy', {})
        }
      }]
    }
  }
}
</script>
