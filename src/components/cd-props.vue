<template>
  <cd-list class="cd-props text-start" :collection="descriptor" key-field="datafield" :is-row-visible="isPropertyVisible" :list-class="['list-unstyled property-list', parentprop.ulClass]" row-class="cd-property--wrap container">
    <template slot="header">
      <slot name="text"></slot>
    </template>
    <div class="cd-property" slot-scope="{ row, index }">
      <slot :property="row" :parent="parentprop" :index="index">
        <template v-if="hasDescriptor(row)">
          <cd-props :descriptor="row.descriptor" :payload="payload" :parentprop="row"></cd-props>
        </template>
        <template v-else>
          {{ payload[row.datafield] }}
        </template>
      </slot>
    </div>
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
    parentprop: { type: Object, default: Object, description: 'Объект-дескриптор' },
    payload: { type: Object, required: true },
    inner: { type: Boolean }
  },
  computed: {
    hasDescriptor () {
      return (property) => decorator.hasDescriptor(property)
    },
    isPropertyVisible () {
      const props = this
      return (property, index) => decorator.isPropertyVisible(property, props.payload, index)
    }
  }
}
</script>

<style>
</style>