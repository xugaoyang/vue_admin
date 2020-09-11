<template>
  <div class="login">
    <div class="login-cont">
      <main>
        <h3 class="login-title">
          <span>密码登录</span>
        </h3>
        <div class="content">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="iconfont icon-me fz-18"
                v-model="loginForm.username"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                prefix-icon="iconfont icon-lock fz-18"
                v-model="loginForm.password"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div style="display: flex;justify-content: space-between;align-items: center;">
                <el-input
                  style="width: 200px;"
                  placeholder="请输入验证码"
                  autocomplete="off"
                  v-model="loginForm.code"
                  maxlength="4"
                  @keyup.enter.native="loginSubmit()"
                >
                </el-input>
                <img
                  :src="verifyCode"
                  alt="验证码"
                  style="width:100px;height:30px;cursor:pointer;"
                  @click="getVerifyCode()"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="w-100"
                type="primary"
                size="small"
                @click="loginSubmit()"
                :loading="loginLoading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import EascService from '@/services/Easc'
import FnMixins from '@/assets/js/fnMixins'

export default {
  data() {
    return {
      verifyCode: '',
      guid: '',
      loginLoading: false,
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      },
    }
  },
  mixins: [FnMixins],
  components: {},
  async created() {
    await this.getVerifyCode()
  },
  computed: {
    authCode() {
      return this.$store.state.Auth.authCode
    },
  },
  mounted() {},
  methods: {
    async getVerifyCode() {
      const res = await EascService.getVerifyCode()
      if (res && res.result === 0 && res.innerResponse) {
        this.verifyCode = `data:image/png;base64,${res.innerResponse.code}`
        this.guid = res.innerResponse.guid
      }
    },
    async getToken() {
      const res = await EascService.getToken({
        authCode: this.authCode,
      })
      if (res && res.result === 0) {
        apiInstance.defaults.headers.common.Authorization = `Bearer ${res.innerResponse.access_token}`
        eascInstance.defaults.headers.common.Authorization = `Bearer ${res.innerResponse.access_token}`
        this.$store.dispatch('Auth/token', res.innerResponse.access_token)
        this.$store.dispatch('Auth/tokenType', res.innerResponse.token_type)
        this.$store.dispatch('Auth/refreshToken', res.innerResponse.refresh_token)
      }
    },
    loginSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loginLoading = true
          const rsaKey = await EascService.apiGetPubKey()
          if (rsaKey && rsaKey.result === 0) {
            const publicKey = rsaKey.innerResponse
            const rsa = new JSEncrypt()
            rsa.setPublicKey(publicKey)
            const encriptPwd = rsa.encrypt(md5(this.loginForm.password))
            const formData = new FormData()
            _.forIn(
              {
                valiCode: this.loginForm.code,
                userName: this.loginForm.username,
                password: encriptPwd,
                validGuid: this.guid,
              },
              (value, key) => {
                formData.append(key, value)
              }
            )
            const loginRes = await EascService.verifyLogin({
              formData,
            })
            if (loginRes && loginRes.result === 0) {
              this.$store.dispatch('Auth/authCode', loginRes.innerResponse.AuthCode)
              await this.getToken()
              const userInfoRes = await EascService.getUserInfo()
              if (userInfoRes) {
                this.$store.dispatch('Auth/userInfo', userInfoRes)
                this.$store.dispatch('Auth/rsaKey', publicKey)
                this.$store.dispatch('Status/isLogin', true)
                this.$router.push('/test')
              }
            } else if (loginRes.result !== 0) {
              this.getVerifyCode()
              this.$message.error(loginRes.message)
            }
            this.loginLoading = false
          }
        }
      })
    },
    resetLoginForm() {
      this.$refs.loginForm.resetFields()
    },
  },
  destroyed() {},
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url('/images/login-bg.png');
  background-size: 100% 100%;
  position: relative;
  color: #eee;
  user-select: none;
  .login-cont {
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    overflow: hidden;
    main {
      width: 100%;
      background: #fff;
      position: relative;
      .login-title {
        text-indent: 30px;
        background: #f1f4fb;
        color: #333;
        font-weight: normal;
        height: 50px;
        line-height: 42px;
        font-size: 1.2em;
        .title-right {
          padding: 10px 10px 0 0;
          width: 40px;
          height: 40px;
          float: right;
          .sm-pic {
            position: relative;
            width: 100%;
            height: 100%;
            // margin-top: 10%;
            cursor: pointer;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.sm-pic1 {
              background-image: url('/images/comp.png');
            }
            &.sm-pic2 {
              background-image: url('/images/qr-code.png');
            }
            .tips {
              width: 140px;
              position: absolute;
              top: 3px;
              left: -140px;
              display: none;
              font-size: 12px;
              color: #eee;
              line-height: 24px;
              letter-spacing: 0px;
              background-repeat: no-repeat;
              background-position: 30px 0;
              .tips1 {
                background-image: url('/images/tips1.png');
              }
              .tips2 {
                background-image: url('/images/tips2.png');
              }
            }
            &:hover {
              .tips {
                display: block;
              }
            }
          }
        }
      }
      .content {
        text-align: center;
        padding: 40px;
        margin-bottom: 0 !important;
        p {
          position: relative;
          margin-top: 20px;
          .el-input {
            color: #afafaf;
            height: 40px;
          }
          span {
            width: 30px;
            height: 30px;
            position: absolute;
            z-index: 1;
            left: 0;
            color: #000;
            background-repeat: no-repeat no-repeat;
            background-position: 10px 11px;
            &.user1 {
              background-image: url('/images/user1.png');
            }
            &.user2 {
              background-image: url('/images/user2.png');
            }
            &.lock1 {
              background-image: url('/images/lock1.png');
            }
            &.lock2 {
              background-image: url('/images/lock2.png');
            }
          }
        }
        &.content2 {
          text-align: center;
          p {
            width: 100%;
            height: 30px;
            margin: 0;
            color: #403d3d;
          }
          .qr-pic {
            position: relative;
            width: 150px;
            height: 150px;
            background: #eee;
            margin: 0 auto;
            margin-bottom: 20px;
            .qr-mask {
              position: absolute;
              left: 0;
              top: 0;
              width: 150px;
              height: 150px;
              background: rgba(0, 0, 0, 0.8);
              color: #1890ff;
              text-align: center;
              line-height: 150px;
              span {
                cursor: pointer;
              }
            }
          }
        }
      }
      footer {
        border-top: 1px solid #cedce8;
        margin: 0 40px;
        // width: 100%;
        height: 50px;
        color: #1890ff;
        font-size: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        a {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          &.certificate {
            background-image: url(/images/certificate.png);
          }
          &.app {
            margin-top: 5px;
            background-image: url(/images/phone.png);
          }
          &.client {
            background-image: url(/images/pc.png);
          }
          &.book {
            background-image: url(/images/book.png);
          }
        }
      }
    }
  }
}
</style>
