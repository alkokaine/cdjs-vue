import CDFieldset from '@/components/cd-fieldset'
import { mount } from '@vue/test-utils'
import descriptor from '@/assets/descriptors'
import decorator from '@/common/property-decorator'
import flatterer from '@/common/property-flatter'
import Vue from 'vue'

const propsData = {
  descriptor: descriptor.objectDescriptor,
  payload: descriptor.object
}

const flat = flatterer(propsData.descriptor, [])
const hasDescriptors = flat.filter(p => decorator.hasDescriptor(p)).length
const hasLabels = flat.filter(p => !decorator.hasDescriptor(p)).length
describe('[cd-fieldset]', () => {
  it ('[cd-fieldset] is mounted', done => {
    const wrapper = mount(CDFieldset, { propsData: propsData })
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-fieldset').length).toBeGreaterThanOrEqual(hasDescriptors + 1)
      expect(wrapper.findAll('.cd-field').length).toBe(hasLabels)
      done()
    })
  }, 10000)
})