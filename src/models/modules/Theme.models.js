import _ from 'lodash'

const SystemConfig = {
  namespaced: true,
  state: {
    currentTheme: 'white',
    pageTags: [],
    currentTag: null,
    latestPath: null,
  },
  getters: {
    currentTheme(state) {
      return state.currentTheme
    },
    pageTags(state) {
      return state.pageTags
    },
    currentTag(state) {
      return state.currentTag
    },
    latestPath(state) {
      return state.latestPath
    },
  },
  mutations: {
    currentTheme(state, payload) {
      _.assign(state, {
        currentTheme: payload,
      })
    },
    ADD_PAGE_TAG(state, payload) {
      state.pageTags.push(payload)
    },
    pageTags(state, payload) {
      _.assign(state, {
        pageTags: payload,
      })
    },
    currentTag(state, payload) {
      _.assign(state, {
        currentTag: payload,
      })
    },
    latestPath(state, payload) {
      _.assign(state, {
        latestPath: payload,
      })
    },
  },
  actions: {
    currentTheme({ commit }, payload) {
      commit('currentTheme', payload)
    },
    addTag({ commit }, payload) {
      commit('ADD_PAGE_TAG', payload)
    },
    pageTags({ commit }, payload) {
      commit('pageTags', payload)
    },
    currentTag({ commit }, payload) {
      commit('currentTag', payload)
    },
    latestPath({ commit }, payload) {
      commit('latestPath', payload)
    },
  },
}

export default SystemConfig
