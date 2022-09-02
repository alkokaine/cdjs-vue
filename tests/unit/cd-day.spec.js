import CDDay from '@/components/cd-day'
import { mount } from '@vue/test-utils'
import { createDate } from '@/common/month-days'
import Vue from 'vue'
describe('[cd-day]', () => {
  it('is mounted', (done) => {
    const propsData = {
      day: {
        date: createDate(2022, 9, 1)
      }
    }
    const wrapper = mount(CDDay, { propsData })
    expect(wrapper.findAll('.cd-day').length).toBe(1)
    expect(wrapper.findAll('.cd-day--header').length).toBe(1)
    done()
  }, 10000)
})
