<template>
  <div class="country-row">
    <span>{{ country }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'country-row',
  props: {
    country: { type: Object, required: true },
  }
}
</script>

<style>

</style>