import CDForm from '@/components/cd-form'
import { mount } from '@vue/test-utils'
import descriptor from '@/assets/descriptors'
import decorator from '@/common/property-decorator'
import flatterer from '@/common/property-flatter'
import CDCell from '@/components/cd-cell'
import Vue from 'vue'

describe('[cd-form] mounting', () => {
  const propsData = {
      descriptor: descriptor.objectDescriptor,
      payload: descriptor.object
    }
  const flat = flatterer(propsData.descriptor, [])
  const hasDescriptors = flat.filter(p => decorator.hasDescriptor(p)).length
  const hasLabels = flat.filter(p => !decorator.hasDescriptor(p)).length

  it ('[cd-form] is mounted', done => {
    const wrapper = mount(CDForm, { propsData: propsData })
    Vue.nextTick().then(() => {
      expect(wrapper.findAllComponents(CDForm).length).toBe(1)
      expect(wrapper.findAll('.cd-fieldset').length).toBeGreaterThanOrEqual(hasDescriptors + 1)
      expect(wrapper.findAll('.cd-field').length).toBe(hasLabels)
      expect(wrapper.findAll('.cd-props--inner').length).toBe(wrapper.findAll('.cd-fieldset').length)
      expect(wrapper.findAllComponents(CDCell).length).toBe(hasLabels)
      expect(wrapper.findAll('.cd-cell--resolved').length).toBe(hasLabels)
      done()
    })
  }, 10000)
})