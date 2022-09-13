<template>
  <div class="cd-grid">
    <div v-if="$slots.tuner" class="cd-grid--tuner">
      <slot name="tuner"></slot>
    </div>
    <table class="cd-grid--table table border-bottom" :class="[{ 'table-striped' : zebraRows, 'table-striped-columns': zebraCols, 'table-hover': highlightOnHover, 'table-sm': small }, borderclass]">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <cd-grid-head v-if="showHeader" :columns="columns" :select-rows="selectRows" :head-class="headClass">
        <template slot-scope="{ property }">
          <slot :header="true" :property="property">{{ property.text }}</slot>
        </template>
      </cd-grid-head>
      <cd-grid-body :collection="collection" :tbody-class="tbodyClass" :select-rows="selectRows" :columns="columns" :key-field="keyField" :row-details="rowDetails" :on-cell-click="onCellClick" :row-class="rowClass" :cell-class="cellClass">
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
import { Loading } from 'element-ui'
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
  directives: {
    'loading': Loading
  },
  props: {
    showHeader: { type: Boolean, default: true },
    highlightOnHover: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    collection: { type: Array },
    keyField: { type: String },
    rowDetails: { type: Boolean, defailt: false },
    descriptor: { type: Array },
    selectRows: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    zebraRows: { type: Boolean, default: false },
    zebraCols: { type: Boolean, default: false },
    tbodyClass: { type: [String, Object, Array], default: 'cd-grid--body-base' },
    headClass: { type: [String, Object, Array], default: 'cd-grid--head-base' },
    rowClass: { type: [String, Object, Array, Function] },
    cellClass: { type: [String, Object, Array, Function] },
    onCellClick: {
      type: Function, 
      default: function (...args) {
        console.log(args)
      }
    }
  },
  data (grid) {
    return {
      borderclass: resolveborder(grid.borders),
      columns: (flatterer(grid.descriptor, [])).filter(p => p.datafield !== undefined)
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
  .cd-grid--cell {
    word-wrap: normal;
    white-space: pre-wrap;
  }
</style>