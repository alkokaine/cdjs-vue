import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import descriptor from '@/assets/descriptors'
import flatterer from '@/common/property-flatter'
import Vue from 'vue'
describe('[CD-PROPS] Basics', () => {
  const propsData = {}
  const propsData2 = {
    payload: descriptor.object,
    descriptor: descriptor.objectDescriptor
  }
  const consoleErrorSpy = jest.spyOn(console, 'error')
  const props = mount(CDProps, { propsData })
  it ('screams about required properties', (done) => {
    expect(consoleErrorSpy).toBeCalledWith(expect.stringContaining('descriptor'))
    expect(consoleErrorSpy).toBeCalledWith(expect.stringContaining('payload'))
    props.setProps({
      descriptor: descriptor.objectDescriptor
    })
    expect(consoleErrorSpy.mock.calls.length).toBe(3)
      const keyfields = consoleErrorSpy.mock.calls.filter(e => e.some(s => s.includes('payload')))
      expect(keyfields.length).toBe(2)
      props.setProps({ payload: descriptor.object }).then(() => {
        expect(consoleErrorSpy.mock.calls.length).toBe(3)
        done()
      })
  }, 10000)
  it ('cd-props is mounted with properties', (done) => {
    const wrapper = mount(CDProps, { propsData: propsData2 })
    const fields_count = (flatterer(propsData2.descriptor, [])).filter(prop => prop.datafield !== undefined).length
    expect(wrapper.findAll('.cd-property').length).toBe(fields_count)
    done()
  }, 10000)

  it ('cd-props property divs text equals payload properties', (done) => {
    const wrapper = mount(CDProps, { propsData })
    const compareValues = (v1, v2) => {
      if (typeof v1 === 'boolean') return (v1 ? 'true': 'false') == v2
      if (typeof v1 === 'number') return v1 == Number(v2)
      return v1 == v2 || (v1 === null && v2 === '')
    }
    const findall = wrapper.findAll('.cd-property')
    const props = findall.wrappers.map(m => ({ text: m.text(), id: m.attributes('data-property') }))
    const result = props.map(t => ({ id: t.id, value: propsData.payload[t.id], text: t.text, result: compareValues(propsData.payload[t.id], t.text) }))
    const failed = result.filter(p => p.result === false)
    expect(result.every(e => e.result === true)).toBe(true)
    done()
  })
  it ('cd-props changes [.cd-property].text after change payload property value', (done) => {
    const wrapper = mount(CDProps, { propsData: propsData2 })
    const property = wrapper.findAll('.cd-property').wrappers.find(e => e.attributes('data-property') === 'UltraShortName')
    expect(property.text()).toBe(propsData2.payload.UltraShortName)
    Vue.set(propsData2.payload, 'UltraShortName', 'foo')
    Vue.nextTick().then(() => {
      expect(property.text()).toBe('foo')
      done()
    })
  })
})