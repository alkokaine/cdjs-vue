import CDMonth from '@/components/cd-month'
import CDList from '@/components/cd-list'
import CDDay from '@/components/cd-day'
import { mount } from '@vue/test-utils'
import { createDate, daysInMonth, prevMonthDays, prevMonthWeekLength, getDays } from '@/common/month-days'
import Vue from 'vue'

describe('[cd-month]', () => {
  it('is mounted', done => {
    const propsData = {
      date: createDate(2022, 9, 1).toDate()
    }
    const dayscount = prevMonthWeekLength(createDate(2022, 9, 1)) + daysInMonth(2022, 9)
    const wrapper = mount(CDMonth, { propsData })
    getDays(propsData.date, { covid: 1, pre: 1, sd: 0}).then(response => {
      wrapper.setData({ dates:  prevMonthDays(propsData.date).concat(response) }).then(() => {
        Vue.nextTick().then(() => {
          expect(wrapper.findAll('.cd-month').length).toBe(1)
          expect(wrapper.vm.dates.length).toBe(dayscount)
          expect(wrapper.findAllComponents(CDList).length).toBe(8)
          expect(wrapper.findAllComponents(CDDay).length).toBe(dayscount)
          done()
        })
      })
    })
  }, 10000)
})
