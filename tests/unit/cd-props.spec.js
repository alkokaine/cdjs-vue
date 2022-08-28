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


  const flat = flatterer(propsData.descriptor, [])
  const hasDescriptorCount = flat.filter(p => decorator.hasDescriptor(p)).length

  it ('cd-props is mounted with properties', (done) => {
    const wrapper = mount(CDProps, { propsData })
    Vue.nextTick().then(() => {
      const list_of_list = wrapper.findAll('.inner')
      expect(wrapper.findAll('li').length).toBe(flat.length)
      expect(wrapper.findAll('.cd-props').length).toBe(hasDescriptorCount + 1)
      expect(wrapper.findAllComponents(CDProps).length).toBeGreaterThan(12)
      done()
    })
  }, 10000)
})