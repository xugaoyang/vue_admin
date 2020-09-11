<template>
  <div>
    <div v-if="files && files.length" v-loading="uploading">
      <div class="c-g9 m-b-15">将要上传的文件:</div>
      <div v-for="(i, index) in files" :key="index">
        <span class="m-r-5">{{ i.name }}</span>
        <el-button type="text" @click="deleteOne(index)">
          <i class="fa fa-remove text-danger"></i>
        </el-button>
      </div>
      <div class="p-t-20">
        <el-button @click="deleteAll" size="small">清空</el-button>
        <el-button type="primary" @click="uploadConfirm" size="small">确认上传</el-button>
      </div>
    </div>
    <div class="tc" v-else>
      <el-upload
        drag
        action="https://xx.yy.zz"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="fileChanged"
        :accept="`${accept || ''}`"
        :multiple="multiple"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  props: ['multiple', 'accept'],
  data() {
    return {
      files: [],
      uploading: false,
    }
  },
  methods: {
    deleteOne(index) {
      this.files.splice(index, 1)
    },
    deleteAll() {
      this.files = []
    },
    fileChanged(file) {
      this.files.push(file)
      if (!this.multiple) {
        this.uploadConfirm()
      }
    },
    async uploadConfirm() {
      const files = _.map(this.files, (i) => {
        return i.raw
      })
      this.files = []
      this.$emit('uploadFinish', files)
    },
  },
}
</script>
