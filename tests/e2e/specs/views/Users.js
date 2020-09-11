import faker from 'faker'

describe('Test for users page', () => {
  // 打开页面
  context('visit page', () => {
    it('link to url', () => {
      // 期望：访问 http://ip/#/users 能访问到页面
      cy.visit('http://www.hidoge.cn:8080/demos/vue-e2e-demo/#/users')
    })
    // 校验ui
    it('check ui', () => {
      // 期望：有h3标题，叫用户列表、有提示暂无数据
      cy.contains('h3', '用户列表').should('be.exist')
      cy.contains('body', '暂无数据').should('be.exist')
      // 期望：有两个按钮，一个叫自由添加用户 一个叫快速添加用户
      cy.contains('button', 'freeAdd').should('be.exist')
      cy.contains('button', 'quickAdd').should('be.exist')
      // 期望：有4个关键表头，分别是userName、email、phone、jobTitle
      cy.contains('th', 'userName').should('be.exist')
      cy.contains('th', 'email').should('be.exist')
      cy.contains('th', 'phone').should('be.exist')
      cy.contains('th', 'jobTitle').should('be.exist')
      // 期望：有两个模态框，并且隐藏
      cy.get('#dialogAdd')
        .should('be.exist')
        .should('not.visible')
      cy.get('#dialogRead')
        .should('be.exist')
        .should('not.visible')
    })
  })
  context('operation', () => {
    // 测试快速添加用户功能
    it('quick add', () => {
      // 点击快速添加按钮
      cy.get('button#quickAdd').click()
      // 期望：包含表头在内，表格有两行
      cy.get('table tr').should('have.length', 2)
    })
    // 校验刚完成添加的查看详情功能
    it('read detail for quick', () => {
      // 期望：有查看详情的按钮，点击第一个
      cy.get('button.readDetail')
        .eq(0)
        .click()
      // 期望：查看模态框可见
      cy.get('#dialogRead').should('be.visible')
      // 点击关闭按钮
      cy.get('#dialogRead .el-dialog__close').click()
      // 期望：查看模态框不可见
      cy.get('#dialogRead').should('not.visible')
    })
    // 完全正确的添加一个用户
    it('free add', () => {
      // 点击自由添加按钮
      cy.get('button#freeAdd').click()
      // 期望：添加模态框可见
      cy.get('#dialogAdd').should('be.visible')
      // 期望：有一个编辑的form
      cy.get('form#editForm').should('be.exist')
      // 填入各种信息
      cy.get('#editFormUserName').type(faker.internet.userName())
      cy.get('#editFormEmail').type(faker.internet.email())
      cy.get('#editFormPhone').type(faker.phone.phoneNumber())
      cy.get('#editFormJobTitle').type(faker.name.jobTitle())
      // 点击提交
      cy.get('#editFormSubmit').click()
      // 期望：提交完成后添加模态框不可见
      cy.get('#dialogAdd').should('not.visible')
    })
    // 校验刚完成添加的查看详情功能
    it('read detail for free', () => {
      // 期望：有查看详情的按钮，点击第一个
      cy.get('button.readDetail')
        .eq(0)
        .click()
      // 期望：查看模态框可见
      cy.get('#dialogRead').should('be.visible')
      // 点击关闭按钮
      cy.get('#dialogRead .el-dialog__close').click()
      // 期望：查看模态框不可见
      cy.get('#dialogRead').should('not.visible')
    })
    // 输入错误提示
    // 编辑功能
    // 删除功能
  })
})
