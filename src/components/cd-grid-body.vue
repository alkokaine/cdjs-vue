<template>
  <tbody v-loading="isLoading" class="cd-grid--body">
    <template v-for="(row, rindex) in collection">
      <cd-row :key="rowKey(row, rindex)" :row="row">
        <input v-if="selectRows" slot="select" type="checkbox" class="cd-grid--checkbox"/>
        <template v-slot:default="{ el }">
          <td v-for="(prop, cindex) in columns" :ref="propCellKey(prop, cindex)" :id="propCellKey(prop, rindex, cindex)" :key="propCellKey(prop, rindex, cindex)" class="cd-grid--cell">
            <slot :data="{ row, $rowindex: rindex, $el: el }" :property="{ prop, $propindex: cindex }"></slot>
          </td>
        </template>
      </cd-row>
      <tr v-if="expandable" :key="appendix(rowKey(row))">
        <td class="cd-grid-row--expanded cd-grid--cell" :colspan="columnstotal">
          <slot :rowdetails="true" :data="{ row, $rowindex: rindex }"/>
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
      collection: { type: Array, required: true },
      columns: { type: Array, required: true },
      expandable: { type: Boolean, default: false },
      keyField: { type: String, required: true },
      selectRows: { type: Boolean },
      isLoading: { type: Boolean, default: false },
      onCellClick: { type: Function }
    },
    data (body) {
      return {
        columnstotal: 2 + (body.columns.length || 1)
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
      onRowSelect (row, index) {

      }
    },
    computed: {
      propCellKey () {
        return (prop, ri, pi) => `cell_${ri}_${pi}`
      }
    }
  }
</script>