<template>
  <cd-form :descriptor="descriptor" :payload="payload" :sync="true">
    <div slot="header">
      <slot></slot>
    </div>
  </cd-form>
</template>

<script>
import propertyDescriptor from '@/assets/property-descriptor'
import CDForm from '@/components/cd-form.vue'
export default {
  props: {
    payload: { type: Object, required: true },
    descriptor: { type: Array, default: () => propertyDescriptor }
  },
  components: {
    'cd-form': CDForm
  },
  data (editor) {
    return {
    }
  }
}
</script>

<style>

</style>