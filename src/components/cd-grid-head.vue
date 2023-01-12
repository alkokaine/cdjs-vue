<template>
  <thead
    class="cd-grid--head table-light border-top"
    :class="headClass"
  >
    <cd-row
      row-key="header"
      class="cd-header-row"
    >
      <th
        v-if="selectRows"
        slot="select"
        scope="col"
        class="cd-checkbox--cell"
      >
        <input
          type="checkbox"
          class="cd-grid--checkbox"
        >
      </th>
      <th scope="col" />
      <th
        v-for="(col, jindex) in columns"
        :key="jindex"
        scope="col"
        class="cd-header--cell"
        :class="[col.headerclass, isCellClassFunction ? cellClass(col) : cellClass]"
      >
        <p class="mb-0">
          <slot
            :property="col"
            :propindex="jindex"
          />
        </p>
      </th>
      <th scope="col" />
    </cd-row>
  </thead>
</template>

<script>
import CDRow from './cd-row.vue'
export default {
  name: 'CdGridHead',
  components: {
    'cd-row': CDRow
  },
  props: {
    columns: { type: Array, required: true },
    onSelectAll: { type: Function },
    isSelected: { type: Boolean },
    selectRows: { type: Boolean, default: false },
    headClass: { type: [String, Object, Array] },
    cellClass: { type: [String, Object, Array, Function], default: 'cd-grid-head--cell-base' }
  },
  data (head) {
    return {
      isCellClassFunction: typeof head.cellClass === 'function'
    }
  }
}
</script>

<style>

</style>