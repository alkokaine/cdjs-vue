<template>
  <cd-grid class="cd-days--grid" :collection="weeks" :descriptor="weekDescriptor" key-field="week">
    <template slot-scope="{ header, row, property }">
      <template v-if="header">
        {{ property.text }}
      </template>
      <template v-else>
        <cd-day :day="row[property.datafield]"></cd-day>
      </template>
    </template>
  </cd-grid>
</template>
<script>
import CDGrid from '@/components/cd-grid.vue'
import CDDay from '@/components/cd-day.vue'
import { weekdays } from '@/common/month-days'
export default {
  name: 'cd-day-grid',
  components: {
    'cd-grid': CDGrid,
    'cd-day': CDDay
  },
  props: {
    compact: { type: Boolean, default: false, description: 'Компактный режим' },
    schedule: { type: Array, required: true, description: 'События месяца' },
    weeks: { type: Array, required: true, description: 'Список недель месяца' },
    compareDate: { type: Function, required: true, description: 'Функция сравнения объектов с датами' }
  },
  data (grid) {
    return {
      weekDescriptor: weekdays.map(m => ({ datafield: m.weekday.long, text: grid.compact ? m.weekday.short : m.weekday.long }))
    }
  },
  computed: {
  }
}
</script>