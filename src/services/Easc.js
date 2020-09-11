import _ from 'lodash'
import qs from 'qs'
import To from 'await-to-js'
import Callback from '@/services/Callback'

// 自由切换当前模块是否使用mock
const mock = false

export default class EascService {
  static async refreshToken(payload) {
    const instance = mock ? mockInstance : eascInstance
    _.assign(payload, {
      appId: currentEnv.VUE_APP_APP_ID,
    })
    const [err, res] = await To(
      instance.get(`/refreshtoken/${payload.appId}/${payload.refreshToken}`)
    )
    return Callback(err, res)
  }
  static async logout() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get(`/logout/${currentEnv.VUE_APP_APP_ID}`))
    return Callback(err, res)
  }
  // 获取用户权限
  static async getUserAuth(payload) {
    const instance = mock ? mockInstance : eascInstance
    const initParam = {
      appId: currentEnv.VUE_APP_APP_ID,
      userId: '',
    }
    if (payload) {
      _.assign(initParam, payload)
    }
    const [err, res] = await To(
      instance.get(`/auth/applicationpermissionsasync/${initParam.appId}/${initParam.userId}`)
    )
    return Callback(err, res)
  }
  static async getToken(payload) {
    const instance = mock ? mockInstance : eascInstance
    if (payload) {
      _.assign(payload, {
        appId: currentEnv.VUE_APP_APP_ID,
      })
    }
    const [err, res] = await To(instance.get(`/sso/getToken?${qs.stringify(payload)}`))
    return Callback(err, res)
  }
  static async verifyLogin(payload) {
    const instance = mock ? mockInstance : eascInstance
    if (payload.formData) {
      payload.formData.append('appId', currentEnv.VUE_APP_APP_ID.padEnd(36, '0'))
    }
    const [err, res] = await To(instance.post('/sso/verifylogin', payload.formData))
    return Callback(err, res)
  }
  static async qrLogin(payload) {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get(`/sso/checkQRLogin?${qs.stringify(payload)}`))
    return Callback(err, res)
  }
  static async getQrCode() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get('/sso/getLoginQRCode'))
    return Callback(err, res)
  }
  static async checkAuthCode(payload) {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get(`/sso/checkAuthCode?${qs.stringify(payload)}`))
    return Callback(err, res)
  }
  static async refreshAuthCode(payload) {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get(`/sso/refreshAuthCode?${qs.stringify(payload)}`))
    return Callback(err, res)
  }
  static async getVerifyCode() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get('/GetValidationCode'))
    return Callback(err, res)
  }
  static async apiGetLogin(payload) {
    const instance = axios.create({
      baseURL: mock ? currentEnv.VUE_APP_MOCK_SERVER : currentEnv.VUE_APP_EASC_SERVER,
      headers: {},
    })
    const [err, res] = await To(
      instance.get(
        `/login/${currentEnv.VUE_APP_APP_ID.padEnd(36, '0')}/${payload.username}/${
          payload.password
        }`
      )
    )
    return Callback(err, res, { errorMsg: false })
  }
  static async apiRsaSign(payload) {
    const instance = axios.create({
      baseURL: mock ? currentEnv.VUE_APP_MOCK_SERVER : currentEnv.VUE_APP_EASC_SERVER,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: null,
      },
    })
    if (payload.formData) {
      payload.formData.append('appId', currentEnv.VUE_APP_APP_ID.padEnd(36, '0'))
    }
    const [err, res] = await To(instance.post('/rsalogin', payload.formData))
    return Callback(err, res, { errorMsg: false })
  }
  static async apiGetPubKey() {
    const instance = axios.create({
      baseURL: mock ? currentEnv.VUE_APP_MOCK_SERVER : currentEnv.VUE_APP_EASC_SERVER,
      headers: {
        Authorization: null,
      },
    })
    const [err, res] = await To(instance.get('/getrsapublickey'))
    return Callback(err, res, { errorMsg: false })
  }
  static async getUserInfo() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get('/userinfo'))
    return Callback(err, res)
  }
  static async tree() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(
      instance.get(`/org/getallorgswithuserdata/${currentEnv.VUE_APP_APP_ID.padEnd(36, '0')}`)
    )
    return Callback(err, res)
  }
  static async allOrg() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(
      instance.get(`/org/getallorgdata/${currentEnv.VUE_APP_APP_ID.padEnd(36, '0')}`)
    )
    return Callback(err, res)
  }
  static async allUsers() {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(
      instance.get(`/app/getappusersasync/${currentEnv.VUE_APP_APP_ID.padEnd(36, '0')}`)
    )
    return Callback(err, res)
  }
  static async appStatus(payload) {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.get(`/activate_app?${qs.stringify(payload)}`))
    return Callback(err, res)
  }
  static async activateApp(payload) {
    const instance = mock ? mockInstance : eascInstance
    const [err, res] = await To(instance.post('/activate_app', payload))
    return Callback(err, res)
  }
  static async apiSsoLogin(payload) {
    const instance = axios.create({
      baseURL: mock ? currentEnv.VUE_APP_MOCK_SERVER : currentEnv.VUE_APP_EASC_SERVER,
      headers: {},
    })
    const [err, res] = await To(
      instance.get(`/ssologin/${currentEnv.VUE_APP_APP_ID}/${payload.userId}`)
    )
    return Callback(err, res)
  }
}
