<template>
  <fieldset class="cd-fieldset d-block position-relative" :class="[{ 'border border-1 has-legend' : hasLegend(owner), 'disabled': disabled }]" :disabled="disabled">
    <cd-props-base :class="[{ 'mt-2': hasLegend(owner) }]" :descriptor="descriptor" :owner="owner" :payload="payload" :config="propConfig">
      <legend v-if="hasLegend(owner)" class="cd-legend position-absolute top-25 start-0 translate-middle-y ms-4" slot="text">
        <p class="cd-legend--text bg-secondary text-white px-2 user-select-none">{{ owner.text }}</p>
      </legend>
      <template slot-scope="{ property, config }">
        <cd-fieldset v-if="config.hasDescriptor" :descriptor="property.descriptor" :owner="property" :payload="payload" :isDisabled="isDisabled" :field-config="fieldConfig">
          <slot slot-scope="row" :property="row.property" :parent="property" :value="payload[row.property.datafield]" :config="fieldConfig(row.property)"/>
        </cd-fieldset>
        <div v-else class="cd-field pt-2" :class="resolvePropertyClass(property)">
          <slot :property="property" :parent="owner" :value="payload[property.datafield]" :config="fieldConfig(property)"/>
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
      disabled: typeof fieldset.isDisabled === 'function' ? fieldset.isDisabled(fieldset.owner) :fieldset.isDisabled
    }
  },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    owner: { type: Object, default: Object },
    isDisabled: { type: Function },
    fieldConfig: { type: Function, required: true, default: (prop) => ({}) }
  },
  computed: {
    hasLegend () {
      return (property) => decorator.hasLegend(property)
    },
    propConfig () {
      return (property) => ({
        hasDescriptor: decorator.hasDescriptor(property)
      })
    },
    resolvePropertyClass ({ payload }) {
      return (property) => decorator.resolvePropertyClass(property, payload)
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