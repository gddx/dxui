<template>
  <div class="tabs">
    <div
      class="tabs-link-bar"
      :style="{width: `${lineWidth}px`, transform: `translateX(${leftPx}px)`}"/>
    <div class="nav-tabs-item"
      v-for="(item, index) in tagList"
      :class="{'active': tagIndex === index}"
      :key="index"
      :ref="`item`"
      @click="setIndex(index)">
      {{item.title}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'tab',
  props: {
    height: {
      type: Number
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.lineWidth = this.$refs.item[this.tagIndex].clientWidth
      this.leftPx = this.$refs.item[this.tagIndex].offsetLeft - 20
    })
  },
  watch: {
    tagIndex: function () {
      this.lineWidth = this.$refs.item[this.tagIndex].clientWidth
      this.leftPx = this.$refs.item[this.tagIndex].offsetLeft - 20
    }
  },
  data () {
    return {
      tagList: [{
        title: '销售销售'
      }, {
        title: '买买买'
      }],
      lineWidth: 0,
      tagIndex: 0,
      leftPx: 0
    }
  },
  methods: {
    setIndex (index) {
      this.tagIndex = index
      let tagList = {
        title: this.tagList[index].title,
        index: index
      }
      this.$parent.$parent.$emit('tagList', tagList)
    }
  }
}
</script>
<style scoped>
.tabs {
  display: flex;
}
.tabs-link-bar {
  height: 3px;
  background-color: #1890ff;
  position: absolute;
  bottom: -1px;
  transition: all .3s
}
.active {
  color: #1890ff;
}
.nav-tabs-item {
  padding: 0 10px;
  cursor: pointer;
}
</style>
