<template>
  <cd-list class="cd-props" :collection="descriptor" key-field="datafield" :is-row-visible="isRowVisible">
    <template v-if="$slots.header" slot="header">
      <slot name="header"></slot>
    </template>
    <template slot-scope="{ row, index }">
      <slot :property="row" :index="index">
        <template v-if="hasDescriptor(row)">
          <cd-props :class="row.class" :descriptor="row.descriptor" :payload="payload"></cd-props>
        </template>
        <template v-else>
          {{ row }}
        </template>
      </slot>
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
    isRowVisible: { 
      type: Function, 
      default: function (row, index) {
        return decorator.isVisible(row, this.payload)
      }
    }
  },
  computed: {
    hasDescriptor () {
      return (property) => decorator.hasDescriptor(property)
    },
    isRowVisible () {
      const props = this
      return (property) => decorator.isVisible(property, props.payload)
    }
  }
}
</script>

<style>

</style>