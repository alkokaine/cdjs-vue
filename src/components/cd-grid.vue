<template>
  <div class="cd-grid">
    <div v-if="$slots.tuner" class="cd-grid--tuner">
      <slot name="tuner"></slot>
    </div>
    <table :class="[{ 'table-striped' : zebraRows, 'table-striped-columns': zebraCols, 'table-hover': highlightOnHover, 'table-sm w-auto': small }, borderClass]"
      class="cd-grid--table table border-bottom">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <cd-grid-head v-if="showHeader" :columns="columns" :select-rows="selectRows" :head-class="headClass" :cell-class="headCellClass"
        :class="resolveHeadClass">
        <template slot-scope="{ property }">
          <slot name="header" :property="property">{{ property.text }}</slot>
        </template>
      </cd-grid-head>
      <cd-grid-body :borders="borders" :collection="collection" :class="resolveBodyClass" :select-rows="selectRows" :columns="columns" :row-key="rowKeyResolved"
        :key-field="keyField" :row-details="rowDetails" :row-class="rowClass" :cell-class="cellClassResolved">
        <span slot-scope="{ begin, end, row, property, rowdetails, rowindex, propindex }" class="cd-cell--content">
          <template v-if="property">
            <slot :property="property" :row="row" :$rowindex="rowindex" :$propindex="propindex">
              {{ row[property.datafield] }}
            </slot>
          </template>
          <template v-else-if="rowdetails">
            <slot :rowdetails="rowdetails" :row="row" $rowindex="rowindex"></slot>
          </template>
          <template v-else-if="begin">
            <slot :begin="true" :row="row" :rowindex="rowindex"></slot>
          </template>
          <template v-else-if="end">
            <slot :end="true" :row="row" :rowindex="rowindex"></slot>
          </template>
        </span>
        <span slot="empty" class="cd-grid--no-data">
          <slot name="no-data">Нет данных</slot>
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
import collectionBase from '@/common/collection-base'
import collection from '@/common/collection'
export default {
  name: 'cd-grid',
  mixins: [collectionBase, collection],
  components: {
    'cd-grid-body': CdGridBody,
    'cd-grid-head': CdGridHead
  },
  props: {
    borders: { type: String, description: 'Границы' },
    showHeader: { type: Boolean, default: true, description: 'Показывать ли заголовок грида' },
    highlightOnHover: { type: Boolean, default: false, description: 'Подсвечивать при перемещении мыши' },
    // collection: { type: Array, required: true,description: 'Данные в гриде' },
    // keyField: { type: String, required: true, description: 'Ключевое свойство строки грида' },
    rowDetails: { type: Boolean, defailt: false, description: 'Подготовительная работа к слоту с деталями строки грида' },
    descriptor: { type: Array, description: 'Массив дескрипторов, по которым будут отрисованы колонки грида' },
    selectRows: { type: Boolean, default: false, description: 'Показывать ли чекбоксы для выделения строк грида' },
    small: { type: Boolean, default: false, description: 'Компактный размер' },
    zebraRows: { type: Boolean, default: false, description: 'Полосатые строки' },
    zebraCols: { type: Boolean, default: false, description: 'Полосатые колонки' },
    bodyClass: { type: [String, Object, Array, Function], default: 'cd-grid--body-base', description: 'CSS класс элемента <tbody>' },
    headClass: { type: [String, Object, Array, Function], default: 'cd-grid--head-base', description: 'CSS класс элемента <thead>' },
    // rowClass: { type: [String, Object, Array, Function], description: 'CSS класс элемента <tr>' },
    headCellClass: { type: [String, Object, Array, Function],description: 'CSS класс элемента <th>' },
    bodyCellClass: { type: [String, Object, Array, Function],description: 'CSS класс элемента <td>' },
    rowKey: { type: Function, description: 'Функция, возвращающая значение ключевого поля ' }
  },
  data (grid) {
    return {
    }
  },
  methods: {
  },
  computed: {
    borderClass ({ borders }) {
      switch (borders) {
        case 'all': return 'table-bordered'
        case 'none': return 'table-borderless'
        default: return ''
      }
    },
    columns ({ descriptor }) {
      return (flatterer(descriptor, [])).filter(p => p.datafield !== undefined)
    },
    rowKeyResolved ({ rowKey, keyField }) {
      return (row) => {
        if (rowKey !== undefined && typeof rowKey === 'function') return rowKey(row)
        else return row[keyField]
      }
    },
    cellClassResolved ({ bodyCellClass }) {
      return ({ row }, { prop }) => {
        if (bodyCellClass !== undefined && typeof bodyCellClass === 'function') return bodyCellClass(row, prop)
        return bodyCellClass
      }
    },
    rowClassResolved ({ rowClass }) {
      return (row, index) => {
        if (rowClass !== undefined && typeof rowClass === 'function') return rowClass(row, index)
        else return rowClass
      }
    },
    resolveHeadClass ({ headClass }) {
      if (headClass !== undefined && typeof headClass === 'function') return headClass()
      return headClass
    },
    resolveBodyClass ({ bodyClass }) {
      if (bodyClass !== undefined && typeof bodyClass === 'function') return bodyClass()
      return bodyClass
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