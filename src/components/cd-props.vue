<template>
  <cd-props-base :descriptor="descriptor" :payload="payload" :owner="owner">
    <template slot-scope="{ property, hasDescriptor, parent }">
      <cd-props v-if="hasDescriptor" :descriptor="property.descriptor" :payload="payload" :owner="property"/>
      <div v-else class="cd-property" :data-property="property.datafield" :class="resolvePropertyClass(property.propClass)">
        <slot :property="property" :parent="parent" :hasDescriptor="hasDescriptor">
          <span class="cd-property--value">{{ payload[property.datafield] }}</span>
        </slot>
      </div>
    </template>
  </cd-props-base>
</template>

<script>
import cdPropsBase from './cd-props-base.vue'
export default {
  name: 'cd-props',
  components: { 'cd-props-base': cdPropsBase },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    owner: { type: Object }
  },
  data (base) {
    return {}
  },
  computed: {
    resolvePropertyClass (vm) {
      return (propClass) => typeof propClass === 'function' ? propClass(vm.payload) : propClass
    }
  }
}
</script>

<style>

</style>