<template>
  <div id="pageTags" class="m-b-10" v-show="pageTags && pageTags.length">
    <el-scrollbar
      class="scroll-container"
      @wheel.native.prevent="handleScroll"
      ref="scrollContainer"
      :vertical="false"
    >
      <el-tooltip
        :content="tag.displayName"
        :open-delay="600"
        effect="light"
        v-for="(tag, index) in pageTags"
        :key="index"
      >
        <el-tag
          class="cur-pointer m-r-5"
          size="small"
          ref="tag"
          :disable-transitions="false"
          :type="tag.displayName === currentTag.displayName ? 'primary' : 'info'"
          :closable="tag.displayName !== disabledRemoveTagName"
          @click.native="handleClick(tag)"
          @close="handleClose(index, tag.displayName)"
        >
          {{
            _.truncate(tag.displayName, {
              length: 36,
              separator: /,? +/,
            })
          }}
        </el-tag>
      </el-tooltip>
    </el-scrollbar>
  </div>
</template>
<script type="text/babel">
export default {
  name: 'pageTags',
  components: {},
  mixins: [],
  data() {
    return {
      disabledRemoveTagName: '首页',
    }
  },
  computed: {
    pageTags() {
      return this.$store.getters['Theme/pageTags']
    },
    currentTag() {
      return this.$store.getters['Theme/currentTag'] || {}
    },
  },
  watch: {
    // currentTag(val) {
    //   this.$nextTick(() => {
    //     const tags = this.$refs.tag
    //     if (tags) {
    //       this.$nextTick(() => {
    //         const idx = _.findIndex(this.pageTags, { path: val.path })
    //         this.moveToCurrent(tags[idx])
    //       })
    //     }
    //   })
    // },
  },
  methods: {
    handleScroll(e) {
      const eventData = e.wheelDelta || -e.deltaY * 40
      this.$refs.scrollContainer.$refs.wrap.scrollLeft =
        this.$refs.scrollContainer.$refs.wrap.scrollLeft + eventData / 4
    },
    moveToCurrent(currentTag) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      const tagList = this.$refs.tag
      // 获取第一个标签和最后一个标签
      let firstTag = null
      let lastTag = null
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        const currentIdx = _.findIndex(tagList, (o) => {
          return o === currentTag
        })
        const prevTag = tagList[currentIdx - 1]
        const nextTag = tagList[currentIdx + 1]
        // 5:标签间间隔为5
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + 5
        const beforePreTagOffsetLeft = prevTag.$el.offsetLeft - 5
        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePreTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePreTagOffsetLeft
        }
      }
    },
    handleClick(data) {
      this.$router.push(data.fullPath)
    },
    async handleClose(index, name) {
      if (this.pageTags && this.pageTags.length > 1) {
        await this.$store.dispatch(
          'Theme/pageTags',
          _.filter(this.pageTags, (i) => {
            return i.displayName !== name
          })
        )
        if (this.currentTag.displayName === name) {
          const target = this.pageTags[this.pageTags.length - 1] || {}
          console.log(target)
          this.$store.dispatch('Theme/currentTag', target)
          this.$router.push(target.fullPath || '/home')
        }
      } else {
        this.$store.dispatch('Theme/pageTags', [])
        this.$store.dispatch('Theme/currentTag', null)
        this.$router.push('/home')
      }
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
#pageTags {
  border-bottom: 1px solid #ebebeb;
  box-shadow: 1px 2px 4px #ebebeb;
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: 5px;
    line-height: 30px;
    /deep/ .el-scrollbar_bar {
      bottom: 0;
    }
    /deep/ .el-scrollbar__wrap {
      height: 37px;
      width: 100%;
      overflow: hidden;
      .el-scrollbar__view {
        float: left;
      }
    }
    /deep/ .el-scrollbar__bar.is-horizontal {
      bottom: -1px;
    }
  }
}
</style>
