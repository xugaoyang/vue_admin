import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/Auth.models'
import Theme from './modules/Theme.models'
import Status from './modules/Status.models'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Auth,
    Theme,
    Status,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState()],
})
