<template>
  <cd-grid :collection="collection" :descriptor="columns" key-field="ObjectID"></cd-grid>
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

</style>