<template>
  <cd-list class="cd-month mx-auto container" :class="{ 'compact': compact }" :collection="weekdays" key-field="day"
    list-class="list-unstyled mx-auto container-sm row"
    :row-class="['col cd-weekday--container px-0 mx-1', { 'mw-mc': compact, 'w-auto': !compact }]">
    <div slot="header">
      <slot name="month-header"></slot>
    </div>
    <cd-list slot-scope="{ row, index }" :collection="row.days"
      key-field="number" :list-class="['list-unstyled cd-weekdays--wrap justify-content-center', { 'w-100': !compact}, weekdayClass(row, index)]" :row-class="['cd-day--wrap d-block mx-auto', { 'mw-mc': compact }]">
      <div slot="header" class="fw-bold text-uppercase mx-auto" :class="{ 'mw-mc': compact }">
        <p v-if="selectWeekdays" class="my-0 px-0">
          <el-checkbox :id="checkboxid(row.day)" class="el-checkbox" type="checkbox" :value="isChecked(row)" @change="weekdayselect({ $event, row }, onWeekdaySelect)"/>
        </p>
        <p class="my-0 px-0">
          <template v-if="compact">{{ row.weekday.short }}</template>
          <template v-else>{{ row.weekday.long }}</template>
        </p>
      </div>
      <cd-day slot-scope="day" :day="day.row" class="mx-auto mb-2 border-0" :class="[`week-${day.row.week}`, { 'is-selected border-1': isDaySelected(day),  'compact': compact }]"
        @click.native.capture="onDaySelect({ $event, day: day.row, weekday: row })">
        <p class="my-0" :class="{ 'fw-bold': !compact }" slot="header">
          {{ day.row.date.date() }}
        </p>
        <template v-if="!compact">
          <div class="cd-day--content-wrapper px-2">
            <slot :day="day.row"></slot>
          </div>
        </template>
      </cd-day>
    </cd-list>
    <div slot="footer">
      <slot name="month-footer"></slot>
    </div>
  </cd-list>
</template>

<script>
import { createDate, weekdays, prevMonthDays } from '@/common/month-days'
import CDList from './cd-list.vue'
import CdDay from './cd-day.vue'
import { Checkbox } from 'element-ui'

export default {
  name: 'cd-month',
  components: {
    'cd-list': CDList,
    'cd-day': CdDay,
    'el-checkbox': Checkbox
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
    }
  },
  data (calendar) {
    return {
      isLoading: false,
      selectedWeekdays: [],
      selectedDays: [],
    }
  },
  methods: {
    weekdayselect({ $event, row }, callback) {
      const calendar = this
      const indexOf =calendar.selectedWeekdays.findIndex(w => w === row.day)
      if (indexOf >= 0) {
        calendar.selectedDays.sort((d1, d2) => d1.date.day() - d2.date.day())
        calendar.selectedWeekdays.splice(indexOf, 1)
        row.days.forEach(day => {
          const _index = calendar.selectedDays.findIndex(d => d.date.date() === day.date.date())
          calendar.selectedDays.splice(_index, 1)
        })
      } else {
        calendar.selectedWeekdays.push(row.day)
        const filtered = row.days.filter(d => d.isprev === undefined)
        filtered.forEach(day => {
          const _index = calendar.selectedDays.findIndex(d => d.date.date() === day.date.date())
          if (_index < 0) calendar.selectedDays.push(day)
        })
      }
    }
  },
  computed: {
    days ({ date, prependDays }) {
      return (prependDays ? prevMonthDays(date) : [])
        .concat(
          Array.from(Array(date.daysInMonth()).keys())
            .map(d => ({ date: createDate(date.year(), date.month() + 1, d + 1)}))
      )
    },
    weekdays ({ days }) {
      return weekdays.map(m => ({
        days: days.filter(d => d.date.day() === m.day).map(d => ({ date: d.date, week: d.date.week() })),
        weekday: m.weekday,
        order: m.order,
        day: m.day,
        year: m.year
      }))
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
    weekdayClass () {
      const calendar = this
      return (weekday, index) => {
        const isselected = calendar.selectedWeekdays.indexOf(weekday.day) >= 0
        if (index === 5 && !calendar.sixDays || index === 6) return `holiday`
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
