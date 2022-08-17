import CDTabs from '@/components/cd-tabs'
import { shallowMount } from '@vue/test-utils'

describe('[cd-tabs]', () => {
  it('is mounted', () => {
    const wrapper = shallowMount(CDTabs)
    expect(wrapper.findAll('.cd-tabs').length).toBe(1)
  })
})
