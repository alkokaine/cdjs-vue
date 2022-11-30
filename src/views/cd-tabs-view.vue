<template>
  <div class="cd-tabs-view">
    <cd-tabs :tabs="tabs" tab-key="key"></cd-tabs>
  </div>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
export default {
  components:{
    'cd-tabs': CDTabs
  },
  data (tabs) {
    return {
      tabs: [ { key: 1, tab: 1}, { key: 2, tab: 2}, { key: 3, tab: 3} ]
    }
  }
}
</script>

<style>

</style>