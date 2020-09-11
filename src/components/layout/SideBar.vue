<template>
  <div id="sideBar">
    <el-menu class="easc-menu" style="height: 100%;" :default-active="routePath" router>
      <el-menu-item index="/work">
        <i class="iconfont icon-bg-group m-r-5"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="iconfont icon-bg-setup m-r-5"></i>
          <span>测试</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/test">
            测试
          </el-menu-item>
          <el-menu-item index="/testSide">
            测试side
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'sideBar',
  components: {},
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  methods: {},
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

<style>
#sideBar {
  height: 100%;
  overflow: auto;
}
</style>
