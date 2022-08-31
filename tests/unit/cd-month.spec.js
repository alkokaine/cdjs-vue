import CDDay from '@/components/cd-month'
import { mount } from '@vue/test-utils'
import { createDate, prevMonthWeekLength } from '@/common/month-days'

describe('[cd-mount]', () => {
  it('is mounted', () => {
    const wrapper = mount(CDDay, { propsData: { 
      date: createDate(2022, 9, 1).toDate()
    }})
    expect(wrapper.findAll('.cd-month').length).toBe(1)
  })
})
