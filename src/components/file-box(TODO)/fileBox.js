import video from '@/assets/img/video.jpg'
import files from '@/assets/img/upload.png'
import { getFileURL } from '@/utils/common'
import Lightbox from 'vue-image-lightbox'
import VideoBox from './VideoBox'

/* name: Lightbox
 * desc: 查看图片插件
  调用this.$lightbox({
    // 图片数组
    images: [{
      thumb: 'http://example.com/thumb.jpg',
      src: 'http://example.com/image.jpg',
      caption: 'caption to display. receive <html> <b>tag</b>', // Optional
    }],
    // 图片下标
    index: 图片位置
  })0
*/

export const lightbox = {
  install (Vue, options = {
    images: [],
    index: 0
  }) {
    const LightboxConstructor = Vue.extend(Lightbox)
    Vue.prototype.$lightbox = (options) => {
      // Vue的extend为局部定义, 所以props的传入应该使用 propsData
      const instance = new LightboxConstructor({
        propsData: options
      })
      // 调用showImage的方法
      instance.showImage(options.index)
      instance.vm = instance.$mount()
      const el = instance.vm.$el
      document.body.appendChild(el)
      return instance
    }
  }
}

export const videobox = {
  install (Vue, options = {}) {
    const LightboxConstructor = Vue.extend(VideoBox)
    Vue.prototype.$videobox = (options) => {
      // console.log(options)
      const instance = new LightboxConstructor({
        propsData: options
      })
      // 调用showImage的方法
      instance.showVideo()
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      return instance
    }
  }
}

// 获取文件列表
export const getFileList = (list = []) => {
  const imgType = ['jpeg', 'jpg', 'png', 'base64', 'bmp', 'JPG', 'JPEG', 'PNG', 'BASE64', 'BMP']
  return list.length ? list.map(item => {
    // 定义文件路径
    const path = getFileURL(item.shortUrl)
    if (item.fileType === 'mp4') { // 文件类型
      return {
        type: 'video',
        thumb: video,
        src: video,
        path
      }
    } else if (imgType.indexOf(item.fileType) >= 0) {
      const url = item.fileType === 'base64' ? item.base64 : path
      return {
        type: 'image',
        thumb: url,
        src: url
      }
    } else { // 附件类型
      const path = getFileURL(item.shortUrl)
      return {
        type: 'files',
        thumb: files,
        src: files,
        path
      }
    }
  }) : []
}
