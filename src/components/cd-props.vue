<template>
  <cd-list class="cd-props" :collection="descriptor" key-field="datafield" :is-row-visible="isRowVisible" list-class="list-unstyled">
    <template slot="header">
      <slot name="header"></slot>
    </template>
    <template slot-scope="prow">
      <template v-if="hasDescriptor(prow.row)">
        <slot :property="prow.row" :parentprop="parentprop" :index="prow.index" :hasInner="hasDescriptor(prow.row)">
          <cd-props :payload="payload" :descriptor="prow.row.descriptor" :parentprop="prow.row">
          </cd-props>
        </slot>
      </template>
      <template v-else>
        <slot :property="prow.row" :parentprop="parentprop" :index="prow.index">
          {{ payload[prow.row.datafield] }}
        </slot>
      </template>
    </template>
    <template v-if="$slots.footer" slot="footer">
      <slot name="footer"></slot>
    </template>
  </cd-list>
</template>

<script>
import CDList from './cd-list.vue'
import decorator from '@/common/property-decorator'
export default {
  name: 'cd-props',
  components: {
    'cd-list': CDList
  },
  props: {
    descriptor: { type: Array, required: true, description: 'Массив свойств' },
    payload: { type: Object, required: true, description: 'Объект, свойства которого мы рассматриваем' },
    parentprop: { type: Object, description: 'Объект-дескриптор' },
  },
  computed: {
    hasDescriptor () {
      return (property) => decorator.hasDescriptor(property)
    },
    isRowVisible () {
      const props = this
      return (property, index) => decorator.isVisible(property, props.payload) && !decorator.isHidden(property, props.payload)
    }
  }
}
</script>

<style>
  .d-contents {
    display: contents;
  }
</style>