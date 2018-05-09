<template>
  <div
    class="widget-header"
    :class="[{'line': needLine}]"
    :style="[{'line-height': `${height}px`}, {'font-size': `${size}px`}]">
    <div class="title" v-if="tag === 'title'">
      <span
        :class="`iconfont icon-${icon.icon}`"
        :style="{'color': icon.iconColor}"
        v-if="needIcon"></span>
        <span :style="{'color': fontColor}">{{title}}</span>
    </div>
    <tag
      v-else-if="tag === 'tab'"
      :height="height" />
    <slot name="headerCustom"></slot>
    <div class="menu-button" v-if="menuList">
      <template v-for="(item, index) in menuList">
        <template v-if="item.type === 'button'">
          <a
            v-if="item.methods === 'full' && item.type === 'button'"
            :key=index
            :class="`iconfont icon-${item.icon}`"
            @click="full" />
          <a
            v-else-if="item.type==='button'"
            :key=index
            :class="`iconfont icon-${item.icon}`"
            @click="item.func" />
        </template>
        <router-link
          v-if="item.type==='router'"
          :key=index
          :class="`iconfont icon-${item.icon}`"
          :to="item.link">
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * @name 小器件header
 * @author 温泽荣
 * @description 小器件的头部
 */
import tag from './header-tab.vue'
export default {
  name: 'widget-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'title'
    },
    icon: {
      type: Object,
      default: () => {}
    },
    fontColor: {
      type: String,
      default: '#333'
    },
    height: {
      type: Number,
      default: 40
    },
    size: {
      type: Number,
      default: 16
    },
    needLine: {
      type: Boolean,
      default: true
    },
    menuList: {
      type: Array,
      default: null
    } // type: 'button','router
  },
  components: {
    tag
  },
  computed: {
    needIcon () {
      return this.icon
    }
  },
  methods: {
    routerPush (path) {
      this.$router.push({path: path})
    },
    full () {
      this.$parent.full()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.widget-header {
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.menu-button a{
  cursor: pointer;
  color: #666;
}
.line {
  border-bottom: 1px solid #e8e8e8
}
</style>
