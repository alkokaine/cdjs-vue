<template>
  <cd-list class="cd-month" :collection="weekdays" key-field="day" list-class="cd-days--container mx-auto list-unstyled row w-auto flex-nowrap border border-x px-0 mx-2" row-class="cd-weekday--container col px-0">
    <div class="cd-month--header" slot="header">
      <slot name="month-header"></slot>
    </div>
    <cd-list v-if="!isLoading" slot-scope="{ row, index }" :collection="resolvedays(row)" key-field="day" class="cd-weekday--list-wrapper px-0" :class="weekdayclass(row, index)" list-class="cd-weekday--list list-unstyled" row-class="cd-day">
      <span slot="header" class="cd-weekday-name fw-bold text-uppercase">{{ row.weekday.short }}</span>
      <cd-day slot-scope="day" :day="day.row" class="cd-day--wrap">
        <template v-if="!compact">
          <slot :day="day.row"></slot>
        </template>
      </cd-day>
    </cd-list>
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
    compact: { type: Boolean, default: false }
  },
  data (calendar) {
    return {
      weekdays,
      dates: Array,
      isLoading: false
    }
  },
  watch: {
    date: {
      immediate: true,
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
    }
  },
  computed: {
    resolvedays () {
      const month = this
      return (row) => {
        return month.dates.filter(d => d.date.day() === row.day)
      }
    },
    resolvedate () {
      return (row) => row.date.toDate()
    },
    weekdayclass () {
      const calendar = this
      return (weekday, index) => {
        if (index === 5 && !calendar.sixDays || index === 6) return `holiday`
      }
    }
  }
}
</script>

<style>
  .holiday {
    color: salmon;
    font-weight: bold;
  }
  .cd-weekday-name {
    font-size: 0.9rem;
  }
</style>
