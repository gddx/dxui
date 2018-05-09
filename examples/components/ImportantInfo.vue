<template lang='pug'>
  div.main
    h3 信息展示
    important-info(
      :infoList="infoList"
      :formValues="formValues"
      :columns="columns"
    )
</template>

<script>
/** */
export default {
  name: 'InfoPage',
  data () {
    return {
      infoList: ['name', 'jobNumber', 'loginName'],
      formValues: {
        name: '信息体名称',
        jobNumber: '123123',
        loginName: '测试'
      },
      columns: {
        jobNumber: {
          label: '工号',
          width: 100
        },
        loginName: {
          label: '账号',
          width: 100
        },
        name: {
          label: '姓名',
          width: 120
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
