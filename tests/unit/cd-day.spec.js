import CDDay from '@/components/cd-day'
import { shallowMount } from '@vue/test-utils'

describe('[cd-day]', () => {
  it('is mounted', () => {
    const wrapper = shallowMount(CDDay)
    expect(wrapper.findAll('.cd-day').length).toBe(1)
  })
})
