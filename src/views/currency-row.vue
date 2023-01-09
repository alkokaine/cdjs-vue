<template>
  <cd-list-base class="container-sm" :show-items="currencies.length" :collection="data" key-field="code" list-class="list-unstyled row" row-class="currency-block">
    <template slot="header">
      <slot></slot>
    </template>
    <span slot-scope="{ row }">
      {{ row.currency }}
    </span>
  </cd-list-base>
</template>

<script>
import { code } from 'currency-codes'
import CDListBase from '@/components/cd-list-base.vue'
export default {
  name: 'currency-row',
  components: {
    'cd-list-base': CDListBase
  },
  props: {
    currencies: { type: Array, required: true }
  },
  computed: {
    data ({ currencies }) {
      return currencies.map(m => (code(m)))
    }
  }
}
</script>

<style>

</style>