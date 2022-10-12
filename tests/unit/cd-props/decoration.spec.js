import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import descriptor from '@/assets/descriptors'
import flatterer from '@/common/property-flatter'
import Vue from 'vue'
describe('[CD-PROPS] decoration', () => {
  const propsData2 = {
    payload: descriptor.object,
    descriptor: descriptor.objectDescriptor
  }
  
  it ('propClass function was executed 1 times', done => {
    const wrapper = mount (CDProps, { propsData: propsData2 })
    expect(wrapper.findAll('.cd-custom-property-class').length).toBe(1)
    done()
  }, 10000)
})
