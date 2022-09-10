import moment from 'moment'
import axios from 'axios'
moment.locale('ru')

const daysInMonth = (year, month) => (moment(`${year}-${month}-01`, 'YYYY-MM')).daysInMonth()
const createDate = (year, month, day) => (moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'))
const lastMonthDay = (year, month) => (createDate(year, month, daysInMonth(year, month)))
const prevMonthWeekLength = (date) => {
  const prev = (moment(date)).subtract(1, 'month')
  return (lastMonthDay(prev.year(), prev.month() + 1)).day()
}
const prevMonthDays = (date) => {
  const prevmonth = date.subtract(1, 'month')
  const lastDay = lastMonthDay(prevmonth.year(), prevmonth.month() + 1)
  const days = []
  while (lastDay.day() > 0) {
    days.unshift({ date: moment(lastDay.toDate()), isprev: true })
    lastDay.subtract(1, 'days')
  }
  return days
}
const weekdays = (
  [1, 2, 3, 4, 5, 6, 7]
    .map(d => ({
      weekday: {
        short: moment().isoWeekday(d).format('dd'),
        long: moment().isoWeekday(d).format('dddd'),
      },
      order: d,
      day: d % 7
    })
))

function getMonthDays(moment) {
  const days_in_month_keys = Array(moment.daysInMonth()).keys()
  const array_from_keys = Array.from(days_in_month_keys)
  const result = array_from_keys.map((m) => (createDate(moment.year(), moment.month() + 1, m + 1) )).map(date => ({ day: date.day(), month: date.month(), number: date.date(), date: date.toISOString(true) }))
  return result
}

const getDays = (date, options = { pre: 1, covid: 1, sd: 0 }) => {
  // const days = []
  const params = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    pre: options.pre,
    covid: options.covid,
    sd: options.sd
  }
  const createDay = (index) => {
    const date = createDate(params.year, params.month, index + 1)
    if (options.sd) return  { date, code: date.day() === 0 }
    else return { date, code: [0, 6].indexOf(date.day()) >= 0 }
  }
  const _days = Array(daysInMonth(params.year, params.month)).keys()
  const array_days = Array.from(_days)
  const result = array_days.map((m, index) => (createDay(index)))
  return result
  // return new Promise((resolve, reject) => {
  //   axios({
  //     url: 'https://isdayoff.ru/api/getdata',
  //     params: params,
  //     method: 'get'
  //   }).then(response => {
  //     days.push(...Array.from(response.request.response)
  //       .map((m, index) => (createDay(index, Number(m))))
  //     )
  //   }).catch(reason => {
  //     days.push(...Array.from(Array(daysInMonth(params.year, params.month)).keys())
  //       .map((m, index) => (createDay(index))))
  //   }).finally(() => {
  //     resolve(days)
  //   })
  // })
}

export {
  createDate,
  daysInMonth,
  prevMonthDays,
  prevMonthWeekLength,
  weekdays,
  getMonthDays
}