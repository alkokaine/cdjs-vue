<template>
  <fieldset class="cd-fieldset d-block w-auto position-relative" :class="[{ 'border border-1 has-legend' : hasLegend(parent)}]">
    <cd-props :descriptor="descriptor" :parentprop="parent" :payload="payload">
      <legend v-if="hasLegend(parent)" class="cd-legend position-absolute top-25 start-0 translate-middle-y ms-4" slot="text">
        <p class="cd-legend--text bg-secondary text-white px-2 user-select-none">{{ parent.text }}</p>
      </legend>
      <template slot-scope="row">
        <template v-if="hasDescriptor(row.property)">
          <cd-fieldset :descriptor="row.property.descriptor" :payload="payload" :parent="row.property" :inner="true">
            <template slot-scope="{ property }">
              <slot :property="property" :parent="parent"/>
            </template>
          </cd-fieldset>
        </template>
        <div v-else class="cd-field">
          <slot :property="row.property" :parent="parent"/>
        </div>
      </template>
    </cd-props>
  </fieldset>
</template>

<script>

import decorator from '@/common/property-decorator'
import CdList from './cd-list.vue'
import CdProps from './cd-props.vue'
export default {
  name: 'cd-fieldset',
  components: {
    // 'cd-list': CdList,
    'cd-props': CdProps
  },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    parent: { type: [Object], default: Object },
    inner: { type: Boolean, default: false }
  },
  computed: {
    hasDescriptor () {
      return (property) => decorator.hasDescriptor(property)
    },
    hasLegend () {
      return (property) => decorator.hasLegend(property)
    },
    isPropertyVisible () {
      const props = this
      return (property, index) => decorator.isPropertyVisible(property, props.payload, index)
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
  }
</style>