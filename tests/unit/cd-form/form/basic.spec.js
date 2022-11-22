import CDForm from '@/components/cd-form'
import { mount } from '@vue/test-utils'
import descriptor from '@/assets/descriptors'
import decorator from '@/common/property-decorator'
import flatterer from '@/common/property-flatter'
import CDCell from '@/components/cd-cell'
import Vue from 'vue'
import Element from 'element-ui'
import utils from '@/common/cd-vue-utils'
Vue.use(Element)
describe('[cd-form]', () => {
  const propsData = {
      descriptor: descriptor.objectDescriptor,
      payload: descriptor.object
    }
  const flat = flatterer(propsData.descriptor, [])
  const hasDescriptors = flat.filter(p => decorator.hasDescriptor(p)).length
  const hasLabels = flat.filter(p => !decorator.hasDescriptor(p)).length
  it ('[cd-form] has described properties', done => {
    expect(utils.isComponentDescribed(CDForm)).toBe(true)
    done()
  })
  it ('[cd-form] is mounted', done => {
    const wrapper = mount(CDForm, { propsData: propsData })
    Vue.nextTick().then(() => {
      expect(wrapper.findAllComponents(CDForm).length).toBe(1)
      expect(wrapper.findAll('.cd-fieldset').length).toBeGreaterThanOrEqual(hasDescriptors + 1)
      expect(wrapper.findAll('.cd-field').length).toBe(hasLabels)
      expect(wrapper.findAll('.cd-properties').length).toBe(wrapper.findAll('.cd-fieldset').length)
      expect(wrapper.findAllComponents(CDCell).length).toBe(hasLabels)
      expect(wrapper.findAll('.cd-cell--resolved').length).toBe(hasLabels)
      done()
    })
  }, 10000)
})