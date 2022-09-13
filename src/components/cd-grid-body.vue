<template>
  <tbody v-loading="isLoading" class="cd-grid--body" :class="tbodyClass">
    <template v-for="(row, rindex) in collection">
      <cd-row :row-key="rowKey(row, rindex)" :key="rowKey(row,rindex)" class="cd-body-row" :class="[ isRowClassFunction ? rowClass(row, rindex) : rowClass]">
        <td v-if="selectRows" slot="select" class="cd-checkbox--cell">
          <input type="checkbox" class="cd-grid--checkbox"/>
        </td>
        <td class="cd-grid--cell" slot="begin">
          <slot :begin="true" :row="row" :rowindex="rindex"></slot>
        </td>
        <template v-if="columns.length">
          <td v-for="(prop, cindex) in columns" :ref="propCellKey(prop, cindex)" :id="propCellKey(prop, rindex, cindex)" :key="propCellKey(prop, rindex, cindex)" class="cd-grid--cell" :class="[prop.cellclass, isCellClassFunction ? cellClass({ row, rindex }, { prop, cindex }) : cellClass ]">
            <slot :row="row" :rowindex="rindex" :property="prop" :propindex="cindex"></slot>
          </td>
        </template>
        <template v-else>
          <td class="cd-grid--cell">
            <slot :row="row" :rowindex="rindex" :empty="true"></slot>
          </td>
        </template>
        <td class="cd-grid--cell" slot="end">
          <slot :end="true" :row="row" :rowindex="rindex"></slot>
        </td>
      </cd-row>
      <tr v-if="rowDetails" :key="appendix(rowKey(row))">
        <td class="cd-grid-row--expanded cd-grid--cell" :colspan="columnstotal">
          <slot :rowdetails="true" :row="row" :rowindex="rindex"/>
        </td>
      </tr>
    </template>
  </tbody>
</template>
<script>
  import CDRow from './cd-row'

  export default {
    name: 'cd-grid-body',
    components: {
      'cd-row': CDRow
    },
    props: {
      tbodyClass: { type: [String, Array, Object] },
      collection: { type: Array, required: true },
      columns: { type: Array, required: true },
      rowDetails: { type: Boolean, default: false },
      keyField: { type: String, required: true },
      selectRows: { type: Boolean },
      isLoading: { type: Boolean, default: false },
      onCellClick: { type: Function },
      rowClass: { type: [String, Object, Array, Function] },
      cellClass: { type: [String, Object, Array, Function] }
    },
    data (body) {
      return {
        columnstotal: 2 + (body.columns.length || 1),
        isRowClassFunction: typeof body.rowClass === 'function',
        isCellClassFunction: typeof body.cellClass === 'function'
      }
    },
    methods: {
      rowKey (row, index) {
        const keyfield = this.keyField
        return row[keyfield] 
      },
      appendix (key) {
        return `${key}_apx`
      },
    },
    computed: {
      propCellKey () {
        return (prop, ri, pi) => `cell_${ri}_${pi}`
      }
    }
  }
</script>