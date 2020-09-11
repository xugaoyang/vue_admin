import { expect } from 'chai'
import Utils from '../../utils'
import TestTpl from '@/views/TestTpl/layout'

describe('TestTpl', () => {
  let vm
  afterEach(() => {
    Utils.destroyVM(vm)
  })
  it('create', () => {
    vm = Utils.createTest(TestTpl, {}, true)
    const elm = vm.$el
    expect(elm.id).to.equal('TestTplLayout')
  })
})
