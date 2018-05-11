
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import ButtonPage from '../components/buttonList.vue'
import DataTable from '../components/DataTable.vue'
import FilterBox from '../components/FilterBox.vue'
import ImportantInfo from '../components/ImportantInfo.vue'
import SmartDialog from '../components/SmartDialog.vue'
import SmartFormExt from '../components/SmartForm/index.vue'
import SmartFormSelect from '../components/SmartForm/SmartFormSelect.vue'
import SmartFormTime from '../components/SmartForm/SmartFormTime.vue'
import LoadingPage from '../components/LoadingPage.vue'
import Tab from '../components/Tab.vue'
import StepComponent from '../components/Step.vue'
import NewGridBox from '../components/NewGridBox.vue'
Vue.use(VueRouter)

export default new VueRouter({
  // esModule: false,
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/buttonList',
      component: ButtonPage
    },
    {
      path: '/dataTable',
      component: DataTable
    },
    {
      path: '/filterBox',
      component: FilterBox
    },
    {
      path: '/infoPage',
      component: ImportantInfo
    },
    {
      path: '/smartDialog',
      component: SmartDialog
    },
    {
      path: '/newGridBox',
      component: NewGridBox
    },
    {
      path: '/smartFormPage',
      component: SmartFormExt
    },
    {
      path: '/smartSelect',
      component: SmartFormSelect
    },
    {
      path: '/smartTime',
      component: SmartFormTime
    },
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/step',
      component: StepComponent
    },
    {
      path: '/loadingPage',
      component: LoadingPage
    }
  ]
})
