<template lang="pug">
  div.container
      .page-form-wrapper.row
        .page-form.col-md-12.col-lg-9.col-xl-7
          .row.title(v-if="title")
            h2.offset-md {{title}}
          SmartForm(
            :labelSize="labelSize"
            :formList="formList"
            :formLabelWidth="formLabelWidth"
            :columns="columns"
            :values="formValues"
            :buttonList="buttonList")
          hr
          h2.offset-md 单个表单组件的调用
          h4 所有smartForm中的组件都可以单独调用,建议一般表单使用SmartForm(已经封装好的表单组件集合)，除非有迫不得已的需求再单独使用
          ul.row
            li.col-sm-6.col-md-4.col-lg-6.col-xlg-6(v-for="(item, index) in formSingleLink" :key="index")
              router-link(:to="item.to") {{item.label}}
</template>

<script>
import {formlink} from './form.js'
export default {
  name: 'SmartFormPage',
  props: {
    title: {
      type: String,
      default: ''
    },
    labelSize: {
      type: Number,
      default: 4
    },
    submitResource: {
      type: String,
      default: ''
    }, /* 标题英文名 */
    formList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    formValues: {
      type: Object,
      default: () => ({})
    },
    formLabelWidth: {
      type: Number,
      default: 300
    },
    buttonList: {
      type: Array,
      default () {
        return [{
          name: 'submit',
          label: '提交',
          type: 'complete',
          validate: true,
          funcProps: {
            table: this
          },
          func ({funcProps}) {
            const { form, button, table } = funcProps
            button.loading = true
            table.$post({
              url: table.submitResource,
              data: form.formValues
            }).then(data => {
              button.loading = false
              if (data) {
                table.getData()
              }
            })
          }
        }]
      }
    }
  },
  created () {
    this.getData()
  },
  data () {
    return {
      formSingleLink: formlink
    }
  },
  methods: {
    getData () {
    }
    // getData () {
    //   this.$get({
    //     url: 'sys/config'
    //   }).then(data => {
    //     if (data) {
    //       this.columns = data.columns
    //       this.formList = Object.keys(data.columns)
    //       this.formValues = data.data
    //       this.hasColumns = true
    //       this.formList.map(formItem => {
    //         const { relation } = this.columns[formItem]
    //         if (relation !== '') {
    //           this.columns[formItem].form.labelSize = 5
    //           this.columns[formItem].options = data.relation[relation]
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style lang="sass" scoped>
.title
  margin-bottom: 10px
.page-form-wrapper
  // margin: 40px
  margin-bottom: 40px
  .page-form
    margin: 0 auto
</style>
