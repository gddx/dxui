<template lang="pug">
  .row.imgRow(v-viewer="options")
    .col-md-3.col-sm-4.img-list(
      v-for="(file, index) in files"
      :key="index")
      img(
        ref="file"
        :onerror="logo"
        :src="file.src"
        @click="showEvent(file, index)")
</template>

<script>
import { getFileList } from './fileBox'

/**
 * @name FileBox 组件
 * @author 黄丰瑞 <huangfr@gddit.com>
 * @description 通过文件路径,显示图片跟视频的缩略图，并且点击可放大浏览
 *
 * @update
 * @author 温泽荣
 * @description 下载files
 * @update
 * @author 林墁霓
 * @description 修改lightbox，采用第三方插件viewer，提供options: {
 * inline: true, // 行内显示，对应是modal,块状显示
    button: true, //显示顶部放大按钮
    navbar: true, // 显示底部小图导航预览
    title: true, // 显示文字
    toolbar: true, // 显示操作栏
    tooltip: true, // --
    movable: true, // 拖拽移动
    zoomable: true, // 缩放
    rotatable: true, // 旋转
    scalable: true, // 翻转
    transition: true, // 动效
    fullscreen: true, // 全屏
    keyboard: true // 键盘}
*/

export default {
  props: {
    fileList: { // 文件
      type: Array,
      default: () => []
    }
  },
  data () {
    console.info('getFileList(this.fileList):', getFileList(this.fileList))
    return {
      files: getFileList(this.fileList),
      options: {}, // 图片viewer的控制
      logo: 'this.src="' + require('@/assets/img/imgError.png') + '"'
    }
  },
  methods: {
    showEvent (file, index) {
      const _this = this
      // const imgList = this.files.filter(item => item.type === 'image')
      const fileTypeFunc = {
        image () {
          // _this.$lightbox({
          //   images: imgList,
          //   index: index
          // })
        },
        video () {
          _this.$videobox({
            videoURL: file.path
          })
          event.stopPropagation()
          event.preventDefault()
        },
        files () {
          // 生成a标签，模拟click下载files
          let a = document.createElement('a')
          a.href = file.path
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      }
      // 调用查看事件
      fileTypeFunc[file.type]()
    }
  }
}
</script>

<style scoped lang="sass">
$back: 10px
$color: #ddd
.icon
  margin-right: 2 * $back
.fileRow
  div
    padding: $back
    margin-bottom: $back
    border-radius: $back - 2px
    border: 1px solid $color
    transition: all 0.4s
    overflow: hidden
    text-overflow: ellipsis      
  div:hover
    background: $color
.imgRow
  width: 100%
  margin: 0
.img-list
  padding: $back
  text-align: center
  img
    cursor: pointer
    max-width: 100%
    max-height: 15 * $back
</style>
