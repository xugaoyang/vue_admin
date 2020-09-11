import { expect } from 'chai'
import Utils from '../utils'
import Home from '@/views/Home'

describe('Home', () => {
  let vm
  afterEach(() => {
    Utils.destroyVM(vm)
  })
  it('create', () => {
    vm = Utils.createTest(Home, {}, true)
    const homeElm = vm.$el
    expect(homeElm.classList.contains('home')).to.be.true
  })
})
