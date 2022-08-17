<template>
  <cd-list class="cd-month"></cd-list>
</template>

<script>
import CDList from './cd-list.vue'
import CDDay from './cd-day.vue'

export default {
  name: 'cd-month',
  components: {
    'cd-list': CDList,
    'cd-day': CDDay
  }
}
</script>

<style>

</style>
