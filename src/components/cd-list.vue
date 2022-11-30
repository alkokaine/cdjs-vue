<template>
  <div class="cd-list">
    <slot name="header" class="cd-list--header"></slot>
    <ul v-if="showItems" class="cd-list--internal" :class="listClass" :role="listRole">
      <li v-for="(row, index) in filtered" :class="['cd-list--item', isRowClassFunction ? rowClass(row, index) : rowClass]" :role="itemRole" :key="rowKey(row, index)">
        <slot :row="row" :index="index"/>
      </li>
    </ul>
    <slot name="footer" :isempty="isempty" class="cd-list--footer"></slot>
  </div>
</template>

<script>
import RoleValidator from '@/common/list-aria-role'
const collection = []
export default {
  name: 'cd-list',
  props: {
    payload: { type: [Array, Object, Number, String, Date, Function], description: 'Параметры загрузки данных в список' },
    remoteMethod: { type: Function, description: 'Метод получения данных для списка' },
    resolveResult: { type: Function, description: 'Функция, выполняющаяся при успешном получении данных' },
    listClass: { type: [Array, Object, String], description: 'Класс CSS элемента <ul>' },
    rowClass: { type: [Function, Array, Object, String], description: 'Класс CSS элемента <li> списка' },
    collection: { type: [Array, Function], required: true, default: () => (collection), description: 'Содержимое списка' },
    keyField: { type: String, required: true, description: 'Имя свойства, где содержится идентификатор объекта в списке' },
    isRowVisible: { type: Function, description: 'Функция, которая по объекту и его индексу в массиве вычисляет, следует ли его рендерить' },
    listRole: { type: String, validator: RoleValidator.validateListRole, description: 'aria-role списка' },
    itemRole: { type: String, validator: RoleValidator.validateItemRole, description: 'aria-role элемента списка' },
    showItems: { type: Boolean, default: true, description: 'Показывать элементы списка?' },
    rowKey: {
      type: Function,
      default: function(row, index) {
        const keyfield = this.keyField
        return row[keyfield] 
      },
      description: 'Функция, возвращающая значение первичного ключа объекта в списке'
    } 
  },
  data (list) {
    return {
      isRowClassFunction: typeof list.rowClass === 'function'
    }
  },
  watch: {
    payload: {
      deep: true,
      handler (newvalue, oldvalue) {
        if (this.remoteMethod !== undefined && typeof this.remoteMethod === 'function') this.remoteMethod(newvalue, this.resolveResult)
      }
    }
  },
  computed: {
    isempty ({ filtered }) {
      return filtered.length === 0
    },
    filtered ({ collection, isRowVisible }) {
      if (Array.isArray(collection) && collection.length > 0) {
        return isRowVisible !== undefined && typeof isRowVisible === 'function' ? collection.filter(isRowVisible) : collection
      }
      return []
    }
  }
}
</script>

<style>

</style>