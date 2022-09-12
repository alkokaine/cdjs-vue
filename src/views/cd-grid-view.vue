<template>
  <cd-grid :collection="collection" :select-rows="false" :descriptor="columns" key-field="ObjectID">
    <template slot-scope="{ header, row, property }">
      <template v-if="header">
        {{ property.text }}
      </template>
      <template v-else>
        {{ row[property.datafield] }}
      </template>
    </template>
  </cd-grid>
</template>

<script>
import cdGrid from '@/components/cd-grid.vue'
import descriptor from '@/assets/descriptors'
export default {
  components: { cdGrid },
  data (view) {
    return {
      collection: [descriptor.object, descriptor.object, descriptor.object],
      columns: descriptor.objectDescriptor
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
</style>