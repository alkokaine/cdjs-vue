<template>
  <tr
    :data-rowkey="rowKey"
    class="cd-grid--row"
  >
    <slot name="select" />
    <slot name="begin" />
    <slot :el="$vnode.child" />
    <slot name="end" />
  </tr>
</template>

<script>
export default {
  name: 'CdRow',
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