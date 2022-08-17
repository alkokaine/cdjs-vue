import CDList from '@/components/cd-list'
import { shallowMount } from '@vue/test-utils'

describe('[cd-list]', () => {
  it('is mounted', () => {
    const wrapper = shallowMount(CDList)
    expect(wrapper.findAll('.cd-list').length).toBe(1)
  })
})
