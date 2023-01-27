<template>
  <div class="cd-month--wrapper container">
    <slot name="month-header"></slot>
    <template v-if="ischedule">
      <cd-day-grid class="cd-month" key-field="week" :compact="compact"
        :week-range="weekRange" :days="keyedDays" :compare-date="compareDate" :select-day="onDaySelect" :headers="headers"
        :select-weekdays="selectWeekdays" :multiple="multiple"> 
        <div slot-scope="{ day, week }">
          <slot :day="day" :week="week"></slot>
        </div>
      </cd-day-grid>
    </template>
    <template v-else>
      <cd-day-tabs class="cd-month" :days="keyedDays" :select-day="onDaySelect" :orientation="orientation" 
        :compare-date="compareDate" :multiple="multiple" :selected-days="selectedDays">
        <div slot-scope="{ day }">
          <slot :day="day"></slot>
        </div>
      </cd-day-tabs>
    </template>
    <slot name="month-footer"></slot>
  </div>
</template>

<script>
import { createDate, weekdays, prevMonthDays } from '@/common/month-days'
import fromRange from '@/common/utils'
import CDDayGrid from '@/components/cd-day-grid.vue'
import CDDayTabs from '@/components/cd-day-tabs.vue'
import collection from '@/common/collection'
export default {
  name: 'cd-month',
  components: {
    'cd-day-grid': CDDayGrid,
    'cd-day-tabs': CDDayTabs
  },
  mixins: [collection],
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
    date: { type: Object, reqiured: true, description: 'Дата, месяц который отрисовывает календарь' },
    sixDays: { type: Boolean, default: false, description: 'Признак шестидневной рабочей недели' },
    prependDays: { type: Boolean, default: true, description: 'Если месяц начинается не с понедельника и prepend-days = true, то присоединим дни из предыдущего месяца так, чтобы первое число указанного месяца было в своей клетке дня недели' },
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    selectWeekdays: { type: Boolean, default: false, description: 'Режим выбора дня недели (появится чекбокс)' },
    onWeekdaySelect: { type: Function, description: 'Функция, которую выполним по выбору дня недели' },
    orientation: { type: String, description: 'Расположение ярлыков на дни месяца' },
    multiple: { type: Boolean, default: false, description: 'Можно ли выбрать несколько дней' }
  },
  data (calendar) {
    return {
      isLoading: false,
      selectedWeekdays: [],
      selectedDays: [],
      editEvent: Object
    }
  },
  methods: {
    onDaySelect ($event, day, week) {
      const findIndex = this.selectedDays.findIndex(d => d.daykey === day.daykey)
      if (findIndex == -1) {
        if (this.multiple) {
          this.selectedDays.push(day)
        } else {
          this.selectedDays = [day]
        }
      } else {
        this.selectedDays.splice(findIndex, 1)
      }
    }
  },
  computed: {
    ischedule ({ mode }) {
      return mode === 'schedule'
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
    weekRange ({ minWeekNumber, maxWeekNumber, weekNumbers }) {
      return fromRange(minWeekNumber, maxWeekNumber, 1).filter(w => weekNumbers.indexOf(w) !== -1)
    },
   
    checkboxid () {
        return ({ day }) => `wd_${day}`
    },
    isChecked ({ selectedWeekdays }) {
      return (row) => {
        return selectedWeekdays.indexOf(row.day) >= 0
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
    isDaySelected ({ selectedDays }) {
      return ({ row }) => {
        return selectedDays.findIndex(d => d.date.date() === row.date.date() && d.date.month() === row.date.month()) >= 0
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
