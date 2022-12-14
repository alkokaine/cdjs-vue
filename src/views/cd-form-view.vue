<template>
  <div class="cd-form--view">
    <cd-form
      class="row"
      :descriptor="descriptor"
      :payload="io"
      :show-controls="true"
      :on-submit="onSubmit"
      :on-reset="onReset"
      form-class="col"
      :sync="true"
    >
      <code
        slot="footer"
        class="col"
      >
        <p>{{ io }}</p>
      </code>
    </cd-form>
    <cd-form
      :descriptor="objectDescriptor"
      :payload="object"
    />
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
      io: example.inputObject,
      objectDescriptor: example.objectDescriptor,
      object: example.object
    }
  },
  methods: {
    onSubmit (...args) {
      console.log(args)
    },
    onReset(...args) {
      console.log(args)
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';
</style>