import $echarts from 'echarts'
import dayjs from 'dayjs'
import store from '@/models/store'
import router from '@/router'
import ConsoleTrigger from '@/assets/config/consoleTrigger'
import App from './App'
import fnMixin from './assets/js/fnMixins'
import './plugins/element'
import '@/assets/scss/screen.scss'

const currentEnv = _.cloneDeep(process.env)
currentEnv.DEBUG = currentEnv.VUE_APP_DEBUG === 'true' || fnMixin.methods.urlParam('DEBUG')
Vue.config.devtools = currentEnv.DEBUG
Vue.config.productionTip = !currentEnv.DEBUG
ConsoleTrigger(currentEnv.DEBUG)
dayjs.locale('zh-cn')
localforage.setDriver(localforage.LOCALSTORAGE)

const apiInstance = axios.create()
const eascInstance = axios.create()
const init = () => {
  apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER
  eascInstance.defaults.baseURL = currentEnv.VUE_APP_EASC_SERVER
  _.assign(window, {
    _,
    axios,
    apiInstance,
    eascInstance,
    dayjs,
    localforage,
    currentEnv,
  })
  _.assign(Vue.prototype, {
    _,
    dayjs,
    currentEnv,
    $echarts,
  })
  const app = new Vue({
    router,
    store,
    render: (h) => {
      return h(App)
    },
  }).$mount('#app')

  _.assign(window, {
    app,
  })
}

const url = './extraConfig.json'
axios.get(url).then(async (extraConfigRes) => {
  if (extraConfigRes && extraConfigRes.data) {
    _.assign(currentEnv, extraConfigRes.data)
    return init()
  }
  return init()
})
