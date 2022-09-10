<template>
  <div class="cd-list">
    <div v-if="$slots.header" class="cd-list--header">
      <slot name="header"></slot>
    </div>
    <ul class="cd-list--internal" :class="listClass" :role="listRole">
      <li v-for="(row, index) in filtered" :class="[resolveRowClass(row, index)]" :role="itemRole" :key="rowKey(row, index)">
        <slot :row="row" :index="index"/>
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
    payload: { type: [Array, Object, Number, String, Date, Function] },
    remoteMethod: { type: Function },
    resolveResult: { type: Function },
    listClass: { type: [Array, Object, String], description: 'Класс CSS элемента <ul>' },
    rowClass: { type: [Function, Array, Object, String], description: 'Класс CSS элемента <li> списка' },
    collection: { type: [Array, Function], required: true, description: 'Содержимое списка' },
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
    if (list.remoteMethod !== undefined && typeof list.remoteMethod === 'function') list.remoteMethod(list.payload, list.resolveResult)
    return {}
  },
  watch: {
    payload: {
      handler (newvalue, oldvalue) {
        if (this.remoteMethod !== undefined && typeof this.remoteMethod === 'function') this.remoteMethod(newvalue, this.resolveResult)
      }
    }
  },
  computed: {
    filtered () {
      const isRowVisible = this.isRowVisible
      return (isRowVisible !== undefined && typeof isRowVisible === 'function')
        ? (this.collection.filter(isRowVisible))
        : this.collection
    },
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