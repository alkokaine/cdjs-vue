import 'jest'
import { createDate, prevMonthDays, getMonthDays } from '@/common/month-days'

const date = createDate(2022, 8, 1)

describe('get days', () => {
  // const days = []
  test('В августе 2022 года 31 день', () => {
    expect(getMonthDays(date).length).toBe(31)
  })
  test('Все элементы массива принадлежат августу', (done)=> {
    expect(getMonthDays(date).every(day => day.month === 7)).toBeTruthy()
    done()
  })
  const feb2020 = createDate(2020, 2, 1)
  test('В феврале 2020 года 29 дней', (done) => {
    expect(feb2020.daysInMonth()).toBe(29)
    done()
  })
  test('остаток июля на первой неделе августа 2022 года -- 0 дней', () => {
    expect(prevMonthDays(date).length).toBe(0)
  })
  test('остаток января на первой неделе февраля 2020 года -- 5 дней', () => {
    expect(prevMonthDays(feb2020).length).toBe(5)
  })
  test('остаток августа на первой неделе сентября 2022 года -- 3 дня', () => {
    expect(prevMonthDays(createDate(2022, 9, 1)).length).toBe(3)
  })
})
