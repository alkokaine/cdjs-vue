import CDProps from '@/components/cd-props'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

describe('cd-props', () => {
  it ('cd-props is mounted', (done) => {
    const wrapper = mount(CDProps)  
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-props').length).toBe(1)
      done()
    })
  })
})