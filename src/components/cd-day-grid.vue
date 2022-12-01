<template>
  <cd-grid class="cd-days--grid container" :collection="weeks" :descriptor="descriptor" key-field="week" :class="[{ 'w-auto': compact }]" :small="compact">
    <template slot-scope="{ header, row, property }">
      <div v-if="header" class="cd-weekday--header">
        <template v-if="selectWeekdays">
          <el-checkbox :label="property.text"></el-checkbox>
        </template>
        <template v-else>
          {{ property.text }}
        </template>
      </div>
      <div v-else-if="row[property.datafield]" class="cd-day--grid-cell">
        <cd-day :day="row[property.datafield]">
          <span slot="header"></span>
          <div class="cd-day--cell-content">
            <slot :day="row[property.datafield]" :week="row"></slot>
          </div>
        </cd-day>
      </div>
    </template>
  </cd-grid>
</template>
<script>
import CDGrid from '@/components/cd-grid.vue'

import { weekDescriptor } from '@/common/month-days'
import CdDay from './cd-day.vue'

export default {
  name: 'cd-day-grid',
  components: {
    'cd-grid': CDGrid,
    CdDay
  },
  props: {
    selectWeekdays: { type: Boolean, default: false, description: 'Показывать ли чекбоксы у дней недели' },
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    schedule: { type: Array, required: true, default: function () {
      return []
    }, description: 'События месяца' },
    days: { type: Array, requierd: true, default: function () {
      return []
    }, description: 'Дни месяца'},
    compareDate: { type: Function, required: true, description: 'Функция сравнения объектов с датами' },
    weekRange: { type: Array, required: true, default: function () {
      return [1, 2, 3, 4, 5]
    }, description: 'Список недель месяца' },
  },
  data (grid) {
    return {}
  },
  computed: {
    descriptor ({ compact }) {
      return weekDescriptor(compact)
    },
    weekFactory ( { descriptor } ) {
      return (week, days) => {
        const props = descriptor.map(p => (Object.defineProperty({}, p.datafield, { enumerable: true, value: days.find(d => {
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