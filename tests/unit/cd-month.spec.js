import CDMonth from '@/components/cd-month'
import CDList from '@/components/cd-list'
import CDDay from '@/components/cd-day'
import { mount } from '@vue/test-utils'
import { createDate, prevMonthDays, prevMonthWeekLength, daysInMonth } from '@/common/month-days'
import { nextTick } from 'vue'
import { Checkbox } from 'element-ui'

describe('[cd-month]: mounting', () => {
  const date = createDate(2022, 9, 1)
  const propsData = {
    date: date,
    selectWeekdays: false,
    compact: false
  }
  const wrapper = mount(CDMonth, { propsData })
  const dayscount = date.daysInMonth() + prevMonthWeekLength(date.toDate())
  it ('[cd-month] has 1 [.cd-month] element', done => {
    nextTick().then(() => {
      expect(wrapper.findAll('.cd-month').length).toBe(1)
      done()
    })
  }, 10000)
  it ('[cd-month] has 8 [CDList] component', done => {
    expect(wrapper.findAllComponents(CDList).length).toBe(8)
    done()
  }, 10000)
  it (`[cd-month] has ${dayscount} [CDDay] component`, done => {
    expect(wrapper.findAllComponents(CDDay).length).toBe(dayscount)
    done()
  }, 10000)
  describe (`[cd-month] changing properties...`, () => {
    it ('[select-weekdays] is turned off', (done) => {
      expect(wrapper.vm.selectWeekdays).toBe(false)
      wrapper.setProps({ selectWeekdays: true }).then(() => {
        nextTick().then(() => {
          done()
        })
      })
    })
    it ('[select-weekdays] is turned on', (done) => {
      expect(wrapper.vm.selectWeekdays).toBe(true)
      done()
    })
    it ('renders 7 [select-weekdays] checkbox', done => {
      nextTick().then(() => {
        expect(wrapper.findAllComponents(Checkbox).length).toBe(7)
        wrapper.setProps({ selectWeekdays: false }).then(() => {
          nextTick().then(() => {
            done()
          })
        })
      })
    })
    it ('turned off [selectd-weekdays] hides 7 [selected-weekdays] checkboxes', done => {
      nextTick().then(() => {
        expect(wrapper.findAllComponents(Checkbox).length).toBe(0)
        done()
      })
    })
    it (`[compact] is turned off, ${dayscount}x[.cd-day--content-wrapper] elements`, (done) => {
      expect(wrapper.vm.compact).toBe(false)
      expect(wrapper.findAll('.cd-day--content-wrapper').length).toBe(dayscount)
      wrapper.setProps({ compact: true }).then(() => {
        nextTick().then(() => {
          done()
        })
      })
    })
    it ('[compact] is turned on, 0 x [.cd-day--content-wrapper] elements', done => {
      expect(wrapper.vm.compact).toBe(true)
      expect(wrapper.findAll('.cd-day--content-wrapper').length).toBe(0)
      done()
    }, 10000)
    it (`[date] is ${date.toISOString(true)}`, done => {
      expect(wrapper.vm.date.toISOString()).toEqual(date.toISOString())
      done()
    }, 10000)
    const newmoment = createDate(2022, 12, 1)
    const prevmonthweek = prevMonthWeekLength(newmoment.toDate())
    it (`[date] is not equals ${newmoment.toISOString(true)}`, done => {
      expect(wrapper.vm.date).not.toBe(newmoment.toISOString(true))
      done()
    }, 10000)
    it (`[date] is equals to ${newmoment.toISOString(true)}`, done => {
      wrapper.setProps({ date: newmoment }).then(() => {
        nextTick().then(() => {
          expect(wrapper.vm.date).toBe(newmoment.toISOString(true))
          expect(wrapper.vm.dates.length).toBe(newmoment.daysInMonth() + prevmonthweek)
          done()
        })
      })
    }, 10000)
    it (`has CD-DAYS elements`, done => {
      nextTick().then(() => {
        expect(wrapper.findAll('.cd-day').length).toBe(newmoment.daysInMonth() + prevmonthweek)
        done()
      })
    }, 10000)
  })
})