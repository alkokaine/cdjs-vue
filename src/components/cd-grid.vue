<template>
  <div class="cd-grid">
    <table class="cd-grid--table table table-sm border-bottom" :class="[{ 'table-striped' : striped, 'table-hover': highlightOnHover }, borderclass ]">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <thead class="cd-grid--head table-light border-top"/>
      <tbody class="cd-grid---tbody">
        <cd-list :collection="collection" :key-field="keyField" list-class="cd-grid--rows container" row-class="cd-row--wrap row">
          <template slot-scope="{ row, index }">
            <tr class="ms-0 me-0">
              <cd-props class="row" :descriptor="columns" :payload="row">
                <td class="cd-grid--cell col" slot-scope="{ property }">
                  {{ row[property.datafield] }}
                </td>
              </cd-props>
            </tr>
            <tr v-if="expandRows">
              <td class="cd-grid-row--expanded cd-grid--cell">
                <slot :data="{ row, $rowindex: index }, "></slot>
              </td>
            </tr>
          </template>
        </cd-list>
      </tbody>
      <tfoot v-if="$slots.footer" class="cd-grid--footer"><slot name="footer"/></tfoot>
    </table>
  </div>
</template>

<script>
import flatterer from '@/common/property-flatter'
import CdList from './cd-list.vue'
import CdProps from './cd-props.vue'
import propertyDecorator from '@/common/property-decorator'
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
    'cd-list': CdList,
    'cd-props': CdProps
  },
  props: {
    highlightOnHover: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    collection: { type: Array },
    keyField: { type: String },
    expandRows: { type: Boolean },
    descriptor: { type: Array }
  },
  data (grid) {
    return {
      borderclass: resolveborder(grid.borders),
      columns: (flatterer(grid.descriptor, [])).filter(p => p.datafield !== undefined)
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