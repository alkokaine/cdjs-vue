<template>
  <cd-form class="row" form-class="col" :payload="formModel" :descriptor="inputs" :sync="true">
    <code class="col" slot="footer" slot-scope="{ payload }">
      {{ payload }}
    </code>
  </cd-form>
</template>

<script>
import CDForm from '@/components/cd-form.vue'
import descriptors from '@/assets/descriptors'
export default {
  name: 'cd-form-v-model',
  components: {
    'cd-form': CDForm
  },
  data (vmodel) {
    return {
      formModel: descriptors.inputObject,
      inputs: descriptors.inputs,
    }
  }
}
</script>

<style>
  code {
    white-space: pre;
    text-align: start;
  }
</style>