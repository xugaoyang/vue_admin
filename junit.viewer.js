const fs = require('fs')
const jv = require('junit-viewer')

const fsExistsSync = (path) => {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}

const resultPath = 'test-results'
const e2eXML = `${resultPath}/e2e.xml`
const e2eXMLExist = fsExistsSync(e2eXML)
const unitXML = `${resultPath}/unit.xml`
const unitXMLExist = fsExistsSync(unitXML)

if (e2eXMLExist) {
  const parsedAndRenderedData = jv.junit_viewer(e2eXML)
  fs.writeFile(
    `${resultPath}/e2e.html`,
    parsedAndRenderedData.replace(/<head>/, '<head>\n<meta charset="utf-8">'),
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  )
}
if (unitXMLExist) {
  const parsedAndRenderedData = jv.junit_viewer(unitXML)
  fs.writeFile(
    `${resultPath}/unit.html`,
    parsedAndRenderedData.replace(/<head>/, '<head>\n<meta charset="utf-8">'),
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  )
}
if (!e2eXMLExist && !unitXMLExist) {
  console.error('no results for report')
}
