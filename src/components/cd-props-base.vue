<template>
  <cd-list class="cd-props--inner text-start" :collection="descriptor" key-field="datafield" :is-row-visible="isPropertyVisible" :list-class="['list-unstyled property-list', parentprop.class]" row-class="cd-property--descriptor">
    <template slot="header">
      <slot name="text"></slot>
    </template>
    <slot slot-scope="{ row, index }" :property="row" :parent="parentprop" :hasDescriptor="hasDescriptor(row)" :index="index"/>
  </cd-list>
</template>

<script>
import CDList from './cd-list.vue'
import decorator from '@/common/property-decorator'
export default {
  name: 'cd-props-base',
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
  .cd-property--descriptor {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>