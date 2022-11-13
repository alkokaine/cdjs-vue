<template>
  <div class="cd-form--view">
    <cd-form :descriptor="descriptor" :payload="payload" :sync="true">
      <div slot="header">{{ payload }}</div>
    </cd-form>
    <cd-form :descriptor="objectDescriptor" :payload="object"></cd-form>
  </div>
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
      descriptor: example.inputs,
      payload: example.inputObject,
      objectDescriptor: example.objectDescriptor,
      object: example.object
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';
</style>