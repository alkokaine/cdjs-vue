<template>
  <div>
    <cd-props-grid :component="grid"></cd-props-grid>
  </div>
</template>

<script>

import cdjs from '@/../dist/cdjs/cdjs.common'
export default {
  components: {
    'cd-props-grid': cdjs.CDPropsGrid
  },
  data (view) {
    return {
      grid: cdjs.CDGrid
    }
  }
}
</script>

<style>

</style>