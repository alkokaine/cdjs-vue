<template>
  <cd-tabs class="cd-day-tabs" :tabs="days">
    <div slot-scope="{ tab }">{{ tab }}</div>
    <cd-day slot="content" :day="currentDay"></cd-day>
  </cd-tabs>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
export default {
  name: 'cd-day-tabs',
  components: {
    'cd-tabs': CDTabs
  },
  props: {
    days: { type: Array, required: true, description: 'Коллекция дней' }
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