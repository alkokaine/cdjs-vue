<template>
  <cd-form :descriptor="descriptor" :payload="payload"></cd-form>
</template>

<script>
import CDForm from '@/components/cd-form.vue'
import example from '@/assets/descriptors'
export default {
  components: {
    'cd-form': CDForm
  },
  data (view) {
    return {
      descriptor: example.objectDescriptor,
      payload: example.object
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';
</style>