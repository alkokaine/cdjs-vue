<template>
  <cd-list class="cd-props text-start" :collection="descriptor" key-field="datafield" :is-row-visible="isPropertyVisible" :list-class="['list-unstyled property-list container', parentprop.ulClass, { 'mx-0 px-0': inner }]" row-class="cd-property--descriptor px-0">
    <template slot="header">
      <slot name="text"></slot>
    </template>
    <slot slot-scope="{ row, index }" :property="row" :parent="parentprop" :index="index">
        <template v-if="hasDescriptor(row)">
          <cd-props :descriptor="row.descriptor" :payload="payload" :parentprop="row" :inner="true"></cd-props>
        </template>
        <template v-else>
          <div class="cd-property">
            {{ payload[row.datafield] }}
          </div>
        </template>
      </slot>
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