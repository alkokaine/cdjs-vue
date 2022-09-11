<template>
  <div class="cd-month-view">
    <h3>CD-MONTH</h3>
    <cd-month :compact="compact" :select-weekdays="showcheckbox" :date="date"/>
  </div>
</template>

<script>
import CDMonth from '@/components/cd-month.vue'
import { createDate } from '@/common/month-days'
export default {
  components: {
    'cd-month': CDMonth
  },
  data (view) {
    return {
      compact: false,
      showcheckbox: true,
      date: createDate(2022, 9, 11)
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';
</style>