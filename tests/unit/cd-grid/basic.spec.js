import CDGrid from '@/components/cd-grid'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import descriptor from '@/assets/descriptors'

const gridFactory = (propsData) => (mount(CDGrid, { propsData }))

describe('[CD-GRID] Basics', () => {
  it ('[cd-grid] screams about required properties', done => {
  const consoleErrorSpy = jest.spyOn(console, 'error')
  const wrapper = gridFactory({})
  nextTick().then(() => {
      expect(consoleErrorSpy).toBeCalled()
      const keys = Object.keys(CDGrid.default.props)
      const map = keys.map(k => CDGrid.default.props[k])
      const props = Array.from(Object.keys(CDGrid.default.props))
      expect(consoleErrorSpy).toBeCalledTimes(props.filter(p => p.required === true).length)
      done()
    })
  })
})