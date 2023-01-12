<template>
  <tbody
    v-loading="isLoading"
    class="cd-grid--body"
  >
    <template v-for="(row, rindex) in collection">
      <cd-row
        :key="rowKey(row,rindex)"
        :row-key="rowKey(row, rindex)"
        class="cd-body-row" 
        :class="[ isRowClassFunction ? rowClass(row, rindex) : rowClass]"
      >
        <td
          v-if="selectRows"
          slot="select"
          class="cd-checkbox--cell"
        >
          <input
            type="checkbox"
            class="cd-grid--checkbox"
          >
        </td>
        <td
          slot="begin"
          class="cd-cell--placeholder"
        >
          <slot
            :begin="true"
            :row="row"
            :rowindex="rindex"
          />
        </td>
        <template v-if="columns.length">
          <td
            v-for="(prop, cindex) in columns"
            :id="propCellKey(prop, rindex, cindex)"
            :ref="propCellKey(prop, cindex)"
            :key="propCellKey(prop, rindex, cindex)"
            class="cd-grid--cell"
            :class="[prop.cellClass, isCellClassFunction ? cellClass({ row, rindex }, { prop, cindex }) : cellClass]"
          >
            <slot
              :row="row"
              :rowindex="rindex"
              :property="prop"
              :propindex="cindex"
            >
              {{ row[prop.datafield] }}
            </slot>
          </td>
        </template>
        <template v-else>
          <td class="cd-grid--cell">
            <slot
              :row="row"
              :rowindex="rindex"
              :empty="true"
            >
              {{ row }}
            </slot>
          </td>
        </template>
        <td
          slot="end"
          class="cd-cell--placeholder"
        >
          <slot
            :end="true"
            :row="row"
            :rowindex="rindex"
          />
        </td>
      </cd-row>
      <tr
        v-if="rowDetails"
        :key="appendix(rowKey(row))"
        class="cd-row--details"
      >
        <td
          class="cd-grid-row--expanded"
          :colspan="columnstotal"
        >
          <slot
            :rowdetails="true"
            :row="row"
            :rowindex="rindex"
          />
        </td>
      </tr>
    </template>
    <template v-if="empty">
      <tr class="empty-row">
        <td
          :colspan="columnstotal"
          class="empty-cell"
        >
          <slot name="empty" />
        </td>
      </tr>
    </template>
  </tbody>
</template>
<script>
  import CDRow from './cd-row'
  import Vue from 'vue'
  import { Loading } from 'element-ui'
  Vue.use(Loading)
  export default {
    name: 'CdGridBody',
    components: {
      'cd-row': CDRow
    },
    directives: {
      'loading': Loading
    },
    props: {
      rowKey: { type: Function },
      collection: { type: Array, required: true },
      columns: { type: Array, required: true },
      rowDetails: { type: Boolean, default: false },
      keyField: { type: String, required: true },
      selectRows: { type: Boolean },
      isLoading: { type: Boolean, default: false },
      rowClass: { type: [String, Object, Array, Function], default: 'cd-body-row--base' },
      cellClass: { type: [String, Object, Array, Function], default: 'cd-grid-body--cell-base' }
    },
    data (body) {
      return {
        columnstotal: 2 + (body.columns.length || 1),
        isRowClassFunction: typeof body.rowClass === 'function',
        isCellClassFunction: typeof body.cellClass === 'function'
      }
    },
    computed: {
      propCellKey () {
        return (prop, ri, pi) => `cell_${ri}_${pi}`
      },
      length ({ collection }) {
        return collection.length
      },
      empty ({ length }) {
        return length === undefined || length === 0
      }
    },
    methods: {
      appendix (key) {
        return `${key}_apx`
      },
    }
  }
</script>