import moment from 'moment'
moment.updateLocale('ru-RU', { week : { dow: 1 } })
const createDate = (year, month, day) => (moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', 'ru-RU'))
const lastMonthDay = (date) => {
  return date.subtract(1, 'months').set('date', date.daysInMonth())
}
const prevMonthDays = (date) => {
  const lastDay = lastMonthDay(moment(date.toISOString(true)))
  const days = []
  while (lastDay.day() > 0) {
    days.unshift({date: moment(lastDay.toISOString(true)), isprev: true })
    lastDay.subtract(1, 'days')
  }
  return days
}
const prevMonthWeekLength = (date) => {
  const prev = (moment(date)).subtract(1, 'month')
  return (lastMonthDay(prev.year(), prev.month())).day()
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


export {
  createDate,
  prevMonthDays,
  prevMonthWeekLength,
  weekdays,
  getMonthDays
}