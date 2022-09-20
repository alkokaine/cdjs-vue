<template>
  <fieldset class="cd-fieldset d-block w-auto position-relative" :class="[{ 'border border-1 has-legend' : hasLegend(owner), 'disabled': disabled }]" :disabled="disabled">
    <cd-props-base :class="[{ 'mt-2': hasLegend(owner) }]" :descriptor="descriptor" :owner="owner" :payload="payload">
      <legend v-if="hasLegend(owner)" class="cd-legend position-absolute top-25 start-0 translate-middle-y ms-4" slot="text">
        <p class="cd-legend--text bg-secondary text-white px-2 user-select-none">{{ owner.text }}</p>
      </legend>
      <template slot-scope="{ property, hasDescriptor }">
        <cd-fieldset v-if="hasDescriptor" :descriptor="property.descriptor" :owner="property" :payload="payload" :isDisabled="isDisabled">
          <slot slot-scope="row" :property="row.property" :parent="property" :isDisabled="disabled || row.isDisabled"/>
        </cd-fieldset>
        <div v-else class="cd-field" :class="resolvePropertyClass(property.propClass)">
          <slot :property="property" :parent="owner" :isDisabled="disabled || resolveDisabled(property)"/>
        </div>
      </template>
    </cd-props-base>
  </fieldset>
</template>

<script>

import decorator from '@/common/property-decorator'
import CdPropsBase from './cd-props-base.vue'
export default {
  name: 'cd-fieldset',
  components: {
    'cd-props-base': CdPropsBase
  },
  data (fieldset) {
    return {
      disabled: fieldset.isDisabled(fieldset.owner)
    }
  },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    owner: { type: Object, default: Object },
    isDisabled: { type: Function }
  },
  computed: {
    hasLegend () {
      return (property) => decorator.hasLegend(property)
    },
    resolvePropertyClass (vm) {
      return (propClass) => typeof propClass === 'function' ? propClass(vm.payload) : propClass
    },
    resolveDisabled (vm) {
      return (property) => {
        return vm.disabled || vm.isDisabled(property)
      }
    }
  }
}
</script>

<style>
  .cd-legend {
    font-weight: bold;
    width: auto;
    font-size: 1.2em;
  }
  .cd-fieldset.has-legend {
    margin-bottom: 2em;
    padding-bottom: 1em;
  }
</style>