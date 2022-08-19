import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import descriptor from '@/assets/descriptors'
console.log(descriptor)
describe('cd-props', () => {
 
  const propsData = {
    descriptor:  descriptor.objectDescriptor,
    payload: {}
  }
  it ('cd-props is mounted', (done) => {
    const wrapper = mount(CDProps, { propsData })  
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-props').length).toBe(26)
      done()
    })
  })
  it ('cd-props is mounted with properties', (done) => {
    const wrapper = mount(CDProps, { propsData })
    Vue.nextTick().then(() => {
      const list_of_list = wrapper.findAll('.cd-list')
      expect(list_of_list.length).toBe(26)
      expect(wrapper.findAll('li').length).toBeGreaterThan(0)
      expect(wrapper.findAllComponents(CDProps).length).toBeGreaterThan(12)
      done()
    })
  })
})