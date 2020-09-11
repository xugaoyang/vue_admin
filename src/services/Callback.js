import _ from 'lodash'
import EascService from './Easc'

const clearLoginInfo = () => {
  app.$store.dispatch('clearUserInfo')
}
const requestRefresh = async (config) => {
  const instance = axios.create({
    headers: {
      'Content-Type': config.headers['Content-Type'],
    },
  })
  let againRes = null
  if (config.method === 'get') {
    const newRes = await axios.get(config.url)
    if (!(newRes && newRes.data)) {
      clearLoginInfo()
    }
    againRes = newRes.data
  } else if (config.method === 'post') {
    const newRes = await instance.post(config.url, config.data)
    if (!(newRes && newRes.data)) {
      clearLoginInfo()
    }
    againRes = newRes.data
  } else if (config.method === 'patch') {
    const newRes = await instance.patch(config.url, config.data)
    if (!(newRes && newRes.data)) {
      clearLoginInfo()
    }
    againRes = newRes.data
  }
  return againRes
}
const errorHandle = async (err, status) => {
  const errInfo = err.response
  if (_.includes([401, 403], status)) {
    const refreshToken = app.$store.getters['Auth/refreshToken']
    if (!refreshToken) {
      app.$message.warning('请先登录')
      return clearLoginInfo()
    }
    const refreshRes = await EascService.refreshToken({
      refreshToken,
    })
    if (!(refreshRes && refreshRes.innerResponse)) return clearLoginInfo()
    const resData = refreshRes.innerResponse
    app.$store.dispatch('Auth/token', resData.access_token)
    app.$store.dispatch('Auth/tokenType', resData.token_type)
    app.$store.dispatch('Auth/refreshToken', resData.refresh_token)
    axios.defaults.headers.common.Authorization = `Bearer ${resData.access_token}`
    apiInstance.defaults.headers.common.Authorization = `Bearer ${resData.access_token}`
    eascInstance.defaults.headers.common.Authorization = `Bearer ${resData.access_token}`
    if (errInfo) {
      return requestRefresh(errInfo.config)
    }
  }
  if (status === 404) {
    return app.$message.error('请求的资源不存在')
  }
  return app.$message.error(err.message)
}

export default (err, res) => {
  if (err) {
    const info = JSON.parse(JSON.stringify(err))
    if (info && info.response) {
      return errorHandle(err, info.response.status)
    }
  }
  if (res.data.code) {
    return {
      code: res.data.code,
      message: res.data.msg,
    }
  }
  return res.data
}
