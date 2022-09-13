<template>
  <thead class="cd-grid--head table-light border-top">
    <cd-row row-key="header">
      <th v-if="selectRows" scope="col" slot="select" class="cd-checkbox--cell">
        <input type="checkbox" class="cd-grid--checkbox"/>
      </th>
      <th scope="col"></th>
      <th scope="col" v-for="(col, jindex) in columns"
        :key="jindex" :class="col.headerclass">
        <p class="mb-0">
          <slot :property="col" :propindex="jindex"></slot>
        </p>
      </th>
      <th scope="col"></th>
    </cd-row>
  </thead>
</template>

<script>
import CDRow from './cd-row.vue'
export default {
  name: 'cd-grid-head',
  components: {
    'cd-row': CDRow
  },
  props: {
    columns: { type: Array, required: true },
    onSelectAll: { type: Function },
    isSelected: { type: Boolean },
    selectRows: { type: Boolean, default: false }
  }
}
</script>

<style>

</style>