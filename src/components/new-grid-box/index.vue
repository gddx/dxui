<template>
  <div
    :class="[centerClass]">
    <div class="widget-main" :style="boxStyle">
      <widget-header
        v-if="tag !== null"
        :tag="tag"
        :title="title"
        :fontColor="fontColor"
        :icon="headerList"
        :height="height"
        :needLine="needLine"
        :menuList="menuList">
        <slot name="headerCustom" slot="headerCustom">
        </slot>
       </widget-header>
       <div class="widget-body"
        :style="{'height': isFull ? '100%' : `${rowNum * 60 - height - 30}px`}"
        v-if="tag !== null">
          <slot>
          </slot>
       </div>
       <div class="widget-body" v-else>
         <slot>
          </slot>
       </div>
     </div>
  </div>
</template>
<script>
/**
 * @name
 * @author 温泽荣
 * @description 
 * @update： 修改description ：小器件，常用于界面展示多个数据块，封装头部and内容块
 * @updateAuthor: 林墁霓
 */
import widgetHeader from './widget-header'
import screenfull from 'screenfull'
export default {
  name: 'widget',
  components: {
    widgetHeader
  },
  mounted () {
    let that = this
    document.addEventListener(screenfull.raw.fullscreenchange, () => {
      that.isFull = screenfull.isFullscreen
    })
  },
  watch: {
    isFull (value) {
      if (!value) {
        let event = this.$el
        event.setAttribute('class', this.centerClass)
      }
    }
  },
  methods: {
    full () {
      let event = this.$el
      event.setAttribute('class', 'fullScreen')
      screenfull.request(event)
    },
    closeFull () {
      let event = this.$el
      event.removeAttribute('class', 'fullScreen')
      screenfull.request(event)
    }
  },
  data () {
    return {
      fontColor: null,
      height: 40,
      menuList: null,
      needLine: true,
      isFull: false,
      centerClass: `col-md-${this.colmd} col-xlg-${this.colxlg} col-xl-${this.colxl} col-lg-${this.collg} rows-${this.rowNum}`,
      ...this.headerList
    }
  },
  props: {
    colxlg: {
      type: Number,
      default: 6
    },
    colxl: {
      type: Number,
      default: 6
    },
    collg: {
      type: Number,
      default: 6
    },
    colmd: {
      type: Number,
      default: 6
    },
    rowNum: {
      type: Number,
      default: 3
    },
    /*
    * headerList
    * title 标题
    * fontColor 标题颜色
    * icon 图标
    * iconColor 图标颜色
    * menuList 传入menu
    */
    headerList: {
      type: Object,
      default: null
    },
    boxStyle: {
      type: Object,
      default: null
    },
    tag: {
      type: String,
      default: null
    },
    clickFull: { // 双击header放大控件
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .widget-main {
    height: 100%;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
    overflow: hidden;
    background: #fff;
    /* border-radius:5px; */
  }
  .widget-body {
    box-sizing: border-box;
  }
  .fullScreen {
    width: 100%;
    height: 100%;
    padding: 0 !important;
  }
</style>
