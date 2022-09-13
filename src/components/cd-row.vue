<template>
  <tr :data-rowkey="rowKey" class="cd-grid--row">
    <slot name="select"></slot>
    <slot name="begin"></slot>
    <slot :el="$vnode.child"></slot>
    <slot name="end"></slot>
  </tr>
</template>

<script>
export default {
  name: 'cd-row',
  props: {
    rowKey: { type: [String, Number], required: true }
  },
  data (cdrow) {
    return {}
  }
}
</script>

<style>

</style>