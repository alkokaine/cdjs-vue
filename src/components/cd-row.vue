<template>
  <tr>
    <td v-if="$slots.select" class="cd-checkbox--cell">
      <slot name="select"></slot>
    </td>
    <td v-if="$slots.begin">
      <slot name="begin"></slot>
    </td>
    <slot :el="$vnode.child">{{ row }}</slot>
    <td v-if="$slots.end">
      <slot name="end"></slot>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'cd-row',
  props: {
    row: { type: Object, required: true }
  },
  data (cdrow) {
    return {}
  }
}
</script>

<style>

</style>