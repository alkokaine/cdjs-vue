<template>
  <cd-vue-props :component="grid"></cd-vue-props>
</template>

<script>
import CDPropsGrid from '@/components/cd-props-grid.vue'
import CDGrid from '@/components/cd-grid.vue'
export default {
  components: {
    'cd-props-grid': CDPropsGrid
  },
  data (view) {
    return {
      grid: CDGrid
    }
  }
}
</script>

<style>

</style>