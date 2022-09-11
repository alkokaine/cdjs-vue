<template>
  <thead class="cd-grid--head table-light border-top">
    <tr class="ms-0 me-0">
      <th v-if="selectRows" class="cd-checkbox--cell">
        <input type="checkbox" class="cd-grid--checkbox" v-on:change="onSelectAll($event)" :checked="isSelected"/>
      </th>
      <template v-if="columns.length">
        <th scope="col"
          v-for="(col, jindex) in columns"
          :key="jindex" :class="col.headerclass">
            <p class="mb-0">{{ col.text }}</p>
        </th>
      </template>
      <template v-else>
        <th scope="col"></th>
      </template>
      <th scope="col"></th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'cd-grid-head',
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