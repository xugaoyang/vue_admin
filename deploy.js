#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander')
const shell = require('shelljs')
const inquirer = require('inquirer')

const SERVER = '192.168.66.57'

program
  .command('deploy [project]')
  .alias('d')
  .description('构建并发布')
  .action(async (project) => {
    if (project) {
      const promps = []
      promps.push({
        type: 'input',
        name: 'name',
        message: '输入环境名称',
        validate(input) {
          if (!input) {
            return 'not allow empty'
          }
          return true
        },
      })
      inquirer.prompt(promps).then(async (answers) => {
        shell.exec(`vue-cli-service build --mode build_${answers.name}`)
        shell.exec(`tar -zcvf ${process.cwd()}/dist.tar.gz dist/*`)
        shell.exec(`ssh root@${SERVER} "cd /apps/html/${project} ; rm -rf *"`)
        shell.exec(`scp ${process.cwd()}/dist.tar.gz root@${SERVER}:/apps/html/${project}`)
        shell.exec(
          `ssh root@${SERVER} "cd /apps/html/${project} ; tar -zxvf dist.tar.gz ; mv /apps/html/${project}/dist/* /apps/html/${project} ; rm -rf dist.tar.gz ; rm -rf dist"`
        )
        shell.exec(`rm -rf ${process.cwd()}/dist.tar.gz`)
      })
    } else {
      program.help()
    }
  })
program.command('*').action(() => {
  return program.help()
})
program.parse(process.argv)
