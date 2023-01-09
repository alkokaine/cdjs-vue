<template>
  <cd-list-base class="cd-properties" :collection="descriptor" key-field="datafield" row-class="cd-property--descriptor" :is-row-visible="isPropertyVisible"
    :list-class="['list-unstyled cd-properties--list', propClass ]">
    <template slot="header">
      <slot name="text"></slot>
    </template>
    <slot slot-scope="{ row, index }" :property="row" :parent="owner" :config="config(row)" :index="index"/>
    <div v-if="$slots.content" slot="footer">
      <slot name="content"></slot>
    </div>
  </cd-list-base>
</template>

<script>
import CDListBase from './cd-list-base.vue'
import decorator from '@/common/property-decorator'
export default {
  name: 'cd-props-base',
  components: {
    'cd-list-base': CDListBase
  },
  props: {
    config: { type: Function, required: true },
    descriptor: { type: Array, required: true, description: 'Массив свойств', default: () => ([]) },
    owner: { type: Object, default: Object, description: 'Объект-дескриптор' },
    payload: { type: Object, required: true }
  },
  data (propsbase) {
    return {
      propClass: decorator.resolvePropertyClass(propsbase.owner, propsbase.payload),
      hasDescriptor: propsbase.descriptor.length > 0
    }
  },
  computed: {
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