<template>
  <cd-prop-editor :payload="config" :descriptor="configDescriptor">
    <cd-grid :collection="collection" :select-rows="config.selectRows" :descriptor="columns"
      key-field="ObjectID" :show-header="config.showHeader" :zebra-cols="config.zebraCols"
      :zebra-rows="config.zebraRows" :highlight-on-hover="config.highlight" :small="config.small"
      :row-class="rowClass" :cell-class="cellClass">
      <template slot-scope="{ header, row, property }">
        <template v-if="header">
          {{ property.text }}
        </template>
        <template v-else>
          <div>{{ row[property.datafield] }}</div>
        </template>
      </template>
    </cd-grid>
  </cd-prop-editor>
</template>

<script>
import cdGrid from '@/components/cd-grid.vue'
import CDPropEditor from '@/components/cd-prop-editor.vue'
import descriptor from '@/assets/descriptors'
export default {
  name: 'cd-grid-view',
  components: { 
    'cd-grid': cdGrid,
    'cd-prop-editor': CDPropEditor
  },
  data (view) {
    return {
      collection: [descriptor.object, descriptor.object, descriptor.object],
      columns: descriptor.objectDescriptor,
      config: {},
      configDescriptor: [
        {
          datafield: 'selectRows',
          text: 'Можно ли выбирать строки',
          input: 'checkbox'
        },
        {
          datafield: 'showHeader',
          text: 'Показывать заголовок',
          input: 'checkbox'
        },
        {
          datafield: 'zebraRows',
          text: 'Полосатые строки',
          input: 'checkbox'
        },
        {
          datafield: 'zebraCols',
          text: 'Полосатые колонки',
          input: 'checkbox'
        },
        {
          datafield: 'highlight',
          text: 'Выдялеть при движении (wft)',
          input: 'checkbox'
        }
      ]
    }
  },
  computed: {
    rowClass (vm) {
      return (row, index) => `row-class-${index}`
    },
    cellClass (vm) {
      return (rowinfo, propinfo) => propinfo.prop.datafield
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
</style>