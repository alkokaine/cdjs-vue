<template>
  <div class="cd-list--root">
    <slot name="header" class="cd-list--header"></slot>
    <ul v-loading="isLoading" v-if="showItems" class="cd-list--internal" :class="listClass" :role="listRole">
      <slot name="pre"></slot>
      <li v-for="(row, index) in filtered" :class="['cd-list--item', rowClass]" :role="itemRole" :key="rowKey(row, index)">
        <slot :row="row" :index="index"/>
      </li>
      <slot name="post"></slot>
    </ul>
    <slot name="footer" :isempty="isEmpty" class="cd-list--footer"></slot>
  </div>
</template>

<script>
import RoleValidator from '@/common/list-aria-role'
import collectionBase from '@/common/collection-base'
import collectionDecorator from '@/common/collection-decorator'

export default {
  name: 'cd-list-base',
  mixins: [collectionBase, collectionDecorator],
  props: {
    listClass: { type: [Array, Object, String], description: 'Класс CSS элемента <ul>' },
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
    }
  },
  computed: {
    
  }
}
</script>

<style>

</style>