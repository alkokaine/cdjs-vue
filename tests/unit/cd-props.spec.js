import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import descriptor from '@/assets/descriptors'
import flatterer from '@/common/property-flatter'
import decorator from '@/common/property-decorator'
console.log(descriptor)
describe('cd-props', () => {
 
  const propsData = {
    descriptor:  descriptor.objectDescriptor,
    payload: {}
  }
  
  it ('cd-props is mounted with properties', (done) => {
    const wrapper = mount(CDProps, { propsData })
    const fields_count = ((flatterer(descriptor.objectDescriptor, [])).filter(prop => prop.datafield !== undefined && decorator.isPropertyVisible(prop, propsData.payload))).length
    Vue.nextTick().then(() => {
      const list_of_list = wrapper.findAll('.cd-list')
      expect(list_of_list.length).toBe(26)
      expect(wrapper.findAll('li').length).toBeGreaterThan(0)
      expect(wrapper.findAllComponents(CDProps).length).toBeGreaterThan(12)
      expect(wrapper.findAll('.cd-property').length).toBe(fields_count)
      done()
    })
  }, 10000)
})