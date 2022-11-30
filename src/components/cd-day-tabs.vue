<template>
  <cd-tabs class="cd-day-tabs" :tabs="days" tab-key="daykey" :orientation="orientation">
    <div class="cd-day--wrap" slot-scope="{ tab }">{{ tab }}</div>
    <cd-day v-if="currentDay.date" slot="content" :day="currentDay"></cd-day>
  </cd-tabs>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
import CDDay from '@/components/cd-day.vue'
export default {
  name: 'cd-day-tabs',
  components: {
    'cd-tabs': CDTabs,
    'cd-day': CDDay
  },
  props: {
    days: { type: Array, required: true, description: 'Коллекция дней' },
    orientation: { type: String, description: 'Положение и направление дней'}
  },
  data (tabs) {
    return {
      currentDay: Object
    }
  }
}
</script>

<style>

</style>