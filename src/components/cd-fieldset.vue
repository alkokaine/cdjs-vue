<template>
  <fieldset class="cd-fieldset d-block w-auto position-relative" :class="[{ 'border border-1 has-legend' : hasLegend(parent)}]">
    <cd-props-base :class="[{ 'mt-2': hasLegend(parent) }]" :descriptor="descriptor" :parentprop="parent" :payload="payload" :inner="inner">
      <legend v-if="hasLegend(parent)" class="cd-legend position-absolute top-25 start-0 translate-middle-y ms-4" slot="text">
        <p class="cd-legend--text bg-secondary text-white px-2 user-select-none">{{ parent.text }}</p>
      </legend>
      <template slot-scope="{ property, hasDescriptor }">
        <cd-fieldset v-if="hasDescriptor" :descriptor="property.descriptor" :payload="payload" :parent="property" :inner="true">
          <slot slot-scope="row" :property="row.property" :parent="property"/>
        </cd-fieldset>
        <div class="cd-field" v-else>
          <slot :property="property" :parent="parent"/>
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
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    parent: { type: [Object], default: Object },
    inner: { type: Boolean, default: false }
  },
  computed: {
    hasLegend () {
      return (property) => decorator.hasLegend(property)
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