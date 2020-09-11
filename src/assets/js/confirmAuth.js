const freeModules = []
const confirmAuth = async (moduleName) => {
  if (_.includes(freeModules, moduleName)) {
    return {
      read: true,
      update: true,
      create: true,
      delete: true,
      importData: true,
      uploadFile: true,
    }
  }
  const moduleAuth = {
    read: false,
    update: false,
    create: false,
    delete: false,
    importData: false,
    uploadFile: false,
  }
  const { userAuth } = app.$store.getters
  const auth = _.find(userAuth || [], { ResouceName: moduleName })
  const actions = auth ? auth.Actions : false
  if (actions) {
    _.assign(moduleAuth, {
      read: actions - currentEnv.authRule.read > -1,
      update: actions - currentEnv.authRule.update > -1,
      create: actions - currentEnv.authRule.create > -1,
      delete: actions - currentEnv.authRule.delete > -1,
      importData: actions - currentEnv.authRule.importData > -1,
      uploadFile: actions - currentEnv.authRule.uploadFile > -1,
    })
  }
  return moduleAuth
}

export default confirmAuth
