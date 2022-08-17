import CDDay from '@/components/cd-month'
import { shallowMount } from '@vue/test-utils'

describe('[cd-mount]', () => {
  it('is mounted', () => {
    const wrapper = shallowMount(CDDay)
    expect(wrapper.findAll('.cd-month').length).toBe(1)
  })
})
