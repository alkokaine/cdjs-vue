import { mount } from "@vue/test-utils"
import CDDayGrid from '@/components/cd-day-grid'
import utils from '@/common/cd-vue-utils'
import { createDate, prevMonthDays, prevMonthWeekLength } from '@/common/month-days'
import Vue from "vue"

const monthFactory = (propsData) => (mount(CDDayGrid, {
  propsData
}))

describe('[CD-DAY-GRID] Basics', () => {
  const date = createDate(2022, 9, 1)
  const propsData = {
    schedule: [],
    weeks: [],
    compareDate ({ moment }, { row }) {
      return moment.date() === row.date.date() && 
        moment.month() === row.date.month() && 
        moment.year() === row.date.year()
    }
  }
  
  it ('[cd-day-grid] has described properties', done => {
    expect(utils.isComponentDescribed(CDDayGrid)).toBe(true)
    done()
  })
  it ('[cd-day-grid] screams about required properties', done => {
    const consoleErrorSpy = jest.spyOn(console, 'error')
    const wrapper = monthFactory({})
    expect(consoleErrorSpy).toBeCalled()
    done()
  })
  it ('[cd-day-grid] is mounted', done => {
    const wrapper = monthFactory(propsData)
    expect(wrapper.findAll('.cd-days--grid').length).toBe(1)
    expect(wrapper.findAll('.cd-day').length).toBeGreaterThanOrEqual(date.daysInMonth())
    done()
  }, 30000)
})