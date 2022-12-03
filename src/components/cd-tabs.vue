<template>
  <cd-list class="cd-tabs" :class="{ 'row': isCol, 'col': isRow}" :collection="tabs" :key-field="tabKey" 
    :list-class="['cd-tabs--wrap list-unstyled nav nav-tabs border-0', 
      { 
        'flex-column': isCol, 
        'w-100': isRow,
        'in-footer': inFooter,
        'in-header': inHeader
      }]" :row-class="['cd-tab--wrap nav-item mx-1',
      { 
        'width-maxc py-1' : isCol,
      } ]" list-role="tablist" item-role="tab">
    <template v-if="isHeaderContent" slot="header">
      <div class="cd-tabs--content tab-content" :class="[{ 'col': isCol, 'row': isRow }]">
        <slot name="content"></slot>
      </div>
    </template>
    <a class="nav-link p-0 cd-tab border-0" data-toggle="tab" slot-scope="{ row, index }" :href="`#${row[tabKey]}`">
      <div v-on:click.capture="onTabSelect($event, row)" class="cd-tab--header p-2" :class="[row.class, 'border rounded-0',
      {
        'rounded-start': inLeft,
        'rounded-end': inRight,
        'rounded-bottom': inFooter,
        'rounded-top': inHeader,
      },
      isActive(row) ? {
        'active': true,
        'border-top-0': inFooter,
        'border-end-0': inLeft,
        'border-start-0': inRight,
        'border-bottom-0': inHeader
      } : {
        'border-top': inFooter,
        'border-end': inLeft,
        'border-start': inRight,
        'border-bottom': inHeader
      }
    ]">
        <slot :tab="row" :index="index"></slot>
      </div>
    </a>
    <template v-if="isFooterContent" slot="footer">
      <div class="cd-tabs--content tab-content" :class="[{ 'col': isCol, 'row': isRow }]">
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
    onTabSelect: { type: Function, description: 'Что произойдёт при клике на вкладку' },
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
    isActive ({ $route, tabKey }) {
      return (row) => {
        return $route.hash === `#${row[tabKey]}`
      }
    },
    inHeader ({ orientation }) {
      return ['row-top'].indexOf(orientation) >= 0
    },
    inFooter ({ orientation }) {
      return ['row-bottom'].indexOf(orientation) >= 0
    },
    isActiveInFooter({ isActive, inFooter }) {
      return (row) => isActive(row) && inFooter
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
    },
    isHeaderContent ({ inFooter, inRight }) {
      return inFooter || inRight
    },
    isFooterContent ({ inHeader, inLeft}) {
      return inHeader || inLeft
    }
  }
}
</script>

<style>
  .cd-tabs--content {
    padding: 1em;
    margin: 1em;
  }
  .cd-tab--wrap {
    max-width: min-content;
  }
  .cd-tabs--wrap {
    width: auto;
  }
  .width-maxc {
    min-width: max-content;
  }
  .nav-tabs.in-footer {
    border-bottom: 0;
  }
</style>