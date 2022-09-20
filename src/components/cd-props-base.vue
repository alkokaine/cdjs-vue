<template>
  <cd-list class="cd-properties" :collection="descriptor" key-field="datafield" row-class="cd-property--descriptor" :is-row-visible="isPropertyVisible"
    :list-class="['list-unstyled cd-properties--list', isOwnerClassFunction ? owner.propClass(payload) : owner.propClass ]">
    <template slot="header">
      <slot name="text"></slot>
    </template>
    <slot slot-scope="{ row, index }" :property="row" :parent="owner" :hasDescriptor="hasDescriptor(row)" :index="index"/>
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
    owner: { type: Object, default: Object, description: 'Объект-дескриптор' },
    payload: { type: Object, required: true }
  },
  data (propsbase) {
    return {
      isOwnerClassFunction: typeof propsbase.owner.propClass === 'function'
    }
  },
  computed: {
    hasDescriptor () {
      return (property) => decorator.hasDescriptor(property)
    },
    isPropertyVisible (vm) {
      return (property, index) => decorator.isPropertyVisible(property, vm.payload, index)
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