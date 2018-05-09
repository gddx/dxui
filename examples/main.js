// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './app.vue'
import router from './routers'
// const dxui = require('../src/index')
import dxui from '../src/index'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/index.scss'

import {
  Pagination,
  Cascader,
  // Button,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  // Tree,
  Row,
  Col,
  // Checkbox,
  // Table,
  // TableColumn,
  // Breadcrumb,
  // BreadcrumbItem,
  Tabs,
  TabPane,
  // Steps,
  // Step,
  Input,
  InputNumber
  // Loading,
  // CheckboxGroup
} from 'element-ui'
// Vue.use(Loading)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
// Vue.use(Table)
// Vue.use(TableColumn)
Vue.use(Pagination)
// Vue.use(Checkbox)
Vue.use(Cascader)
// Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
// Vue.use(Tree)
Vue.use(Row)
Vue.use(Col)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(CheckboxGroup)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Steps)
// Vue.use(Step)
Vue.use(InputNumber)

Vue.use(dxui)
console.log(dxui)
// Vue.config.productionTip = false

/* eslint-disable no-new */
/* 延迟挂载 */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
