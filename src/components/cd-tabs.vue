<template>
  <cd-list class="cd-tabs" :collection="tabs" :key-field="tabKey" list-class="cd-tabs--wrap" row-class="cd-tab--wrap" list-role="tablist" item-role="tab">
    <div class="cd-tab" slot-scope="{ row, index }" :class="[row.class, { 'is-disabled pe-none': resolveTabDisabled(row, index) }]">
      <slot :tab="row" :index="index"></slot>
    </div>
    <div class="cd-tabs--content" slot="footer">
      <slot name="content"></slot>
    </div>
  </cd-list>
</template>

<script>
import CDList from './cd-list.vue'
export default {
  name: 'cd-tabs',
  components: {
    'cd-list': CDList
  },
  props: {
    tabs: { type: Array, required: true, description: 'Вкладки' },
    tabCaption: { type: String, description: 'Свойство объекта из массива [tabs], в котором находится текст вкладки' },
    tabKey: { type: String, required: true, default: 'key', description: 'Свойство объекта из массива [tabs], в котором находится идентификатор вкладки' },
    isTabDisabled: { type: Function, description: 'Вычисляем для объекта вкладки и её индекса в массиве [tabs], будет ли вкладка задисаблена' }
  },
  computed: {
    resolveTabDisabled () {
      const isTabDisabled = this.isTabDisabled
      const isFunction = typeof isTabDisabled === 'function'
      return (row, index) => isTabDisabled === undefined 
      ? false 
      : isFunction 
        ? isTabDisabled(row, index) 
        : isTabDisabled
    }
  }
}
</script>

<style>

</style>