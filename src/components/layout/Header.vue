<template>
  <el-header style="height: 50px;">
    <div class="header-common">
      <div class="fix">
        <div class="l m-r-10 menu-area">
          <div class="menu-trigger">
            <i class="iconfont icon-list fz-16"></i>
          </div>
        </div>
        <div class="l m-t-10">
          <a class="logo dib" :href="currentEnv.VUE_APP_APP_URL"></a>
        </div>
        <div class="r m-t-15 m-r-10 cur-pointer">
          <i class="iconfont icon-quit fz-14 m-r-10 c-white" @click="logout"></i>
        </div>
        <div class="r m-t-15 m-r-10 user_info">
          <i class="iconfont icon-me fz-14"></i>
          {{ userInfo ? userInfo.userName : '非法登录' }}
        </div>
        <div class="m-r-10 r m-t-15">
          <el-select
            filterable
            v-model="currentTheme"
            placeholder="主题选择"
            style="width:100px;"
            @change="themeChange"
            size="mini"
          >
            <el-option label="默认浅色" value="white"></el-option>
            <el-option label="默认深色" value="black"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script type="text/babel">
import EascService from '@/services/Easc'
import FnMixins from '@/assets/js/fnMixins'

export default {
  name: 'header',
  components: {},
  mixins: [FnMixins],
  data() {
    return {}
  },
  computed: {
    isLogin() {
      return this.$store.getters['Status/isLogin']
    },
    userInfo() {
      return this.$store.getters['Auth/userInfo']
    },
    currentTheme() {
      return this.$store.getters['Theme/currentTheme']
    },
  },
  watch: {},
  methods: {
    async themeChange(val) {
      this.$store.dispatch('Theme/currentTheme', val)
      const link = document.getElementById('themeStyle')
      link.href = val === 'black' ? 'css/black/screen.css' : 'css/white/screen.css'
    },
    async logout() {
      if (!this.userInfo) return this.$router.push('/login')
      const res = await EascService.logout()
      if (res && res.data !== 'success') {
        this.$message.error('系统退出异常')
        return this.$router.push('/login')
      }
      await this.$store.dispatch('clearUserInfo')
      return this.$router.push('/login')
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.header-common {
  position: relative;
  z-index: 998;
  .menu-trigger {
    font-size: 20px;
    height: 50px;
    width: 200px;
    line-height: 50px;
    padding-left: 20px;
  }
}
</style>
