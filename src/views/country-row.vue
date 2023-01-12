<template>
  <div class="country-row">
    <span v-on:click="onClick($event, country)">{{ country }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'country-row',
  props: {
    country: { type: Object, required: true },
    onClick: { type: Function, params: '(event, country) => void' }
  }
}
</script>

<style>

</style>