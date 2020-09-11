import _ from 'lodash'

const Status = {
  namespaced: true,
  state: {
    pageLoading: false,
    isLogin: false,
  },
  getters: {
    pageLoading(state) {
      return state.pageLoading
    },
    isLogin(state) {
      return state.isLogin
    },
  },
  mutations: {
    updateState(state, { payload }) {
      _.assign(state, payload)
    },
  },
  actions: {
    isLogin({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          isLogin: data,
        },
      })
    },
    pageLoading({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          pageLoading: data,
        },
      })
    },
  },
}

export default Status
