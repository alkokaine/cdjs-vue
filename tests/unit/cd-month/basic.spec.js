import { mount } from "@vue/test-utils"
import CDMonth from '@/components/cd-month'
import CDList from '@/components/cd-list'
import { createDate, prevMonthDays, prevMonthWeekLength, daysInMonth } from '@/common/month-days'
import Vue from "vue"

const monthFactory = (propsData) => (mount(CDMonth, {
  propsData
}))

describe('[CD-MONTH] Basics', () => {
  const date = createDate(2022, 9, 1)
  const propsData = {
    date: date,
    selectWeekdays: false,
    compact: false
  }
  it ('[CD-MONTH] is mounted', done => {
    const wrapper = monthFactory(propsData)
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-month').length).toBe(1)
      expect(wrapper.findAll('.cd-weekdays--wrap').length).toBe(7)
      expect(wrapper.findAllComponents(CDList).length).toBe(8)
      done()
    })
  })
})