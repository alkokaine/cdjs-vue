<template>
  <cd-list class="cd-tabs" :collection="tabs" :key-field="tabKey" :class="[{ 'col': isRow, 'row flex-nowrap': isCol }]" :list-class="['cd-tabs--wrap list-unstyled', { 'row': isRow, 'col': isCol }]" :row-class="['cd-tab--wrap', { 'col': isRow, 'row': isCol } ]" list-role="tablist" item-role="tab">
    <template v-if="inFooter || inRight" slot="header">
      <div class="cd-tabs-content">
        <slot name="content"></slot>
      </div>
    </template>
    <div class="cd-tab" slot-scope="{ row, index }" :class="[row.class, { 'is-disabled pe-none': resolveTabDisabled(row, index) }]">
      <slot :tab="row" :index="index"></slot>
    </div>
    <template v-if="inHeader || inLeft" slot="footer">
      <div class="cd-tabs--content">
        <slot name="content"></slot>
      </div>
    </template>
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
    isTabDisabled: { type: Function, description: 'Вычисляем для объекта вкладки и её индекса в массиве [tabs], будет ли вкладка задисаблена' },
    orientation: { 
      type: String, 
      default: 'row-top', 
      validator: function (value) {
        return ['row-top', 'row-bottom', 'col-left', 'col-right'].indexOf(value) >= 0
      },
      description: 'Расположение списка вкладок'
    }
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
    },
    inHeader ({ orientation }) {
      return ['row-top'].indexOf(orientation) >= 0
    },
    inFooter ({ orientation }) {
      return ['row-bottom'].indexOf(orientation) >= 0
    },
    isRow ({ orientation }) {
      return ['row-bottom', 'row-top'].indexOf(orientation) >= 0
    },
    isCol ({ orientation }) {
      return ['col-left', 'col-right'].indexOf(orientation) >= 0
    },
    inLeft ({ orientation }) {
      return ['col-left'].indexOf(orientation) >= 0
    },
    inRight ({ orientation }) {
      return ['col-right'].indexOf(orientation) >= 0
    }
  }
}
</script>

<style>
  .cd-tabs--content {
    padding: 1em;
  }
  .cd-tab--wrap {
    max-width: max-content;
  }
  .cd-tabs--wrap {
    max-width: max-content;
  }
  .cd-tab {
    min-width: max-content;
  }
</style>