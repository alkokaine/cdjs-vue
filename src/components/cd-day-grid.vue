<template>
  <cd-grid
    class="cd-days--grid container"
    :collection="weeks"
    :descriptor="descriptor"
    key-field="week"
    :class="[{ 'w-auto': compact }]"
    :small="compact"
  >
    <div class="cd-weekday--header" slot="header" slot-scope="{ property }">
      <template v-if="selectWeekdays">
        <el-checkbox :label="property.text" />
      </template>
      <template v-else>
        {{ property.text }}
      </template>
    </div>
    <template slot-scope="{ row, property }">
      <template v-if="property">
        <div
          v-if="property && row[property.datafield]"
          class="cd-day--grid-cell"
        >
          <cd-day
            class="cd-grid--day"
            :day="getDay(row[property.datafield])" 
            @click.native="selectDay($event, row[property.datafield], row)"
          >
            <span slot="header" />
            <div
              slot-scope="{ day }"
              class="cd-day--cell-content text-center"
            >
              <slot
                :day="day"
                :week="row"
              />
            </div>
          </cd-day>
        </div>
      </template>
    </template>
  </cd-grid>
</template>
<script>
import CDGrid from '@/components/cd-grid.vue'

import { weekDescriptor } from '@/common/month-days'
import CdDay from './cd-day.vue'

export default {
  name: 'CdDayGrid',
  components: {
    'cd-grid': CDGrid,
    CdDay
  },
  props: {
    selectWeekdays: { type: Boolean, default: false, description: 'Показывать ли чекбоксы у дней недели' },
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    days: { type: Array, requierd: true, default: function () {
      return []
    }, description: 'Дни месяца'},
    compareDate: { type: Function, required: true, description: 'Функция сравнения объектов с датами' },
    weekRange: { type: Array, required: true, default: function () {
      return [1, 2, 3, 4, 5]
    }, description: 'Список недель месяца' },
    selectDay: {
      type: Function,
      description: 'Функция, которая выполнится при выборе дня'
    }
  },
  data (grid) {
    return {}
  },
  computed: {
    getDay () {
      return ({ date }) => (date.toDate())
    },
    descriptor ({ compact }) {
      return weekDescriptor(compact)
    },
    weekFactory ( { descriptor } ) {
      return (week, days) => {
        const props = descriptor.map(p => (Object.defineProperty({}, p.datafield, { 
          enumerable: true, 
          value: days.find(d => {
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
<style>
  .cd-grid--day:hover {
    box-shadow: 0 0 6px 3px #c3c3c336;
  }
</style>