import HelloWorld from '@/components/hello-world'
import LoadingPage from '@/components/loading-page'
import ButtonList from '@/components/button-list'
import SmartDialog from '@/components/smart-dialog'
// import Filterbox from '@/components/filter-box'
import ImportantInfo from '@/components/important-info'
import NewGridBox from '@/components/new-grid-box'
import Tab from '@/components/tab'
/**
 * 划重点----组件路径命名要小写，不然install的时候大小写问题会报找不到
 */
const components = {
  HelloWorld,
  LoadingPage,
  ButtonList,
  SmartDialog,
  // Filterbox,
  ImportantInfo,
  Tab,
  NewGridBox
}

const dxui = {
  ...components
}

const install = function (Vue, opts = {}) {
  if (install.installed) return
  // locale.use(opts.locale)
  // locale.i18n(opts.i18n)

  Object.keys(dxui).forEach(key => {
    Vue.component(key, dxui[key])
  })

  Vue.prototype.$dxloading = LoadingPage
  // Vue.prototype.$Message = Message
  // Vue.prototype.$Modal = Modal
  // Vue.prototype.$Notice = Notice
  // Vue.prototype.$Spin = Spin
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  // locale: locale.use,
  // i18n: locale.i18n,
  install,
  // Circle,
  // Switch,
  ...components
}

API.lang = (code) => {
  // const langObject = window['iview/locale'].default
  // if (code === langObject.i.locale) locale.use(langObject)
  // else console.log(`The ${code} language pack is not loaded.`) // eslint-disable-line no-console
}

// module.exports.default = module.exports = API // eslint-disable-line no-undef
export default API
