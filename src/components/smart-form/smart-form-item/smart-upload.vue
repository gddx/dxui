<template lang="pug">
  .file-warp.row
    .file-list(
      v-for="(file, index) in fileList"
      :key="index")
      .icon.iconfont.icon-close-cri(@click="close(index)")
      img(:src="file.url" alt="")
      .file-name {{file.fileName}}
    .upload-button
      .icon.iconfont.icon-add
      form(ref="uploadForm")
        input(
          type="file"
          :name="fieldName"
          :multiple="isMultiple"
          @change="changeFile")
</template>

<script>

import lrz from 'lrz'
import { getFileURL } from '@/utils/common'
import upload from './upload.png'

export default {
  name: 'SmartUpload',
  props: {
    fieldName: { // 后端接收的字段名. 默认是files
      type: String,
      default: 'files'
    },
    compress: { // 压缩比例(值越小, 压缩强度越大)
      type: Number,
      default: 0.5
    },
    isMultiple: { // 是否支持同时多选文件
      type: Boolean,
      default: true
    },
    resource: { // 上传接口
      type: String,
      default: 'upload?resType=EVENT'
    },
    limit: Number
  },
  data () {
    const formData = new FormData()
    return {
      fileList: [],
      index: 0,
      formData: formData
    }
  },
  methods: {
    changeFile (e) {
      if (this.limit && this.limit === this.fileList.length) {
        this.$message({
          type: 'error',
          message: '只能添加' + this.limit + '个文件！'
        })
        this.$refs.uploadForm.reset() // 清除input的内容, 防止二次上传时无效
      } else {
        const { files } = e.target
        if (files && files.length) { // 判断文件是否选择为空
          this.isLoading = true // 开启加载
          this.checkFile(files)
        }
      }
    },
    checkFile (files) { // 判断是否为图片, 如果是则做压缩处理,否则直接上传
      if (files[this.index].type.indexOf('image') !== -1) {
        this.lrzFile(files)
      } else {
        this.setUploadFile(files[this.index], files)
      }
    },
    lrzFile (files) { // 压缩文件
      lrz(files[this.index], {
        width: 1000,
        fieldName: this.fieldName, // 后端接收的字段名. 默认是file
        quality: this.compress // 压缩质量 0-1 默认不填为0.7
      }).then(data => {
        this.setUploadFile(data.file, files)
      }).catch(err => {
        console.log(err)
      })
    },
    setUploadFile (file, files) { // 文件上传的处理
      // 第三个参数是filename
      this.formData.append('files', file, files[this.index].name) // 添加到请求体
      this.index++
      if (this.index !== files.length) { // 判断所选择的文件数据是否都压缩完成
        // 若没有则继续下一个压缩
        this.checkFile(files)
      } else {
        // 提交
        this.postFile(this.formData)
        // 初始化数据
        this.index = 0
        this.formData = ''
        this.formData = new FormData()
      }
    },
    postFile (formData) { // 上传接口
      this.$post({
        url: this.resource,
        data: formData
      }).then(data => {
        if (data) {
          this.showFileList(data)
          this.$refs.uploadForm.reset() // 清除input的内容, 防止二次上传时无效
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showFileList (files) { // 显示文件列表
      this.fileList = [...this.fileList, ...files.map(file => {
        const { shortUrl, fileType, fileName } = file.data
        const imgType = ['jpg', 'png', 'bmp', 'gif', 'tiff', 'svg', 'JPG', 'PNG', 'BMP', 'GIF', 'TIFF']
        const isImg = imgType.indexOf(fileType) !== -1
        const isBolb = fileName === 'blob'
        if (file.code === 0) {
          return {
            id: file.id,
            url: (isImg || isBolb) ? getFileURL(shortUrl) : upload,
            fileName: fileName
          }
        }
      })]
      this.emitFiles(this.fileList)
    },
    emitFiles (files) { // 广播到上一级
      this.$emit('input', files.map(file => file.id))
    },
    close (index) { // 去除文件事件
      this.fileList.splice(index, 1)
      this.emitFiles(this.fileList)
    }
  }
}
</script>

<style scoped lang="sass">
.file-base-block
  width: 150px
  height: 150px
  border: 1px dashed #ddd
  margin: 10px
.file-base-abs
  position: absolute
  top: 0px
  right: 0px
.file-base-100
  width: 100%
  height: 100%
.file-warp
  width: 100%
  max-width: 550px
.upload-button
  @extend .file-base-block
  position: relative
  display: inline-block
  overflow: hidden
  text-align: center
  line-height: 150px
  form
    @extend .file-base-100
    input
      @extend .file-base-100
      @extend .file-base-abs
      opacity: 0
      -ms-filter: 'alpha(opacity=0)'
      cursor: pointer
  .icon-add
    @extend .file-base-100
    font-size: 35px
    color: #c4c3c3
.file-list
  @extend .file-base-block
  position: relative
  img
    @extend .file-base-100
  .icon-close-cri
    @extend .file-base-abs
    top: -10px
    right: -5px
    font-size: 22px
    cursor: pointer
    color: #ff6a6a
  .file-name
    @extend .file-base-100
    position: absolute
    font-size: 13px
    height: 30px
    line-height: 30px
    color: #fff
    bottom: 0
    text-indent: 1em
    background: rgba(0, 0, 0, 0.5)
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
</style>
