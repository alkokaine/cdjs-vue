import CDDay from '@/components/cd-day'
import { mount } from '@vue/test-utils'
import { createDate } from '@/common/month-days'
describe('[cd-day]', () => {
  it('is mounted', () => {
    const wrapper = mount(CDDay, { propsData: { day: createDate(2022, 9, 1).toDate() } })
    expect(wrapper.findAll('.cd-day').length).toBe(1)
  })
})
