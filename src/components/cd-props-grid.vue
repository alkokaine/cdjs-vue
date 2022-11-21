<template>
  <cd-grid :collection="properties" key-field="name" :descriptor="descriptor">
    <h3 slot="caption">{{ component.name }}</h3>
    <template slot-scope="{ header, row, property }">
      <div v-if="!header">{{ row[property.datafield] }}</div>
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
    component: { type: Object, required: true }
  },
  data (grid) {
    return {
      properties: vueProps(CDGrid),
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