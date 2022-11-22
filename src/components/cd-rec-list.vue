<template>
  <cd-list :collection="collection" :key-field="keyField" list-class="list-unstyled row" row-class="col">
    <div v-if="$slots.header" slot="header">
      <slot name="header"></slot>
    </div>
    <template slot-scope="{ row }">
      <cd-rec-list v-if="row[recursive]" :collection="row[recursive]" :key-field="keyField" :recursive="recursive">
        <template slot-scope="{ li }">
          <slot :li="li"></slot>
        </template>
      </cd-rec-list>
      <template v-else>
        <slot :li="row"></slot>
      </template>
    </template>
  </cd-list>
</template>

<script>
import CDList from '@/components/cd-list.vue'
export default {
  name: 'cd-rec-list',
  components: {
    'cd-list': CDList
  },
  props: {
    collection: { type: Array, description: 'Содержимое списка' },
    recursive: { type: String, description: 'Свойство, по которому будет строиться рекурсивный список' },
    keyField: { type: String, description: 'Ключ объекта' }
  },
  data (list) {
    return {}
  }
}
</script>

<style>
  .w-15 {
    width: 15%;
  }
  .container-fluid > li {
    max-width: min-content;
  }
</style>