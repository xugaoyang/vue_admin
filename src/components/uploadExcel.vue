<template>
  <el-dialog
    title="从Excel导入"
    :visible.sync="uploadExcelDialog"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-steps :active="active" finish-status="success" simple class="m-t-20">
      <el-step title="下载模板"></el-step>
      <el-step title="上传文件"></el-step>
    </el-steps>
    <div v-show="active === 1">
      <div class="tc p-t-30">
        <div class="upload-demo">
          <div class="el-upload el-upload--text down-text">
            <div class="el-upload-dragger">
              <span @click="downloadTemplate">
                <i
                  class="icon iconfont icon-d-excel"
                  style="height: 100px;font-size: 70px;color:green;"
                ></i>
              </span>
              <div class="el-upload__text">
                点击图标下载模板,填写信息如已下载完成,点击
                <em class="text-color" @click="nextStep">下一步</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="active === 2" class="tc p-t-30">
      <el-upload
        v-loading="loading"
        ref="upload"
        drag
        :show-file-list="false"
        :before-upload="getFileContent"
        :http-request="uploadExcel"
        :multiple="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">一次只能上传一个文件，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!-- <div class="p-t-30" v-show="active === 3">
      <div style="text-align: center;">
        <div class="upload-demo">
          <div class="el-upload el-upload--text down-text">
            <div class="el-upload-dragger">
              <span class="pt-30">
                <i
                  class="iconfont icon-complete p-t-20"
                  style="height: 100px; font-size: 70px; color:green;"
                  @click="downResultFile"
                >
                </i>
              </span>
              <div class="el-upload__text" v-if="resultFile">
                文件上传完成(点击图标下载导入结果)
              </div>
              <div class="el-upload__text" v-else>上传成功</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div slot="footer" class="dialog-footer">
      <el-button v-if="active === 2" type="primary" @click="active = 1" :loading="loading"
        >上一步</el-button
      >
      <el-button v-if="active === 3" type="primary" @click="closeDialog" :loading="loading"
        >完成</el-button
      >
      <el-button v-if="active === 1" type="primary" @click="nextStep" :loading="loading"
        >下一步</el-button
      >
      <el-button @click="closeDialog" v-if="active !== 3" :loading="loading">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import FnMixins from '@/assets/js/fnMixins'
import MenuService from '@/services/NavigationMenu'
import majorService from '@/services/Major'
import UserService from '@/services/Users'
import moduleService from '@/services/Module'
import OrgService from '@/services/Organization'
import roleService from '@/services/Role'

export default {
  name: 'upload',
  mixins: [FnMixins],
  props: {
    uploadExcelDialog: {
      type: Boolean,
      default: false,
    },
    excelType: {
      type: String,
    },
    refreshList: {
      type: Function,
    },
    orgId: {
      type: String,
    },
    parentId: {
      type: String,
    },
  },
  data() {
    return {
      active: 1,
      file: '',
      loading: false,
      resultFile: '',
    }
  },
  computed: {
    currentProject() {
      return this.$store.getters['Sites/currentProject'] || {}
    },
  },
  watch: {
    uploadExcelDialog: {
      handler(val) {
        return val
      },
      immediate: true,
      deep: true,
    },
    excelType: {
      handler(val) {
        return val
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  methods: {
    // 下载模板
    async downloadTemplate() {
      console.log(this.excelType)
      let API = currentEnv.VUE_APP_EASC_SERVER
      let ADDRESS = ''
      switch (this.excelType) {
        case 'menu':
          const res = await MenuService.downloadTemplate()
          if (res) {
            this.downLoadBlob({
              name: '菜单模板',
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              data: res,
            })
          }
          break
        case 'userMajor':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/profession/import_user_profession_template`
          break
        case 'major':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/profession/import_template`
          break
        case 'userOrganization':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/users/import_template`
          break
        case 'module':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/modules/down_template`
          break
        case 'organization':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/organizations/down_template`
          break
        case 'role':
          window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/roles/down_template`
          break
        default:
          console.log('no found this excel type')
          break
      }
      // if (this.excelType === 'device') return
      // window.location.href = `${API}${ADDRESS}`
    },
    // 下一步
    nextStep() {
      this.active += 1
      if (this.active > 2) {
        this.active = 1
      }
    },
    // 获取上传的内容
    getFileContent(file) {
      this.file = file
      console.log('上传的文件', file)
    },
    // 上传
    async uploadExcel() {
      this.loading = true
      let res = null
      const formData = new FormData()
      _.forIn({ file: this.file }, (value, key) => {
        formData.append(key, value)
      })
      switch (this.excelType) {
        case 'menu':
          res = await MenuService.importMenu(this.parentId, formData)
          break
        case 'major':
          res = await majorService.import(formData)
          break
        case 'userMajor':
          res = await majorService.importUserProfession(formData)
          break
        case 'userOrganization':
          // formData.append('orgId', this.orgId)
          res = await UserService.import(formData)
          break
        case 'module':
          res = await moduleService.import(formData)
          break
        case 'organization':
          res = await OrgService.import(formData)
          break
        case 'role':
          res = await roleService.import(formData)
          break
        default:
          console.log('no found this type')
      }
      this.loading = false
      console.log('res', res)
      if (res && res.code === 0) {
        this.$message.success('导入成功!')
        this.uploadExcelDialog = false
      } else {
        if (_.isEmpty(res) && _.isEmpty(res.message)) return
        const guid = _.split(res.message, '：')[1]
        if (guid) {
          switch (this.excelType) {
            case 'menu':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/profession/import_errorfile?guid=${guid}`
              break
            case 'major':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/profession/import_errorfile?guid=${guid}`
              break
            case 'userMajor':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/profession/import_user_profession_errorfile?guid=${guid}`
              break
            case 'userOrganization':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/users/import_errorfile?guid=${guid}`
              break
            case 'module':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/modules/import_errorfile?guid=${guid}`
              break
            case 'organization':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/organizations/import_errorfile?guid=${guid}`
              break
            case 'role':
              window.location.href = `${currentEnv.VUE_APP_EASC_SERVER}/roles/import_errorfile?guid=${guid}`
              break
            default:
              console.log('no found this type')
          }
        }
      }
    },
    // 下载结果文件
    downResultFile() {
      if (this.excelType === 'device') {
        window.location.href = `${currentEnv.VUE_APP_DATA_SERVER}/api/tpm/data_equipment/export?media=${this.resultFile}`
        return
      }
      window.location.href = `${currentEnv.VUE_APP_PLANT_SERVER}/${this.resultFile}`
    },
    closeDialog() {
      this.refreshList()
      this.active = 1
      this.file = ''
      this.resultFile = ''
      this.uploadExcelDialog = false
    },
  },
}
</script>

<style scoped></style>
