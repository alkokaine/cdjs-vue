<template>
  <div class="cd-grid">
    <div v-if="$slots.tuner" class="cd-grid--tuner">
      <slot name="tuner"></slot>
    </div>
    <table :class="[{ 'table-striped' : zebraRows, 'table-striped-columns': zebraCols, 'table-hover': highlightOnHover, 'table-sm': small }, borderclass]"
      class="cd-grid--table table border-bottom">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <cd-grid-head v-if="showHeader" :columns="columns" :select-rows="selectRows" :head-class="headClass" :cell-class="headCellClass"
        :class="resolveHeadClass">
        <template slot-scope="{ property }">
          <slot :header="true" :property="property">{{ property.text }}</slot>
        </template>
      </cd-grid-head>
      <cd-grid-body :collection="collection" :class="resolveBodyClass" :select-rows="selectRows" :columns="columns" :row-key="rowKeyResolved"
        :key-field="keyField" :row-details="rowDetails" :row-class="rowClass" :cell-class="bodyCellClass">
        <span slot-scope="{ rowdetails, row, rowindex, property, propindex }" class="cd-cell--content">
          <template v-if="property">
            <slot :property="property" :row="row" :$rowindex="rowindex" :$propindex="propindex"></slot>
          </template>
          <template v-else-if="rowdetails">
            <slot :rowdetails="rowdetails" :row="row" $rowindex="rowindex"></slot>
          </template>
        </span>
      </cd-grid-body>
      <tfoot v-if="$slots.footer" class="cd-grid--footer"><slot name="footer"/></tfoot>
    </table>
  </div>
</template>

<script>
import flatterer from '@/common/property-flatter'
import CdGridBody from './cd-grid-body.vue'
import CdGridHead from './cd-grid-head.vue'

const resolveborder = (borders) => {
  switch (borders) {
    case 'all': return 'table-bordered'
    case 'rows': return ''
    case 'cols': return ''
    case 'none': return 'table-borderless'
  }
}

export default {
  name: 'cd-grid',
  components: {
    'cd-grid-body': CdGridBody,
    'cd-grid-head': CdGridHead
  },
  props: {
    showHeader: { type: Boolean, default: true, description: 'Показывать ли заголовок грида' },
    highlightOnHover: { type: Boolean, default: false, description: 'Подсвечивать при перемещении мыши' },
    collection: { type: Array, required: true,description: 'Данные в гриде' },
    keyField: { type: String, required: true, description: 'Ключевое свойство строки грида' },
    rowDetails: { type: Boolean, defailt: false, description: 'Подготовительная работа к слоту с деталями строки грида' },
    descriptor: { type: Array, description: 'Массив дескрипторов, по которым будут отрисованы колонки грида' },
    selectRows: { type: Boolean, default: false, description: 'Показывать ли чекбоксы для выделения строк грида' },
    small: { type: Boolean, default: false, description: 'Компактный размер' },
    zebraRows: { type: Boolean, default: false, description: 'Полосатые строки' },
    zebraCols: { type: Boolean, default: false, description: 'Полосатые колонки' },
    bodyClass: { type: [String, Object, Array, Function], default: 'cd-grid--body-base', description: 'CSS класс элемента <tbody>' },
    headClass: { type: [String, Object, Array, Function], default: 'cd-grid--head-base', description: 'CSS класс элемента <thead>' },
    rowClass: { type: [String, Object, Array, Function], description: 'CSS класс элемента <tr>' },
    headCellClass: { type: [String, Object, Array, Function],description: 'CSS класс элемента <th>' },
    bodyCellClass: { type: [String, Object, Array, Function],description: 'CSS класс элемента <td>' },
    rowKey: { 
      type: Function,
      default: function (row, index) {
        return row[this.keyField]
      },
      description: 'Функция, возвращающая значение ключевого поля '
    }

  },
  data (grid) {
    return {
      borderclass: resolveborder(grid.borders),
      columns: (flatterer(grid.descriptor, [])).filter(p => p.datafield !== undefined),
      isBodyClassFunction: typeof grid.bodyClass === 'function',
      isHeadClassFunction: typeof grid.headClass === 'function'
    }
  },
  methods: {
  },
  computed: {
    rowKeyResolved (vm) {
      return (row, index) => vm.rowKey(row, index)
    },
    resolveHeadClass (vm) {
      return vm.isHeadClassFunction ? vm.headClass() : vm.headClass
    },
    resolveBodyClass (vm) {
      return vm.isBodyClassFunction ? vm.bodyClass() : vm.bodyClass
    }
  }
}
</script>

<style>
  .cd-grid--cell {
    word-wrap: normal;
    white-space: pre-wrap;
  }
</style>