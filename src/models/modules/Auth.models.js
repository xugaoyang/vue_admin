import _ from 'lodash'

const param = {
  namespaced: true,
  state: {
    userInfo: null,
    rsaKey: null,
    token: null,
    tokenType: null,
    refreshToken: null,
    authCode: null,
  },
  mutations: {
    updateState(state, { payload }) {
      _.assign(state, payload)
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    },
    rsaKey(state) {
      return state.rsaKey
    },
    token(state) {
      return state.token
    },
    tokenType(state) {
      return state.tokenType
    },
    authCode(state) {
      return state.authCode
    },
    refreshToken(state) {
      return state.refreshToken
    },
  },
  actions: {
    clearUserInfo({ commit }) {
      commit({
        type: 'updateState',
        payload: {
          userInfo: null,
          rsaKey: null,
          token: null,
          tokenType: null,
          authCode: null,
          refreshToken: null,
        },
      })
    },
    userInfo({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          userInfo: data,
        },
      })
    },
    rsaKey({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          rsaKey: data,
        },
      })
    },
    token({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          token: data,
        },
      })
    },
    tokenType({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          tokenType: data,
        },
      })
    },
    authCode({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          authCode: data,
        },
      })
    },
    refreshToken({ commit }, data) {
      commit({
        type: 'updateState',
        payload: {
          refreshToken: data,
        },
      })
    },
  },
}

export default param
