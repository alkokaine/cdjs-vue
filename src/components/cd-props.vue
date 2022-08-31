<template>
  <cd-props-base :descriptor="descriptor" :payload="payload" :parentprop="parentprop">
    <template slot-scope="{ property, hasDescriptor, parent }">
      <cd-props v-if="hasDescriptor" :descriptor="property.descriptor" :payload="payload" :parentprop="property"/>
      <div v-else class="cd-property">
        <slot :property="property" :parent="parent" :hasDescriptor="hasDescriptor">
          <span>{{ payload[property.datafield] }}</span>
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
    parentprop: { type: Object }
  },
  data (base) {
    return {
    }
  }
}
</script>

<style>

</style>