<template>
  <cd-form
    class="row"
    form-class="col"
    :payload="formModel"
    :descriptor="inputs"
    :sync="true"
  >
    <code
      slot="footer"
      slot-scope="{ payload }"
      class="col"
    >
      {{ payload }}
    </code>
  </cd-form>
</template>

<script>
import CDForm from '@/components/cd-form.vue'
import descriptors from '@/assets/descriptors'
export default {
  name: 'CdFormVModel',
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
</style>