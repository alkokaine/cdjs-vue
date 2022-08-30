<template>
  <div class="cd-list">
    <div v-if="$slots.header" class="cd-list--header">
      <slot name="header"></slot>
    </div>
    <ul class="cd-list--internal" :class="listClass" :role="listRole">
      <li v-for="(row, index) in data" :key="rowKey(row, index)" :class="[resolveRowClass(row, index)]" :role="itemRole">
        <slot :row="row" :index="index"></slot>
      </li>
    </ul>
    <div v-if="$slots.footer" class="cd-list--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import RoleValidator from '@/common/list-aria-role'
export default {
  name: 'cd-list',
  props: {
    listClass: { type: [Array, Object, String], description: 'Класс CSS элемента <ul>' },
    rowClass: { type: [Array, Object, String], description: 'Класс CSS элемента <li> списка' },
    collection: { type: Array, required: true, description: 'Содержимое списка' },
    keyField: { type: String, required: true, description: 'Имя свойства, где содержится идентификатор объекта в списке' },
    isRowVisible: { type: Function, description: 'Функция, которая по объекту и его индексу в массиве вычисляет, следует ли его рендерить' },
    listRole: { type: String, validator: RoleValidator.validateListRole, description: 'aria-role списка' },
    itemRole: { type: String, validator: RoleValidator.validateItemRole, description: 'aria-role элемента списка' },
    rowKey: {
      type: Function,
      default: function(row, index) {
        const keyfield = this.keyField
        return row[keyfield] 
      }
    }
  },
  data (list) {
    return {
      data: list.isRowVisible === undefined ? list.collection : list.collection.filter((row, index) => list.isRowVisible(row, index))
    }
  },
  computed: {
    resolveRowClass() {
      const rowClass = this.rowClass
      const isFunction = typeof rowClass === 'function'
      return (row, index) => rowClass === undefined ? 'cd-list--item' : ['cd-list--item', isFunction ? rowClass(row, index) : rowClass]
    }
  }
}
</script>

<style>

</style>