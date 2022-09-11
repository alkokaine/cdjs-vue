<template>
  <div class="cd-grid">
    <table class="cd-grid--table table table-sm border-bottom" :class="[{ 'table-striped' : striped, 'table-hover': highlightOnHover }, borderclass ]">
      <caption v-if="$slots.caption" class="cd-grid--caption"><slot name="caption"/></caption>
      <thead class="cd-grid--head table-light border-top"/>
      <cd-grid-head :columns="columns" :select-rows="selectRows"></cd-grid-head>
      <cd-grid-body :collection="collection" :select-rows="selectRows" :columns="columns" :key-field="keyField" :expandable="true" :on-cell-click="onCellClick">
        <template slot-scope="{ rowdetails, data, property }">
          <slot :rowdetails="rowdetails" :data="data" :property="property">
            <template v-if="property">
              <span>{{ data.row[property.prop.datafield] }}</span>
            </template>
          </slot>
        </template>
      </cd-grid-body>
      <tfoot v-if="$slots.footer" class="cd-grid--footer"><slot name="footer"/></tfoot>
    </table>
  </div>
</template>

<script>
import flatterer from '@/common/property-flatter'
import CdGridBody from './cd-grid-body.vue'
import CdGridHead from './cd-grid-head.vue'
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
    'cd-grid-body': CdGridBody,
    'cd-grid-head': CdGridHead
  },
  props: {
    highlightOnHover: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    collection: { type: Array },
    keyField: { type: String },
    expandRows: { type: Boolean },
    descriptor: { type: Array },
    selectRows: { type: Boolean, default: false },
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
  }
}
</script>

<style>
  .cd-grid--cell {
    word-wrap: normal;
    white-space: pre-wrap;
  }
</style>