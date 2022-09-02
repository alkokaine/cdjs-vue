<template>
  <cd-list v-loading="isLoading" class="cd-month container mx-auto" :collection="weekdays" key-field="day" 
    list-class="list-unstyled row justify-content-center"
    :row-class="['cd-weekday--container col-1 px-1 w-auto']">
    <div slot="header">
      <slot name="month-header"></slot>
    </div>
    <cd-list v-if="isArray" slot-scope="{ row }" class="mw-mc" :collection="resolvedays(row)" 
      key-field="day" list-class="list-unstyled col-1 cd-weekdays--wrap mw-mc" row-class="cd-day--wrap d-block mw-mc">
      <div slot="header" class="fw-bold text-uppercase row">
        <p class="my-0">
          <el-checkbox v-if="selectWeekdays" class="el-checkbox" type="checkbox" :checked="isWeekdaySelected(row) || allDaysSelected(row)" @change="weekdayselect({ $event, row }, onWeekdaySelect)"/>
        </p>
        <p class="my-0">
          {{ row.weekday.short }}
        </p>
      </div>
      <cd-day slot-scope="day" :day="day.row" class="border border-0 mx-auto" :class="{ 'is-selected border-1': isDaySelected(day), 'compact': compact }"
        @click.native.capture="onDaySelect({ $event, day: day.row })">
        <template v-if="!compact">
          <slot :day="day.row"></slot>
        </template>
      </cd-day>
    </cd-list>
    <div slot="footer">
      <slot name="month-footer"></slot>
    </div>
  </cd-list>
</template>

<script>
import { prevMonthDays, getDays, weekdays } from '@/common/month-days'
import CDList from './cd-list.vue'
import CdDay from './cd-day.vue'

export default {
  name: 'cd-month',
  components: {
    'cd-list': CDList,
    'cd-day': CdDay
  },
  props: {
    date: { type: Date, reqiured: true },
    sixDays: { type: Boolean, default: false },
    prependDays: { type: Boolean, default: true },
    compact: { type: Boolean, default: false },
    selectWeekdays: { type: Boolean, default: false },
    onWeekdaySelect: { type: Function },
    onDaySelect: {
      type: Function,
      default: function ({ $event, day }) {
        const calendar = this
        const currentIndex = calendar.selectedDays.findIndex(i => i.date.date() === day.date.date())
        if (currentIndex >= 0) calendar.selectedDays.splice(currentIndex, 1)
        else calendar.selectedDays.push(day)
        const weekdayIndex = calendar.selectedWeekdays.findIndex(w => w === day.date.day())
        if (weekdayIndex >= 0) calendar.selectedWeekdays.splice(weekdayIndex, 1)
      }
    }
  },
  data (calendar) {
    return {
      weekdays,
      isLoading: false,
      selectedWeekdays: [],
      selectedDays: [],
      dates: calendar.fetchMonth(calendar.date),
    }
  },
  watch: {
    date: {
      handler (newvalue, oldvalue) {
        const calendar = this
        if (newvalue !== undefined) {
          if (oldvalue === undefined || (newvalue.getFullYear() !== oldvalue.getFullYear() || newvalue.getMonth() !== oldvalue.getMonth() )) {
            calendar.fetchMonth(newvalue)
          }
        }
      }
    },
    sixDays: {
      handler (newvalue) {
        const calendar = this
        calendar.fetchMonth(calendar.date)
      }
    }
  },
  methods: {
    fetchMonth (date) {
      const calendar = this
      calendar.isLoading = true
      getDays(date, { pre: 1, covid: 1, sd: (calendar.sixDays === true ? 1 : 0) }).then(response => {
        calendar.dates = calendar.prependDays ? prevMonthDays(date).concat(response) : response
        calendar.isLoading = false
      })
    },
    weekdayselect({ $event, row}, callback) {
      const calendar = this
      const indexOf =calendar.selectedWeekdays.findIndex(w => w === row.day)
      if (indexOf >= 0) {
        calendar.selectedDays.sort((d1, d2) => d1.date.day() - d2.date.day())
        calendar.selectedWeekdays.splice(indexOf, 1)
        const indecies = {
          f: calendar.selectedDays.findIndex(d => d.date.day() === row.day),
          l: calendar.selectedDays.findLastIndex(d => d.date.day() === row.day)
        }
        calendar.selectedDays.splice(indecies.f, (indecies.l - indecies.f + 1))
      } else {
        calendar.selectedWeekdays.push(row.day)
        const newdates = calendar.dates.filter(d => {
          return d.isprev === undefined && d.date.day() === row.day && calendar.selectedDays.findIndex(s => s.date.date() === d.date.date()) === -1 
        })
        const firstIndex = calendar.selectedDays.findIndex(d => d.date.day() === row.day)
        calendar.selectedDays.splice(firstIndex, 0, ...newdates)
      }
    }
  },
  computed: {
    resolvedays () {
      const month = this
      return (row) => {
        try {
          return month.dates.filter(d => d.date.day() === row.day)
        }
        catch (err) {
          return []
        }
      }
    },
    isArray () {
      return Array.isArray(this.dates) && typeof this.dates.filter === 'function'
    },
    resolvedate () {
      return (row) => row.date.toDate()
    },
    weekdayclass () {
      const calendar = this
      return (weekday, index) => {
        const isselected = calendar.selectedWeekdays.indexOf(weekday.day) >= 0
        if (index === 5 && !calendar.sixDays || index === 6) return `holiday`
      }
    },
    isDaySelected () {
      const calendar = this
      return ({ row }) => {
        return row.isprev !== true && calendar.selectedDays.findIndex(d => d.date.date() === row.date.date()) >= 0
      }
    },
    selectedDaysOf () {
      const calendar = this
      return ({ day }) => (calendar.selectedDays.filter(d => d.date.day() === day)).lenght
    },
    daysOfWeekday () {
      const calendar = this
      return ({ day }) => {
        try {
          return calendar.dates.filter(d => d.isprev === undefined && d.date.day() === day).lenght
        } catch (err) {
          return -1
        }
      }
    },
    isWeekdaySelected () {
      const calendar = this
      return ({ day }) => {
        return calendar.selectedWeekdays.indexOf(day) >= 0
      }
    },
    allDaysSelected () {
      const calendar = this
      return ({ day }) => {
        
      }
    }
  }
}
</script>

<style>
  .mw-mc {
    max-width: min-content;
  }
</style>
