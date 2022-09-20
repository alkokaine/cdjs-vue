<template>
  <cd-props :payload="object" :descriptor="properties"></cd-props>
</template>

<script>
import CDProps from '@/components/cd-props.vue'
import assets from '@/assets/descriptors'
export default {
  name: 'cd-props-view',
  components: {
    'cd-props': CDProps
  },
  data (props) {
    return {
      object: assets.object,
      properties: assets.objectDescriptor
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
</style>