import CDGrid from '@/components/cd-grid'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import descriptor from '@/assets/descriptors'
const gridproperties = CDGrid.props
const props = Object.keys(gridproperties).map(name => gridproperties[name])

const gridFactory = (propsData) => (mount(CDGrid, { propsData }))

describe('[CD-GRID] Basics', () => {
  it ('[cd-grid] screams about required properties', done => {
  const consoleErrorSpy = jest.spyOn(console, 'error')
  const wrapper = gridFactory({})
  Vue.nextTick().then(() => {
      expect(consoleErrorSpy).toBeCalled()
      done()
    })
  })
})