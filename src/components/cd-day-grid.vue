<template>
  <cd-grid class="cd-days--grid" :collection="weeks" :descriptor="weekDescriptor" key-field="week">
    <template slot-scope="{ header, row, property }">
      <template v-if="header">
        {{ property.text }}
      </template>
      <template v-else>
        <slot :day="row[property.datafield]"></slot>
      </template>
    </template>
  </cd-grid>
</template>
<script>
import CDGrid from '@/components/cd-grid.vue'

import { weekDescriptor } from '@/common/month-days'
export default {
  name: 'cd-day-grid',
  components: {
    'cd-grid': CDGrid
  },
  props: {
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    schedule: { type: Array, required: true, description: 'События месяца' },
    weekRange: { type: Array, required: true, description: 'Список недель месяца' },
    days: { type: Array, requierd: true, description: 'Дни месяца'},
    compareDate: { type: Function, required: true, description: 'Функция сравнения объектов с датами' }
  },
  data (grid) {
    return {
      weekDescriptor: weekDescriptor(grid.compact)
    }
  },
  computed: {
    weekFactory ( { weekDescriptor } ) {
      return (week, days) => {
        const props = weekDescriptor.map(p => (Object.defineProperty({}, p.datafield, { enumerable: true, value: days.find(d => {
          const _day = d.date.day()
          return _day  === p.day  
        })})))
        const neweek = Object.assign({ week: week }, ...props)
        return neweek
      }
    },
    weeks ({ weekRange, days, weekFactory }) {
      return weekRange.map(w => weekFactory(w, days.filter(d => d.date.week() === w)))
    },
  }
}
</script>