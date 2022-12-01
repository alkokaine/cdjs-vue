<template>
  <div class="cd-month--wrapper container">
    <slot name="month-header"></slot>
    <template v-if="ischedule">
      <cd-day-grid class="cd-month" key-field="week" :compact="compact" :schedule="schedule" 
        :week-range="weekRange" :days="days" :compare-date="compareDate" 
        :select-weekdays="selectWeekdays" :multiple="multiple"> 
        <div slot-scope="{ day, week }">
          <slot :day="day" :week="week"  :events="dayContent(day)"></slot>
        </div>
      </cd-day-grid>
    </template>
    <template v-else>
      <cd-day-tabs class="cd-month" :days="keyedDays" :orientation="orientation" :compare-date="compareDate" 
        :multiple="multiple">
        <cd-list slot-scope="{ content }" :collection="content" key-field="daykey">
          <cd-day slot-scope="{ row }" :day="row">
            <slot :day="row" :events="dayContent(row)"></slot>
          </cd-day>
        </cd-list>
      </cd-day-tabs>
    </template>
  </div>
  
</template>

<script>
import { createDate, weekdays, prevMonthDays } from '@/common/month-days'
import fromRange from '@/common/utils'
import CDDayGrid from '@/components/cd-day-grid.vue'
import CDDayTabs from '@/components/cd-day-tabs.vue'
import CDList from '@/components/cd-list.vue'
import moment from 'moment'
export default {
  name: 'cd-month',
  components: {
    'cd-day-grid': CDDayGrid,
    'cd-list': CDList,
    'cd-day-tabs': CDDayTabs
    // 'el-checkbox': Checkbox
  },
  props: {
    mode: { 
      type: String, 
      validator (value) {
        return ['list', 'schedule'].indexOf(value) !== -1
      },
      default: 'schedule',
      description: 'Режим календаря, schedule (по умолчанию) -- месяц разбит по неделям; list -- дни идут списком'
    },
    compareDate: { type: Function, required: true, description: 'функция возвращает true, если даты параметров функции совпадают' },
    schedule: { type: Array, required: true, description: 'Массив "событий"' },
    date: { type: Object, reqiured: true, description: 'Дата, месяц который отрисовывает календарь' },
    sixDays: { type: Boolean, default: false, description: 'Признак шестидневной рабочей недели' },
    prependDays: { type: Boolean, default: true, description: 'Если месяц начинается не с понедельника и prepend-days = true, то присоединим дни из предыдущего месяца так, чтобы первое число указанного месяца было в своей клетке дня недели' },
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    selectWeekdays: { type: Boolean, default: false, description: 'Режим выбора дня недели (появится чекбокс)' },
    onWeekdaySelect: { type: Function, description: 'Функция, которую выполним по выбору дня недели' },
    onDaySelect: {
      type: Function,
      default: function ({ $event, day, weekday }) {
        const calendar = this
        const currentIndex = calendar.selectedDays.findIndex(i => i.date.date() === day.date.date() && i.date.month() === day.date.month())
        const weekdayIndex = calendar.selectedWeekdays.indexOf(weekday.day)
        if (weekdayIndex >= 0) {
          calendar.selectedDays.splice(currentIndex, 1)
          calendar.selectedWeekdays.splice(weekdayIndex, 1)
        } else if (currentIndex >= 0) {
          calendar.selectedDays.splice(currentIndex, 1)
        } else {
          calendar.selectedDays.push(day)
          const filtered = weekday.days.filter(wd => wd.isprev === undefined)
          const map = filtered.map(wd => calendar.selectedDays.findIndex(d => d.date.date() === wd.date.date()))
          if (map.every(e => e >= 0)) {
            calendar.selectedWeekdays.push(weekday.day)
          }
        }
      },
      description: 'Функция, которая выполнится при выборе дня'
    },
    orientation: { type: String, description: 'Расположение ярлыков на дни месяца' },
    multiple: { type: Boolean, description: 'Можно ли выбрать несколько дней' }
  },
  data (calendar) {
    const locale = moment.localeData('ru-RU')
    return {
      isLoading: false,
      selectedWeekdays: [],
      selectedDays: [],
    }
  },
  methods: {
  },
  computed: {
    ischedule ({ mode }) {
      return mode === 'schedule'
    },
    dayContent ({ schedule, compareDate }) {
      return (day) => {
        return  (schedule.filter(s => compareDate(s, day)))
      }
    },
    days ({ date, prependDays }) {
      return (prependDays ? prevMonthDays(date) : [])
        .concat(
          Array.from(Array(date.daysInMonth()).keys())
            .map(d => ({ date: createDate(date.year(), date.month() + 1, d + 1)}))
      )
    },
    weekNumbers ({ days }) {
      return days.map(d => d.date.week())
    },
    keyedDays ({ days }) {
      return days.map(m => ({ isprev: m.isprev, date: m.date, daykey: m.date.unix() }))
    },
    minWeekNumber ({ weekNumbers }) {
      return Math.min(...weekNumbers)
    },
    maxWeekNumber ({ weekNumbers }) {
      return Math.max(...weekNumbers)
    },
    weekRange ({ minWeekNumber, maxWeekNumber }) {
      return fromRange(minWeekNumber, maxWeekNumber, 1)
    },
   
    checkboxid () {
        return ({ day }) => `wd_${day}`
    },
    isChecked () {
      const calendar = this
      return (row) => {
        return calendar.selectedWeekdays.indexOf(row.day) >= 0
      }
    },
    weekdayClass ({ selectedWeekdays, sixDays }) {
      return (weekday, index) => {
        const isselected = selectedWeekdays.indexOf(weekday.day) >= 0
        if (index === 5 && !sixDays || index === 6) return `holiday`
        return [`weekday-${weekday.info.long.toLowerCase()}s`, {
          'is-selected': selectedWeekdays.indexOf(weekday.day) >= 0,
          'holiday': index === 5 && !sixDays || index == 6
        }]
      }
    },
    isDaySelected () {
      const calendar = this
      return ({ row }) => {
        return calendar.selectedDays.findIndex(d => d.date.date() === row.date.date() && d.date.month() === row.date.month()) >= 0
      }
    }
  }
}
</script>

<style>
  .mw-mc {
    max-width: min-content;
  }
  .cd-weekday--container {
    max-width: 14%;
  }
  .holiday {
    color: red;
  }
  .cd-day.compact {
    max-width: 50px;
  }
  .cd-month.compact {
    width: 350px;
  }
</style>
