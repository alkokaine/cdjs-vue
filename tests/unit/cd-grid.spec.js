import CDGrid from '@/components/cd-grid'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import descriptor from '@/assets/descriptors'

describe('cd-grid', () => {
 
  const propsData = {
    descriptor:  descriptor.objectDescriptor,
    payload: {},
    collection: [ descriptor.object, descriptor.object, descriptor.object ]
  }
  it ('cd-grid is mounted', (done) => {
    const wrapper = mount(CDGrid, { propsData, slots: {
        caption: 'caption',
        footer: 'footer'
    } })  
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-grid').length).toBe(1)
      expect(wrapper.findAll('.cd-grid--table').length).toBe(1)
      expect(wrapper.findAll('table').length).toBe(1)
      expect(wrapper.findAll('thead').length).toBe(1)
      expect(wrapper.findAll('tbody').length).toBe(1)
      expect(wrapper.findAll('tfoot').length).toBe(1)
      expect(wrapper.findAll('caption').length).toBe(1)
      const footer = wrapper.find('tfoot')
      const caption = wrapper.find('caption')
      expect(footer.text()).toBe('footer')
      expect(caption.text()).toBe('caption')
      done()
    })
  })

  it ('cd-grid has collection', (done) => {
    const wrapper = mount(CDGrid, { propsData })
    Vue.nextTick().then(() => {
      expect(wrapper.vm.collection).toBeDefined()
      expect(wrapper.vm.collection.length).toBe(3)
      expect(wrapper.findAll('tr').length).toBe(3)
      done()
    })
  })
})