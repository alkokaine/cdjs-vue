<template>
  <div class="cd-grid">
    <table class="cd-grid--table table table-sm border-bottom" :class="[{ 'table-striped' : striped, 'table-hover': highlightOnHover }, borderclass ]">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <thead class="cd-grid--head table-light border-top"/>
      <tbody class="cd-grid---tbody"/>
      <tfoot v-if="$slots.footer" class="cd-grid--footer"><slot name="footer"/></tfoot>
    </table>
  </div>
</template>

<script>
const resolveborder = (borders) => {
  switch (borders) {
    case 'all': return 'table-bordered'
    case 'rows': return ''
    case 'cols': return ''
    case 'none': return 'table-borderless'
  }
}

export default {
  name: 'cd-grid',
  props: {
    highlightOnHover: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    collection: { type: Array }
  },
  data (grid) {
    return {
      borderclass: resolveborder(grid.borders)
    }
  }
}
</script>

<style>

</style>