<template>
  <cd-props-base :descriptor="descriptor" :payload="payload" :owner="owner" :config="propertyConfig">
    <template slot-scope="{ property, config, parent }">
      <cd-props v-if="config.hasDescriptor" :descriptor="property.descriptor" :payload="payload" :owner="property" :prop-config="propConfig">
        <slot slot-scope="child" :property="child.property" :value="child.value" :parent="property" :config="child.config">
          <span class="cd-property--value">{{ child.value }}</span>
        </slot>
      </cd-props>
      <div v-else class="cd-property" :data-property="property.datafield" :class="resolvePropertyClass(property)">
        <slot :property="property" :parent="parent" :config="config" :value="payload[property.datafield]"></slot>
      </div>
    </template>
  </cd-props-base>
</template>

<script>
import cdPropsBase from './cd-props-base.vue'
import decorator from '@/common/property-decorator'
export default {
  name: 'cd-props',
  components: { 'cd-props-base': cdPropsBase },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    owner: { type: Object },
    propConfig: { type: Function }
  },
  data (base) {
    return {
      isPropConfig: base.propConfig !== undefined && typeof base.propConfig === 'function'
    }
  },
  computed: {
    resolvePropertyClass (vm) {
      return (property) => decorator.resolvePropertyClass(property, vm.payload)
    },
    propertyConfig ({ isPropConfig, propConfig }) {
      return (property) => (Object.assign({ hasDescriptor: decorator.hasDescriptor(property) }, isPropConfig ? propConfig(property) : {}))
    }
  }
}
</script>

<style>

</style>