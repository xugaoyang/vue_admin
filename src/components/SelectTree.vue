<template>
  <el-select :value="value" :label="valueTitle" :clearable="clearable" @clear="clearHandle">
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'el-tree-select',
  props: {
    // 配置项
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'title', // 显示名称
          children: 'children', // 子级字段名
        }
      },
    },
    // 选项列表数据(树形结构的对象数组)
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 初始值
    value: {
      type: String,
      default: '',
    },
    // 可清空选项
    clearable: {
      type: Boolean,
      default: true,
    },
    // 自动收起
    accordion: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valueTitle: '',
      defaultExpandedKey: [],
      curNodeData: {},
    }
  },
  mounted() {
    // 初始值
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle() {
      if (!_.isEmpty(this.curNodeData)) {
        this.valueTitle = this.curNodeData.label // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.curNodeData.id) // 设置默认选中
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        _.forEach(scrollBar, (ele) => {
          ele.style.width = 0
        })
      })
    },
    // 切换选项
    handleNodeClick(data) {
      this.curNodeData = data
      this.value = data.label
      this.$emit('getValue', data)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    // 清空选中样式
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      _.forEach(allNode, (ele) => {
        ele.classList.remove('is-current')
      })
    },
  },
  watch: {
    value() {
      this.initHandle()
    },
  },
}
</script>

<style scoped lang="scss">
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
.el-select-dropdown__item {
  .el-tree-node {
    &.is-current {
      .el-tree-node__label {
        color: #333 !important;
      }
    }
  }
}
</style>
