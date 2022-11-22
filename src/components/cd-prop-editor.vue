<template>
  <cd-form :descriptor="propDescriptor" :payload="payload" :sync="true">
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
    payload: { type: Object, required: true }
  },
  components: {
    'cd-form': CDForm
  },
  data (editor) {
    return {
      propDescriptor: propertyDescriptor,
    }
  }
}
</script>

<style>

</style>