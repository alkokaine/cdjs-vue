<template>
  <cd-list class="cd-props" :collection="descriptor" key-field="datafield" >
    <template v-if="$slots.header" slot="header">
      <slot name="header"></slot>
    </template>
    <template v-if="$slots.footer" slot="footer">
      <slot name="footer"></slot>
    </template>
  </cd-list>
</template>

<script>
export default {
  name: 'cd-props',
  props: {
    descriptor: { type: Array, required: true, description: 'Массив свойств' },
    payload: { type: Object, required: true, description: 'Объект, свойства которого мы рассматриваем' }
  }
}
</script>

<style>

</style>