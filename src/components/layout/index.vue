<template>
  <div id="layout" class="h-100">
    <el-container id="BasicLayout" style="height: 100vh;" v-loading="pageLoading">
      <el-header style="height: 50px;padding:0;">
        <Header></Header>
      </el-header>
      <el-container style="height:calc(100% - 50px);">
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-main class="p-0" style="overflow-y: auto">
          <PageTags></PageTags>
          <router-view class="m-10" style="height:calc(100% - 78px)"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/babel">
import FnMixins from '@/assets/js/fnMixins'
import SideBar from '@/components/layout/SideBar'
import Header from '@/components/layout/Header'
import PageTags from '@/components/layout/PageTags'
import EascService from '@/services/Easc'

export default {
  name: 'layout',
  components: {
    SideBar,
    Header,
    PageTags,
  },
  mixins: [FnMixins],
  data() {
    return {}
  },
  computed: {
    pageLoading() {
      return this.$store.getters['Status/pageLoading']
    },
    latestPath() {
      return this.$store.getters['Theme/latestPath']
    },
    tokenType() {
      return this.$store.getters['Auth/tokenType']
    },
    token() {
      return this.$store.getters['Auth/token']
    },
  },
  async created() {
    if (this.token && this.tokenType) {
      apiInstance.defaults.headers.common.Authorization = `${this.tokenType} ${this.token}`
      eascInstance.defaults.headers.common.Authorization = `${this.tokenType} ${this.token}`
    }
    const userId = this.urlParam('RelyUserId')
    if (userId) {
      this.$store.dispatch('Status/pageLoading', true)
      const res = await EascService.apiSsoLogin({
        userId,
      })
      if (res && res.result !== 0) {
        this.$store.dispatch('Auth/clearUserInfo')
        this.$store.dispatch('Status/isLogin', true)
        this.$store.dispatch('Status/pageLoading', false)
        return this.$alert('token无效，请重新进入应用', '提示', {
          confirmButtonText: '知道了',
        })
      }
      this.$store.dispatch('Status/pageLoading', false)
      apiInstance.defaults.headers.common.Authorization = `Bearer ${res.innerResponse.access_token}`
      eascInstance.defaults.headers.common.Authorization = `Bearer ${res.innerResponse.access_token}`
      const userInfoRes = await EascService.getUserInfo()
      if (!userInfoRes) return this.$message.error('获取用户信息失败')
      const resAuth = await EascService.getUserAuth({
        userId: userInfoRes.userId,
      })
      this.$store.dispatch('Auth/userAuth', resAuth.innerResponse)
      this.$store.dispatch('Auth/userInfo', userInfoRes)
      this.$store.dispatch('Auth/token', res.innerResponse.access_token)
      this.$store.dispatch('Auth/tokenType', res.innerResponse.token_type)
      this.$store.dispatch('Auth/refreshToken', res.innerResponse.refresh_token)
      this.$store.dispatch('Status/isLogin', true)
    }
    return false
  },
  methods: {},
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss"></style>
