<template lang="pug">
  el-tabs(
    class="main-tabs"
    v-model="tabContent")
    el-tab-pane(
      class="main-tabs-pane"
      v-for="(tab, index) in tabList"
      :key="index"
      :label="tab.label" :name="tab.name")
      slot(:name="tab.name")
</template>

<script>

/**
 * @name tab 组件
 * @author 黄丰瑞 <huangfr@gddit.com>
 * @description 通过配置路由,tabList形成tab
 * ---
 * @update 林墁霓 2018-1-4修改样式
 */

export default {
  name: 'tab-pane',
  props: {
    title: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => []
    },
    initIndex: {
      type: Number,
      default: 0
    },
    path: {
      type: String
    },
    tabCommon: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    tabContent (to) {
      this.$router.push({
        path: this.path || this.$router.path,
        query: { state: to }
      })
    },
    $route (to) {
      this.tabContent = to.query.state || this.tabList[this.initIndex].name
    }
  },
  data () {
    return {
      tabContent: this.$route.query.state || this.tabList[this.initIndex].name
    }
  }
}
</script>
<style scoped lang="sass">
.main-tabs
  height: 100%
  display: flex
  flex-direction: column
  .main-tabs-pane
    height: 100%
</style>
