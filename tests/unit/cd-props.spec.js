import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import descriptor from '@/assets/descriptors'
describe('cd-props', () => {
 
  const propsData = {
    descriptor:  descriptor.objectDescriptor,
    payload: {}
  }
  it ('cd-props is mounted', (done) => {
    const wrapper = mount(CDProps, { propsData })  
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-props--inner').length).toBe(26)
      done()
    })
  })
  it ('cd-props is mounted with properties', (done) => {
    const wrapper = mount(CDProps, { propsData })
    Vue.nextTick().then(() => {
      expect(wrapper.findAllComponents(CDProps).length).toBeGreaterThan(12)
      expect(wrapper.findAll('.cd-property').length).toBe(fields_count)
      done()
    })
  }, 10000)
})