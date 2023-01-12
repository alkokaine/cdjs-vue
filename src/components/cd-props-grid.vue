<template>
  <cd-grid
    :collection="properties"
    key-field="name"
    :descriptor="descriptor"
  >
    <h3 slot="caption">
      {{ component.name }}
    </h3>
    <template slot-scope="{ row, property }">
      <span v-if="property" class="component-property">
        {{ row[property.datafield] }}
      </span>
    </template>
  </cd-grid>
</template>
<script>
import CDGrid from '@/components/cd-grid'
import getprops from '@/common/get-component-props'
export default {
  components: {
    'cd-grid': CDGrid
  },
  props: {
    component: { type: Object, required: true, description: 'Компонент, чьи свойства покажет грид' }
  },
  data (grid) {
    return {
      properties: getprops(grid.component),
      descriptor: [
        {
          datafield: 'name',
          text: 'name'
        },
        {
          datafield: 'type',
          text: 'type'
        },
        {
          datafield: 'required',
          text: 'required'
        },
        {
          datafield: 'default',
          text: 'default'
        },
        {
          datafield: 'description',
          text: 'description'
        },
      ]
    }
  }
}
</script>