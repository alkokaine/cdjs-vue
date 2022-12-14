<template>
  <cd-prop-editor
    :payload="config"
    :descriptor="configDescriptor"
  >
    <cd-grid
      class="container"
      :collection="collection"
      :select-rows="config.selectRows"
      :descriptor="columns"
      key-field="id"
      :show-header="config.showHeader"
      :zebra-cols="config.zebraCols"
      :zebra-rows="config.zebraRows"
      :highlight-on-hover="config.highlight"
      :small="config.small"
      :row-class="rowClass"
      :body-cell-class="cellClass"
      :body-class="config.bodyClass"
      :head-cell-class="headCellClass"
      :borders="config.borders"
    >
      <div
        slot="header"
        slot-scope="{ property }"
        class="cd-grid-view--header"
      >
        <span>{{ property.datafield }}</span>
      </div>
      <template slot-scope="{ row, property, begin, end }">
        <template v-if="begin">
          <span class="begin">{{ row }}</span>
        </template>
        <template v-else-if="end">
          <span class="end">{{ row }}</span>
        </template>
        <template v-else-if="property">
          <template v-if="property.isflag">
            <div class="w-auto team-flag border border-1">
              <img :src="row[property.datafield]">
            </div>
          </template>
        </template>
      </template>
    </cd-grid>
  </cd-prop-editor>
</template>

<script>
import cdGrid from '@/components/cd-grid.vue'
import CDPropEditor from '@/components/cd-prop-editor.vue'
import descriptor from '@/assets/descriptors'
import matchInfo from '@/assets/match-info'
export default {
  name: 'CdGridView',
  components: { 
    'cd-grid': cdGrid,
    'cd-prop-editor': CDPropEditor
  },
  data (view) {
    return {
      collection: matchInfo.teams,
      empty: [],
      columns: [
        {
          datafield: '_id',
          text: '_id'
        },
        {
          datafield: 'name_en',
          text: 'name_en'
        },
        {
          datafield: 'name_fa',
          text: 'name_fa'
        },
        {
          datafield: 'fifa_code',
          text: 'fifa_code'
        },
        {
          datafield: 'flag',
          isflag: true,
          text: 'flag'
        },
        {
          datafield: 'iso2',
          text: 'iso2'
        },
        {
          datafield: 'groups',
          text: 'groups'
        }
      ],//  descriptor.objectDescriptor,
      config: {},
      configDescriptor: [
        {
          datafield: 'selectRows',
          text: 'Можно ли выбирать строки',
          input: 'checkbox'
        },
        {
          datafield: 'borders',
          text: 'границы',
          input: 'select',
          valuekey: 'border',
          labelkey: 'name',
          values: [
            {
              border: 'all',
              name: 'все границы'
            },
            {
              border: 'rows',
              name: 'строки',
            },
            {
              border: 'none',
              name: 'безграничная таблица'
            }
          ]
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
        },
        {
          datafield: 'small',
          text: 'Компактная',
          input: 'checkbox'
        },
        {
          datafield: 'bodyClass',
          text: 'bodyClass',
        },
        {
          datafield: 'headClass',
          text: 'headClass'
        }
      ]
    }
  },
  computed: {
    rowClass (vm) {
      return ({ groups }, index) => {
        switch (groups) {
          case 'A': return 'group-a'
          case 'B': return 'group-b'
          case 'C': return 'group-c'
          default: return 'group-d'
        }
      }
    },
    cellClass (vm) {
      return ({ _id }, { datafield }) => {
        return `${_id}_${datafield}`
      }
    },
    headCellClass () {
      return ({ datafield }) => (datafield)
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
</style>