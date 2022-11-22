<template>
  <cd-prop-editor :payload="current">
  </cd-prop-editor>
</template>

<script>
import CDPropEditor from '@/components/cd-prop-editor.vue'
import descriptor from '@/assets/descriptors'
export default {
  components: {
    'cd-prop-editor': CDPropEditor
  },
  data (view) {
    return {
      descriptor: descriptor.objectDescriptor,
      current: {}
    }
  }
}
</script>

<style>

</style>